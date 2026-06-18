<div align="center">

# super-pm 产品经理技能包

**让每个产品经理都能轻轻松松的高效工作** ☕️ 📺 🚀

[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-≥0.15.0-orange.svg)](https://claude.ai/code)

</div>

---

## 📖 项目简介

**super-pm** 是专为产品经理设计的 Claude Code Skill Pack，提供全生命周期的产品管理工作流支持。

### 核心特性

- ✅ **38个技能** - 覆盖需求、方案、增长、风控、战略全流程
- ✅ **灵感火花激发** - AI主动生成创意灵感，解决"不知道做什么"困境 ⭐ NEW
- ✅ **轻量级设计** - 纯 Markdown 指令，无代码依赖
- ✅ **智能交互** - 一次一问，逐步引导
- ✅ **数据流转** - Markdown 文档自动传递，人类可读
- ✅ **风险前置** - 早期验证需求真伪，避免无效工作
- ✅ **兜底完善** - 异常处理、跨会话恢复、灵活跳过

---

## 🚀 快速开始

所有平台统一模式：**git clone → 创建链接 → 重启**

| 平台 | clone 目标路径 | skills 链接路径 | 验证命令 |
|------|---------------|----------------|---------|
| Claude Code ⭐ | — | Marketplace 一键安装 | `/super-pm` |
| OpenCode | `~/.config/opencode/super-pm` | `~/.config/opencode/skills/super-pm` | `use skill tool to list all skills` |
| Codex | `~/.codex/super-pm` | `~/.agents/skills/super-pm` | `list available skills` |
| Cursor | `~/.cursor/super-pm` | `~/.cursor/skills/super-pm` | `list skills` |

> 💡 Claude Code 最推荐：Marketplace 一键安装，自动注册 plugin + SessionStart hook，无需手动 clone。

### macOS / Linux

```bash
# Claude Code（最推荐 ⭐ — Marketplace 一键安装）
/plugin marketplace add konglong87/super-pm
/plugin install super-pm@super-pm-marketplace

# OpenCode
git clone https://github.com/konglong87/super-pm.git ~/.config/opencode/super-pm
mkdir -p ~/.config/opencode/skills && ln -s ~/.config/opencode/super-pm/skills ~/.config/opencode/skills/super-pm

# Codex
git clone https://github.com/konglong87/super-pm.git ~/.codex/super-pm
mkdir -p ~/.agents/skills && ln -s ~/.codex/super-pm/skills ~/.agents/skills/super-pm

# Cursor
git clone https://github.com/konglong87/super-pm.git ~/.cursor/super-pm
mkdir -p ~/.cursor/skills && ln -s ~/.cursor/super-pm/skills ~/.cursor/skills/super-pm
```

### Windows (PowerShell)

```powershell
# Claude Code（最推荐 ⭐ — Marketplace 一键安装）
/plugin marketplace add konglong87/super-pm
/plugin install super-pm@super-pm-marketplace

# OpenCode
git clone https://github.com/konglong87/super-pm.git "$env:USERPROFILE\.config\opencode\super-pm"
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.config\opencode\skills"
New-Item -ItemType Junction -Path "$env:USERPROFILE\.config\opencode\skills\super-pm" -Target "$env:USERPROFILE\.config\opencode\super-pm\skills"

# Codex
git clone https://github.com/konglong87/super-pm.git "$env:USERPROFILE\.codex\super-pm"
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.agents\skills"
cmd /c mklink /J "$env:USERPROFILE\.agents\skills\super-pm" "$env:USERPROFILE\.codex\super-pm\skills"

# Cursor
git clone https://github.com/konglong87/super-pm.git "$env:USERPROFILE\.cursor\super-pm"
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.cursor\skills"
New-Item -ItemType Junction -Path "$env:USERPROFILE\.cursor\skills\super-pm" -Target "$env:USERPROFILE\.cursor\super-pm\skills"
```

> 💡 **Cursor Hook 支持**：克隆完整仓库后，`.cursor-plugin/plugin.json` + `hooks/hooks-cursor.json` 可被 Cursor 插件系统发现，实现会话启动时自动注入 PM 技能上下文。

### 验证安装

重启后执行对应平台的验证命令（见上方表格）。看到 super-pm 欢迎信息即安装成功。

### 创建配置文件

在项目根目录创建 `PM-CLAUDE.md`:

```markdown
# 产品基础信息
产品名称: 我的电商小程序
产品定位: 生鲜配送平台
目标用户: 25-35岁一二线城市女性
业务目标: 提升复购率至40%

# 模式配置
product_mode: ToB
user_mode: beginner
auto_trigger: true

# 技能激活
skills: pm-skills
web_search: true
```

### 第一个需求调研

```bash
/pm-brainstorm    # 先发散再收敛
/pm-demand        # 方向明确后直接调研
```

---

## 🛤️ 黄金路径 — 从零到一的主线流程

38 个技能看起来很多，但大多数项目只需要走一条主线。以下是三条最常用的路径：

### 路径 A：新产品从零到一（最常用 ⭐）

```
/pm-brainstorm → /pm-demand → /pm-market → /pm-priority → /pm-mvp → /pm-docs → /pm-preview → /pm-tech → /pm-release
```

| 步骤 | 技能 | 产出 | 你要回答的问题 |
|------|------|------|---------------|
| 1 | `/pm-brainstorm` | 头脑风暴方案 | 产品方向有哪些可能性？目标用户是谁？ |
| 2 | `/pm-demand` | 需求调研报告 | 这个方向真值得做吗？用户痛点真实吗？ |
| 3 | `/pm-market` | 市场调研报告 | 市场有多大？竞品是谁？ |
| 4 | `/pm-priority` | 优先级排序报告 | 哪些需求先做？ |
| 5 | `/pm-mvp` | MVP方案 | 最小可行产品包含什么？ |
| 6 | `/pm-docs` | PRD文档 | 产品需求怎么写？ |
| 7 | `/pm-preview` | 浏览器实时预览 | 文档渲染效果对吗？内容确认无误？ |
| 8 | `/pm-tech` | 技术对接方案 | 技术上怎么做？ |
| 9 | `/pm-release` | 上线执行方案 | 怎么安全上线？ |

> 💡 **方向已明确？** 显式输入 `/pm-demand` 可直达，但需通过前置门禁。自然语言请求仍需先走 `/pm-brainstorm`。

### 路径 B：已有产品，优化增长

```
/pm-aarrr → /pm-growth → /pm-report → /pm-iteration
```

| 步骤 | 技能 | 产出 | 你要回答的问题 |
|------|------|------|---------------|
| 1 | `/pm-aarrr` | AARRR增长分析 | 增长漏斗哪里断了？ |
| 2 | `/pm-growth` | 增长执行方案 | 怎么修复？ |
| 3 | `/pm-report` | 数据报告 | 效果如何？ |
| 4 | `/pm-iteration` | 迭代计划 | 下一步做什么？ |

### 路径 C：战略决策（独立使用）

```
/pm-business-model → /pm-decision → /pm-portfolio → /pm-resource
```

| 步骤 | 技能 | 产出 | 你要回答的问题 |
|------|------|------|---------------|
| 1 | `/pm-business-model` | 商业模式画布 | 怎么赚钱？ |
| 2 | `/pm-decision` | 战略决策建议 | 选哪条路？ |
| 3 | `/pm-portfolio` | 产品组合战略 | 多产品线怎么管？ |
| 4 | `/pm-resource` | 资源分配方案 | 人和钱怎么分？ |

> 🎯 **记住：** 路径 A 覆盖 80% 的使用场景。其他 30 个技能是"按需调用"——遇到具体问题时再查 INDEX.md。

---

## 💡 灵感火花激发模式 ⭐ NEW

**v2.1.0 起支持** - 当你不知道做什么产品时，让AI主动为你激发灵感！

### 使用场景

- ❓ "我不知道做什么产品，需要灵感"
- 🔍 "想探索新的产品方向"
- 💡 "寻找创新机会点"

### 快速体验

```bash
/pm-brainstorm
```

选择 **E) 灵感火花激发**，AI将自动：

