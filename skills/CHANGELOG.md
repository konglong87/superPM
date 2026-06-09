# Changelog

All notable changes to this project will be documented in this file.

## [2.3.2] - 2026-06-09

### Fixed
- pm-funnel 前置文档路径修复：`01-需求洞察` → `01-需求调研`，修复前置检查永远失败的问题

## [2.3.0] - 2026-05-31

### Added
- 黄金路径主线引导：README 和根 SKILL.md 新增三条主线路径（新产品从零到一、优化增长、战略决策），降低 37 技能认知负担
- check-update.sh 5秒超时机制：git fetch 后台执行 + 超时轮询，防止网络卡顿阻塞会话启动

### Fixed
- README 版本历史去重（移除重复的 v2.2.0 计划中条目）
- README 核心技能标题从"34个"修正为"37个"

## [2.2.0] - 2026-05-31

### Added
- pm-brainstorm v2.2.1 灵感火花 4 维搜索，subagent 并行架构
- check-update 自动更新检测，所有 skill 会话首执行静默检查

### Changed
- 32 个核心技能全面升级至 v2.0.0+，采用 subagent 并行架构
- Token 使用量平均节省 80%+
- 执行速度提升 2-4x
- 版本体系统一：VERSION、package.json、plugin.json、skills/VERSION 全部对齐
- 产品策略模块 5 个技能升级至 v2.0.0+

## [2.1.0] - 2026-05-20

### Added
- 产品策略模块新增：pm-portfolio、pm-resource、pm-decision
- 技能总数扩展至 37

### Changed
- pm-funnel、pm-business-model、pm-position 升级至 v2 架构

## [2.0.0] - 2026-04

### Changed
- Subagent 并行架构全面升级
- 所有核心技能迁移至 v2 格式
- Token 大幅优化

## [1.1.0] - 2026-03

### Added
- 灵感火花激发模式（pm-brainstorm）
- 技能扩展至 27+

## [1.0.0] - 2026-03-25

### Added
- 🎉 Initial release
- ✨ 27 core skills for product managers
- 📚 Demand insight module (8 skills)
- 🎨 Solution design module (7 skills)
- 📈 Growth iteration module (7 skills)
- 🛡️ Risk management module (5 skills)
- 🔧 Upgrade tool skill
- 📖 Complete design documentation

### Features
- Keyword-triggered entry point
- Workflow recommendation engine
- Risk-first validation in demand research
- MCP-prioritized web search
- Markdown-based data flow
- Comprehensive fallback mechanisms