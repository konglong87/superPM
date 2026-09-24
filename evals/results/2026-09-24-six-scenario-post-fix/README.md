# 两项失败修复后的定向回归（2026-09-24）

基线见相邻 `2026-09-24-six-scenario-baseline/`。基线 6 个技能组场景自评为 3 个全部检查满足、3 个失败。修复后**只重跑受修改影响的两个技能组**，没有把未修改的四个场景伪称重跑；`self-review.jsonl` 对四个旧记录使用相对路径引用，对两个新记录引用本目录原始 JSONL。

| 场景 | 修复后耗时 | 可追溯行为 |
|---|---:|---|
| new-idea-specific | 21.18s | `raw.jsonl` 读取 `pm-brainstorm`；最终只问第一版预约场景，未写文件 |
| rice-without-data | 22.42s | `raw.jsonl` 读取 `pm-priority`；明确拒绝凭 A/B/C 算分，未给占位符精确分数或排序 |

合并视图：**5 个 SELF-REVIEW、1 个 FAIL（discussion-only 路由）、14 个 NOT RUN、0 个独立 PASS**。`report.md` 是工具输出；自评者仍是当前 Agent，尚需另一名审阅者核对证据。没有 UI/图片，截图验收不适用。修复未改变 `evals/scenarios.json` 的冻结预期。所有临时 HOME、模型配置、工作目录和缓存会在证据复制后清理。
