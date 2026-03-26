# Subagent Skill 通用模板

**版本**: 1.0.0
**用途**: 为所有 superPM skills 提供 subagent 架构模板
**适用场景**: 联网搜索、文档生成、数据分析、竞品分析等耗时任务

---

## 📋 快速应用清单

使用此模板优化现有 skill 前，先检查是否适合：

### ✅ 适合使用 Subagent 的场景

- [ ] **联网搜索类任务** - 搜索结果占用大量 token
- [ ] **文档生成类任务** - 可并行生成多个文档
- [ ] **数据分析类任务** - 计算密集，过程细节不重要
- [ ] **竞品分析类任务** - 需要多次搜索和对比
- [ ] **耗时超过 2 分钟的任务** - 值得 subagent 优化
- [ ] **可并行执行的任务** - 3个以上相似任务

### ❌ 不适合使用 Subagent 的场景

- [ ] **用户交互密集** - AskUserQuestion 需要主 agent 执行
- [ ] **简单快速任务** - 耗时 < 30 秒，不值得派发
- [ ] **决策逻辑复杂** - 需要主 agent 实时判断
- [ ] **前后强依赖** - 任务之间必须串行执行

---

## 🏗️ 模板结构

### 标准 Skill 文件结构

```markdown
---
name: pm-xxx-v2
version: 2.0.0
description: |
  [功能描述] V2 - 使用 subagent 架构优化
  Use when: [触发场景]
  优化点: [具体优化点]
allowed-tools:
  - Read
  - Write
  - AskUserQuestion
  - Agent        # 新增 Agent 工具
  - [其他工具]
---

## Preamble (run first)

[前置检查脚本]

---

## 执行流程

### 步骤 1: [用户交互]（主 agent）

使用 AskUserQuestion 收集需求...

### 步骤 2: [数据准备]（主 agent）

读取前置数据，构建输入...

### 步骤 3: [派发 Subagent]（核心优化）

使用 Agent 工具派发 subagent...

### 步骤 4: [整合结果]（主 agent）

收集结果，综合分析...

### 步骤 5: [输出报告]（主 agent）

生成最终报告...
```

---

## 🎯 场景模板

### 模板 1: 联网搜索类

**适用 skills**: pm-market, pm-position, pm-competitive

**优化前**：
```markdown
### 步骤 3: 执行联网搜索

使用 WebSearch 搜索：
- 关键词1（结果占用大量 token）
- 关键词2（结果占用大量 token）
- 关键词3（结果占用大量 token）

整理搜索结果...
```

**优化后**：
```markdown
### 步骤 3: 派发 subagent 执行搜索

**优化说明**：搜索结果不占用主 agent 上下文

使用 Agent 工具：

```
Tool: Agent
Parameters:
  subagent_type: "general-purpose"
  description: "联网搜索-[任务名]"
  prompt: |
    你是一个搜索专家。请执行以下搜索任务：

    **搜索任务**：{具体任务}

    **搜索关键词**：
    - {关键词1}
    - {关键词2}
    - {关键词3}

    **目标数据源**：
    - {domain1}
    - {domain2}

    **要求**：
    1. 使用 WebSearch 搜索每个关键词
    2. 优先搜索目标数据源
    3. 提取关键数据
    4. 返回结构化 JSON 结果

    **输出格式**：
    ```json
    {
      "task_id": "{任务ID}",
      "search_results": [
        {
          "keyword": "搜索关键词",
          "findings": [
            {
              "title": "标题",
              "source": "来源",
              "key_data": "关键数据",
              "url": "链接"
            }
          ]
        }
      ],
      "summary": "关键发现总结"
    }
    ```
```

等待 subagent 返回结果，主 agent 继续处理。
```

---

### 模板 2: 文档生成类（并行）

**适用 skills**: pm-docs, pm-proto, pm-user-story

**优化前**：
```markdown
### 步骤 3: 生成文档A

（生成过程，占用大量 token）

### 步骤 4: 生成文档B

（生成过程，占用大量 token）

### 步骤 5: 生成文档C

（生成过程，占用大量 token）
```

