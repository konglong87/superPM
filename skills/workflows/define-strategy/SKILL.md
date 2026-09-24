---
name: define-strategy
description: |
  Product strategy workflow — chain positioning, business model, OKRs, and roadmap
  Use when: Defining product strategy, setting OKRs, planning roadmap, or making strategic decisions
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

本工作流入口 **define-strategy** 只负责编排；单独安装它**不会**自动安装所调用的技能。
必需技能：`pm-position`、`pm-business-model`、`pm-okr`、`pm-roadmap`。

先用当前平台的技能列表检查必需技能是否可用。**若缺少依赖，停止工作流**，不要假装已执行；告知用户缺少的技能并给出安装方式。不要擅自安装或跳过。
完整安装命令（只装本入口并不够）：

```bash
npx skills add https://github.com/konglong87/superPM --skill define-strategy pm-position pm-business-model pm-okr pm-roadmap
```

没有 Node.js/npm 时，可按仓库 README 手动安装完整技能包；安装后重新检查技能列表，再继续流程。
<!-- workflow-deps:end -->

Reuse relevant existing artifacts, confirm before creating/overwriting, label evidence with source/date and separate assumptions from facts. In a full-pack install, see `skills/_shared/workflow-contract.md` for details.

## Overview

This command chains 4 skills into a complete product strategy workflow:
1. **pm-position** — Product positioning & differentiation
2. **pm-business-model** — Business model canvas
3. **pm-okr** — OKR goal setting & alignment
4. **pm-roadmap** — Product roadmap planning

Each step pauses for user confirmation before proceeding.

## Execution Flow

### Step 1: Product Positioning

> 🎯 Starting Step 1/4: Product Positioning
> This will define your product's positioning, differentiation, and target market.

执行 /pm-position

完成后，使用 AskUserQuestion 确认。

### Step 2: Business Model

> 🎯 Starting Step 2/4: Business Model
> This will design your business model canvas and revenue strategy.

执行 /pm-business-model

完成后，使用 AskUserQuestion 确认。

### Step 3: OKR Setting

> 🎯 Starting Step 3/4: OKR Setting
> This will set Objectives and Key Results aligned with your strategy.

执行 /pm-okr

完成后，使用 AskUserQuestion 确认。

### Step 4: Roadmap Planning

> 🎯 Starting Step 4/4: Roadmap Planning
> This will create a strategic product roadmap.

执行 /pm-roadmap

### Completion

> ✅ Strategy definition complete!
>
> Generated documents:
> - docs/02-方案设计/产品定位方案.md
> - docs/05-产品战略/商业模式设计.md
> - docs/03-增长迭代/OKR目标管理.md
> - docs/03-增长迭代/产品路线图.md
>
> Recommended next steps:
> 1. /pm-decision — Make strategic decisions
> 2. /pm-portfolio — Manage product portfolio
