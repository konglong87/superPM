# super-pm Phase 1 实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 实现super-pm产品经理技能包的核心框架和需求洞察模块（8个skill + 主skill + 升级工具）

**Architecture:** 基于superpowers标准，使用纯Markdown SKILL.md文件定义每个skill，通过Claude Code的内置工具（Read/Write/AskUserQuestion）实现数据流转和交互

**Tech Stack:** Markdown, Claude Code内置工具, Git, Bash脚本（Preamble）

---

## Task 1: 创建项目基础结构

**Files:**
- Create: `~/.claude/skills/super-pm/VERSION`
- Create: `~/.claude/skills/super-pm/README.md`
- Create: `~/.claude/skills/super-pm/CHANGELOG.md`

**Step 1: 创建VERSION文件**

```bash
echo "v1.0.0" > ~/.claude/skills/super-pm/VERSION
```

**Step 2: 创建README.md**

使用Write工具创建 `~/.claude/skills/super-pm/README.md`：

```markdown
# super-pm 产品经理技能包

**版本**: v1.0.0
**对标**: superpowers/gstack 工业级标准

## 简介

super-pm 是专为产品经理设计的 Claude Code Skill Pack，覆盖需求洞察、方案设计、增长迭代、风控管理全生命周期。

## 核心特性

- ✅ 27个核心skill，简洁高效
- ✅ Markdown文件存储，人机可读
- ✅ 强制入口引导 + 流程推荐
- ✅ 风险前置，早期验证需求真伪
- ✅ 完善的兜底机制

## 快速开始

在Claude Code中执行：
```
/super-pm
```

或直接说："我要做一个XX产品"

## Skill清单

### 需求洞察模块（8个）
- `/pm-demand` - 需求调研入口
- `/pm-brainstorm` - 头脑风暴
- `/pm-clarify` - 需求细化与验证
- `/pm-market` - 市场分析
- `/pm-priority` - 优先级排序
- `/pm-mvp` - MVP规划
- `/pm-pool` - 需求池管理
- `/pm-journey` - 用户旅程

### 方案设计模块（7个）
- `/pm-docs` - 文档生成（PRD/BRD/MRD）
- `/pm-proto` - 原型设计
- `/pm-tech` - 技术对接
- `/pm-feature` - 功能细节
- `/pm-data` - 数据指标
- `/pm-position` - 产品定位与商业化
- `/pm-user-story` - 用户故事

### 增长迭代模块（7个）
- `/pm-aarrr` - AARRR增长分析
- `/pm-growth` - 增长方案
- `/pm-report` - 数据报告与用户反馈
- `/pm-abtest` - A/B测试
- `/pm-iteration` - 迭代计划
- `/pm-retro` - 迭代复盘
- `/pm-roadmap` - 产品路线图

### 风控管理模块（5个）
- `/pm-agile` - 敏捷管理
- `/pm-cross` - 跨部门协作
- `/pm-risk` - 风险管控
- `/pm-release` - 上线方案
- `/pm-change` - 需求变更

## 安装

```bash
git clone https://github.com/super-pm/super-pm.git ~/.claude/skills/super-pm
cd ~/.claude/skills/super-pm
git checkout v1.0.0
```

## 文档

完整设计方案：`docs/plans/2026-03-25-super-pm-design.md`

## 许可证

MIT License
```

**Step 3: 创建CHANGELOG.md**

使用Write工具创建 `~/.claude/skills/super-pm/CHANGELOG.md`：

```markdown
# Changelog

All notable changes to this project will be documented in this file.

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
```

**Step 4: 验证文件创建**

```bash
ls -la ~/.claude/skills/super-pm/ | grep -E "VERSION|README|CHANGELOG"
```

Expected output: 三个文件都存在

**Step 5: Commit**

```bash
cd ~/.claude/skills/super-pm
git add VERSION README.md CHANGELOG.md
git commit -m "feat: 创建项目基础文件（VERSION, README, CHANGELOG）"
```

---

## Task 2: 创建主SKILL.md

**Files:**
- Create: `~/.claude/skills/super-pm/SKILL.md`

**Step 1: 创建主SKILL.md文件**

使用Write工具创建 `~/.claude/skills/super-pm/SKILL.md`，内容参考设计文档第七部分的主SKILL.md详细设计。

内容要点：
- YAML front matter（name, version, description, allowed-tools）
- Preamble（创建目录、检测进度）
- 强制入口逻辑
- 流程推荐引擎
- Skill索引

**Step 2: 验证YAML格式正确**

```bash
grep -A 10 "^---" ~/.claude/skills/super-pm/SKILL.md
```

Expected: YAML front matter正确显示

**Step 3: 测试Skill是否可识别**

在Claude Code中执行 `/super-pm`，预期输出欢迎信息和当前进度。

**Step 4: Commit**