**优化后（并行）**：
```markdown
### 步骤 3: 并行派发 subagent 生成文档

**优化说明**：多个文档并行生成，效率提升 3x

准备 {N} 个 subagent 任务：

```json
[
  {
    "task_id": "generate_doc_a",
    "doc_type": "文档A",
    "template": "模板路径"
  },
  {
    "task_id": "generate_doc_b",
    "doc_type": "文档B",
    "template": "模板路径"
  },
  {
    "task_id": "generate_doc_c",
    "doc_type": "文档C",
    "template": "模板路径"
  }
]
```

**使用 Agent 工具并行派发**：

```
# 同时启动 3 个 subagent
Agent 1:
  subagent_type: "general-purpose"
  description: "生成文档A"
  prompt: |
    你是一个文档专家。请生成文档A。

    **输入数据**：{数据}

    **要求**：
    1. 使用 Write 工具生成文档到 {路径}
    2. 包含章节：{章节列表}
    3. 基于前置数据填充

    **输出**：返回文档路径

Agent 2:
  subagent_type: "general-purpose"
  description: "生成文档B"
  prompt: |
    [同上结构]

Agent 3:
  subagent_type: "general-purpose"
  description: "生成文档C"
  prompt: |
    [同上结构]
```

主 agent 等待所有 subagent 完成，收集结果。
```

---

### 模板 3: 数据分析类（并行）

**适用 skills**: pm-aarrr, pm-funnel, pm-growth

**优化前**：
```markdown
### 步骤 3: 分析维度A

（分析过程，占用大量 token）

### 步骤 4: 分析维度B

（分析过程，占用大量 token）

### 步骤 5: 分析维度C

（分析过程，占用大量 token）
```

**优化后（并行）**：
```markdown
### 步骤 3: 并行派发 subagent 分析

**优化说明**：多个分析维度并行执行，效率提升 N倍

准备 {N} 个分析任务：

```json
[
  {
    "task_id": "analysis_dimension_a",
    "dimension": "维度A",
    "input_data": {数据}
  },
  {
    "task_id": "analysis_dimension_b",
    "dimension": "维度B",
    "input_data": {数据}
  },
  {
    "task_id": "analysis_dimension_c",
    "dimension": "维度C",
    "input_data": {数据}
  }
]
```

**使用 Agent 工具并行派发**：

```
# 同时启动 N 个 subagent
Agent 1:
  subagent_type: "general-purpose"
  description: "分析维度A"
  prompt: |
    你是一个数据分析专家。请分析维度A。

    **输入数据**：{数据}

    **分析要求**：
    1. 评估当前表现
    2. 对比行业基准
    3. 识别问题和机会
    4. 提出优化建议

    **输出格式**：
    ```json
    {
      "dimension": "维度A",
      "current_status": "当前状态",
      "issues": ["问题1", "问题2"],
      "opportunities": ["机会1", "机会2"],
      "recommendations": ["建议1", "建议2"]
    }
    ```

[Agent 2...N 同上结构]
```

主 agent 等待所有 subagent 完成，整合结果。
```

---

### 模板 4: 竞品分析类

**适用 skills**: pm-competitive, pm-position

**优化前**：
```markdown
### 步骤 3: 分析竞品A

（分析过程）

### 步骤 4: 分析竞品B

（分析过程）

### 步骤 5: 分析竞品C

（分析过程）

### 步骤 6: 对比分析

（对比过程）
```

**优化后（并行 + 对比）**：
```markdown
### 步骤 3: 并行分析竞品

**优化说明**：所有竞品并行分析，然后主 agent 对比

准备竞品列表：[竞品A, 竞品B, 竞品C]

**并行派发 subagent**：

```
Agent 1: 分析竞品A
  prompt: |
    分析竞品A：
    - 基本信息
    - 核心功能
    - 优劣势
    - 市场表现

    返回结构化数据

Agent 2: 分析竞品B
  [同上]

