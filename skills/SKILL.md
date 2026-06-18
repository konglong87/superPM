---
name: super-pm
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
  - mcp__exa__web_search_exa
  - mcp__exa__web_fetch_exa
---

## Preamble (run first)

```bash
bash "$(dirname "${BASH_SOURCE[0]}")"/check-update.sh 2>/dev/null || true
# 读取技能包版本号
SKILL_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" 2>/dev/null && pwd)" || true
if [ -f "$SKILL_ROOT/VERSION" ]; then echo "📦 super-pm $(cat "$SKILL_ROOT/VERSION")"; fi
# 创建文档目录（中英文双语支持）
mkdir -p docs/01-需求调研 docs/01-demand-insight
mkdir -p docs/02-方案设计 docs/02-solution-design
mkdir -p docs/03-增长迭代 docs/03-growth-iteration
mkdir -p docs/04-风控管理 docs/04-risk-management
mkdir -p docs/05-产品战略 docs/05-product-strategy

# 检测当前进度
echo "📊 当前项目进度："
echo ""

for prefix in "01-需求调研" "02-方案设计" "03-增长迭代" "04-风控管理" "05-产品战略"; do
  count=$(ls docs/$prefix/*.md 2>/dev/null | wc -l | tr -d ' ')
  echo "  $prefix: $count 个文档"
done

echo ""
echo "💡 查看全部技能: /start-super-pm 或查看 INDEX.md"
echo "🎯 新产品: '我想做一个XX' → /pm-brainstorm → /pm-demand → /pm-market → /pm-priority → /pm-mvp → /pm-docs"
echo "📝 写文档: '写需求文档/PRD' → 先检查前置，无则从头开始"
```

---

## ⚠️ 前置门禁

如果用户本轮请求属于新产品从0到1，且没有本轮 brainstorm 交互记录，也没有用户明确说"跳过 brainstorm / 直接需求调研 / 已完成头脑风暴"：

- 立即停止当前 skill
- 进入 /pm-brainstorm
- 不得生成需求调研报告、PRD 或任何产出文档

agent 不得自行根据一句产品描述判断"方向明确"并跳过 /pm-brainstorm。

只有用户明确确认以下任一表达，才允许跳过 /pm-brainstorm：
- "跳过 brainstorm"
- "直接需求调研"
- "我已经完成头脑风暴"

---

## 跨 Agent 交互规则

当流程要求与用户交互时：

1. 如果当前环境支持 AskUserQuestion，使用 AskUserQuestion（最佳体验）。
2. 如果当前环境不支持 AskUserQuestion，必须用普通聊天消息提出同样问题。
3. 一次只问一个问题。
4. 提问后必须停止当前回合，等待用户回答。
5. 不得在用户回答前生成文档、调用 /pm-demand、调用 /pm-docs、写入 docs。
6. 已有 docs 文件不能替代本轮用户回答。

---

## 强制入口逻辑

当检测到以下关键词时，主动引导用户开始流程：

**产品类**: 产品、功能、特性、模块、新产品、商业模式、社区、app、小程序、平台、网站、工具、SaaS
**需求类**: 需求、痛点、用户需要、需求池、需求文档、梳理需求、收集需求、验证需求
**用户类**: 用户、目标用户、用户画像、用户体验、用户反馈、消费者、客户
**市场类**: 市场、竞品、行业、市场规模、赛道、趋势
**场景类**: 从0到1、从零开始、新项目、MVP、我想做一个、帮我规划、帮我设计、讨论产品、写需求文档、写PRD、写BRD、写产品文档
**动效类**: 动效、动画、品牌动画、logo动画、动效设计、品牌动效、开场动画、splash、loading动画、hover动效、微交互、动效方向、动效demo
**战略类**: 多产品线、产品组合、资源分配、战略决策

### 触发后响应

#### 场景1：新产品规划（想法模糊，需要发散）

**识别信号**：提到具体产品形态但需求不明确。例如"我想做一个XX"、"帮我规划XX产品"、"讨论产品方向"、"XX社区/app/小程序"。

使用 AskUserQuestion 提供选项：

> 🎯 检测到您在规划新产品：「{用户描述的产品}」
>
> 产品方向还不明确，建议先通过头脑风暴发散思维，明确用户群和核心痛点。
>
> A) 开始头脑风暴（推荐）- 执行 /pm-brainstorm
> B) 直接进入需求调研（仅当您已完成头脑风暴或明确要求跳过时）- 执行 /pm-demand
> C) 不需要，我有其他问题

#### 场景2：方向明确，需要调研验证

**识别信号**：用户表达了清晰的需求方向或具体的验证意图。例如"验证一下这个需求"、"调研XX用户的痛点"、"分析一下目标用户"。

使用 AskUserQuestion 提供选项：

> 🎯 检测到您需要进行需求调研！
>
> A) 开始需求调研（推荐）- 执行 /pm-demand
> B) 先进行市场分析 - 执行 /pm-market
> C) 不需要，我有其他问题

#### 场景3：要写文档（检查前置条件）

**识别信号**：用户要"写XX文档"但尚未完成前置调研。例如"写个需求文档"、"写PRD"、"写产品文档"、"写BRD"。

⚠️ **重要规则**："写文档"是产出意图，不是流程起点。必须先检查前置文档是否存在：

