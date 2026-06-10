# super-pm 产品经理技能包

**版本**: v2.3.3 | **状态**: 生产就绪 ✅
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-≥0.15.0-orange.svg)](https://claude.ai/code)

---

## 📖 项目简介

**super-pm** 是专为产品经理设计的 Claude Code Skill Pack，提供全生命周期的产品管理工作流支持。

### 核心特性

- ✅ **37个技能** - 覆盖需求、方案、增长、风控、战略全流程
- ✅ **灵感火花激发** - AI主动生成创意灵感，解决"不知道做什么"困境 ⭐ NEW
- ✅ **轻量级设计** - 纯 Markdown 指令，无代码依赖
- ✅ **智能交互** - 一次一问，逐步引导
- ✅ **数据流转** - Markdown 文档自动传递，人类可读
- ✅ **风险前置** - 早期验证需求真伪，避免无效工作
- ✅ **兜底完善** - 异常处理、跨会话恢复、灵活跳过

---

## 🚀 快速开始

### 方式一：Claude Code Marketplace 安装（最推荐 ⭐）

#### 方法 A：GitHub 一键安装

在 Claude Code 会话中直接告诉 AI：

```
安装这个 skill：https://github.com/konglong87/super-pm
```

#### 方法 B：注册 Marketplace 后安装

1. 注册 super-pm 的 Marketplace：
```bash
/plugin marketplace add konglong87/super-pm
```

2. 从 Marketplace 安装：
```bash
/plugin install super-pm@super-pm-marketplace
```

安装后重启 Claude Code 自动生效。

### 方式二：Git Clone 一键安装

在 Claude Code 会话中直接执行：

```bash
# 安装最新版本
git clone https://github.com/konglong87/super-pm.git ~/.claude/skills/super-pm
```

重启 Claude Code 后自动生效。

### 方式三：本地开发安装

```bash
# 克隆仓库
git clone https://github.com/konglong87/super-pm.git
cd super-pm

# 创建软链接到 Claude Code skills 目录
ln -s $(pwd)/skills ~/.claude/skills/super-pm

# 验证安装
ls -la ~/.claude/skills/super-pm/SKILL.md
```

### 方式四：从发布版本安装

```bash
# 下载最新发布版本
cd /tmp
curl -L https://github.com/konglong87/super-pm/archive/refs/tags/v2.3.3.tar.gz -o super-pm.tar.gz
tar -xzf super-pm.tar.gz
mv super-pm-2.3.3 ~/.claude/skills/super-pm
```

### 方式五：OpenCode 安装

**适用于 OpenCode.ai 用户**

```bash
# macOS / Linux
# 1. 克隆仓库
git clone https://github.com/konglong87/super-pm.git ~/.config/opencode/super-pm

# 2. 创建 skills 目录并链接
mkdir -p ~/.config/opencode/skills
ln -s ~/.config/opencode/super-pm/skills ~/.config/opencode/skills/super-pm

# 3. 重启 OpenCode
```

**Windows (PowerShell):**
```powershell
# 1. 克隆仓库
git clone https://github.com/konglong87/super-pm.git "$env:USERPROFILE\.config\opencode\super-pm"

# 2. 创建 skills 目录和链接
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.config\opencode\skills"
New-Item -ItemType Junction -Path "$env:USERPROFILE\.config\opencode\skills\super-pm" -Target "$env:USERPROFILE\.config\opencode\super-pm\skills"

# 3. 重启 OpenCode
```

### 方式六：Codex 安装

**适用于 OpenAI Codex CLI 用户**

```bash
# macOS / Linux
# 1. 克隆仓库
git clone https://github.com/konglong87/super-pm.git ~/.codex/super-pm

# 2. 创建 skills 链接
mkdir -p ~/.agents/skills
ln -s ~/.codex/super-pm/skills ~/.agents/skills/super-pm

# 3. 重启 Codex
```

**Windows (PowerShell):**
```powershell
# 1. 克隆仓库
git clone https://github.com/konglong87/super-pm.git "$env:USERPROFILE\.codex\super-pm"

# 2. 创建 skills 链接
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.agents\skills"
cmd /c mklink /J "$env:USERPROFILE\.agents\skills\super-pm" "$env:USERPROFILE\.codex\super-pm\skills"

# 3. 重启 Codex
```

### 方式七：Cursor 安装

**适用于 Cursor 编辑器用户**

Cursor 兼容 `.claude/skills/` 和 `.cursor/skills/` 两种路径。

```bash
# macOS / Linux
# 1. 克隆完整仓库（包含 .cursor-plugin/ 和 hooks/）
git clone https://github.com/konglong87/super-pm.git ~/.cursor/super-pm

# 2. 创建 skills 链接（二选一）
# 方案 A：链接到 Cursor 专属目录
mkdir -p ~/.cursor/skills
ln -s ~/.cursor/super-pm/skills ~/.cursor/skills/super-pm
# 方案 B：链接到 Claude Code 共享目录（Cursor 也会读取）
mkdir -p ~/.claude/skills
ln -s ~/.cursor/super-pm/skills ~/.claude/skills/super-pm

# 3. 重启 Cursor
```

**Windows (PowerShell):**
```powershell
# 1. 克隆完整仓库
git clone https://github.com/konglong87/super-pm.git "$env:USERPROFILE\.cursor\super-pm"

# 2. 创建 skills 链接
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.cursor\skills"
New-Item -ItemType Junction -Path "$env:USERPROFILE\.cursor\skills\super-pm" -Target "$env:USERPROFILE\.cursor\super-pm\skills"

# 3. 重启 Cursor
```

> 💡 **Hook 支持**：克隆完整仓库后，`.cursor-plugin/plugin.json` + `hooks/hooks-cursor.json` 可被 Cursor 插件系统发现，实现会话启动时自动注入 PM 技能上下文和速查卡片。

### 验证安装

在 Claude Code 中执行：

```
/super-pm
```

如果看到 super-pm 的欢迎信息，说明安装成功！

**OpenCode 用户验证：**
```
use skill tool to list all skills
```

**Codex 用户验证：**
```
list available skills
```

**Cursor 用户验证：**
```
list skills
```

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

头脑风暴明确方向后：

```bash
/pm-demand
```

输出: `docs/01-需求调研/需求调研报告.md`

> 💡 新项目建议从 `/pm-brainstorm` 开始，先发散再收敛。

---

## 🛤️ 黄金路径 — 从零到一的主线流程

37 个技能看起来很多，但大多数项目只需要走一条主线。以下是三条最常用的路径：

### 路径 A：新产品从零到一（最常用 ⭐）

```
/pm-brainstorm → /pm-demand → /pm-market → /pm-priority → /pm-mvp → /pm-docs → /pm-tech → /pm-release
```

| 步骤 | 技能 | 产出 | 你要回答的问题 |
|------|------|------|---------------|
| 1 | `/pm-brainstorm` | 头脑风暴方案 | 产品方向有哪些可能性？目标用户是谁？ |
| 2 | `/pm-demand` | 需求调研报告 | 这个方向真值得做吗？用户痛点真实吗？ |
| 3 | `/pm-market` | 市场调研报告 | 市场有多大？竞品是谁？ |
| 4 | `/pm-priority` | 优先级排序报告 | 哪些需求先做？ |
| 5 | `/pm-mvp` | MVP方案 | 最小可行产品包含什么？ |
| 6 | `/pm-docs` | PRD文档 | 产品需求怎么写？ |
| 7 | `/pm-tech` | 技术对接方案 | 技术上怎么做？ |
| 8 | `/pm-release` | 上线执行方案 | 怎么安全上线？ |

> 💡 **方向已明确？** 可直接从 `/pm-demand` 开始，跳过头脑风暴。

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

> 🎯 **记住：** 路径 A 覆盖 80% 的使用场景。其他 29 个技能是"按需调用"——遇到具体问题时再查 INDEX.md。

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

## 📊 核心技能（37个）

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

---

## 💡 平台说明

#### Claude Code
- ✅ **推荐方式**：使用 Marketplace 安装（方式一）
- 自动发现所有 skills
- 支持 `/skill-name` 快捷调用

#### OpenCode
- 使用 OpenCode 的原生 `skill` 工具
- Skills 位置：`~/.config/opencode/skills/super-pm/`
- 支持项目级 skills (`.opencode/skills/`)

#### Codex
- Codex 原生扫描 `~/.agents/skills/` 目录
- Skills 自动发现并加载
- 通过 `using-super-pm` skill 强制使用

#### Cursor
- Cursor 支持自定义 skills 目录
- Skills 通过符号链接集成
- 需要重启 Cursor 加载新 skills

### 更新插件

#### Claude Code
```bash
/plugin update super-pm
```

#### OpenCode
```bash
cd ~/.config/opencode/super-pm
git pull
# 重启 OpenCode
```

#### Codex
```bash
cd ~/.codex/super-pm
git pull
# 重启 Codex
```

#### Cursor
```bash
cd ~/.cursor/super-pm
git pull
# 重启 Cursor
```

### 卸载插件

#### Claude Code
```bash
/plugin uninstall super-pm
```

#### OpenCode (macOS/Linux)
```bash
rm ~/.config/opencode/skills/super-pm
rm -rf ~/.config/opencode/super-pm
```

#### OpenCode (Windows)
```powershell
Remove-Item "$env:USERPROFILE\.config\opencode\skills\super-pm"
Remove-Item -Recurse -Force "$env:USERPROFILE\.config\opencode\super-pm"
```

#### Codex (macOS/Linux)
```bash
rm ~/.agents/skills/super-pm
rm -rf ~/.codex/super-pm
```

#### Codex (Windows)
```powershell
Remove-Item "$env:USERPROFILE\.agents\skills\super-pm"
Remove-Item -Recurse -Force "$env:USERPROFILE\.codex\super-pm"
```

#### Cursor (macOS/Linux)
```bash
rm ~/.cursor/skills/super-pm
rm -rf ~/.cursor/super-pm
```

#### Cursor (Windows)
```powershell
Remove-Item "$env:USERPROFILE\.cursor\skills\super-pm"
Remove-Item -Recurse -Force "$env:USERPROFILE\.cursor\super-pm"
```

---

## 💡 核心优化

### 参数化设计，一专多能

```bash
# 搜索技能支持多种模式
/pm-search --type=market      # 市场调研
/pm-search --type=competitor  # 竞品分析
/pm-search --type=data        # 行业数据
/pm-search --type=all         # 综合搜索

# 文档生成支持多种类型
/pm-docs --type=prd   # 产品需求文档
/pm-docs --type=brd   # 商业需求文档
/pm-docs --type=all   # 全套文档

# 优先级排序支持多种模型
/pm-priority --method=rice      # RICE评分
/pm-priority --method=kano      # KANO模型
/pm-priority --method=combined  # 多模型融合
```

---

版本历史详见 [CHANGELOG.md](skills/CHANGELOG.md)。

## 📚 文档

- [技能索引](./skills/INDEX.md) - 全部 37 个技能及依赖关系
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

**让每个产品经理都能轻轻松松的高效工作** ☕️ 📺 🚀
