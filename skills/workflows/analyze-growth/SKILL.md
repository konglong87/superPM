---
name: analyze-growth
description: |
  Growth analysis workflow — chain AARRR analysis, data reporting, growth strategy, and iteration planning
  Use when: Analyzing growth metrics, planning growth initiatives, or optimizing product performance
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

本工作流入口 **analyze-growth** 只负责编排；单独安装它**不会**自动安装所调用的技能。
必需技能：`pm-aarrr`、`pm-report`、`pm-growth`、`pm-iteration`。

先用当前平台的技能列表检查必需技能是否可用。**若缺少依赖，停止工作流**，不要假装已执行；告知用户缺少的技能并给出安装方式。不要擅自安装或跳过。
完整安装命令（只装本入口并不够）：

```bash
npx skills add https://github.com/konglong87/superPM --skill analyze-growth pm-aarrr pm-report pm-growth pm-iteration
```

没有 Node.js/npm 时，可按仓库 README 手动安装完整技能包；安装后重新检查技能列表，再继续流程。
<!-- workflow-deps:end -->

Reuse relevant existing artifacts, confirm before creating/overwriting, label evidence with source/date and separate assumptions from facts. In a full-pack install, see `skills/_shared/workflow-contract.md` for details.

## Overview

This command chains 4 skills into a complete growth analysis workflow:
1. **pm-aarrr** — AARRR funnel analysis
2. **pm-report** — Data report & user feedback
3. **pm-growth** — Growth strategy & execution plan
4. **pm-iteration** — Iteration planning

Each step pauses for user confirmation before proceeding.

## Execution Flow

### Step 1: AARRR Analysis

> 📈 Starting Step 1/4: AARRR Analysis
> This will analyze your growth funnel across Acquisition, Activation, Retention, Revenue, and Referral.

执行 /pm-aarrr

完成后，使用 AskUserQuestion 确认。

### Step 2: Data Report

> 📈 Starting Step 2/4: Data Report
> This will generate a comprehensive data report with user feedback analysis.

执行 /pm-report

完成后，使用 AskUserQuestion 确认。

### Step 3: Growth Strategy

> 📈 Starting Step 3/4: Growth Strategy
> This will develop a growth execution plan based on data insights.

执行 /pm-growth

完成后，使用 AskUserQuestion 确认。

### Step 4: Iteration Planning

> 📈 Starting Step 4/4: Iteration Planning
> This will create an iteration plan with prioritized growth initiatives.

执行 /pm-iteration

### Completion

> ✅ Growth analysis complete!
>
> Generated documents:
> - docs/03-增长迭代/AARRR增长分析.md
> - docs/03-增长迭代/数据报告与用户反馈.md
> - docs/03-增长迭代/增长执行方案.md
> - docs/03-增长迭代/迭代计划.md
>
> Recommended next steps:
> 1. /pm-roadmap — Update the product roadmap
> 2. /pm-abtest — Design A/B tests for growth experiments