```bash
cd ~/.claude/skills/super-pm
git add SKILL.md
git commit -m "feat: 创建主SKILL.md（强制入口+流程推荐引擎）"
```

---

## Task 3: 创建pm-demand Skill

**Files:**
- Create: `~/.claude/skills/super-pm/01-demand-insight/pm-demand/SKILL.md`

**Step 1: 创建pm-demand目录和SKILL.md**

使用Write工具创建完整的SKILL.md，包含：
- YAML front matter
- Preamble
- 执行流程（收集信息、痛点验证、生成报告）

**关键要点**：
- 问题4必须询问痛点（风险前置）
- 使用AskUserQuestion逐个询问
- 生成需求调研报告到 `docs/01-需求调研/需求调研报告.md`

**Step 2: 验证文件结构**

```bash
find ~/.claude/skills/super-pm/01-demand-insight/pm-demand -name "SKILL.md"
```

Expected: 文件存在

**Step 3: 测试skill执行**

在Claude Code中执行 `/pm-demand`，测试：
- 能否正常询问问题
- 是否生成正确的文档

**Step 4: Commit**

```bash
cd ~/.claude/skills/super-pm
git add 01-demand-insight/pm-demand/SKILL.md
git commit -m "feat: 实现pm-demand需求调研skill（含痛点验证）"
```

---

## Task 4: 创建pm-brainstorm Skill

**Files:**
- Create: `~/.claude/skills/super-pm/01-demand-insight/pm-brainstorm/SKILL.md`

**Step 1: 创建pm-brainstorm SKILL.md**

参考superpowers:brainstorming，实现：
- 一次一个问题
- 每个问题3-5个选项
- 最后选项"其他（手动输入）"
- 逐步深入

**Step 2: 验证AskUserQuestion使用规范**

检查SKILL.md中是否每个问题都符合：
- 提供3-5个选项
- 最后选项是"其他（手动输入）"

**Step 3: 测试skill执行**

执行 `/pm-brainstorm`，验证：
- 问题是否逐个呈现
- 选项是否清晰
- 是否生成创意方案库

**Step 4: Commit**

```bash
cd ~/.claude/skills/super-pm
git add 01-demand-insight/pm-brainstorm/SKILL.md
git commit -m "feat: 实现pm-brainstorm头脑风暴skill（参考superpowers）"
```

---

## Task 5: 创建pm-clarify Skill

**Files:**
- Create: `~/.claude/skills/super-pm/01-demand-insight/pm-clarify/SKILL.md`

**Step 1: 创建pm-clarify SKILL.md**

功能：
- 读取需求调研报告
- 细化每个需求的细节（场景、边界条件）
- 生成确认需求清单

注意：真伪验证已在pm-demand完成，无需重复

**Step 2: 测试skill执行**

执行 `/pm-clarify`，验证：
- 能否正确读取前序文档
- 细化流程是否清晰
- 输出格式是否规范

**Step 3: Commit**

```bash
cd ~/.claude/skills/super-pm
git add 01-demand-insight/pm-clarify/SKILL.md
git commit -m "feat: 实现pm-clarify需求细化skill"
```

---

## Task 6: 创建pm-market Skill

**Files:**
- Create: `~/.claude/skills/super-pm/01-demand-insight/pm-market/SKILL.md`

**Step 1: 创建pm-market SKILL.md**

关键实现：
- MCP Search优先（exa-mcp）
- WebSearch降级
- 数据源优先级（艾瑞、易观、QuestMobile等）
- 搜索关键词组合

**Step 2: 在description中说明MCP优先**

YAML front matter中明确：
```yaml
description: |
  市场分析skill，优先使用MCP Search，降级WebSearch
```

**Step 3: 测试两种搜索方式**

- 测试MCP搜索（如果配置了exa-mcp）
- 测试WebSearch降级

**Step 4: Commit**

```bash
cd ~/.claude/skills/super-pm
git add 01-demand-insight/pm-market/SKILL.md
git commit -m "feat: 实现pm-market市场分析skill（MCP优先）"
```

---

## Task 7: 创建pm-priority Skill

**Files:**
- Create: `~/.claude/skills/super-pm/01-demand-insight/pm-priority/SKILL.md`

**Step 1: 创建pm-priority SKILL.md**

支持模型：
- RICE评分
- KANO模型
- MoSCoW法则

交互式评分输入，使用AskUserQuestion逐个询问每个需求的评分。

**Step 2: 测试RICE评分流程**

执行 `/pm-priority --method=rice`，验证：
- 能否正确引导评分
- 计算是否准确
- 输出格式是否清晰

**Step 3: Commit**

```bash
cd ~/.claude/skills/super-pm
git add 01-demand-insight/pm-priority/SKILL.md
git commit -m "feat: 实现pm-priority优先级排序skill（RICE/KANO/MoSCoW）"
```

---

