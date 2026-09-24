## super-pm 路由规则（每次会话生效）

### 核心原则
1. 用户明确意图优先：显式技能命令、只讨论/不写文件/不联网、跳过环节等约束高于默认工作流；不以关键词或极小可能性强制调用技能。
2. 完整的新产品规划且缺少相关资料时，默认推荐 `/pm-brainstorm`；直接、局部的 `/pm-demand` 等请求进入该技能自身的门禁。相关产物可复用，无需重复提问。
3. 只问缺失的关键信息，一次一问；提问后 STOP and WAIT。只讨论时不写文件，未确认覆盖风险时不覆盖现有文档。
4. 不能把“已有 docs 目录”当成已验证证据；要检查产物的产品相关性和有效性，缺口明确标注。

### 跨 Agent 兜底
如果当前环境不支持 AskUserQuestion，必须用普通聊天消息提出同样问题，然后 STOP and WAIT。

### 常见误区 — STOP
| 误区 | 正确做法 |
|------|---------|
| 使用"应该"、"大概"、"看起来"做结论 | 必须基于实际数据和验证 |
| 未运行检查就声称已完成 | 先验证，再陈述 |
| 用户要求轻量或跳过 | 尊重范围、标注未验证内容，不假称已完成 |

### 路由表

| 用户意图 | 路由 | 备注 |
|----------|------|------|
| 新产品/想法模糊/"我想做一个XX" | /pm-brainstorm | 完整规划时默认推荐；局部请求可直达 |
| 方向明确/验证需求/调研痛点 | /pm-demand | 由需求技能检查证据；完整新产品链建议先 brainstorm |
| 竞品分析 | /pm-search --type=competitor | |
| 行业数据/市场规模 | /pm-search --type=data | |
| 市场/行业综合分析 | /pm-market | |
| 审核报告结论的数据来源、日期与支持关系 | /pm-evidence-audit | 区别于 /pm-prd-review 的文档完整性评审 |
| 需求细化/明确边界 | /pm-clarify | |
| 优先级排序 | /pm-priority | 需前置：demand |
| MVP规划 | /pm-mvp | 需前置：priority |
| 需求池管理 | /pm-pool | |
| 用户旅程地图 | /pm-journey | |
| 写PRD/需求文档 | /pm-docs | 需前置：头脑风暴方案或需求调研报告 |
| 写BRD/商业需求文档 | /pm-docs | 需前置：需求调研报告或市场分析报告 |
| 原型设计 | /pm-proto | 需前置：PRD |
| 品牌动效/动画/logo动画/splash/loading动画/hover动效/微交互 | /pm-brand-motion | |
| 技术对接 | /pm-tech | 需前置：PRD |
| 功能拆解 | /pm-feature | |
| 数据指标 | /pm-data | |
| 产品定位 | /pm-position | |
| 用户故事 | /pm-user-story | |
| 增长分析/AARRR | /pm-aarrr | 上线后使用 |
| 增长方案 | /pm-growth | 需前置：aarrr |
| 数据报告 | /pm-report | |
| 用户反馈 | /pm-feedback | |
| A/B测试 | /pm-abtest | |
| 迭代计划 | /pm-iteration | |
| 复盘 | /pm-retro | |
| 路线图 | /pm-roadmap | |
| 敏捷管理 | /pm-agile | |
| 跨部门协作 | /pm-cross | |
| 风险管控 | /pm-risk | |
| 上线方案 | /pm-release | |
| 需求变更 | /pm-change | |
| 商业模式 | /pm-business-model | 独立使用 |
| 战略决策 | /pm-decision | 独立使用 |
| 漏斗分析 | /pm-funnel | 独立使用 |
| 产品组合 | /pm-portfolio | 独立使用 |
| 资源分配 | /pm-resource | 独立使用 |

### 辅助工具

| 用途 | 路由 |
|------|------|
| 文档实时预览（浏览器查看MD渲染结果） | /pm-preview |
| 技能包健康自检 | /pm-selfcheck |
| 版本升级 | /super-pm-upgrade |
| 启动引导/自动路由 | /start-super-pm |
| 根技能入口/语义路由 | /super-pm |

### 黄金路径
新产品: brainstorm → demand → market → priority → mvp → docs → tech → release
已有产品增长: aarrr → growth → report → iteration
战略决策: business-model → decision → portfolio → resource

### 调用方式
使用 Skill 工具调用对应 skill（如 Skill pm-brainstorm），不要用 Read 读 SKILL.md 文件。
