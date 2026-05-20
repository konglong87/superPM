---
name: pm-docs
version: 2.0.0
description: |
  文档生成工具 V2 - 使用 subagent 架构，支持并行生成 PRD/BRD/MRD
  Use when: 需要输出产品文档、方案文档、商业计划文档
  优化点: 文档生成并行化，主 agent 上下文节省 80%
allowed-tools:
  - Read
  - Write
  - AskUserQuestion
  - Agent
  - Bash
---

## Preamble (run first)

```bash
bash "$(dirname "${BASH_SOURCE[0]}")"/check-update.sh 2>/dev/null || true
# 创建方案设计目录
mkdir -p docs/02-方案设计

# 检查前置文档
echo "📊 正在检查前置文档..."

if [ -f "docs/01-需求调研/MVP方案.md" ]; then
  echo "✅ MVP方案 - 已找到"
else
  echo "⏳ MVP方案 - 未找到"
fi

if [ -f "docs/01-需求调研/需求调研报告.md" ]; then
  echo "✅ 需求调研报告 - 已找到"
else
  echo "⏳ 需求调研报告 - 未找到"
fi

if [ -f "docs/01-需求调研/市场调研报告.md" ]; then
  echo "✅ 市场调研报告 - 已找到"
else
  echo "⏳ 市场调研报告 - 未找到"
fi
```

---

## 执行流程

### 步骤 1: 确定文档类型（主 agent - 用户交互）

使用 AskUserQuestion 询问：

> 您希望生成哪些文档？
>
> A) 仅 PRD - 产品需求文档
> B) 仅 BRD - 商业需求文档
> C) 仅 MRD - 市场需求文档
> D) PRD + BRD + MRD（全套文档，推荐）
> E) 让我推荐（根据项目状态自动选择）
>
> 💡 提示：选择"D"可并行生成全套文档，效率提升 3x

用户选择后，记录到变量 `DOC_TYPES`（数组）

---

### 步骤 2: 读取前置数据（主 agent）

**读取所有可能需要的前置文档**：

```bash
# 主 agent 一次性读取所有前置文档
required_docs=(
  "docs/01-需求调研/MVP方案.md"
  "docs/01-需求调研/需求调研报告.md"
  "docs/01-需求调研/市场调研报告.md"
  "docs/01-需求调研/确认需求清单.md"
  "docs/01-需求调研/优先级排序报告.md"
)

for doc in "${required_docs[@]}"; do
  if [ -f "$doc" ]; then
    # 使用 Read 工具读取
    echo "读取 $doc"
  fi
done
```

**构建上下文摘要**（避免占用大量上下文）：

提取关键信息：
- 产品名称
- 目标用户
- 核心功能
- MVP范围
- 市场数据
- 商业目标

**将关键信息存储为结构化数据**，准备传递给 subagent。

---

### 步骤 3: 并行派发 subagent 生成文档（核心优化）

**优化说明**：
- 主 agent 一次性派发多个 subagent
- 每个 subagent 负责生成一个文档
- 文档生成细节不占用主 agent 上下文
- 所有文档并行生成

---

#### 3.1 构建 subagent 任务

**如果用户选择"全套文档"**：

准备 3 个并行 subagent 任务：

```json
[
  {
    "task_id": "generate_prd",
    "doc_type": "PRD",
    "required_data": [
      "产品名称",
      "目标用户",
      "MVP功能列表",
      "用户需求",
      "优先级排序"
    ]
  },
  {
    "task_id": "generate_brd",
    "doc_type": "BRD",
    "required_data": [
      "产品名称",
      "商业模式",
      "市场数据",
      "成本分析",
      "盈利预测"
    ]
  },
  {
    "task_id": "generate_mrd",
    "doc_type": "MRD",
    "required_data": [
      "产品名称",
      "市场调研数据",
      "用户画像",
      "竞品分析",
      "市场机会"
    ]
  }
]
```

---

#### 3.2 使用 Agent 工具并行派发

**并行派发 3 个 subagent**（关键优化）：

```
# 同时启动 3 个 subagent
使用 Agent 工具，参数：

Agent 1:
  subagent_type: "general-purpose"
  description: "生成 PRD 文档"
  prompt: |
    你是一个产品文档专家。请生成 PRD（产品需求文档）。

    **输入数据**：
    {从步骤2提取的关键信息}

    **要求**：
    1. 使用 Write 工具生成文档到 `docs/02-方案设计/PRD产品需求文档.md`
    2. 包含以下章节：
       - 产品概述
       - 目标用户
       - 功能需求（基于MVP方案）
       - 非功能需求
       - 交互流程
       - 数据埋点
    3. 基于前置数据填充内容，不要虚构
    4. 标注数据来源

    **输出**：返回生成的文档路径

Agent 2:
  subagent_type: "general-purpose"
  description: "生成 BRD 文档"
  prompt: |
    你是一个商业分析专家。请生成 BRD（商业需求文档）。

    **输入数据**：
    {从步骤2提取的关键信息}

    **要求**：
    1. 使用 Write 工具生成文档到 `docs/02-方案设计/BRD商业需求文档.md`
    2. 包含以下章节：
       - 商业目标
       - 商业模式
       - 盈利方式
       - 成本分析
       - 收益预测
    3. 基于前置数据填充内容

    **输出**：返回生成的文档路径

Agent 3:
  subagent_type: "general-purpose"
  description: "生成 MRD 文档"
  prompt: |
    你是一个市场分析专家。请生成 MRD（市场需求文档）。

    **输入数据**：
    {从步骤2提取的关键信息}

    **要求**：
    1. 使用 Write 工具生成文档到 `docs/02-方案设计/MRD市场需求文档.md`
    2. 包含以下章节：
       - 市场概述
       - 用户画像
       - 竞品分析
       - 市场机会
       - 进入策略
    3. 基于市场调研数据填充

    **输出**：返回生成的文档路径
```