Agent 3: 分析竞品C
  [同上]
```

主 agent 收集所有竞品分析结果，进行对比分析：

```markdown
| 维度 | 竞品A | 竞品B | 竞品C | 我们 |
|------|-------|-------|-------|------|
| 功能 | ... | ... | ... | ... |
| 优势 | ... | ... | ... | ... |
| 劣势 | ... | ... | ... | ... |
```
```

---

## 📐 标准输入输出格式

### 输入格式（传递给 Subagent）

```json
{
  "task_id": "unique_task_id",
  "task_type": "search|document|analysis|comparison",
  "product_info": {
    "name": "产品名称",
    "industry": "行业",
    "target_user": "目标用户"
  },
  "input_data": {
    "keywords": ["关键词1", "关键词2"],
    "domains": ["domain1.com", "domain2.com"],
    "parameters": {
      "param1": "value1",
      "param2": "value2"
    }
  },
  "requirements": {
    "output_format": "json|markdown|table",
    "sections": ["章节1", "章节2"],
    "data_points": ["数据点1", "数据点2"]
  }
}
```

### 输出格式（Subagent 返回）

```json
{
  "task_id": "unique_task_id",
  "status": "success|failed|partial",
  "execution_time": "2m 30s",
  "result": {
    "data": {
      // 结构化结果数据
    },
    "files_generated": [
      {
        "path": "docs/xxx.md",
        "size": "15KB"
      }
    ],
    "key_findings": [
      "发现1",
      "发现2"
    ]
  },
  "errors": [
    {
      "type": "error_type",
      "message": "错误信息",
      "timestamp": "时间戳"
    }
  ]
}
```

---

## 🔧 最佳实践

### 1. 任务拆分原则

**原则**：每个 subagent 任务应该独立、完整、可并行

**好的拆分**：
```
✅ Subagent 1: 搜索市场规模
✅ Subagent 2: 搜索竞品信息
✅ Subagent 3: 搜索用户需求

（每个任务独立，可并行）
```

**不好的拆分**：
```
❌ Subagent 1: 搜索市场规模的前半部分
❌ Subagent 2: 搜索市场规模的后半部分

（任务不独立，无法并行）
```

---

### 2. 上下文传递策略

**问题**：如何避免主 agent 向 subagent 传递过多数据？

**解决方案**：

#### 策略 1: 引用而非传递
```markdown
❌ 错误：将整个文档内容传递给 subagent

✅ 正确：
主 agent 读取文档 → 提取关键信息 → 传递关键信息给 subagent
```

#### 策略 2: 分层传递
```markdown
第一层：主 agent 读取所有前置文档
第二层：提取摘要和关键数据
第三层：只向 subagent 传递摘要和关键数据
```

#### 策略 3: 按需读取
```markdown
在 subagent prompt 中指定：
"如果需要详细数据，请读取 docs/xxx.md"
```

---

### 3. 错误处理

**主 agent 必须处理 subagent 失败的情况**：

```markdown
### 步骤 4: 收集结果并处理错误

**检查 subagent 执行状态**：

```json
{
  "task_results": [
    {
      "task_id": "task_1",
      "status": "success"
    },
    {
      "task_id": "task_2",
      "status": "failed",
      "error": "搜索超时"
    }
  ]
}
```

**如果某个 subagent 失败**：

使用 AskUserQuestion 询问：

> ⚠️ 任务 {task_id} 执行失败：{错误信息}
>
> 您可以选择：
> A) 重试失败的任务
> B) 手动补充数据
> C) 跳过该任务继续
```

---

### 4. 并行数量控制

**原则**：不要一次性派发过多 subagent

**建议**：
- 2-5 个 subagent：最佳并行数量
- 6-10 个 subagent：可以接受
- > 10 个 subagent：考虑分批执行

**原因**：
- 过多并行任务会增加系统负担
- 可能导致部分任务超时
- 结果整合复杂度增加

---

### 5. 性能监控

**在 skill 中记录性能数据**：

