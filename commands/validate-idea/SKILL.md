---
name: validate-idea
description: |
  Idea validation workflow — chain demand validation, brainstorming, market research, and MVP scoping
  Use when: Validating a new product idea, testing assumptions, or exploring viability
allowed-tools:
  - Skill
  - AskUserQuestion
  - Read
  - Write
  - WebSearch
  - Bash
---

## Overview

This command chains 4 skills into a complete idea validation workflow:
1. **pm-demand** — Demand validation & pain point analysis
2. **pm-brainstorm** — Brainstorming & creative exploration
3. **pm-market** — Market research & sizing
4. **pm-mvp** — MVP scope definition

Each step pauses for user confirmation before proceeding.

## Execution Flow

### Step 1: Demand Validation

> 💡 Starting Step 1/4: Demand Validation
> This will validate whether there is real demand for your idea.

执行 /pm-demand

完成后，使用 AskUserQuestion 确认。

### Step 2: Brainstorming

> 💡 Starting Step 2/4: Brainstorming
> This will explore creative approaches, alternative solutions, and feature ideas.

执行 /pm-brainstorm

完成后，使用 AskUserQuestion 确认。

### Step 3: Market Research

> 💡 Starting Step 3/4: Market Research
> This will analyze market size, competition, and opportunity.

执行 /pm-market

完成后，使用 AskUserQuestion 确认。

### Step 4: MVP Scoping

> 💡 Starting Step 4/4: MVP Scoping
> This will define the minimum viable product scope.

执行 /pm-mvp

### Completion

> ✅ Idea validation complete!
>
> Generated documents:
> - docs/01-需求调研/需求调研报告.md
> - docs/01-需求调研/创意方案库.md
> - docs/01-需求调研/市场调研报告.md
> - docs/01-需求调研/MVP方案.md
>
> Recommended next steps:
> 1. /write-prd — Write PRD based on validated idea
> 2. /pm-priority — Prioritize features
