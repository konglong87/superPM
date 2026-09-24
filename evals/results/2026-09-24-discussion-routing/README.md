# 讨论路由拆分回归（2026-09-24）

本次回归验证两个重新定义后的交互场景，审阅者是当前 Agent，属于 `SELF-REVIEW`，不等于独立人工验收。

| 场景 | 目标路由 | 控制组 | 技能组 | 技能组耗时 | 文件变化 |
|---|---|---|---|---:|---|
| `discussion-only` | `pm-position` | 完成 | 读取 `pm-position` 并只问已有产品信息 | 43.09s | 无 |
| `brainstorm-discussion-only` | `pm-brainstorm` | 完成 | 读取 `pm-brainstorm` 并发散产品方向 | 41.74s | 无 |

每个场景分别建立 control/skill 新会话；skill 组使用当前 checkout 的 56 个技能，control 组不安装 Super-PM。四个会话均产生 `turn.completed`，退出码为 0；每个工作区的 `before.json` 与 `after.json` 相同。原始 JSONL、最终回复、标准错误、状态和清单均保留在本目录。测试配置、Bearer 值、临时 HOME 和缓存不在本目录。

此前失败的 `discussion-only` 场景没有被事后改写结果，而是明确为“已有产品定位讨论”；新增 `brainstorm-discussion-only` 覆盖“新产品方向尚未确定的发散讨论”，消除了预期路由冲突。