**主 agent 等待所有 subagent 完成**。

---

### 步骤 4: 收集结果并验证（主 agent）

**主 agent 收集所有 subagent 的返回结果**：

```json
{
  "generated_docs": [
    {
      "doc_type": "PRD",
      "path": "docs/02-方案设计/PRD产品需求文档.md",
      "status": "success",
      "size": "15KB"
    },
    {
      "doc_type": "BRD",
      "path": "docs/02-方案设计/BRD商业需求文档.md",
      "status": "success",
      "size": "12KB"
    },
    {
      "doc_type": "MRD",
      "path": "docs/02-方案设计/MRD市场需求文档.md",
      "status": "success",
      "size": "10KB"
    }
  ]
}
```

**验证文档**：
- 检查文件是否存在
- 检查文件大小是否合理
- （可选）读取文档开头验证格式

---

### 步骤 5: 生成汇总报告（主 agent）

使用 Write 工具生成汇总报告：

```markdown
# 文档生成报告

## 生成概况

**生成时间**: {时间}
**文档数量**: 3 个
**总耗时**: {并行执行时间}

## 文档清单

### 1. PRD - 产品需求文档
- **路径**: docs/02-方案设计/PRD产品需求文档.md
- **大小**: 15KB
- **状态**: ✅ 生成成功
- **包含章节**: 产品概述、目标用户、功能需求、非功能需求、交互流程、数据埋点

### 2. BRD - 商业需求文档
- **路径**: docs/02-方案设计/BRD商业需求文档.md
- **大小**: 12KB
- **状态**: ✅ 生成成功
- **包含章节**: 商业目标、商业模式、盈利方式、成本分析、收益预测

### 3. MRD - 市场需求文档
- **路径**: docs/02-方案设计/MRD市场需求文档.md
- **大小**: 10KB
- **状态**: ✅ 生成成功
- **包含章节**: 市场概述、用户画像、竞品分析、市场机会、进入策略

## 数据来源

- MVP方案
- 需求调研报告
- 市场调研报告
- 优先级排序报告

## 下一步建议

建议执行：
1. /pm-proto - 基于PRD设计原型
2. /pm-tech - 基于PRD对接技术方案
3. /pm-data - 设计数据指标体系
```

---

## 对比：优化前 vs 优化后

### 优化前（pm-docs v1）

```
主 agent 执行流程：
1. 询问用户（10 tokens）
2. 读取前置数据（200 tokens）
3. 生成 PRD（3000 tokens 内容）
4. 生成 BRD（2500 tokens 内容）
5. 生成 MRD（2000 tokens 内容）
6. 生成汇总（100 tokens）

总计：7810 tokens
耗时：串行执行，约 10-15 分钟
上下文占用：文档内容全量占用
```

### 优化后（pm-docs-v2）

```
主 agent 执行流程：
1. 询问用户（10 tokens）
2. 读取前置数据（200 tokens）
3. 派发 3 个 subagent（50 tokens）
   ├─ Subagent 1: 生成 PRD（不占用主 agent）
   ├─ Subagent 2: 生成 BRD（不占用主 agent）
   └─ Subagent 3: 生成 MRD（不占用主 agent）
4. 接收结果（150 tokens 结构化数据）
5. 生成汇总（100 tokens）

总计：510 tokens
耗时：并行执行，约 3-5 分钟
效率提升：93% token 节省，3x 速度提升
```

---

## 关键优化点

### 1. 并行执行
```
v1: PRD → BRD → MRD（串行）
v2: PRD
    ├─ BRD  （并行）
    └─ MRD
```

### 2. 上下文节省
- ✅ 文档内容不占用主 agent 上下文
- ✅ 主 agent 只处理文档路径和元数据
- ✅ Token 使用减少 93%

### 3. 异常处理

**如果某个 subagent 失败**：
1. 主 agent 检测到失败
2. 提供选项：
   - A) 重试失败的文档
   - B) 手动补充
   - C) 跳过该文档
3. 继续处理其他成功的文档

---

## 注意事项

### 何时使用并行模式

✅ **适合并行**：
- 生成多个文档（PRD + BRD + MRD）
- 文档之间相对独立
- 有充足的前置数据

❌ **不适合并行**：
- 只生成单个文档
- 文档之间强依赖（如 PRD 依赖 BRD 的结果）
- 前置数据缺失

### 单文档模式

如果用户只选择生成一个文档：
- 使用单个 subagent 执行
- 仍然节省上下文（文档内容不占用主 agent）

---

## 版本说明

**v2.0.0** - Subagent 架构重构
- 新增 Agent 工具支持
- 文档生成并行化
- 主 agent 上下文优化 93%
- 效率提升 3x

**v1.0.0** - 初始版本
- 基础文档生成功能
- 串行执行