## Task 8: 创建pm-mvp Skill

**Files:**
- Create: `~/.claude/skills/super-pm/01-demand-insight/pm-mvp/SKILL.md`

**Step 1: 创建pm-mvp SKILL.md**

功能：
- 选择MVP模式（最小/标准/全链路）
- 拆解核心功能集
- 3套方案对比
- 风险评估

**Step 2: 测试skill执行**

执行 `/pm-mvp`，验证：
- 能否读取优先级报告
- 功能选择是否灵活
- 方案对比是否清晰

**Step 3: Commit**

```bash
cd ~/.claude/skills/super-pm
git add 01-demand-insight/pm-mvp/SKILL.md
git commit -m "feat: 实现pm-mvp MVP规划skill"
```

---

## Task 9: 创建pm-pool Skill

**Files:**
- Create: `~/.claude/skills/super-pm/01-demand-insight/pm-pool/SKILL.md`

**Step 1: 创建pm-pool SKILL.md**

需求池管理功能：
- 收集需求
- 状态跟踪
- 优先级管理

**Step 2: 测试skill执行**

执行 `/pm-pool`，验证基本功能。

**Step 3: Commit**

```bash
cd ~/.claude/skills/super-pm
git add 01-demand-insight/pm-pool/SKILL.md
git commit -m "feat: 实现pm-pool需求池管理skill"
```

---

## Task 10: 创建pm-journey Skill

**Files:**
- Create: `~/.claude/skills/super-pm/01-demand-insight/pm-journey/SKILL.md`

**Step 1: 创建pm-journey SKILL.md**

用户旅程地图绘制：
- 拆解用户旅程阶段
- 分析用户行为、触点、痛点
- 绘制情绪曲线
- 识别机会点

**Step 2: 测试skill执行**

执行 `/pm-journey`，验证输出格式。

**Step 3: Commit**

```bash
cd ~/.claude/skills/super-pm
git add 01-demand-insight/pm-journey/SKILL.md
git commit -m "feat: 实现pm-journey用户旅程地图skill"
```

---

## Task 11: 创建super-pm-upgrade Skill

**Files:**
- Create: `~/.claude/skills/super-pm/super-pm-upgrade/SKILL.md`

**Step 1: 创建super-pm-upgrade SKILL.md**

功能：
- 检测当前版本
- 查询最新版本
- 对比版本
- 执行升级
- 支持回退

**Step 2: 测试升级流程**

执行 `/super-pm-upgrade`，验证：
- 能否正确检测版本
- 升级流程是否清晰

**Step 3: Commit**

```bash
cd ~/.claude/skills/super-pm
git add super-pm-upgrade/SKILL.md
git commit -m "feat: 实现super-pm-upgrade版本升级工具"
```

---

## Task 12: 集成测试与验证

**Step 1: 执行完整流程测试**

从 `/pm-demand` 开始，逐步执行到 `/pm-mvp`，验证：
- Skill间数据流转正常
- 文档生成格式正确
- 推荐机制工作正常

**Step 2: 测试兜底机制**

测试场景：
- 跳过步骤执行skill
- 文件缺失时的提示
- 跨会话恢复

**Step 3: 测试强制入口**

输入关键词（产品、需求、功能），验证是否正确推荐 `/pm-demand`

**Step 4: 修复发现的问题**

根据测试结果，修复Bug或优化体验。

**Step 5: 最终Commit**

```bash
cd ~/.claude/skills/super-pm
git add -A
git commit -m "test: Phase 1集成测试完成，修复已知问题"
```

---

## Task 13: 创建发布标签

**Step 1: 创建v1.0.0标签**

```bash
cd ~/.claude/skills/super-pm
git tag -a v1.0.0 -m "Release v1.0.0

Phase 1完成：
- ✅ 需求洞察模块（8个skill）
- ✅ 主SKILL.md
- ✅ 版本升级工具
- ✅ 完整文档

核心特性：
- 强制入口引导
- 流程推荐引擎
- 风险前置验证
- MCP优先搜索
- 完善兜底机制"
```

**Step 2: 验证标签创建成功**

```bash
git tag -l
```

Expected: 显示v1.0.0

---

## 验收标准

### 功能验收
- [ ] 10个skill全部可用（8个需求洞察 + 主skill + 升级工具）
- [ ] 强制入口逻辑正常
- [ ] 流程推荐准确
- [ ] 文档生成格式规范
- [ ] 异常兜底机制完善

### 性能验收
- [ ] Skill执行时间 < 30秒
- [ ] 文档生成时间 < 10秒

### 代码质量
- [ ] 所有SKILL.md符合superpowers规范
- [ ] YAML格式正确
- [ ] 文档清晰易读

---

**预计完成时间**: Phase 1 约1-2周（单人开发）

**下一步**: Phase 2 实现方案设计模块（7个skill）