---
name: super-pm
version: 2.0.0
description: |
  Product Manager Skills Pack - Full lifecycle support from demand to delivery
  让一个产品经理拥有一个产品团队的能力
  Use when: Starting a new product, planning features, analyzing market, designing solutions, managing growth, strategic decision
allowed-tools:
  - Read
  - Write
  - Edit
  - AskUserQuestion
  - Bash
  - WebSearch
---

## Preamble (run first)

```bash
# Create necessary directories (统一文档管理 - 同时支持中英文)
mkdir -p docs/01-需求洞察
mkdir -p docs/01-demand-insight
mkdir -p docs/02-方案设计
mkdir -p docs/02-solution-design
mkdir -p docs/03-增长迭代
mkdir -p docs/03-growth-iteration
mkdir -p docs/04-风控管理
mkdir -p docs/04-risk-management
mkdir -p docs/05-产品战略
mkdir -p docs/05-product-strategy

# Detect current progress
echo "📊 当前项目进度："
echo ""

_DEMAND_DONE=$([ -f "docs/01-需求洞察/需求调研报告.md" ] || [ -f "docs/01-demand-insight/demand-research.md" ] && echo "✅" || echo "⏳")
_BRAINSTORM_DONE=$([ -f "docs/01-需求洞察/创意方案库.md" ] || [ -f "docs/01-demand-insight/brainstorm-ideas.md" ] && echo "✅" || echo "⏳")
_CLARIFY_DONE=$([ -f "docs/01-需求洞察/确认需求清单.md" ] || [ -f "docs/01-demand-insight/demand-clarification.md" ] && echo "✅" || echo "⏳")
_MARKET_DONE=$([ -f "docs/01-需求洞察/市场调研报告.md" ] || [ -f "docs/01-demand-insight/market-research.md" ] && echo "✅" || echo "⏳")
_PRIORITY_DONE=$([ -f "docs/01-需求洞察/优先级排序报告.md" ] || [ -f "docs/01-demand-insight/priority-matrix.md" ] && echo "✅" || echo "⏳")
_MVP_DONE=$([ -f "docs/01-需求洞察/MVP方案.md" ] || [ -f "docs/01-demand-insight/mvp-plan.md" ] && echo "✅" || echo "⏳")
_POOL_DONE=$([ -f "docs/01-需求洞察/需求池管理表.md" ] || [ -f "docs/01-demand-insight/demand-pool.md" ] && echo "✅" || echo "⏳")
_JOURNEY_DONE=$([ -f "docs/01-需求洞察/用户旅程地图.md" ] || [ -f "docs/01-demand-insight/user-journey.md" ] && echo "✅" || echo "⏳")

echo "## 需求洞察模块"
echo "$_DEMAND_DONE 需求调研"
echo "$_BRAINSTORM_DONE 头脑风暴"
echo "$_CLARIFY_DONE 需求细化"
echo "$_MARKET_DONE 市场分析"
echo "$_PRIORITY_DONE 优先级排序"
echo "$_MVP_DONE MVP规划"
echo "$_POOL_DONE 需求池管理"
echo "$_JOURNEY_DONE 用户旅程"
echo ""

_PRD_DONE=$([ -f "docs/02-方案设计/PRD产品需求文档.md" ] || [ -f "docs/02-solution-design/prd.md" ] && echo "✅" || echo "⏳")
_PROTO_DONE=$([ -f "docs/02-方案设计/原型设计方案.md" ] || [ -f "docs/02-solution-design/prototype.md" ] && echo "✅" || echo "⏳")
_TECH_DONE=$([ -f "docs/02-方案设计/技术对接方案.md" ] || [ -f "docs/02-solution-design/tech-spec.md" ] && echo "✅" || echo "⏳")
_FEATURE_DONE=$([ -f "docs/02-方案设计/功能细节拆解.md" ] || [ -f "docs/02-solution-design/feature-breakdown.md" ] && echo "✅" || echo "⏳")
_DATA_DONE=$([ -f "docs/02-方案设计/数据指标体系.md" ] || [ -f "docs/02-solution-design/metrics-system.md" ] && echo "✅" || echo "⏳")
_POSITION_DONE=$([ -f "docs/02-方案设计/产品定位方案.md" ] || [ -f "docs/02-solution-design/product-position.md" ] && echo "✅" || echo "⏳")
_USERSTORY_DONE=$([ -f "docs/02-方案设计/用户故事清单.md" ] || [ -f "docs/02-solution-design/user-stories.md" ] && echo "✅" || echo "⏳")

echo "## 方案设计模块"
echo "$_PRD_DONE PRD文档"
echo "$_PROTO_DONE 原型设计"
echo "$_TECH_DONE 技术对接"
echo "$_FEATURE_DONE 功能细节"
echo "$_DATA_DONE 数据指标"
echo "$_POSITION_DONE 产品定位"
echo "$_USERSTORY_DONE 用户故事"
echo ""

_AARRR_DONE=$([ -f "docs/03-增长迭代/AARRR增长分析.md" ] || [ -f "docs/03-growth-iteration/aarrr-analysis.md" ] && echo "✅" || echo "⏳")
_GROWTH_DONE=$([ -f "docs/03-增长迭代/增长执行方案.md" ] || [ -f "docs/03-growth-iteration/growth-plan.md" ] && echo "✅" || echo "⏳")
_REPORT_DONE=$([ -f "docs/03-增长迭代/数据报告与用户反馈.md" ] || [ -f "docs/03-growth-iteration/data-report.md" ] && echo "✅" || echo "⏳")
_ABTEST_DONE=$([ -f "docs/03-增长迭代/A-B测试方案.md" ] || [ -f "docs/03-growth-iteration/abtest-plan.md" ] && echo "✅" || echo "⏳")
_ITERATION_DONE=$([ -f "docs/03-增长迭代/迭代计划.md" ] || [ -f "docs/03-growth-iteration/iteration-plan.md" ] && echo "✅" || echo "⏳")
_RETRO_DONE=$([ -f "docs/03-增长迭代/迭代复盘报告.md" ] || [ -f "docs/03-growth-iteration/retrospective.md" ] && echo "✅" || echo "⏳")
_ROADMAP_DONE=$([ -f "docs/03-增长迭代/产品路线图.md" ] || [ -f "docs/03-growth-iteration/roadmap.md" ] && echo "✅" || echo "⏳")

echo "## 增长迭代模块"
echo "$_AARRR_DONE AARRR分析"
echo "$_GROWTH_DONE 增长方案"
echo "$_REPORT_DONE 数据报告"
echo "$_ABTEST_DONE A/B测试"
echo "$_ITERATION_DONE 迭代计划"
echo "$_RETRO_DONE 迭代复盘"
echo "$_ROADMAP_DONE 产品路线图"
echo ""

_AGILE_DONE=$([ -f "docs/04-风控管理/敏捷管理方案.md" ] || [ -f "docs/04-risk-management/agile-plan.md" ] && echo "✅" || echo "⏳")
_CROSS_DONE=$([ -f "docs/04-风控管理/跨部门协作方案.md" ] || [ -f "docs/04-risk-management/cross-team-collab.md" ] && echo "✅" || echo "⏳")
_RISK_DONE=$([ -f "docs/04-风控管理/风险管控方案.md" ] || [ -f "docs/04-risk-management/risk-control.md" ] && echo "✅" || echo "⏳")
_RELEASE_DONE=$([ -f "docs/04-风控管理/上线执行方案.md" ] || [ -f "docs/04-risk-management/release-plan.md" ] && echo "✅" || echo "⏳")
_CHANGE_DONE=$([ -f "docs/04-风控管理/需求变更记录.md" ] || [ -f "docs/04-risk-management/change-log.md" ] && echo "✅" || echo "⏳")

echo "## 风控管理模块"
echo "$_AGILE_DONE 敏捷管理"
echo "$_CROSS_DONE 跨部门协作"
echo "$_RISK_DONE 风险管控"
echo "$_RELEASE_DONE 上线方案"
echo "$_CHANGE_DONE 需求变更"
echo ""

_PORTFOLIO_DONE=$([ -f "docs/05-产品战略/产品组合战略.md" ] || [ -f "docs/05-product-strategy/portfolio-strategy.md" ] && echo "✅" || echo "⏳")
_RESOURCE_DONE=$([ -f "docs/05-产品战略/资源分配方案.md" ] || [ -f "docs/05-product-strategy/resource-allocation.md" ] && echo "✅" || echo "⏳")
_BUSINESS_DONE=$([ -f "docs/05-产品战略/商业模式设计.md" ] || [ -f "docs/05-product-strategy/business-model.md" ] && echo "✅" || echo "⏳")
_FUNNEL_DONE=$([ -f "docs/05-产品战略/漏斗优化方案.md" ] || [ -f "docs/05-product-strategy/funnel-optimization.md" ] && echo "✅" || echo "⏳")
_DECISION_DONE=$([ -f "docs/05-产品战略/战略决策建议.md" ] || [ -f "docs/05-product-strategy/strategic-decision.md" ] && echo "✅" || echo "⏳")

echo "## 产品战略模块（v2.0新增）"
echo "$_PORTFOLIO_DONE 产品组合管理"
echo "$_RESOURCE_DONE 资源分配决策"
echo "$_BUSINESS_DONE 商业模式设计"
echo "$_FUNNEL_DONE 漏斗分析优化"
echo "$_DECISION_DONE 战略决策支持"
echo ""

echo "💡 查看完整技能列表，请说 'show skills'"
echo "🎯 开始新项目，请说 '我要做一个XX产品'"
echo "📈 管理多产品线，请说 '管理产品组合'"
```

