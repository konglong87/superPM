# super-pm 技能索引

**技能总数**: 39 (36核心+4工具) | 版本号见 `VERSION` 文件

---

## 01 需求洞察模块（9个）

| Skill | 说明 | 输出文档 |
|-------|------|---------|
| `/pm-brainstorm` | 头脑风暴 ⭐ 先发散再收敛 - Subagent 并行搜索灵感火花，4维度同时爆发 | 创意方案库 |
| `/pm-demand` | 需求调研入口 - 系统化收集产品信息并验证痛点 | 需求调研报告 |
| `/pm-clarify` | 需求细化 - 明确每个需求的细节和边界条件 | 确认需求清单 |
| `/pm-market` | 市场分析 - 竞品与行业研究 | 市场调研报告 |
| `/pm-priority` | 优先级排序 - Subagent 并行预分析 + RICE/KANO/MoSCoW 模型 | 优先级排序报告 |
| `/pm-mvp` | MVP规划 - 确定最小可行产品范围 | MVP方案 |
| `/pm-pool` | 需求池管理 - 收集、跟踪、管理需求 | 需求池管理表 |
| `/pm-journey` | 用户旅程地图 - 绘制旅程、分析痛点 | 用户旅程地图 |
| `/pm-search` | 联网搜索整合 - subagent 并发搜索 | 市场调研报告 |

## 02 方案设计模块（8个）

| Skill | 说明 | 输出文档 |
|-------|------|---------|
| `/pm-docs` | PRD/BRD/MRD 文档生成 | PRD/BRD/MRD文档 |
| `/pm-proto` | 原型设计指导 | 原型设计方案 |
| `/pm-brand-motion` | 品牌动效方案 + 方向性 demo | 品牌动效方案 + demo HTML |
| `/pm-tech` | 技术对接与可行性分析 | 技术对接方案 |
| `/pm-feature` | 功能细节拆解 | 功能细节拆解 |
| `/pm-data` | 数据指标体系设计 | 数据指标体系 |
| `/pm-position` | 产品定位方案 | 产品定位方案 |
| `/pm-user-story` | 用户故事编写 | 用户故事清单 |

## 03 增长迭代模块（8个）

| Skill | 说明 | 输出文档 |
|-------|------|---------|
| `/pm-aarrr` | AARRR增长分析 | AARRR增长分析 |
| `/pm-growth` | 增长方案制定 | 增长执行方案 |
| `/pm-report` | 数据报告与反馈收集 | 数据报告 |
| `/pm-abtest` | A/B测试方案设计 | A/B测试方案 |
| `/pm-iteration` | 迭代计划制定 | 迭代计划 |
| `/pm-retro` | 迭代复盘 | 迭代复盘报告 |
| `/pm-roadmap` | 产品路线图规划 | 产品路线图 |
| `/pm-feedback` | 用户反馈分析 V2 | 用户反馈报告 |

## 04 风控管理模块（5个）

| Skill | 说明 | 输出文档 |
|-------|------|---------|
| `/pm-agile` | 敏捷管理流程设计 | 敏捷管理方案 |
| `/pm-cross` | 跨部门协作方案 | 跨部门协作方案 |
| `/pm-risk` | 风险管控方案 | 风险管控方案 |
| `/pm-release` | 上线执行方案 | 上线执行方案 |
| `/pm-change` | 需求变更管理 | 需求变更记录 |

## 05 产品策略模块（5个）

| Skill | 说明 | 输出文档 |
|-------|------|---------|
| `/pm-business-model` | 商业模式画布设计 | 商业模式设计 |
| `/pm-decision` | 战略决策支持 | 战略决策建议 |
| `/pm-funnel` | 漏斗分析优化 | 漏斗优化方案 |
| `/pm-portfolio` | 产品组合管理（BCG矩阵） | 产品组合战略 |
| `/pm-resource` | 资源分配与ROI评估 | 资源分配方案 |

## 辅助工具

| Skill | 说明 |
|-------|------|
| `start-super-pm` | 启动引导入口 - 自动检测任务类型并路由 |
| `super-pm-upgrade` | 版本升级工具 |
| `/pm-preview` | 文档实时预览 - WebSocket 服务器 + 浏览器 MD 渲染 + 自动刷新 |
| `/pm-selfcheck` | 技能包健康自检 - 元数据完整性、体积、路径一致性、搜索依赖检测 |
| `/super-pm` | 根技能入口 - 关键词语义路由 + 流程推荐引擎 |

---

## 依赖关系

```
pm-brainstorm → pm-demand → pm-clarify → pm-market(可选)
→ pm-priority → pm-mvp
```

> 自然语言请求必须先走 start-super-pm 路由；显式 /pm-demand 可直达但需通过前置门禁

```
pm-docs(依赖MVP) → pm-preview(验证文档) → pm-proto → pm-brand-motion → pm-tech → pm-feature → pm-data → pm-user-story

pm-aarrr(上线后) → pm-growth → pm-report → pm-iteration → pm-retro → pm-roadmap

pm-agile(项目启动) → pm-cross → pm-risk(上线前) → pm-release

pm-business-model / pm-decision / pm-funnel / pm-portfolio / pm-resource(独立)
```

---

**更新日期**: 2026-06-18
