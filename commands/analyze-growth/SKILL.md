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
