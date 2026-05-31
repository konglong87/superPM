# super-pm 技能索引

**版本**: v2.3.1 | **技能总数**: 37 (34核心+3工具)

---

## 01 需求洞察模块（9个）

| Skill | 版本 | 说明 | 输出文档 |
|-------|------|------|---------|
| `/pm-demand` | v2.0.0 | 需求调研入口 - 系统化收集产品信息并验证痛点 | 需求调研报告 |
| `/pm-brainstorm` | v2.2.1 | 头脑风暴 - Subagent 并行搜索灵感火花，4维度同时爆发 | 创意方案库 |
| `/pm-clarify` | v2.0.0 | 需求细化 - 明确每个需求的细节和边界条件 | 确认需求清单 |
| `/pm-market` | v2.0.1 | 市场分析 - 竞品与行业研究 | 市场调研报告 |
| `/pm-priority` | v2.0.0 | 优先级排序 - Subagent 并行预分析 + RICE/KANO/MoSCoW 模型 | 优先级排序报告 |
| `/pm-mvp` | v1.1.0 | MVP规划 - 确定最小可行产品范围 | MVP方案 |
| `/pm-pool` | v1.1.0 | 需求池管理 - 收集、跟踪、管理需求 | 需求池管理表 |
| `/pm-journey` | v2.0.1 | 用户旅程地图 - 绘制旅程、分析痛点 | 用户旅程地图 |
| `/pm-search` | v2.0.1 | 联网搜索整合 - subagent 并发搜索 | 市场调研报告 |

## 02 方案设计模块（7个）

| Skill | 版本 | 说明 | 输出文档 |
|-------|------|------|---------|
| `/pm-docs` | v2.0.1 | PRD/BRD/MRD 文档生成 | PRD/BRD/MRD文档 |
| `/pm-proto` | v2.0.0 | 原型设计指导 | 原型设计方案 |
| `/pm-tech` | v2.0.0 | 技术对接与可行性分析 | 技术对接方案 |
| `/pm-feature` | v2.0.1 | 功能细节拆解 | 功能细节拆解 |
| `/pm-data` | v2.0.1 | 数据指标体系设计 | 数据指标体系 |
| `/pm-position` | v2.1.1 | 产品定位方案 | 产品定位方案 |
| `/pm-user-story` | v2.0.0 | 用户故事编写 | 用户故事清单 |

## 03 增长迭代模块（8个）

| Skill | 版本 | 说明 | 输出文档 |
|-------|------|------|---------|
| `/pm-aarrr` | v2.0.1 | AARRR增长分析 | AARRR增长分析 |
| `/pm-growth` | v2.0.1 | 增长方案制定 | 增长执行方案 |
| `/pm-report` | v2.0.0 | 数据报告与反馈收集 | 数据报告 |
| `/pm-abtest` | v2.0.0 | A/B测试方案设计 | A/B测试方案 |
| `/pm-iteration` | v2.0.0 | 迭代计划制定 | 迭代计划 |
| `/pm-retro` | v2.0.0 | 迭代复盘 | 迭代复盘报告 |
| `/pm-roadmap` | v2.0.0 | 产品路线图规划 | 产品路线图 |
| `/pm-feedback` | v2.0.1 | 用户反馈分析 V2 | 用户反馈报告 |

## 04 风控管理模块（5个）

| Skill | 版本 | 说明 | 输出文档 |
|-------|------|------|---------|
| `/pm-agile` | v2.0.0 | 敏捷管理流程设计 | 敏捷管理方案 |
| `/pm-cross` | v2.0.0 | 跨部门协作方案 | 跨部门协作方案 |
| `/pm-risk` | v2.0.0 | 风险管控方案 | 风险管控方案 |
| `/pm-release` | v2.0.0 | 上线执行方案 | 上线执行方案 |
| `/pm-change` | v2.0.0 | 需求变更管理 | 需求变更记录 |

## 05 产品策略模块（5个）

| Skill | 版本 | 说明 | 输出文档 |
|-------|------|------|---------|
| `/pm-business-model` | v2.0.0 | 商业模式画布设计 | 商业模式设计 |
| `/pm-decision` | v2.0.0 | 战略决策支持 | 战略决策建议 |
| `/pm-funnel` | v2.0.1 | 漏斗分析优化 | 漏斗优化方案 |
| `/pm-portfolio` | v2.0.0 | 产品组合管理（BCG矩阵） | 产品组合战略 |
| `/pm-resource` | v2.0.0 | 资源分配与ROI评估 | 资源分配方案 |

## 辅助工具

| Skill | 版本 | 说明 |
|-------|------|------|
| `start-super-pm` | v1.1.0 | 启动引导入口 - 自动检测任务类型并路由 |
| `super-pm-upgrade` | v1.1.0 | 版本升级工具 |
| `/super-pm` | v2.3.0 | 根技能入口 - 关键词语义路由 + 流程推荐引擎 |

---

## 依赖关系

```
pm-demand → pm-brainstorm(可选) → pm-clarify → pm-market(可选)
→ pm-priority → pm-mvp

pm-docs(依赖MVP) → pm-proto → pm-tech → pm-feature → pm-data → pm-user-story

pm-aarrr(上线后) → pm-growth → pm-report → pm-iteration → pm-retro → pm-roadmap

pm-agile(项目启动) → pm-cross → pm-risk(上线前) → pm-release

pm-business-model / pm-decision / pm-funnel / pm-portfolio / pm-resource(独立)
```

---

**更新日期**: 2026-05-31