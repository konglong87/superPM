---
name: discover
description: |
  Product discovery workflow — chain market analysis, competitor research, demand validation, and prioritization
  Use when: Exploring a new product idea, entering a new market, or validating an opportunity
allowed-tools:
  - Skill
  - AskUserQuestion
  - Read
  - Write
  - WebSearch
  - Bash
---

<!-- workflow-deps:start -->
## 安装依赖预检（执行工作流之前）

本工作流入口 **discover** 只负责编排；单独安装它**不会**自动安装所调用的技能。
必需技能：`pm-market`、`pm-competitor`、`pm-demand`、`pm-priority`。
新产品额外需要 `pm-brainstorm`；仅在已有相关头脑风暴产物或用户明确跳过时可不调用它。

先用当前平台的技能列表检查必需技能是否可用。**若缺少依赖，停止工作流**，不要假装已执行；告知用户缺少的技能并给出安装方式。不要擅自安装或跳过。
完整安装命令（只装本入口并不够）：

```bash
npx skills add https://github.com/konglong87/superPM --skill discover pm-market pm-competitor pm-demand pm-priority pm-brainstorm
```

没有 Node.js/npm 时，可按仓库 README 手动安装完整技能包；安装后重新检查技能列表，再继续流程。
<!-- workflow-deps:end -->

## Workflow contract

When the full pack is installed, also consult `skills/_shared/workflow-contract.md`; standalone installation follows the complete steps below. For a new product idea, run `/pm-brainstorm` before this chain unless a relevant artifact exists or the user explicitly opted out. This optional pre-step satisfies `/pm-demand`'s gate later in the chain. Existing-product discovery need not brainstorm. Reuse relevant artifacts after confirmation; report only outputs actually created.

## Overview

This command chains 4 skills into a complete product discovery workflow:
1. **pm-market** — Market landscape & sizing
2. **pm-competitor** — Competitive analysis
3. **pm-demand** — Demand validation & pain point analysis
4. **pm-priority** — Prioritization & opportunity ranking

Each step pauses for user confirmation before proceeding.

## Execution Flow

### Step 1: Market Analysis

Run the market analysis skill to understand the market landscape.

> 📊 Starting Step 1/4: Market Analysis
> This will analyze the market size, trends, and landscape for your product idea.

执行 /pm-market

完成后，使用 AskUserQuestion 确认：

> ✅ Step 1 complete. Proceed to Step 2: Competitive Analysis?
> A) Yes, continue
> B) Skip competitive analysis
> C) Stop

### Step 2: Competitive Analysis

> 📊 Starting Step 2/4: Competitive Analysis
> This will analyze competitors, their positioning, and gaps in the market.

执行 /pm-competitor

完成后，使用 AskUserQuestion 确认：

> ✅ Step 2 complete. Proceed to Step 3: Demand Validation?
> A) Yes, continue
> B) Skip demand validation
> C) Stop

### Step 3: Demand Validation

> 📊 Starting Step 3/4: Demand Validation
> This will validate user pain points, needs, and willingness to pay.

执行 /pm-demand

完成后，使用 AskUserQuestion 确认：

> ✅ Step 3 complete. Proceed to Step 4: Prioritization?
> A) Yes, continue
> B) Skip prioritization
> C) Stop

### Step 4: Prioritization

> 📊 Starting Step 4/4: Prioritization
> This will rank opportunities and prioritize features.

执行 /pm-priority

### Completion

> ✅ Product discovery complete!
>
> Generated documents:
> - docs/01-需求调研/市场调研报告.md
> - docs/01-需求调研/竞品监控月报.md
> - docs/01-需求调研/需求调研报告.md
> - docs/01-需求调研/优先级排序报告.md
>
> Recommended next steps:
> 1. /write-prd — Write PRD based on discovery findings
> 2. /validate-idea — Validate the idea with a different approach
> 3. /define-strategy — Define product strategy
