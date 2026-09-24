---
name: write-prd
description: |
  PRD writing workflow — chain demand validation, clarification, prioritization, MVP scoping, and document generation
  Use when: Writing a PRD, BRD, or MRD, or need to produce product requirement documents
allowed-tools:
  - Skill
  - AskUserQuestion
  - Read
  - Write
  - WebSearch
  - Bash
---

## Workflow contract

When the full pack is installed, also consult `skills/_shared/workflow-contract.md`; standalone installation follows the complete steps below. For a new product idea, first run `/pm-brainstorm` unless relevant work already exists or the user explicitly opted out. Inspect existing outputs for relevance and ask which stages to reuse; do not skip a missing prerequisite merely because `docs/` exists. Pause between stages that create or overwrite documents; use ordinary chat if AskUserQuestion is unavailable.

## Execution flow

1. **Demand validation** — 执行 /pm-demand。确认用户痛点与证据。
2. **Requirement clarification** — 执行 /pm-clarify。确认边界条件和验收标准。
3. **Prioritization** — 执行 /pm-priority。对已确认需求排序并记录取舍依据。
4. **MVP scoping** — 执行 /pm-mvp。仅纳入已排序的必要范围。
5. **Document generation** — 执行 /pm-docs。使功能和验收标准可追溯到需求、优先级与 MVP。

完成时仅列实际生成的文件；建议运行 `/pm-prd-review` 验证文档质量。
