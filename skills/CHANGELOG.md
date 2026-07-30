# Changelog

All notable changes to this project will be documented in this file.

## [2.6.2] - 2026-07-30

### Added
- **06-experts 专家视角模块** — 首个专家技能 `steve-jobs-perspective`（乔布斯思维与表达DNA）
- 技能总数 45 → 46（41 核心 + 5 工具）
- 中度适配：新增「对话模式 / 思维碰撞循环」「学习内化引导」「与 superPM 配合」三块，支持用户以乔布斯视角持续对话、碰撞灵感、内化思考
- 补 `allowed-tools`、修源文件悬空引用 `references/research/`

### Changed
- `skills/SKILL.md` 根入口与 `start-super-pm` 路由新增「视角/顾问类」触发，自然语言请求直达本技能（不走 brainstorm 前置门禁）
- `INDEX.md` / `README.md` / `skills/README.md` / `llms.txt` / `package.json` 计数与版本号同步为 46 / v2.6.2

> 注：pm-skills（方法论）、lenny-skills（实战智慧）作为「专家 / 方法论 / 智慧」统一容器的后续候选，本期未合并。

## [2.6.1] - 2026-07-30

### Changed
- P0 优化：全包子技能 Preamble 去重（`check-update.sh` 调用路径修正 + 版本打印收归脚本），42 个子技能 SKILL.md 批量精简；`pm-selfcheck`/`super-pm-upgrade` 功能代码不受影响

## [2.6.0] - 2026-07-30

### Added
- **新增 5 个技能（总数 40 → 45，35+5 → 40+5）**：
  - `pm-geo` — GEO / AI 搜索优化（03 增长迭代）：提升产品在 ChatGPT/Perplexity/AI Overviews 等生成式引擎的可见性与被推荐率
  - `pm-competitor` — 竞品监控（01 需求洞察）：持续追踪竞品动态、建立基线、异动预警与监控月报（与 pm-market 一次性研究区分）
  - `pm-prd-review` — PRD/BRD/MRD 评审（02 方案设计）：六维清单把关文档质量，开发前评审（与 pm-docs 生成区分）
  - `pm-interview` — 用户访谈（01 需求洞察）：一手定性研究的设计、提纲、招募与执行指引（与 pm-demand 案头调研区分）
  - `pm-okr` — OKR 目标管理（03 增长迭代）：目标拆解、对齐地图与复盘节奏（与 pm-iteration 执行排期区分）
- 全部新技能遵循 v2 subagent 架构与跨 Agent 兜底规则，搜索类技能沿用 AnySearch → Exa MCP → WebSearch 优先级

### Changed
- `start-super-pm` 路由新增 5 个技能的触发信号与关键词
- `skills/SKILL.md` 根入口关键词表增补 GEO/竞品监控/PRD评审/用户访谈/OKR
- `INDEX.md` 计数与依赖图更新、更新日期同步
- `README.md` / `llms.txt` / `package.json` 模块计数与版本号同步为 45 / v2.6.0

## [2.5.0] - 2026-07

### Added
- **pm-selfcheck 健康自检工具** — 元数据完整性、体积、文档路径、搜索依赖、跨 Agent 兜底覆盖率五项检测
- 技能总数扩展至 **40**（35 核心 + 5 工具）

### Changed
- **全文档版本与计数口径统一**：README / llms.txt / package.json / INDEX / skills/README.md 一致为 40 个技能（35 核心 + 5 工具），修正此前 37/39 混用
- **super-pm-upgrade 版本历史**补全至 v2.5.0（原停留在 v2.0.0「计划中」）
- **pm-selfcheck 修复 VERSION 检测路径**：原先向上查找两级父目录，会误判每个子技能目录「缺失 VERSION」；改为向上查找技能包根目录，并移除对固定安装路径 `~/.claude/skills/super-pm` 的硬编码依赖

> 注：2.4.x 中间版本的详细变更见 git 提交历史。

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