1. **多维搜索** - 从行业痛点、技术趋势、生活场景、跨界灵感4个维度搜索
2. **生成灵感火花表** - 自动生成10个产品创意，包含：
   - 产品概念（一句话描述）
   - 用户痛点
   - 技术可行性（高/中/低）
   - 市场潜力（高/中/低）
3. **智能推荐** - 从10个灵感中选择感兴趣的深入探索

### 示例输出

```
💡 已生成10个灵感火花：

| # | 产品概念               | 用户痛点              | 技术可行性 | 市场潜力 |
|---|------------------------|-----------------------|------------|----------|
| 1 | AI会议纪要自动生成器   | 会议效率低，纪要耗时  | 高         | 高       |
| 2 | 智能代码审查助手       | 代码质量难以把控      | 高         | 高       |
| 3 | 个人知识图谱构建工具   | 信息碎片化，难以体系化| 中         | 中       |
| 4 | 跨境电商合规助手       | 政策复杂，容易违规    | 高         | 高       |
| 5 | 智能健身计划生成器     | 缺乏专业指导          | 中         | 中       |
...

请选择您感兴趣的灵感进行深入探索！
```

### 搜索优先原则

灵感火花激发按优先级使用搜索工具，确保高质量搜索结果：

1. **AnySearch**（首选）— 中文搜索精准、垂直领域、批量搜索
2. **Exa MCP**（备选）— 神经语义搜索，适合英文/代码/公司搜索
3. **WebSearch**（兜底）— 仅当前两者不可用时使用

