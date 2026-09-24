# Clarify Discussion Routing Evaluation Plan

**目标：** 消除“只聊产品定位”和“新产品脑暴”两个评测场景的语义重叠，并用真实隔离会话验证路由。

**架构：** 场景契约负责表达用户意图，skill 负责执行；不通过修改评分器或事后改结果解决歧义。保留历史 20 场景证据，新增场景使用新的独立 ID，重新生成当前报告时未运行的场景仍显示 `NOT RUN`。

**验证：** 更新场景与文档 → 静态契约测试 → 两个场景各跑 control/skill → 检查原始事件、最终响应、文件前后清单 → 清理临时 HOME/配置/缓存 → npm test → 提交推送。

## Outcome (2026-09-24)

- `discussion-only` now means an existing-product positioning discussion and routes to `pm-position`.
- Added `brainstorm-discussion-only` for an undecided new-product direction; it routes to `pm-brainstorm`.
- Four fresh isolated sessions completed with unchanged workspaces; evidence is under `evals/results/2026-09-24-discussion-routing/`.