```markdown
### 步骤 5: 生成性能报告

记录执行数据：

```json
{
  "optimization_stats": {
    "v1_token_usage": 1810,
    "v2_token_usage": 230,
    "token_saved": "87%",
    "v1_time": "3-5 minutes",
    "v2_time": "1-2 minutes",
    "speed_improvement": "2.5x",
    "parallel_tasks": 3
  }
}
```

在最终报告中输出优化效果。
```

---

## 📊 效果评估模板

### 优化前后对比表

```markdown
## 对比：优化前 vs 优化后

### Token 使用对比

| 指标 | v1 | v2 | 改善 |
|------|----|----|------|
| 主 agent token | {x} | {y} | -{z}% |
| Subagent token | 0 | {w} | N/A |
| 总 token | {x} | {y+w} | -{p}% |

### 执行时间对比

| 指标 | v1 | v2 | 改善 |
|------|----|----|------|
| 总耗时 | {t1} | {t2} | {ratio}x |
| 并行度 | 1 | {n} | {n}x |

### 功能对比

| 功能 | v1 | v2 |
|------|----|----|
| 并行执行 | ❌ | ✅ |
| 上下文隔离 | ❌ | ✅ |
| 错误恢复 | ❌ | ✅ |
| 性能监控 | ❌ | ✅ |
```

---

## 🚀 快速应用流程

### 步骤 1: 评估现有 Skill

使用"快速应用清单"判断是否适合优化。

### 步骤 2: 选择模板

根据 skill 类型选择对应模板：
- 联网搜索类 → 模板 1
- 文档生成类 → 模板 2
- 数据分析类 → 模板 3
- 竞品分析类 → 模板 4

### 步骤 3: 修改 Skill 文件

1. 添加 `Agent` 到 `allowed-tools`
2. 更新 version 为 `2.0.0`
3. 按模板重构执行流程
4. 添加错误处理逻辑
5. 添加性能对比说明

### 步骤 4: 测试验证

1. 执行优化后的 skill
2. 对比 v1 和 v2 的 token 使用
3. 验证结果质量
4. 记录性能数据

### 步骤 5: 提交发布

```bash
git add skills/xxx/pm-xxx-v2/
git commit -m "feat: subagent架构优化 - pm-xxx-v2

优化点：
- [具体优化]
- Token节省：xx%
- 速度提升：xx倍
- 功能增强：xxx"
```

---

## 📚 示例参考

### 已优化示例

- **pm-market-v2**: 搜索并行化（模板 1）
  - 文件：`skills/01-demand-insight/pm-market-v2/SKILL.md`
  - 效果：Token 节省 87%，速度提升 2.5x

- **pm-docs-v2**: 文档生成并行化（模板 2）
  - 文件：`skills/02-solution-design/pm-docs-v2/SKILL.md`
  - 效果：Token 节省 93%，速度提升 3x

- **pm-aarrr-v2**: 数据分析并行化（模板 3）
  - 文件：`skills/03-growth-iteration/pm-aarrr-v2/SKILL.md`
  - 效果：Token 节省 76%，速度提升 4x

---

## 🔍 故障排查

### 问题 1: Subagent 执行超时

**原因**：任务过大或网络问题

**解决**：
1. 拆分为多个小任务
2. 增加超时重试机制
3. 提供降级方案

### 问题 2: 结果格式不一致

**原因**：subagent 未严格按照格式返回

**解决**：
1. 在 prompt 中明确输出格式示例
2. 主 agent 增加格式校验
3. 提供格式修正逻辑

### 问题 3: 主 agent 上下文仍然过大

**原因**：传递给 subagent 的数据过多

**解决**：
1. 使用"引用而非传递"策略
2. 提取摘要后再传递
3. 让 subagent 按需读取文件

---

## 版本说明

**v1.0.0** - 初始版本
- 4 个场景模板
- 标准输入输出格式
- 最佳实践指南
- 故障排查手册

---

## 更新日志

- 2026-03-26: v1.0.0 发布