- **权威数据源**: 艾瑞咨询、易观分析、36氪、虎嗅
- **行业媒体**: MIT Technology Review、Product Hunt

输出: `docs/01-需求调研/创意方案库.md`

---

## 📊 核心技能（38个）

### 需求洞察模块 (9个)
- **pm-brainstorm** - 头脑风暴 ⭐ 先发散再收敛，支持灵感火花激发模式
- **pm-demand** - 需求调研入口
- **pm-clarify** - 需求细化与验证
- **pm-market** - 市场分析与竞品研究
- **pm-search** - 联网调研整合（市场/竞品/数据/舆情/合规）
- **pm-priority** - 优先级排序（RICE/KANO/MoSCoW）
- **pm-mvp** - MVP最小可行产品拆解
- **pm-pool** - 需求池管理
- **pm-journey** - 用户旅程地图

### 方案设计模块 (7个)
- **pm-docs** - 文档生成（BRD/MRD/PRD）
- **pm-proto** - 原型设计
- **pm-tech** - 技术对接方案
- **pm-feature** - 功能细节拆解
- **pm-data** - 数据指标体系
- **pm-position** - 产品定位与商业模式
- **pm-user-story** - 用户故事

### 增长迭代模块 (8个)
- **pm-aarrr** - 增长分析
- **pm-growth** - 增长方案
- **pm-report** - 数据报告（周报/月报/季报）
- **pm-feedback** - 用户反馈分析
- **pm-abtest** - A/B测试方案
- **pm-iteration** - 迭代计划
- **pm-retro** - 迭代复盘
- **pm-roadmap** - 产品路线图

### 风控管理模块 (5个)
- **pm-agile** - 敏捷管理
- **pm-cross** - 跨部门协作
- **pm-risk** - 风险管控
- **pm-release** - 上线方案
- **pm-change** - 需求变更管理

### 产品策略模块 (5个)
- **pm-business-model** - 商业模式画布
- **pm-decision** - 战略决策支持
- **pm-funnel** - 漏斗分析优化
- **pm-portfolio** - 产品组合管理
- **pm-resource** - 资源分配与ROI

### 辅助工具 (3个)
- **pm-preview** - 文档实时预览 ⭐ NEW — WebSocket 服务器 + 浏览器 MD 渲染 + 自动刷新
- **super-pm-upgrade** - 版本升级工具
- **start-super-pm** - 启动引导入口

---

## 💡 平台运维

### 更新

| 平台 | 命令 |
|------|------|
| Claude Code | `/plugin update super-pm` |
| OpenCode | `cd ~/.config/opencode/super-pm && git pull` |
| Codex | `cd ~/.codex/super-pm && git pull` |
| Cursor | `cd ~/.cursor/super-pm && git pull` |

---

## 📚 文档

- [技能索引](./skills/INDEX.md) - 全部 38 个技能及依赖关系
- [更新日志](./skills/CHANGELOG.md) - 版本历史
- [Skill 模板](./skills/templates/subagent-skill-template.md) - Subagent 架构模板与最佳实践

---

## 🤝 贡献

欢迎贡献代码、报告Bug、提出建议！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

---

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

---

## 📧 联系方式

- 📧 Email: 2235998553@qq.com
- 🐛 Bug反馈: [GitHub Issues](https://github.com/konglong87/super-pm/issues)
- 💡 功能建议: [GitHub Discussions](https://github.com/konglong87/super-pm/discussions)

---

## 🙏 致谢

感谢以下开源项目的启发:
- [Claude Code](https://claude.com/code) - AI编程助手

---

**PM-Skills Team** © 2026
