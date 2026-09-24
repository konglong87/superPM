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

<!-- workflow-deps:start -->
## 安装依赖预检（执行工作流之前）

本工作流入口 **validate-idea** 只负责编排；单独安装它**不会**自动安装所调用的技能。
必需技能：`pm-demand`、`pm-market`、`pm-priority`、`pm-mvp`。
新产品额外需要 `pm-brainstorm`；仅在已有相关头脑风暴产物或用户明确跳过时可不调用它。

先用当前平台的技能列表检查必需技能是否可用。**若缺少依赖，停止工作流**，不要假装已执行；告知用户缺少的技能并给出安装方式。不要擅自安装或跳过。
完整安装命令（只装本入口并不够）：

```bash
npx skills add https://github.com/konglong87/superPM --skill validate-idea pm-demand pm-market pm-priority pm-mvp pm-brainstorm
```

没有 Node.js/npm 时，可按仓库 README 手动安装完整技能包；安装后重新检查技能列表，再继续流程。
<!-- workflow-deps:end -->

## Workflow contract

When the full pack is installed, also consult `skills/_shared/workflow-contract.md`; standalone installation follows the complete steps below. For a new idea, first run `/pm-brainstorm` unless a relevant artifact exists or the user explicitly opted out. Then follow the four steps below. A skipped or existing artifact is not reported as newly generated. Pause between steps for confirmation; in environments without AskUserQuestion, ask in chat and wait.

## Execution flow

1. **Demand validation** — 执行 /pm-demand。确认真实用户痛点与证据，完成后征求继续/跳过/停止的选择。
2. **Market research** — 执行 /pm-market。检查市场与竞争证据，完成后征求继续/跳过/停止的选择。
3. **Prioritization** — 执行 /pm-priority。明确需求取舍及依据，完成后征求继续/跳过/停止的选择。
4. **MVP scoping** — 执行 /pm-mvp。以优先级结果定义最小范围，并标注未验证假设。

完成时只列实际创建或复用的文档，并建议下一步 `/write-prd`。
