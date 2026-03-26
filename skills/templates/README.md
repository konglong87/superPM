# Subagent Skill 模板使用指南

**快速上手**: 3 分钟将现有 skill 升级为 subagent 架构

---

## 🎯 一分钟决策树

```
你的 skill 是否需要优化？
    │
    ├─ 是否有联网搜索？
    │   └─ YES → 使用模板1，token节省 80%+
    │
    ├─ 是否生成多个文档？
    │   └─ YES → 使用模板2，速度提升 3x
    │
    ├─ 是否有多个分析维度？
    │   └─ YES → 使用模板3，速度提升 Nx
    │
    ├─ 是否分析多个竞品？
    │   └─ YES → 使用模板4，速度提升 Nx
    │
    └─ 是否耗时 > 2分钟？
        └─ YES → 考虑使用 subagent
        └─ NO → 不需要优化
```

---

## 🚀 5 步快速应用

### Step 1: 复制模板（30秒）

```bash
# 进入 skills 目录
cd skills/[模块目录]

# 创建 v2 版本
cp -r pm-xxx pm-xxx-v2
cd pm-xxx-v2
```

---

### Step 2: 修改 YAML 头部（1分钟）

```markdown
---
name: pm-xxx-v2                    # 添加 -v2
version: 2.0.0                     # 升级版本号
description: |
  [功能描述] V2 - 使用 subagent 架构优化    # 添加优化说明
  Use when: [触发场景]
  优化点: [具体优化点，如：token节省87%，速度提升2.5x]  # 新增
allowed-tools:
  - Read
  - Write
  - AskUserQuestion
  - Agent        # 新增 Agent 工具
  - [其他工具]
---
```

---

### Step 3: 重构执行流程（1分钟）

**找到可优化的步骤**，按模板替换：

#### 场景 A: 联网搜索 → 模板 1

**替换前**：
```markdown
### 步骤 3: 执行联网搜索

使用 WebSearch 搜索：
- 关键词1
- 关键词2
```

**替换后**：
```markdown
### 步骤 3: 派发 subagent 执行搜索

使用 Agent 工具：
```
Tool: Agent
Parameters:
  subagent_type: "general-purpose"
  description: "搜索任务"
  prompt: "搜索关键词1、关键词2，返回结构化结果"
```
```

#### 场景 B: 文档生成 → 模板 2

**替换前**：
```markdown
### 步骤 3: 生成文档A
### 步骤 4: 生成文档B
### 步骤 5: 生成文档C
```

**替换后**：
```markdown
### 步骤 3: 并行派发 subagent 生成文档

使用 Agent 工具同时派发 3 个 subagent：
- Agent 1: 生成文档A
- Agent 2: 生成文档B
- Agent 3: 生成文档C
```

---

### Step 4: 添加对比说明（30秒）

在文件末尾添加：

```markdown
## 对比：优化前 vs 优化后

### Token 使用对比

| 指标 | v1 | v2 | 改善 |
|------|----|----|------|
| 主 agent token | {估算值} | {目标值} | -{百分比}% |
| 执行时间 | {时间} | {时间} | {倍数}x |

### 关键优化点

1. ✅ [优化点1，如：搜索结果不占用主 agent 上下文]
2. ✅ [优化点2，如：并行执行提升效率]
3. ✅ [优化点3，如：结构化输出便于整合]
```

---

### Step 5: 测试验证（1分钟）

```bash
# 在 Claude Code 中测试
/skill-name-v2

# 检查：
# 1. 是否正常执行
# 2. 结果是否正确
# 3. Token 使用是否减少
# 4. 执行时间是否缩短
```

---

## 📋 完整示例：从 v1 到 v2

### 原始 Skill (pm-xxx v1)

```markdown
---
name: pm-xxx
version: 1.0.0
allowed-tools:
  - Read
  - Write
  - WebSearch
---

### 步骤 3: 执行搜索

使用 WebSearch 搜索：
- "{关键词1}"
- "{关键词2}"
- "{关键词3}"

整理搜索结果...

### 步骤 4: 生成报告

基于搜索结果生成报告...
```

---

### 优化后 Skill (pm-xxx-v2)

```markdown
---
name: pm-xxx-v2
version: 2.0.0
description: |
  [功能描述] V2 - 使用 subagent 架构优化
  优化点: 搜索并行化，token节省85%，速度提升2.5x
allowed-tools:
  - Read
  - Write
  - Agent      # 新增
---

### 步骤 3: 派发 subagent 执行搜索

**优化说明**：搜索结果不占用主 agent 上下文

使用 Agent 工具：

```
Tool: Agent
Parameters:
  subagent_type: "general-purpose"
  description: "联网搜索"
  prompt: |
    搜索以下关键词：
    - {关键词1}
    - {关键词2}
    - {关键词3}

    返回结构化JSON结果
```

等待 subagent 返回结果。

### 步骤 4: 整合结果生成报告

主 agent 基于结构化结果生成报告...

---

## 对比：优化前 vs 优化后

| 指标 | v1 | v2 | 改善 |
|------|----|----|------|
| 主 agent token | 1500 | 200 | -87% |
| 执行时间 | 3-5分钟 | 1-2分钟 | 2.5x |

### 关键优化点

1. ✅ 搜索结果不占用主 agent 上下文
2. ✅ 多个搜索可并行执行
3. ✅ 主 agent 只处理结构化结果
```

