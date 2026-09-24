---
name: plan-launch
description: |
  Launch planning workflow — chain risk assessment, cross-team coordination, agile delivery, and release planning
  Use when: Preparing for a product launch, release, or go-live
allowed-tools:
  - Skill
  - AskUserQuestion
  - Read
  - Write
  - WebSearch
  - Bash
---

## Workflow contract

When the full pack is installed, also consult `skills/_shared/workflow-contract.md`; standalone installation follows the complete steps below. Reuse relevant existing artifacts after confirmation. Pause before each next stage; if AskUserQuestion is unavailable, ask in ordinary chat and wait. Do not claim a release is safe merely because a plan document exists.

## Execution flow

1. **Risk assessment** — 执行 /pm-risk。识别风险、缓解措施与回滚触发条件。
2. **Cross-team coordination** — 执行 /pm-cross。明确责任人、依赖与升级路径。
3. **Agile delivery** — 执行 /pm-agile。明确剩余交付工作及检查点。
4. **Release planning** — 执行 /pm-release。基于风险、责任人与交付状态制定上线和回滚方案。

完成时仅列实际创建的文件；正式上线仍需真实验收与决策人批准。
