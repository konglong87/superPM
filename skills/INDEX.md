# super-pm 技能索引

**可发现的技能总数**: 56 (44核心+6工具+6工作流) | 版本号见 `VERSION` 文件

---

## 工作流入口（6个）

| 入口 | 步骤 | 前置提醒 |
|------|------|---------|
| `/discover` | 市场 → 竞品 → 需求 → 优先级 | 新产品先检查头脑风暴 |
| `/validate-idea` | 需求 → 市场 → 优先级 → MVP | 新产品先检查头脑风暴 |
| `/write-prd` | 需求 → 澄清 → 优先级 → MVP → 文档 | 新产品先检查头脑风暴 |
| `/plan-launch` | 风险 → 协作 → 敏捷交付 → 上线 | 检查实际交付与回滚准备 |
| `/analyze-growth` | AARRR → 报告 → 增长 → 迭代 | 适用于已上线产品 |
| `/define-strategy` | 定位 → 商业模式 → OKR → 路线图 | 需要战略目标与约束 |

单独安装入口不会自动安装链内技能；入口在执行前检查依赖，缺失则停止并给出完整 `npx skills add ... --skill` 命令。

六个入口同时位于 `skills/workflows/`（跨平台 skill 发现）与 `commands/`（完整插件命令），后者以相对符号链接指向前者，不维护两套正文。排序和交接规则见 [`_shared/workflow-contract.md`](./_shared/workflow-contract.md)。

## 01 需求洞察模块（11个）

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
| `/pm-competitor` | 竞品监控 - 持续追踪竞品动态与异动预警 | 竞品监控月报 |
| `/pm-interview` | 用户访谈 - 一手定性研究设计与执行 | 用户访谈方案 |

## 02 方案设计模块（9个）

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
| `/pm-prd-review` | PRD/BRD/MRD 评审 - 完整性/可行性/风险把关 | PRD评审报告 |

## 03 增长迭代模块（10个）

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
| `/pm-geo` | GEO / AI 搜索优化 - 提升生成式引擎可见性 | GEO优化方案 |
| `/pm-okr` | OKR 目标管理 - 目标拆解与对齐 | OKR目标管理 |

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

## 06 职业发展模块（3个）

| Skill | 说明 | 输出文档 |
|-------|------|---------|
| `/pm-career-coach` | PM 职业规划教练 - 覆盖 junior→senior→director 全阶段 | 职业发展规划 |
| `/pm-interview-prep` | PM 面试准备 - 产品sense/执行/行为/策略全题型 | 面试准备笔记 |
| `/pm-resume` | PM 简历优化 - STAR+指标+ATS 兼容 | 优化简历 |

## 07 专家视角模块（1个）

| Skill | 说明 | 输出文档 |
|-------|------|---------|
| `/steve-jobs-perspective` | 乔布斯思维与表达DNA · 可对话思维顾问 | 对话洞察 / 思维碰撞记录（可选） |

## 辅助工具

| Skill | 说明 |
|-------|------|
| `start-super-pm` | 启动引导入口 - 自动检测任务类型并路由 |
| `super-pm-upgrade` | 版本升级工具 |
| `/pm-preview` | 文档实时预览 - WebSocket 服务器 + 浏览器 MD 渲染 + 自动刷新 |
| `/pm-selfcheck` | 技能包健康自检 - 完整安装、元数据完整性和体积检查 |
| `/pm-evidence-audit` | 证据审计 - 核对主张的来源、日期、支持关系与冲突 |
| `/super-pm` | 根技能入口 - 关键词语义路由 + 流程推荐引擎 |

---

## 依赖关系

```
pm-brainstorm → pm-demand → pm-clarify → pm-market(可选) → pm-competitor / pm-interview(需求洞察补充)
→ pm-priority → pm-mvp
```

> 自然语言请求必须先走 start-super-pm 路由；显式 /pm-demand 可直达但需通过前置门禁

```
pm-docs(依赖MVP) → pm-preview(验证文档) → pm-proto → pm-brand-motion → pm-tech → pm-feature → pm-data → pm-user-story
pm-docs → pm-prd-review(评审把关)

pm-aarrr(上线后) → pm-growth → pm-report → pm-iteration → pm-retro → pm-roadmap
pm-growth → pm-geo(承接 GEO 流量) ｜ pm-okr → pm-iteration / pm-retro(目标对齐)

pm-agile(项目启动) → pm-cross → pm-risk(上线前) → pm-release

pm-business-model / pm-decision / pm-funnel / pm-portfolio / pm-resource(独立)
```

---

**更新日期**: 2026-09-24