---

## 强制入口逻辑

当检测到以下关键词时，主动引导用户开始流程：

### 触发关键词

**产品类**: 产品、功能、特性、模块、新产品、商业模式、盈利模式
**需求类**: 需求、痛点、用户需要、需求池、需求清单
**用户类**: 用户、目标用户、用户画像、用户体验、用户反馈
**市场类**: 市场、竞品、行业、市场规模、竞争格局
**场景类**: 从0到1、从零开始、新项目、新业务、MVP
**战略类**: 多产品线、产品组合、资源分配、战略决策、收购、自研

### 触发后响应

#### 场景1：新产品规划

使用 AskUserQuestion 提供选项：

> 🎯 检测到您在规划新产品！
>
> 我建议从需求调研开始，系统地梳理产品方向。
>
> A) 是的，开始需求调研（推荐）- 执行 /pm-demand
> B) 我想先进行头脑风暴 - 执行 /pm-brainstorm
> C) 不需要，我有其他问题

#### 场景2：多产品线管理

使用 AskUserQuestion 提供选项：

> 🎯 检测到您在管理多个产品！
>
> 我建议使用产品组合管理工具。
>
> A) 开始产品组合分析（推荐）- 执行 /pm-portfolio
> B) 资源分配决策 - 执行 /pm-resource
> C) 不需要，我有其他问题

