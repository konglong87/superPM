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

<!-- workflow-deps:start -->
## 安装依赖预检（执行工作流之前）

本工作流入口 **plan-launch** 只负责编排；单独安装它**不会**自动安装所调用的技能。
必需技能：`pm-risk`、`pm-cross`、`pm-agile`、`pm-release`。

先用当前平台的技能列表检查必需技能是否可用。**若缺少依赖，停止工作流**，不要假装已执行；告知用户缺少的技能并给出安装方式。不要擅自安装或跳过。
完整安装命令（只装本入口并不够）：

```bash
npx skills add https://github.com/konglong87/superPM --skill plan-launch pm-risk pm-cross pm-agile pm-release
```

没有 Node.js/npm 时，可按仓库 README 手动安装完整技能包；安装后重新检查技能列表，再继续流程。
<!-- workflow-deps:end -->

## Workflow contract

When the full pack is installed, also consult `skills/_shared/workflow-contract.md`; standalone installation follows the complete steps below. Reuse relevant existing artifacts after confirmation. Pause before each next stage; if AskUserQuestion is unavailable, ask in ordinary chat and wait. Do not claim a release is safe merely because a plan document exists.

## Execution flow

1. **Risk assessment** — 执行 /pm-risk。识别风险、缓解措施与回滚触发条件。
2. **Cross-team coordination** — 执行 /pm-cross。明确责任人、依赖与升级路径。
3. **Agile delivery** — 执行 /pm-agile。明确剩余交付工作及检查点。
4. **Release planning** — 执行 /pm-release。基于风险、责任人与交付状态制定上线和回滚方案。

完成时仅列实际创建的文件；正式上线仍需真实验收与决策人批准。
