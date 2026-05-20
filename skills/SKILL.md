---
name: super-pm
version: 2.1.0
description: |
  Product Manager Skills Pack - Full lifecycle support from demand to delivery
  让一个产品经理拥有一个产品团队的能力
  Use when: Starting a new product, planning features, analyzing market, designing solutions, managing growth, strategic decision
allowed-tools:
  - Read
  - Write
  - Edit
  - AskUserQuestion
  - Bash
  - WebSearch
---

## Preamble (run first)

```bash
bash "$(dirname "${BASH_SOURCE[0]}")"/check-update.sh 2>/dev/null || true
# 创建文档目录（中英文双语支持）
mkdir -p docs/01-需求洞察 docs/01-demand-insight
mkdir -p docs/02-方案设计 docs/02-solution-design
mkdir -p docs/03-增长迭代 docs/03-growth-iteration
mkdir -p docs/04-风控管理 docs/04-risk-management
mkdir -p docs/05-产品战略 docs/05-product-strategy

# 检测当前进度
echo "📊 当前项目进度："
echo ""

for prefix in "01-需求洞察" "02-方案设计" "03-增长迭代" "04-风控管理" "05-产品战略"; do
  count=$(ls docs/$prefix/*.md 2>/dev/null | wc -l | tr -d ' ')
  echo "  $prefix: $count 个文档"
done

echo ""
echo "💡 查看全部技能: /start-super-pm 或查看 INDEX.md"
echo "🎯 开始新项目: 告诉我 '我要做一个XX产品'"
```

---

## 强制入口逻辑

当检测到以下关键词时，主动引导用户开始流程：

**产品类**: 产品、功能、特性、模块、新产品、商业模式
**需求类**: 需求、痛点、用户需要、需求池
**用户类**: 用户、目标用户、用户画像、用户体验、用户反馈
**市场类**: 市场、竞品、行业、市场规模
**场景类**: 从0到1、从零开始、新项目、MVP
**战略类**: 多产品线、产品组合、资源分配、战略决策

### 触发后响应

#### 场景1：新产品规划

使用 AskUserQuestion 提供选项：

> 🎯 检测到您在规划新产品！
>
> 建议从需求调研开始，系统地梳理产品方向。
>
> A) 开始需求调研（推荐）- 执行 /pm-demand
> B) 先进行头脑风暴 - 执行 /pm-brainstorm
> C) 不需要，我有其他问题

#### 场景2：多产品线管理

> 🎯 检测到您在管理多个产品！
>
> A) 开始产品组合分析（推荐）- 执行 /pm-portfolio
> B) 资源分配决策 - 执行 /pm-resource
> C) 不需要，我有其他问题

---

## 流程推荐引擎

### 基于当前状态推荐

**需求洞察阶段**：
- 需求调研未完成 → 推荐 `/pm-demand`
- 需求完成但无市场分析 → 推荐 `/pm-market`
- 有市场数据但无优先级 → 推荐 `/pm-priority`
- 有优先级但无MVP → 推荐 `/pm-mvp`

**方案设计阶段**：
- MVP完成但无PRD → 推荐 `/pm-docs`
- PRD完成但无技术方案 → 推荐 `/pm-tech`
- 技术方案完成但无数据指标 → 推荐 `/pm-data`

**增长迭代阶段**：
- 产品上线 → 推荐 `/pm-aarrr`
- 增长分析完成 → 推荐 `/pm-growth`
- 有数据报告 → 推荐 `/pm-iteration`

**风控管理阶段**：
- 技术方案完成 → 推荐 `/pm-risk`
- 风险管控完成 → 推荐 `/pm-release`

### 多选项推荐

每个skill完成后，提供2-3个下一步选项。

---

## 使用示例

### 示例1: 新产品从0到1

```
用户: 我要做一个生鲜电商产品

AI: 🎯 检测到您在规划新产品！
    是否开始执行 /pm-demand？
```

### 示例2: 跨会话继续

```
用户: 继续

AI: 📊 检测到您的进度：
    ✅ 需求调研
    ✅ 市场分析
    ⏳ 优先级排序

    💡 建议继续 /pm-priority
```

---

## 注意事项

1. **风险前置**：需求调研阶段立即验证痛点
2. **MCP优先**：联网搜索优先使用MCP，WebSearch降级
3. **兜底机制**：文件缺失时提供替代方案
4. **Markdown存储**：所有文档人类可读可编辑
5. **流程推荐**：每个skill完成后推荐2-3个下一步
6. **查看全部技能**：打开 `INDEX.md` 查看完整技能索引

---

**Super-PM - 让一个产品经理拥有一个产品团队的能力**