---

## 流程推荐引擎

### 规则1: 基于当前状态推荐

**需求洞察阶段**：
- 如果需求调研未完成 → 推荐 `/pm-demand`
- 如果需求完成但无市场分析 → 推荐 `/pm-market`
- 如果有市场数据但无优先级 → 推荐 `/pm-priority`
- 如果有优先级但无MVP → 推荐 `/pm-mvp`

**方案设计阶段**：
- 如果MVP完成但无PRD → 推荐 `/pm-docs`
- 如果PRD完成但无技术方案 → 推荐 `/pm-tech`
- 如果技术方案完成但无数据指标 → 推荐 `/pm-data`

**增长迭代阶段**：
- 如果产品上线 → 推荐 `/pm-aarrr`
- 如果增长分析完成 → 推荐 `/pm-growth`
- 如果有数据报告 → 推荐 `/pm-iteration`

**风控管理阶段**：
- 如果技术方案完成 → 推荐 `/pm-risk`
- 如果风险管控完成 → 推荐 `/pm-release`

### 规则2: 多选项推荐

每个skill完成后，提供2-3个下一步选项。

---

## Skill 索引

### 需求洞察模块（8个）

1. **pm-demand** - 需求调研入口
   - 收集产品基础信息
   - 风险前置验证（痛点验证）
   - 生成：`docs/01-demand-insight/demand-research.md`

