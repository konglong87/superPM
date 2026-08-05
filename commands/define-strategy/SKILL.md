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
