# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-03-26

### Added

#### Phase 4: 风控管理模块 (5 skills)

- **pm-agile** - 敏捷管理方案制定
  - 迭代节奏设计（周期、会议安排）
  - 任务看板设计（列设置、WIP限制）
  - 进度跟踪机制（燃尽图、团队速率）
  - 角色与职责分工
  - Git commit: 3aad059

- **pm-cross** - 跨部门协作方案制定
  - RACI职责矩阵
  - 协作流程设计（需求确认、设计评审、上线发布）
  - 沟通机制（会议安排、信息同步）
  - 决策机制（决策权归属、决策记录）
  - Git commit: 70e7954

- **pm-risk** - 风险管控方案制定
  - 风险识别清单（技术、进度、需求、外部风险）
  - 风险评估矩阵（概率×影响）
  - 风险应对计划（规避、缓解、转移、接受）
  - 风险监控机制（风险看板、预警机制）
  - Git commit: a5f5cef

- **pm-release** - 上线执行方案制定
  - 上线策略（灰度发布、蓝绿部署）
  - 上线检查清单（功能、性能、安全、备份）
  - 回滚方案（触发条件、回滚流程、时间要求）
  - 通知机制（上线前、中、后通知）
  - Git commit: 5d1313a

- **pm-change** - 需求变更管理
  - 变更申请流程
  - 影响评估（范围、程度）
  - 变更决策（审批级别、决策结果）
  - 变更控制委员会（CCB）
  - Git commit: 81b4d80

### Project Status

- **Total Skills**: 27/27 (100% complete)
- **Phase 1**: 需求洞察模块 (8/8) ✅
- **Phase 2**: 方案设计模块 (7/7) ✅
- **Phase 3**: 增长迭代模块 (7/7) ✅
- **Phase 4**: 风控管理模块 (5/5) ✅

---

## [1.0.0] - 2026-03-25

### Added

#### Phase 1: 需求洞察模块 (8 skills)

- **pm-demand** - 需求调研入口
  - 产品基础信息收集
  - 用户痛点识别与验证
  - 初步需求清单
  - 真伪需求即时验证

- **pm-brainstorm** - 头脑风暴
  - 一次一问交互模式
  - 多维度探索（功能、增长、商业、体验）
  - 创意方案库生成

- **pm-clarify** - 需求细化
  - 需求细节补充
  - 边界条件确认
  - 验收标准定义

- **pm-market** - 市场分析
  - MCP优先搜索策略
  - 市场规模、竞争格局分析
  - 行业趋势研判

- **pm-priority** - 优先级排序
  - RICE评分模型
  - KANO模型
  - MoSCoW优先级划分

- **pm-mvp** - MVP规划
  - MVP模式选择（最小/标准/全链路）
  - 核心功能集拆解
  - 3套方案对比

- **pm-pool** - 需求池管理
  - 需求分类管理
  - 状态跟踪
  - 优先级动态调整

- **pm-journey** - 用户旅程地图
  - 用户行为路径分析
  - 关键触点识别
  - 痛点与机会点标注

#### Phase 2: 方案设计模块 (7 skills)

- **pm-docs** - 文档生成
  - 智能推荐文档类型（PRD/BRD/MRD）
  - 增量生成机制
  - 标准化文档模板

- **pm-proto** - 原型设计
  - 信息架构设计
  - 原型工具推荐
  - 交互流程设计

- **pm-tech** - 技术对接
  - 技术栈推荐
  - API接口设计
  - 数据库设计建议

- **pm-feature** - 功能细节拆解
  - 用户场景分析
  - 技术实现要点
  - 边界条件处理

- **pm-data** - 数据指标体系
  - 北极星指标设计
  - 埋点方案
  - 数据分析框架

- **pm-position** - 产品定位
  - 市场定位分析
  - 商业模式设计
  - 竞争策略制定

- **pm-user-story** - 用户故事
  - Epic/Story拆分
  - 验收标准设计
  - 优先级排序

#### Phase 3: 增长迭代模块 (7 skills)

- **pm-aarrr** - AARRR增长分析
  - 用户生命周期分析
  - 增长瓶颈识别
  - 转化漏斗分析

- **pm-growth** - 增长方案
  - 获客激活策略
  - 留存变现策略
  - 增长实验设计

- **pm-report** - 数据报告
  - 日报/周报/月报
  - 用户反馈整理
  - 关键指标追踪

- **pm-abtest** - A/B测试
  - 测试假设设计
  - 样本量计算
  - 结果分析框架

- **pm-iteration** - 迭代计划
  - 需求优先级排序
  - 迭代排期
  - 资源分配

- **pm-retro** - 迭代复盘
  - 经验总结
  - 改进措施
  - 行动计划

- **pm-roadmap** - 产品路线图
  - 中长期规划
  - 里程碑设定
  - 版本规划

### Core Design Principles

- ✅ **轻量级** - 纯 Markdown 指令，无代码依赖
- ✅ **一次一问** - AskUserQuestion 逐个询问
- ✅ **MCP优先** - 搜索优先使用 MCP，WebSearch 降级
- ✅ **Markdown流转** - 前序 Write，后序 Read
- ✅ **风险前置** - 早期验证需求真伪
- ✅ **兜底机制** - 文件缺失、参数错误等异常处理

### Project Statistics

- **Total Skills**: 27
- **Lines of Code**: ~15,000+ Markdown
- **Development Sessions**: 4
- **Git Commits**: 27

---

## Future Roadmap

### v1.2.0 (Planned)

- 优化 skill 指令细节
- 增加更多行业模板
- 完善异常处理

### v1.3.0 (Planned)

- 团队协作功能
- 自定义模板支持
- 数据导出功能

### v2.0.0 (Planned)

- 多模型支持
- 自定义 skill 开发
- 插件生态

---

## References

- [superpowers](https://github.com/anthropics/superpowers) - Software engineering skill pack
- [Claude Code](https://claude.ai/code) - Official documentation
- [Keep a Changelog](https://keepachangelog.com/) - Changelog format