2. **pm-brainstorm** - 头脑风暴
   - 探索产品方向
   - 支持第一性原理模式
   - 生成：`docs/01-demand-insight/brainstorm-ideas.md`

3. **pm-clarify** - 需求细化与验证
   - 细化需求细节
   - 明确场景与边界
   - 生成：`docs/01-demand-insight/demand-clarification.md`

4. **pm-market** - 市场分析
   - MCP优先搜索
   - 分析市场规模与竞品
   - 生成：`docs/01-demand-insight/market-research.md`

5. **pm-priority** - 优先级排序
   - RICE评分
   - KANO模型
   - MoSCoW法则
   - 生成：`docs/01-demand-insight/priority-matrix.md`

6. **pm-mvp** - MVP规划
   - 选择MVP模式
   - 功能拆解
   - 方案对比
   - 生成：`docs/01-demand-insight/mvp-plan.md`

7. **pm-pool** - 需求池管理
   - 收集需求
   - 状态跟踪
   - 优先级管理
   - 生成：`docs/01-demand-insight/demand-pool.md`

8. **pm-journey** - 用户旅程
   - 绘制用户旅程地图
   - 分析痛点与机会
   - 生成：`docs/01-demand-insight/user-journey.md`

### 方案设计模块（7个）

9. **pm-docs** - 文档生成
   - PRD产品需求文档
   - BRD商业需求文档
   - MRD市场需求文档
   - 生成：`docs/02-solution-design/prd.md`

10. **pm-proto** - 原型设计
    - 原型设计方案
    - 交互流程
    - 生成：`docs/02-solution-design/prototype.md`

11. **pm-tech** - 技术对接
    - 技术可行性分析
    - 技术对接方案
    - 生成：`docs/02-solution-design/tech-spec.md`

12. **pm-feature** - 功能细节
    - 功能拆解
    - 功能细节文档
    - 生成：`docs/02-solution-design/feature-breakdown.md`

13. **pm-data** - 数据指标
    - 数据指标体系
    - 关键指标定义
    - 深度数据分析（v2.0增强）
    - 生成：`docs/02-solution-design/metrics-system.md`

14. **pm-position** - 产品定位与商业化
    - 产品定位方案
    - 商业模式设计（v2.0增强）
    - 定价策略
    - 生成：`docs/02-solution-design/product-position.md`

15. **pm-user-story** - 用户故事
    - 用户故事清单
    - 验收标准
    - 生成：`docs/02-solution-design/user-stories.md`

### 增长迭代模块（7个）

16. **pm-aarrr** - AARRR增长分析
    - 获取、激活、留存、变现、推荐
    - 增长机会识别
    - 生成：`docs/03-growth-iteration/aarrr-analysis.md`

17. **pm-growth** - 增长方案
    - 增长策略
    - 增长执行方案
    - 生成：`docs/03-growth-iteration/growth-plan.md`

18. **pm-report** - 数据报告与用户反馈
    - 数据分析报告
    - 用户反馈汇总
    - 生成：`docs/03-growth-iteration/data-report.md`