- 写需求文档/PRD → 前置：需求调研报告、头脑风暴方案
- 写BRD → 前置：需求调研报告、市场分析报告

> 🎯 检测到您要写「{文档类型}」，但需要先完成前置调研：
>
> 📊 当前进度：
> {列出已有/缺失的前置文档}
>
> A) 从头开始 - 执行 /pm-brainstorm → /pm-demand → 最后产出文档
> B) 已有完整调研，直接写文档 - 执行 /pm-docs
> C) 不需要，我有其他问题

#### 场景4：多产品线管理

> 🎯 检测到您在管理多个产品！
>
> A) 开始产品组合分析（推荐）- 执行 /pm-portfolio
> B) 资源分配决策 - 执行 /pm-resource
> C) 不需要，我有其他问题

#### 场景5：品牌动效需求

**识别信号**：用户提到动效、动画、logo动画、品牌动效、开场动画、splash、loading动画、hover动效等。

> 🎯 检测到您需要品牌动效设计！
>
> A) 开始品牌动效方案（推荐）- 执行 /pm-brand-motion
> B) 先完成产品定位 - 执行 /pm-position
> C) 不需要，我有其他问题

---

## 流程推荐引擎

### 黄金路径（80% 用户走这条线）

**新产品从零到一**: `/pm-brainstorm` → `/pm-demand` → `/pm-market` → `/pm-priority` → `/pm-mvp` → `/pm-docs` → `/pm-tech` → `/pm-release`

> 只有用户明确确认"跳过 brainstorm / 直接需求调研 / 已完成头脑风暴"时，才允许跳过 /pm-brainstorm。agent 不得自行根据一句产品描述判断方向明确。

**已有产品优化增长**: `/pm-aarrr` → `/pm-growth` → `/pm-report` → `/pm-iteration`

**战略决策（独立使用）**: `/pm-business-model` → `/pm-decision` → `/pm-portfolio` → `/pm-resource`

### 基于当前状态推荐

**需求洞察阶段**：
- 需求调研未完成 → 推荐 `/pm-demand`
- 需求完成但无市场分析 → 推荐 `/pm-market`
- 有市场数据但无优先级 → 推荐 `/pm-priority`
- 有优先级但无MVP → 推荐 `/pm-mvp`

**方案设计阶段**：
- MVP完成但无PRD → 推荐 `/pm-docs`
- PRD完成但无原型 → 推荐 `/pm-proto`
- 原型完成但无品牌动效 → 推荐 `/pm-brand-motion`
- 品牌动效完成但无技术方案 → 推荐 `/pm-tech`
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
    建议先从头脑风暴开始，明确目标用户和核心痛点。
    是否开始执行 /pm-brainstorm？
```

### 示例2: 用户想写文档但无前置调研

```
用户: 写个需求文档，关于某个垂直社区产品

AI: 🎯 检测到您要写需求文档，但当前缺少前置调研。
    
    📊 前置依赖检查：
    ❌ 头脑风暴方案
    ❌ 需求调研报告
    
    💡 建议从头走完整流程：
    1. /pm-brainstorm - 明确产品定位和核心场景
    2. /pm-demand - 系统化调研验证需求
    3. /pm-docs - 基于调研产出需求文档
    
    是否从 /pm-brainstorm 开始？
```

### 示例3: 跨会话继续

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
2. **搜索依赖说明**（技能包自身不内置搜索工具，依赖外部 skill/MCP 增强）：
   - **AnySearch**（独立 skill，非内置工具）— 中文搜索质量最优，支持17个垂直域（金融、法律、学术等）。
     安装：`git clone https://github.com/konglong87/anysearch.git ~/.claude/skills/anysearch`
     未安装时自动降级，不影响流程执行。
   - **Exa MCP**（MCP server）— 英文/语义搜索增强。
     需在项目 `.claude/settings.json` 中配置 `mcpServers`。未配置时降级到 WebSearch。
   - **WebSearch**（Claude Code 内置工具）— 始终可用，兜底搜索。
   - **优先级**：AnySearch → Exa MCP → WebSearch，不得跳级。使用 WebSearch 时标注「⚠️ 降级模式」
3. **兜底机制**：文件缺失时提供替代方案
4. **Markdown存储**：所有文档人类可读可编辑
5. **流程推荐**：每个skill完成后推荐2-3个下一步
6. **查看全部技能**：打开 `INDEX.md` 查看完整技能索引
7. **前置检查**：用户要"写XX文档"时，先检查前置依赖（需求调研、头脑风暴等）是否存在，缺失则引导从头走流程

---

**Super-PM - 让一个产品经理拥有一个产品团队的能力**

---

## 常见误区 / Red Flags — STOP

出现以下情况立即停止并回溯：

| 误区 | 正确做法 |
|------|---------|
| 使用"应该"、"大概"、"看起来"做结论 | 必须基于实际数据和验证 |
| 未运行检查就声称已完成 | 先验证，再陈述 |
| 因时间紧迫跳过关键步骤 | 没有例外，时间紧更要严格 |

---

## 产出质量检查 / Verification Checklist

- [ ] 流程推荐引擎已触发
- [ ] 已根据当前项目状态推荐对应 skill
- [ ] 用户已了解下一步可选路径
- [ ] 检查更新已完成

> ⚠️ 确保用户获得明确的下步建议。
