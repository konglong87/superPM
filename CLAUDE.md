# CLAUDE.md - super-pm 项目配置文件

## 项目基本信息

**项目名称**: super-pm 产品经理技能包
**版本**: v1.0.0 (开发中)
**定位**: Claude Code Skill Pack，对标 superpowers/gstack
**目标用户**: 产品经理

---

## Git 提交规范

**重要规则**：所有 git commit 操作必须使用用户身份，**不要出现 AI 工具信息**

### ✅ 正确示例

```bash
git commit -m "feat: 实现pm-demand需求调研skill"
git commit -m "docs: 添加设计文档"
git commit -m "fix: 修复日期错误"
```

### ❌ 错误示例

```bash
git commit -m "feat: 实现功能

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## 文件管理规范

### 临时文件

**规则**：所有临时文件统一放到当前目录的 `tmp/` 文件夹

```bash
# 示例：临时备份文件
mkdir -p tmp/backup
mv old-files tmp/backup/
```

### 文档文件

**规则**：所有文档统一放到 `docs/` 文件夹及其子文件夹

```
docs/
├── plans/              # 设计文档、实施计划
│   ├── 2026-03-25-super-pm-design.md
│   └── 2026-03-25-super-pm-implementation-plan.md
└── README.md           # 项目说明
```

### 目录结构规范

**不要随便创建目录**，保持项目结构清晰：

```
/Users/konglong/GolandProjects/superPM/
├── CLAUDE.md           # 本配置文件
├── README.md           # 项目说明
├── docs/               # 文档目录
│   └── plans/          # 设计与计划
├── plan/               # 旧规划文档（待整理）
└── tmp/                # 临时文件
```

---

## 项目状态

### 当前阶段

**Phase 1: 核心Skill开发**

**已完成**：
- ✅ 设计方案文档（27个skill架构）
- ✅ 实施计划（13个任务）
- ✅ 临时文件清理（已移至 /tmp）

**进行中**：
- 🚧 准备开始 Phase 1 实施（10个核心skill）

**待完成**：
- ⏳ 需求洞察模块（8个skill）
- ⏳ 主SKILL.md
- ⏳ 版本升级工具

---

## Skill 架构概览

### 目录结构

```
~/.claude/skills/super-pm/
├── SKILL.md                    # 主skill
├── 01-demand-insight/          # 需求洞察（8个）
│   ├── pm-demand/
│   ├── pm-brainstorm/
│   ├── pm-clarify/
│   ├── pm-market/
│   ├── pm-priority/
│   ├── pm-mvp/
│   ├── pm-pool/
│   └── pm-journey/
├── 02-solution-design/         # 方案设计（7个）
├── 03-growth-iteration/        # 增长迭代（7个）
├── 04-risk-management/         # 风控管理（5个）
└── super-pm-upgrade/           # 升级工具
```

### 核心设计原则

1. **轻量级** - 纯Markdown指令，无代码依赖
2. **风险前置** - 需求调研时立即验证痛点
3. **一次一问** - 头脑风暴使用AskUserQuestion，每问题3-5选项
4. **MCP优先** - 搜索优先使用MCP，WebSearch降级
5. **Markdown存储** - 文档流转基于Markdown文件

---

## 开发流程

### Phase 1（当前）

**目标**：实现需求洞察模块 + 主skill + 升级工具

**任务清单**：
1. 创建项目基础结构
2. 创建主SKILL.md
3. 实现 pm-demand（需求调研）
4. 实现 pm-brainstorm（头脑风暴）
5. 实现 pm-clarify（需求细化）
6. 实现 pm-market（市场分析）
7. 实现 pm-priority（优先级排序）
8. 实现 pm-mvp（MVP规划）
9. 实现 pm-pool（需求池）
10. 实现 pm-journey（用户旅程）
11. 实现 super-pm-upgrade（升级工具）
12. 集成测试
13. 创建发布标签

**预计时间**：1-2周

---

## 文档引用

- **设计方案**: `docs/plans/2026-03-25-super-pm-design.md`
- **实施计划**: `docs/plans/2026-03-25-super-pm-implementation-plan.md`

---

## 注意事项

### 关键技能实现要点

**pm-demand**：
- 必须询问痛点（问题4），风险前置
- 验证真伪需求

**pm-brainstorm**：
- 参考 superpowers:brainstorming
- 一次一个问题
- 每问题3-5选项，最后"其他（手动输入）"

**pm-market**：
- MCP Search优先（exa-mcp）
- WebSearch降级
- 数据源：艾瑞、易观、QuestMobile

**主SKILL.md**：
- 强制入口逻辑（关键词检测）
- 流程推荐引擎
- 会话恢复检测

---

## 常用命令

```bash
# 查看当前进度
cat docs/plans/2026-03-25-super-pm-implementation-plan.md

# 进入skill目录
cd ~/.claude/skills/super-pm

# 查看已实现的skill
find ~/.claude/skills/super-pm -name "SKILL.md"

# 测试skill
# 在Claude Code中执行：/pm-demand
```

---

## 项目负责人

- **设计**: 用户 + Claude Code协作
- **开发**: 待执行
- **文档**: `docs/plans/`

---

**最后更新**: 2026-03-25
**状态**: 准备开始Phase 1实施