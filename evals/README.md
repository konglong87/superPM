# Super-PM 行为评测基线

`scenarios.json` 是 20 个真实使用意图的固定场景，覆盖路由、前置依赖、证据、交互和产物交接。它**不是**自动判定模型质量的正则测试；`npm test` 只校验场景与报告工具自身。

## 如何做真实验收

1. 在隔离的测试项目中安装待测版本（完整包或场景指定的部分安装）。每个场景启用新会话，不携带上个场景生成的文档；按 `context` 准备环境，把 `prompt` 原样交给目标 Agent。不要把 `expectedRoute`、`checks` 或 `reviewGuidance` 提前发给被测 Agent。
2. 保存完整用户/Agent 对话及其创建的文件。涉及预览或原型时另存截图。场景结束后清理测试项目和后台进程，不要把样例输出混入真实 `docs/`。
3. 请另一名审阅者根据对话和实际文件逐项判断 `checks`，对每项填写具体可追溯的观察依据。不能用“感觉符合”代替证据；即使 Agent 选对了 skill，若编造数据或忽略用户边界，也必须判失败。
4. 将每个场景的审阅结果写入一个 JSONL 文件（一行一条），再生成报告：

```bash
node scripts/eval-report.cjs --runs <绝对路径/runs.jsonl> --out <绝对路径/report.md>
# 只有全部已审阅且通过时才返回 0
node scripts/eval-report.cjs --runs <绝对路径/runs.jsonl> --strict
```

记录格式（字段值仅作结构示例，不能当成实际评测结果）：

```json
{"scenarioId":"new-idea-vague","reviewer":"another-reviewer","reviewType":"independent","transcriptPath":"transcripts/new-idea-vague.md","observations":[{"check":"route","passed":true,"evidence":"第 2 轮先进入 pm-brainstorm"},{"check":"ask_before_write","passed":true,"evidence":"提问后停止，未生成文档"},{"check":"no_fabrication","passed":true,"evidence":"未声称做过用户访谈"}]}
```

`transcriptPath` 相对于 JSONL 所在目录，也可使用绝对路径。报告工具检查 `reviewType`（`independent` 或 `self`）、审阅者、对话文件和每一项证据；缺失记为 `INVALID`，未提供记录记为 `NOT RUN`。自评且检查通过只显示 `SELF-REVIEW`，不会显示独立 `PASS`；任一检查失败仍记 `FAIL`。`--strict` 仅在全部独立 `PASS` 时通过。它不会自行调用模型，也不能替代人工核对截图和产物。

## 本轮状态

截至 2026-09-24，六个场景已完成有/无 skill 的真实隔离对照（原始记录见 `evals/results/2026-09-24-six-scenario-baseline/`）；两个失败场景经修复做了定向回归（见 `evals/results/2026-09-24-six-scenario-post-fix/`）。当前 Agent 自评的合并结果是 **5 个 SELF-REVIEW、1 个 FAIL、14 个 NOT RUN、0 个独立 PASS**。较早一次 120 秒超时的中止记录保留在 `evals/results/2026-09-24-six-scenario-attempt/`。不要把自动化测试、自评或技能安装成功说成独立行为验收通过；下一步需独立审阅与处理有歧义的 `discussion-only` 路由场景。
