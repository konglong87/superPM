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

<!-- workflow-deps:start -->
## 安装依赖预检（执行工作流之前）

本工作流入口 **write-prd** 只负责编排；单独安装它**不会**自动安装所调用的技能。
必需技能：`pm-demand`、`pm-clarify`、`pm-priority`、`pm-mvp`、`pm-docs`。
新产品额外需要 `pm-brainstorm`；仅在已有相关头脑风暴产物或用户明确跳过时可不调用它。

先用当前平台的技能列表检查必需技能是否可用。**若缺少依赖，停止工作流**，不要假装已执行；告知用户缺少的技能并给出安装方式。不要擅自安装或跳过。
完整安装命令（只装本入口并不够）：

```bash
npx skills add https://github.com/konglong87/superPM --skill write-prd pm-demand pm-clarify pm-priority pm-mvp pm-docs pm-brainstorm
```

没有 Node.js/npm 时，可按仓库 README 手动安装完整技能包；安装后重新检查技能列表，再继续流程。
<!-- workflow-deps:end -->

## Workflow contract

When the full pack is installed, also consult `skills/_shared/workflow-contract.md`; standalone installation follows the complete steps below. For a new product idea, first run `/pm-brainstorm` unless relevant work already exists or the user explicitly opted out. Inspect existing outputs for relevance and ask which stages to reuse; do not skip a missing prerequisite merely because `docs/` exists. Pause between stages that create or overwrite documents; use ordinary chat if AskUserQuestion is unavailable.

## Execution flow

1. **Demand validation** — 执行 /pm-demand。确认用户痛点与证据。
2. **Requirement clarification** — 执行 /pm-clarify。确认边界条件和验收标准。
3. **Prioritization** — 执行 /pm-priority。对已确认需求排序并记录取舍依据。
4. **MVP scoping** — 执行 /pm-mvp。仅纳入已排序的必要范围。
5. **Document generation** — 执行 /pm-docs。使功能和验收标准可追溯到需求、优先级与 MVP。

完成时仅列实际生成的文件；建议运行 `/pm-prd-review` 验证文档质量。
