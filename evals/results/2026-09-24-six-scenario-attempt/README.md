# 六场景对照：2026-09-24 中止记录

**结果：0/6 个场景完成可评分双组运行；不宣称 PASS。** 执行者与记录审阅者都是当前 Agent，不是独立人工审阅。

## 环境与步骤

- Codex CLI `0.154.0-alpha.6.1`；新会话、测试根目录分别隔离，`HOME` 指向临时空目录，`CODEX_HOME` 指向私有临时目录，`--disable plugins --enable skip_host_skill_discovery --ephemeral --skip-git-repo-check`。目标运行使用 `workspace-write`，不是强制只读。
- 隔离探针：控制组的自动技能清单不含 `pm-brainstorm`（`control-isolation-*`）；测试目录以 `.agents/skills/pm-brainstorm` 指向当前仓库技能时，技能组可见它（`skill-isolation-*`）。探针不是六场景的行为评分。
- 固定私有测试配置后，短烟测完成（`frozen-config-smoke-*`），但正式首场 `new-idea-specific` 控制组在 120 秒仍停在 `turn.started`，没有最终回答或文件变化。`new-idea-control-*` 保存了第二次尝试的原始 JSONL、输入、退出状态、标准错误与运行前后文件清单（均为空）。此前第一次控制组也在 120 秒超时；其原始日志在重新尝试时被覆盖，故不作为可追溯证据。
- 由于首组未完成，根据预设停止条件没有运行技能组及剩余五场。没有把请求超时、路由猜测或静态测试写成行为通过。

## 结论与后续

| 场景 | 控制组 | 技能组 | 结论 |
|---|---|---|---|
| new-idea-specific | 超时，无 Agent 最终响应 | 未运行 | NOT RUN |
| explicit-brainstorm-optout | 未运行 | 未运行 | NOT RUN |
| discussion-only | 未运行 | 未运行 | NOT RUN |
| workflow-entry-only | 未运行 | 未运行 | NOT RUN |
| rice-without-data | 未运行 | 未运行 | NOT RUN |
| evidence-audit-unsupported-claims | 未运行 | 未运行 | NOT RUN |

后续先排查长任务在该模型供应端的超时，再以固定配置、相同模型、全新会话重跑双组。不能使用当前用户级技能目录作为无技能基线，也不能把当前 Agent 自评写为独立审阅。全部场景都是文本交互且没有生成 UI/图片，截图验收不适用；文件变化由清单核验。
