---
name: validate-idea
description: |
  Idea validation workflow — chain demand validation, market research, prioritization, and MVP scoping
  Use when: Validating a new product idea, testing assumptions, or exploring viability
allowed-tools:
  - Skill
  - AskUserQuestion
  - Read
  - Write
  - WebSearch
  - Bash
---

## Workflow contract

When the full pack is installed, also consult `skills/_shared/workflow-contract.md`; standalone installation follows the complete steps below. For a new idea, first run `/pm-brainstorm` unless a relevant artifact exists or the user explicitly opted out. Then follow the four steps below. A skipped or existing artifact is not reported as newly generated. Pause between steps for confirmation; in environments without AskUserQuestion, ask in chat and wait.

## Execution flow

1. **Demand validation** — 执行 /pm-demand。确认真实用户痛点与证据，完成后征求继续/跳过/停止的选择。
2. **Market research** — 执行 /pm-market。检查市场与竞争证据，完成后征求继续/跳过/停止的选择。
3. **Prioritization** — 执行 /pm-priority。明确需求取舍及依据，完成后征求继续/跳过/停止的选择。
4. **MVP scoping** — 执行 /pm-mvp。以优先级结果定义最小范围，并标注未验证假设。

完成时只列实际创建或复用的文档，并建议下一步 `/write-prd`。
