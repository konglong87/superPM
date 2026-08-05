---
name: write-prd
description: |
  PRD writing workflow — chain demand validation, clarification, MVP scoping, and document generation
  Use when: Writing a PRD, BRD, or MRD, or need to produce product requirement documents
allowed-tools:
  - Skill
  - AskUserQuestion
  - Read
  - Write
  - WebSearch
  - Bash
---

## Overview

This command chains 4 skills into a complete PRD writing workflow:
1. **pm-demand** — Demand validation & pain point analysis
2. **pm-clarify** — Requirement clarification & detail refinement
3. **pm-mvp** — MVP scope definition
4. **pm-docs** — Document generation (PRD/BRD/MRD)

Each step pauses for user confirmation before proceeding.

## Execution Flow

### Pre-check: Existing Documents

Check if prior discovery documents exist in docs/01-需求调研/.
If yes, ask user if they want to skip Steps 1-3 and go directly to Step 4.

### Step 1: Demand Validation

> 📝 Starting Step 1/4: Demand Validation
> This will validate the core user needs and pain points.

执行 /pm-demand

完成后，使用 AskUserQuestion 确认。

### Step 2: Requirement Clarification

> 📝 Starting Step 2/4: Requirement Clarification
> This will clarify requirements, define acceptance criteria, and identify edge cases.

执行 /pm-clarify

完成后，使用 AskUserQuestion 确认。

### Step 3: MVP Scoping

> 📝 Starting Step 3/4: MVP Scoping
> This will define the Minimum Viable Product scope.

执行 /pm-mvp

完成后，使用 AskUserQuestion 确认。

### Step 4: Document Generation

> 📝 Starting Step 4/4: Document Generation
> This will generate the PRD/BRD/MRD document.

执行 /pm-docs

### Completion

> ✅ PRD writing complete!
>
> Generated documents:
> - docs/01-需求调研/需求调研报告.md
> - docs/01-需求调研/确认需求清单.md
> - docs/01-需求调研/MVP方案.md
> - docs/02-方案设计/PRD产品需求文档.md
>
> Recommended next steps:
> 1. /pm-proto — Start prototyping
> 2. /pm-prd-review — Review the PRD
> 3. /plan-launch — Plan the launch
