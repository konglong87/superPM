---
name: plan-launch
description: |
  Launch planning workflow — chain release planning, risk assessment, cross-team coordination, and agile management
  Use when: Preparing for a product launch, release, or go-live
allowed-tools:
  - Skill
  - AskUserQuestion
  - Read
  - Write
  - WebSearch
  - Bash
---

## Overview

This command chains 4 skills into a complete launch planning workflow:
1. **pm-release** — Release execution plan
2. **pm-risk** — Risk identification & mitigation
3. **pm-cross** — Cross-team coordination
4. **pm-agile** — Agile management & sprint planning

Each step pauses for user confirmation before proceeding.

## Execution Flow

### Step 1: Release Planning

> 🚀 Starting Step 1/4: Release Planning
> This will create a detailed launch execution plan.

执行 /pm-release

完成后，使用 AskUserQuestion 确认。

### Step 2: Risk Assessment

> 🚀 Starting Step 2/4: Risk Assessment
> This will identify risks, define mitigations, and set contingency plans.

执行 /pm-risk

完成后，使用 AskUserQuestion 确认。

### Step 3: Cross-team Coordination

> 🚀 Starting Step 3/4: Cross-team Coordination
> This will align stakeholders, define communication channels, and set ownership.

执行 /pm-cross

完成后，使用 AskUserQuestion 确认。

### Step 4: Agile Management

> 🚀 Starting Step 4/4: Agile Management
> This will set up sprint planning, task tracking, and delivery milestones.

执行 /pm-agile

### Completion

> ✅ Launch plan complete!
>
> Generated documents:
> - docs/04-风控管理/上线执行方案.md
> - docs/04-风控管理/风险管控方案.md
> - docs/04-风控管理/跨部门协作方案.md
> - docs/04-风控管理/敏捷管理方案.md
>
> Recommended next steps:
> 1. /pm-change — Set up change management for post-launch
> 2. /analyze-growth — Start growth analysis post-launch
