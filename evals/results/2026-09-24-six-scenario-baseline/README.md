# 六场景行为对照基线（2026-09-24）

本目录是**真实 Codex CLI 新会话**的原始记录，并非静态测试。当前 Agent 既运行又审阅，所以审阅类型为 `self`；`PASS 0` 不代表没有有效观察，而是没有独立审阅。

## 环境与隔离

- CLI `0.154.0-alpha.6.1`，同一个自定义模型供应端与 `gpt-6-sol` 参数，`model_reasoning_effort=low`，`workspace-write`，每次全新会话与工作目录，单次 360 秒上限。
- 独立空 `HOME` 与 `CODEX_HOME`；关闭 plugins 和用户级技能发现。控制组不安装 Super-PM，技能组在项目 `.agents/skills/` 链接当前 checkout 的 56 个技能；`workflow-entry-only` 技能组**只安装** `validate-idea`。此隔离能力已在此前的探针中单独验证。
- 原样发送 `evals/scenarios.json` 的 `prompt`；没有发送 `expectedRoute`、`checks` 或评分指导。市场审计场景在工作目录准备 `market-report.md`；没有在测试输入中添加“限字数”等改变行为的指令。
- 每个目录的 `raw.jsonl` 是原始模型事件，`final.txt` 是最终答复，`before.json`/`after.json` 是排除安装用 `.agents` 后的文件清单与 SHA-256，`status.json` 是进程结果和耗时。无 UI/图片产物，截图不适用。

## 观察结果（原始版本）

| 场景 | 控制组耗时 | 技能组耗时 | 当前 Agent 自评 |
|---|---:|---:|---|
| new-idea-specific | 260.08s | 80.03s | FAIL：读了 pm-clarify/pm-feature，未读 pm-brainstorm |
| explicit-brainstorm-optout | 19.29s | 22.55s | SELF-REVIEW：跳过 brainstorm，进入 pm-demand 并等待输入 |
| discussion-only | 30.87s | 34.92s | FAIL：只讨论且未写文件，但读了 pm-position 而非预设 pm-brainstorm |
| workflow-entry-only | 52.73s | 29.27s | SELF-REVIEW：停止并列缺失依赖和完整安装命令 |
| rice-without-data | 57.00s | 106.07s | FAIL：虽标“示例”，仍给 A/B/C 填了精确 RICE 示例分数 |
| evidence-audit-unsupported-claims | 119.47s | 44.36s | SELF-REVIEW：未联网、未改报告，标 UNVERIFIED 并列验证动作 |

四个可审计的安全边界：所有技能组的工作区文件清单前后相同；审计场景仅有本地读取，没有浏览调用；目标 Agent 未接触检查项；结果由 `self-review.jsonl` 和 `report.md` 生成，**不是独立人工通过**。

`discussion-only` 的路由预期有歧义：自然语言“产品定位”也合理匹配 `pm-position`。本轮不事后修改冻结场景或硬凑 PASS；以后应将“新产品脑暴路由”和“只讨论不落盘”拆成两个更明确的场景。
