## super-pm 路由规则（每次会话生效）

### 核心原则
1. **1% 触发原则**：如果你认为某个 PM skill 有 1% 的可能性适用于当前任务，你必须调用该 skill。不可协商，不能找借口跳过。
2. 新产品从0到1 → 必须先 /pm-brainstorm，不得自行跳过
   - 只有用户明确说"跳过brainstorm/直接需求调研/直接验证需求/已完成头脑风暴"才允许跳过
   - **显式 slash command 不走此路由**：用户输入 `/pm-demand`、`/pm-docs` 等时，直接进入对应 skill，该 skill 自身执行前置门禁
3. "写文档"是产出意图，不是流程起点 → 先检查前置文档
4. 一次只问一个问题，提问后 STOP and WAIT
5. 不得在用户回答前生成文档、写入 docs
6. 已有 docs 文件不能替代本轮用户回答

### 跨 Agent 兜底
如果当前环境不支持 AskUserQuestion，必须用普通聊天消息提出同样问题，然后 STOP and WAIT。

### 常见误区 — STOP
| 误区 | 正确做法 |
|------|---------|
| 使用"应该"、"大概"、"看起来"做结论 | 必须基于实际数据和验证 |
| 未运行检查就声称已完成 | 先验证，再陈述 |
| 因时间紧迫跳过关键步骤 | 没有例外，时间紧更要严格 |

### 路由表

| 用户意图 | 路由 | 备注 |
|----------|------|------|
| 新产品/想法模糊/"我想做一个XX" | /pm-brainstorm | 强制，不可跳过 |
| 方向明确/验证需求/调研痛点 | /pm-demand | 需前置：brainstorm |
| 竞品分析 | /pm-search --type=competitor | |
| 行业数据/市场规模 | /pm-search --type=data | |
| 市场/行业综合分析 | /pm-market | |
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