19. **pm-abtest** - A/B测试
    - 实验设计
    - 结果分析
    - 生成：`docs/03-growth-iteration/abtest-plan.md`

20. **pm-iteration** - 迭代计划
    - 迭代规划
    - 迭代计划
    - 生成：`docs/03-growth-iteration/iteration-plan.md`

21. **pm-retro** - 迭代复盘
    - 迭代复盘报告
    - 改进建议
    - 生成：`docs/03-growth-iteration/retrospective.md`

22. **pm-roadmap** - 产品路线图
    - 版本规划
    - 产品路线图
    - 生成：`docs/03-growth-iteration/roadmap.md`

### 风控管理模块（5个）

23. **pm-agile** - 敏捷管理
    - 敏捷流程
    - 迭代管理
    - 生成：`docs/04-risk-management/agile-plan.md`

24. **pm-cross** - 跨部门协作
    - 协作流程
    - 沟通机制
    - 生成：`docs/04-risk-management/cross-team-collab.md`

25. **pm-risk** - 风险管控
    - 风险识别
    - 风险应对方案
    - 生成：`docs/04-risk-management/risk-control.md`

26. **pm-release** - 上线方案
    - 上线检查清单
    - 上线执行方案
    - 生成：`docs/04-risk-management/release-plan.md`

27. **pm-change** - 需求变更
    - 变更记录
    - 影响评估
    - 生成：`docs/04-risk-management/change-log.md`

### 产品战略模块（v2.0新增，5个）

28. **pm-portfolio** - 产品组合管理
    - 多产品线管理
    - BCG矩阵分析
    - 产品生命周期管理
    - 生成：`docs/05-product-strategy/portfolio-strategy.md`

29. **pm-resource** - 资源分配决策
    - 研发资源分配
    - ROI优先级评估
    - 资源冲突解决
    - 生成：`docs/05-product-strategy/resource-allocation.md`

30. **pm-business-model** - 商业模式设计
    - 商业模式画布
    - 收入模型设计
    - 定价策略
    - 生成：`docs/05-product-strategy/business-model.md`

31. **pm-funnel** - 漏斗分析优化
    - 转化漏斗搭建
    - 流失原因诊断
    - 优化建议生成
    - 生成：`docs/05-product-strategy/funnel-optimization.md`

32. **pm-decision** - 战略决策支持
    - 决策树/决策矩阵
    - 多维度评估
    - 自研vs外包vs收购决策
    - 生成：`docs/05-product-strategy/strategic-decision.md`

### 工具（1个）

33. **super-pm-upgrade** - 版本升级
    - 检测新版本
    - 执行升级

---

**总计**: 32个核心技能 + 1个工具 = 33个Skill

---

## 使用示例

### 示例1: 新产品从0到1

```
用户: 我要做一个生鲜电商产品

AI: 🎯 检测到您在规划新产品！

我建议从需求调研开始，系统地梳理产品方向。

是否开始执行 /pm-demand？

A) 是的，开始需求调研（推荐）
B) 我想先进行头脑风暴
C) 不需要，我有其他问题
```

### 示例2: 跨会话继续工作

```
用户: 继续

AI: 📊 检测到您的进度：
✅ 需求调研（已完成）
✅ 市场分析（已完成）
⏳ 优先级排序（未完成）

💡 建议继续执行 /pm-priority 进行优先级排序
```

### 示例3: 查看所有技能

```
用户: show skills

AI: 📚 super-pm 技能清单：

需求洞察模块（8个）:
- /pm-demand - 需求调研入口
- /pm-brainstorm - 头脑风暴
...
```

---

## 注意事项

1. **风险前置**：在需求调研阶段立即验证痛点
2. **MCP优先**：联网搜索优先使用MCP，WebSearch降级
3. **兜底机制**：文件缺失时提供替代方案
4. **Markdown存储**：所有文档人类可读可编辑
5. **流程推荐**：每个skill完成后推荐2-3个下一步选项