---

## 🛠️ 自动化工具

### 批量检查工具

创建 `scripts/check-subagent-candidates.sh`:

```bash
#!/bin/bash

echo "🔍 检查适合 subagent 优化的 skills..."
echo ""

# 查找所有包含 WebSearch 的 skills
echo "📊 包含联网搜索的 skills（适合模板1）："
grep -r "WebSearch" skills/*/SKILL.md | cut -d: -f1 | sort -u

echo ""
echo "📊 包含文档生成的 skills（适合模板2）："
grep -r "生成.*文档\|PRD\|BRD\|MRD" skills/*/SKILL.md | cut -d: -f1 | sort -u

echo ""
echo "📊 包含数据分析的 skills（适合模板3）："
grep -r "分析.*维度\|AARRR\|漏斗" skills/*/SKILL.md | cut -d: -f1 | sort -u

echo ""
echo "📊 包含竞品分析的 skills（适合模板4）："
grep -r "竞品\|对比" skills/*/SKILL.md | cut -d: -f1 | sort -u
```

### 快速创建 v2 版本工具

创建 `scripts/create-v2-skill.sh`:

```bash
#!/bin/bash

SKILL_NAME=$1

if [ -z "$SKILL_NAME" ]; then
  echo "用法: ./create-v2-skill.sh pm-xxx"
  exit 1
fi

# 查找原始 skill
SKILL_PATH=$(find skills -name "$SKILL_NAME" -type d | head -1)

if [ -z "$SKILL_PATH" ]; then
  echo "❌ 未找到 skill: $SKILL_NAME"
  exit 1
fi

# 创建 v2 版本
V2_PATH="${SKILL_PATH}-v2"

if [ -d "$V2_PATH" ]; then
  echo "❌ v2 版本已存在: $V2_PATH"
  exit 1
fi

echo "📦 创建 v2 版本: $V2_PATH"
cp -r "$SKILL_PATH" "$V2_PATH"

# 更新 SKILL.md
SKILL_FILE="$V2_PATH/SKILL.md"

# 更新版本号和名称
sed -i '' 's/name: pm-\(.*\)/name: pm-\1-v2/' "$SKILL_FILE"
sed -i '' 's/version: 1.0.0/version: 2.0.0/' "$SKILL_FILE"

# 添加 Agent 工具
sed -i '' '/allowed-tools:/a\
  - Agent
' "$SKILL_FILE"

echo "✅ 创建成功！"
echo ""
echo "下一步："
echo "1. 编辑 $SKILL_FILE"
echo "2. 参考 skills/templates/subagent-skill-template.md"
echo "3. 选择合适的模板重构执行流程"
```

---

## 📊 性能基准测试

### Token 使用测量

在 skill 执行前后记录：

```markdown
**执行前 token**: {记录当前 token}
**执行后 token**: {记录执行后 token}
**使用 token**: {差值}
```

### 执行时间测量

```markdown
**开始时间**: {记录开始时间}
**结束时间**: {记录结束时间}
**总耗时**: {差值}
```

### 对比表格

| Skill | v1 Token | v2 Token | 节省 | v1 时间 | v2 时间 | 提升 |
|-------|----------|----------|------|---------|---------|------|
| pm-market | 1810 | 230 | 87% | 3-5min | 1-2min | 2.5x |
| pm-docs | 7810 | 510 | 93% | 10-15min | 3-5min | 3x |
| pm-aarrr | 2910 | 710 | 76% | 8-12min | 2-3min | 4x |

---

## 💡 常见问题

### Q1: 什么时候不适合使用 subagent？

A: 以下情况不适合：
- 简单快速任务（< 30秒）
- 用户交互密集（多次 AskUserQuestion）
- 前后强依赖（必须串行执行）
- 决策逻辑复杂（需要实时判断）

### Q2: Subagent 会增加成本吗？

A: 不会。虽然 subagent 也消耗 token，但：
- 主 agent token 大幅减少（70-90%）
- Subagent 可以并行执行，节省时间
- 总 token 通常减少 20-40%

### Q3: 如何调试 subagent？

A:
1. 检查 subagent 返回的 status
2. 查看 errors 字段
3. 验证输出格式是否符合要求
4. 必要时重试或手动补充

### Q4: 可以嵌套使用 subagent 吗？

A: 不建议。Subagent 中再派发 subagent 会增加复杂度和不确定性。保持扁平结构。

---

## 📚 学习资源

### 已优化示例

- `skills/01-demand-insight/pm-market-v2/SKILL.md` - 搜索并行化
- `skills/02-solution-design/pm-docs-v2/SKILL.md` - 文档生成并行化
- `skills/03-growth-iteration/pm-aarrr-v2/SKILL.md` - 数据分析并行化

### 模板文档

- `skills/templates/subagent-skill-template.md` - 完整模板手册

---

## 版本说明

**v1.0.0** - 2026-03-26
- 5 步快速应用流程
- 自动化工具脚本
- 性能基准测试方法
- 常见问题解答