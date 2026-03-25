# super-pm 产品经理技能包设计方案

**版本**: v1.0.0
**创建日期**: 2025-03-25
**作者**: Claude Code + 用户协作设计
**状态**: 已批准，待实现

---

## 一、项目概述

### 1.1 项目定位

**super-pm** 是专为产品经理设计的 Claude Code Skill Pack，对标 superpowers/gstack 的工业级标准。

**核心价值**：
- 覆盖产品经理全生命周期工作流程
- 27个核心技能，简洁高效
- Markdown文件存储，人机可读
- AI原生设计，无需代码

**目标用户**：
- 产品经理（ToB/ToC）
- 产品负责人
- 创业者
- 需要产品思维的其他角色

### 1.2 核心设计原则

1. **轻量级** - 纯Markdown指令，无代码依赖
2. **渐进式** - 手动触发 + 流程推荐，用户可控
3. **风险前置** - 早期验证需求真伪，避免无效工作
4. **灵活兜底** - 支持跳过步骤、跨会话恢复、异常处理
5. **标准兼容** - 100%遵循 superpowers 规范

---

## 二、整体架构

### 2.1 目录结构

```
~/.claude/skills/super-pm/
├── SKILL.md                          # 主skill（索引+强制入口+推荐）
│
├── 01-demand-insight/                # 需求洞察模块（8个skill）
│   ├── pm-demand/SKILL.md            # 需求调研入口
│   ├── pm-brainstorm/SKILL.md        # 头脑风暴
│   ├── pm-clarify/SKILL.md           # 需求细化与验证
│   ├── pm-market/SKILL.md            # 市场分析
│   ├── pm-priority/SKILL.md          # 优先级排序
│   ├── pm-mvp/SKILL.md               # MVP规划
│   ├── pm-pool/SKILL.md              # 需求池管理
│   └── pm-journey/SKILL.md           # 用户旅程
│
├── 02-solution-design/               # 方案设计模块（7个skill）
│   ├── pm-docs/SKILL.md              # 文档生成（PRD/BRD/MRD）
│   ├── pm-proto/SKILL.md             # 原型设计
│   ├── pm-tech/SKILL.md              # 技术对接
│   ├── pm-feature/SKILL.md           # 功能细节
│   ├── pm-data/SKILL.md              # 数据指标
│   ├── pm-position/SKILL.md          # 产品定位与商业化
│   └── pm-user-story/SKILL.md        # 用户故事
│
├── 03-growth-iteration/              # 增长迭代模块（7个skill）
│   ├── pm-aarrr/SKILL.md             # AARRR增长分析
│   ├── pm-growth/SKILL.md            # 增长方案
│   ├── pm-report/SKILL.md            # 数据报告与用户反馈
│   ├── pm-abtest/SKILL.md            # A/B测试
│   ├── pm-iteration/SKILL.md         # 迭代计划
│   ├── pm-retro/SKILL.md             # 迭代复盘
│   └── pm-roadmap/SKILL.md           # 产品路线图
│
├── 04-risk-management/               # 风控管理模块（5个skill）
│   ├── pm-agile/SKILL.md             # 敏捷管理
│   ├── pm-cross/SKILL.md             # 跨部门协作
│   ├── pm-risk/SKILL.md              # 风险管控
│   ├── pm-release/SKILL.md           # 上线方案
│   └── pm-change/SKILL.md            # 需求变更
│
├── super-pm-upgrade/SKILL.md         # 版本升级工具
└── docs/
    └── plans/                        # 设计文档
```

**总计**：8 + 7 + 7 + 5 + 1(升级) = 28个skill

### 2.2 Skill生命周期

```
触发阶段
├── 关键词检测 → 主SKILL.md推荐执行
├── 用户主动执行斜杠命令
└── 其他skill推荐

↓

前置检查
├── 检查依赖文件是否存在
├── 检查必要参数
└── 决定是否继续

↓

执行阶段
├── Preamble（创建目录等）
├── 询问用户信息
├── AI处理内容
├── 调用Write生成文档
└── 输出结果

↓

后置处理
├── 推荐下一步skill
├── 记录执行日志（可选）
└── 结束

↓

异常处理（兜底）
├── 文件不存在 → 提示执行前序skill
├── 参数缺失 → 引导用户输入
└── 执行失败 → 提供回退方案
```

---

## 三、核心机制设计

### 3.1 Skill间联动机制

**方案**：基于Markdown文件的松耦合联动

**核心原理**：
- 前序skill：使用Write工具输出Markdown文件
- 后序skill：使用Read工具读取文件 + AI理解内容
- 无需复杂的状态管理或数据库

**数据流转示例**：

```markdown
1. pm-demand 执行
   → Write: docs/01-需求调研/需求调研报告.md

2. pm-clarify 执行
   → Read: docs/01-需求调研/需求调研报告.md
   → AI理解内容，提取需求列表
   → Write: docs/01-需求调研/确认需求清单.md

3. pm-priority 执行
   → Read: docs/01-需求调研/确认需求清单.md
   → AI理解内容，提取需求
   → Write: docs/01-需求调研/优先级排序报告.md
```

**优势**：
- ✅ 简单可靠，无需状态机
- ✅ 人类可读，可直接编辑
- ✅ 支持跳过步骤（手动创建文件）
- ✅ 支持回退（修改文件后重新执行）
- ✅ Git版本管理友好

### 3.2 文档命名规范

```
docs/
├── 01-需求调研/
│   ├── 需求调研报告.md           # pm-demand 输出
│   ├── 创意方案库.md             # pm-brainstorm 输出
│   ├── 确认需求清单.md           # pm-clarify 输出
│   ├── 市场调研报告.md           # pm-market 输出
│   ├── 优先级排序报告.md         # pm-priority 输出
│   ├── MVP方案.md                # pm-mvp 输出
│   ├── 需求池管理表.md           # pm-pool 输出
│   └── 用户旅程地图.md           # pm-journey 输出
│
├── 02-方案设计/
│   ├── PRD产品需求文档.md
│   ├── BRD商业需求文档.md
│   ├── MRD市场需求文档.md
│   ├── 原型设计方案.md
│   ├── 技术对接方案.md
│   ├── 功能细节拆解.md
│   ├── 数据指标体系.md
│   ├── 产品定位方案.md
│   └── 用户故事清单.md
│
├── 03-增长迭代/
│   ├── AARRR增长分析.md
│   ├── 增长执行方案.md
│   ├── 数据报告与用户反馈.md
│   ├── A/B测试方案.md
│   ├── 迭代计划.md
│   ├── 迭代复盘报告.md
│   └── 产品路线图.md
│
└── 04-风控管理/
    ├── 敏捷管理方案.md
    ├── 跨部门协作方案.md
    ├── 风险管控方案.md
    ├── 上线执行方案.md
    └── 需求变更记录.md
```

### 3.3 强制入口逻辑

**触发关键词**：

**产品类**：产品、功能、特性、模块、新产品、商业模式、盈利模式

**需求类**：需求、痛点、用户需要、需求池、需求清单

**用户类**：用户、目标用户、用户画像、用户体验、用户反馈

**市场类**：市场、竞品、行业、市场规模、竞争格局

**场景类**：从0到1、从零开始、新项目、新业务、MVP

**触发后响应**：

```markdown
用户: "我要做一个生鲜电商产品"

AI: 🎯 检测到您在规划新产品！

我建议从需求调研开始，系统地梳理产品方向。

是否开始执行 /pm-demand？

A) 是的，开始需求调研（推荐）
B) 不需要，我有其他问题
```

### 3.4 流程推荐引擎

**规则1: 基于当前状态推荐**

```markdown
需求洞察阶段：
- 如果需求调研未完成 → 推荐 /pm-demand
- 如果需求完成但无市场分析 → 推荐 /pm-market
- 如果有市场数据但无优先级 → 推荐 /pm-priority
- 如果有优先级但无MVP → 推荐 /pm-mvp

方案设计阶段：
- 如果MVP完成但无PRD → 推荐 /pm-docs
- 如果PRD完成但无技术方案 → 推荐 /pm-tech
- 如果技术方案完成但无数据指标 → 推荐 /pm-data

增长迭代阶段：
- 如果产品上线 → 推荐 /pm-aarrr
- 如果增长分析完成 → 推荐 /pm-growth
- 如果有数据报告 → 推荐 /pm-iteration

风控管理阶段：
- 如果技术方案完成 → 推荐 /pm-risk
- 如果风险管控完成 → 推荐 /pm-release
```

**规则2: 多选项推荐**

每个skill完成后，提供2-3个下一步选项：

```markdown
✅ 需求调研完成！

🎯 建议下一步（按优先级）：
1. 执行 /pm-brainstorm 探索更多可能性（推荐）
2. 执行 /pm-clarify 细化并验证需求
3. 或直接执行 /pm-market 获取市场数据
```

### 3.5 兜底机制

#### 场景1: 依赖文件缺失

**问题**：用户执行 `/pm-priority` 但未执行 `/pm-clarify`

**兜底方案**：

```markdown
⚠️ 未找到需求清单文件

您可以选择：
A) 执行 /pm-clarify 完成需求细化
B) 手动输入需求列表（快速模式）
C) 从需求池导入（执行过 /pm-pool）

如果用户选择B：
- 使用 AskUserQuestion 逐个收集需求
- 继续执行优先级排序
```

#### 场景2: 跨会话工作

**问题**：用户昨天做了需求调研，今天想继续

**兜底方案**：

主SKILL.md的Preamble检测：

```bash
# 检测当前进度
_DEMAND_DONE=$([ -f "docs/01-需求调研/需求调研报告.md" ] && echo "✅" || echo "⏳")
_MARKET_DONE=$([ -f "docs/01-需求调研/市场调研报告.md" ] && echo "✅" || echo "⏳")

echo "当前进度："
echo "$_DEMAND_DONE 需求调研"
echo "$_MARKET_DONE 市场分析"
```

AI输出：
```markdown
📊 当前项目进度：

✅ 需求调研（已完成）
✅ 市场分析（已完成）
⏳ 优先级排序（未完成）

💡 建议继续执行 /pm-priority 进行优先级排序
```

---

## 四、核心Skill详细设计

### 4.1 pm-demand（需求调研入口）

#### 核心改进：风险前置

**关键设计**：在收集产品信息时，立即询问痛点，避免伪需求。

#### 执行流程

**步骤1: 收集产品基础信息**（一次一个问题）

使用 AskUserQuestion 逐个询问：

**问题1**：
> 请问您的产品名称是什么？

**问题2**：
> 目标用户是谁？（例如：25-35岁一线城市女性）

**问题3**：
> 核心业务目标是什么？（例如：提升复购率至40%）

**问题4（关键）**：
> 解决了什么用户痛点？（例如：现有生鲜配送慢，用户等不及）
>
> 💡 提示：思考用户为什么需要这个产品，而不是竞品？

**问题5**：
> 行业赛道是什么？（例如：生鲜电商）

**步骤2: 收集初步需求清单**

询问：
> 请列出您想到的核心需求，每个需求一行。
> 输入空行结束。

**步骤3: 真伪需求即时验证**

对每个需求快速验证：
```markdown
AI: 需求"快速下单"是真需求吗？

    用户愿意为此付费/花时间吗？

用户: A) 是真需求
     B) 是伪需求（请说明原因）
```

**步骤4: 生成需求调研报告**

使用 Write 工具创建 `docs/01-需求调研/需求调研报告.md`：

```markdown
# 需求调研报告

## 一、产品基础信息

- **产品名称**: [从用户输入提取]
- **目标用户**: [从用户输入提取]
- **核心目标**: [从用户输入提取]
- **行业赛道**: [从用户输入提取]
- **生成时间**: [当前时间]

---

## 二、核心痛点

**用户痛点**: [从问题4提取]

**痛点强度**: ⭐⭐⭐⭐⭐（用户愿意为此付费）

**验证状态**: ✅ 已验证真实需求

---

## 三、初步需求清单

| 需求ID | 需求描述 | 真伪判定 | 优先级 |
|--------|---------|---------|--------|
| D001 | 快速下单 | 真需求 | P0 |
| D002 | 会员积分 | 真需求 | P1 |

---

## 四、下一步建议

建议执行：
1. /pm-brainstorm 探索更多可能性
2. /pm-clarify 细化需求细节
3. /pm-market 获取市场数据

---

**项目状态**: 需求调研初稿完成
**生成工具**: super-pm v1.0.0
```

---

### 4.2 pm-brainstorm（头脑风暴）

#### 参考：superpowers:brainstorming

**核心原则**：
- 一次一个问题
- 每个问题3-5个选项
- 最后一个选项"其他（请手动输入）"
- 逐步深入，逐层细化

#### 执行流程

**步骤1: 读取上下文**

尝试读取 `docs/01-需求调研/需求调研报告.md`

如果不存在，询问是否先执行 `/pm-demand`

**步骤2: 确定发散方向**

使用 AskUserQuestion：

> 我要探索产品的哪个方向？
>
> A) 产品功能创新 - 如何解决核心痛点
> B) 用户增长方案 - 如何获取更多用户
> C) 商业模式设计 - 如何变现盈利
> D) 用户体验优化 - 如何提升满意度
> E) 其他方向（请手动输入）

**步骤3: 深入探索**

根据用户选择，逐个深入询问。

**示例**（选择A - 产品功能创新）：

> 基于核心痛点"配送慢"，我想到以下解决思路：
>
> A) 技术方案 - 前置仓、智能调度、预测算法
> B) 服务方案 - 配送补偿、时效承诺、进度可视
> C) 模式创新 - 社区团购、自提柜、众包配送
> D) 合作方案 - 与便利店合作、第三方物流
> E) 其他思路（请手动输入）

继续深入：
> 如果采用"前置仓"方案，关键考虑因素是：
>
> A) 覆盖范围 - 前置仓服务半径（1-3公里）
> B) 成本控制 - 仓储、人员、运营成本
> C) 商品选择 - 哪些品类适合前置仓
> D) 技术支撑 - 库存管理、需求预测
> E) 其他考虑（请手动输入）

**步骤4: 多角度探索**

询问：
> 还需要探索其他维度吗？
>
> A) 是的，探索另一个方向
> B) 不需要了，开始整理方案

如果选择A，返回步骤2。

**步骤5: 整理输出**

使用 Write 创建 `docs/01-需求调研/创意方案库.md`

---

### 4.3 pm-market（市场分析）

#### 搜索策略：MCP优先，WebSearch兜底

**搜索工具优先级**：

1. **优先使用 MCP Search**（如 exa-mcp）
   - 更精准的搜索结果
   - 支持特定数据源过滤

2. **备选使用 WebSearch**（Claude内置）
   - 无需配置，开箱即用

**数据源优先级**：

1. 艾瑞咨询、易观分析、QuestMobile（权威报告）
2. 七麦数据、蝉妈妈（应用数据）
3. 36氪、虎嗅（行业媒体）
4. 工信部、网信办（政策法规）

**搜索关键词组合**：

```markdown
市场规模：
- "{行业赛道} 市场规模 2025 site:iresearch.cn"
- "{行业赛道} 行业报告 site:analysys.cn"

竞争格局：
- "{行业赛道} 竞争格局 市场份额"
- "{竞品名称} 功能 用户评价"

行业趋势：
- "{行业赛道} 发展趋势 2025"
- "{行业赛道} 政策导向 监管要求"
```

**生成报告**：`docs/01-需求调研/市场调研报告.md`

---

### 4.4 其他核心Skill简述

#### pm-clarify（需求细化与验证）

- 读取需求调研报告
- 逐个细化需求细节（场景、边界条件）
- 已在pm-demand完成真伪验证，无需重复
- 输出：确认需求清单

#### pm-priority（优先级排序）

- 读取确认需求清单
- 支持RICE/KANO/MoSCoW模型
- 交互式评分输入
- 输出：优先级排序报告

#### pm-mvp（MVP规划）

- 读取优先级报告
- 选择MVP模式（最小/标准/全链路）
- 拆解核心功能集
- 3套方案对比
- 输出：MVP方案

#### pm-docs（文档生成）

- 智能推荐文档类型（BRD/MRD/PRD）
- 读取前置数据
- AI生成标准化文档
- 支持增量生成（先生成大纲，确认后填充）

---

## 五、安装与版本管理

### 5.1 安装方式

#### 首次安装

```bash
# 方式1: Git Clone（推荐）
git clone https://github.com/super-pm/super-pm.git ~/.claude/skills/super-pm
cd ~/.claude/skills/super-pm
git checkout v1.0.0

# 方式2: 符号链接（开发模式）
git clone https://github.com/super-pm/super-pm.git ~/dev/super-pm
ln -s ~/dev/super-pm ~/.claude/skills/super-pm
```

### 5.2 版本升级

#### 自动升级（推荐）

```markdown
用户: /super-pm-upgrade

AI: 🔍 正在检查更新...

当前版本: v1.0.0
最新版本: v1.1.0

发现新版本！更新内容：
✨ 新增 /pm-roadmap 产品路线图skill
🐛 修复 pm-market 搜索失败问题

是否升级到 v1.1.0？

A) 立即升级（推荐）
B) 查看完整更新日志
C) 跳过本次更新
```

#### 手动升级

```bash
cd ~/.claude/skills/super-pm
git fetch --all --tags
git checkout v1.1.0
```

### 5.3 重新安装

```bash
# 完全删除旧版本
rm -rf ~/.claude/skills/super-pm

# 重新安装
git clone https://github.com/super-pm/super-pm.git ~/.claude/skills/super-pm
cd ~/.claude/skills/super-pm
git checkout v1.1.0
```

---

## 六、使用示例

### 6.1 新产品从0到1

```
用户: 我要做一个生鲜电商产品

AI: [触发强制入口]
🎯 检测到您在规划新产品！
是否开始执行 /pm-demand？

用户: A) 是的

AI: [执行 /pm-demand]
- 询问产品名称、目标用户、业务目标
- 询问痛点（风险前置）
- 收集初步需求
- 验证真伪需求
✅ 需求调研完成！
建议：/pm-brainstorm → /pm-clarify → /pm-market

用户: /pm-brainstorm

AI: [执行头脑风暴]
- 一次一个问题探索方向
- 逐步深入细节
✅ 创意方案库已生成！

用户: /pm-market

AI: [执行市场分析]
- 使用MCP搜索优先
- 降级WebSearch
✅ 市场调研报告已生成！

用户: /pm-priority

AI: [执行优先级排序]
- RICE评分
- 需求排序
✅ 优先级报告已生成！

用户: /pm-mvp

AI: [执行MVP规划]
✅ MVP方案已生成！

用户: /pm-docs

AI: [生成PRD]
✅ PRD产品需求文档已生成！
```

### 6.2 成熟产品迭代

```
用户: 我要优化用户留存

AI: 检测到您的产品已有PRD文档。
建议：
A) 执行 /pm-aarrr 分析留存问题
B) 执行 /pm-report 查看数据报告

用户: A

AI: [执行 /pm-aarrr]
✅ 发现激活环节流失严重
建议：/pm-growth 制定增长方案
```

---

## 七、技术实现要点

### 7.1 每个SKILL.md的标准结构

```markdown
---
name: pm-xxx
version: 1.0.0
description: |
  [skill用途说明]
  Use when: [触发场景]
allowed-tools:
  - Read
  - Write
  - AskUserQuestion
  - WebSearch
---

## Preamble (run first)

\`\`\`bash
mkdir -p docs/目录
\`\`\`

## 执行流程

### 步骤1: 读取前置数据

### 步骤2: 核心逻辑

### 步骤3: 生成输出

### 步骤4: 推荐下一步
```

### 7.2 AI工具使用规范

- **Read工具**：读取前序skill生成的Markdown文件
- **Write工具**：创建新的Markdown文档
- **Edit工具**：修改已有文档
- **AskUserQuestion**：一次一个问题，3-5个选项，最后选项"其他（手动输入）"
- **WebSearch**：MCP不可用时的降级方案

### 7.3 文档质量保证

**原则**：
- 结构清晰，符合行业标准
- 人类可读，可直接编辑
- AI理解友好，语义明确
- 版本可控，Git友好

---

## 八、与superpowers的对比

| 维度 | superpowers | super-pm |
|------|------------|----------|
| 目标用户 | 软件工程师 | 产品经理 |
| 核心场景 | 代码开发、调试、测试 | 需求调研、方案设计、增长迭代 |
| Skill数量 | 20+ | 27个 |
| 数据存储 | 代码仓库、配置文件 | Markdown文档 |
| 工作流程 | 代码 → 测试 → 部署 | 需求 → 方案 → 增长 |
| 联网需求 | 可选 | 必需（市场分析） |
| 强制入口 | 有（如brainstorming） | 有（关键词检测） |
| 推荐机制 | 有 | 有（流程推荐引擎） |

---

## 九、实施计划

### Phase 1: 核心Skill开发（1-2周）

**目标**：实现需求洞察模块的全部8个skill

**清单**：
- [ ] pm-demand
- [ ] pm-brainstorm
- [ ] pm-clarify
- [ ] pm-market
- [ ] pm-priority
- [ ] pm-mvp
- [ ] pm-pool
- [ ] pm-journey
- [ ] 主SKILL.md
- [ ] super-pm-upgrade

**验证**：执行完整的需求洞察流程

### Phase 2: 方案设计模块（1周）

**目标**：实现方案设计模块的全部7个skill

**清单**：
- [ ] pm-docs
- [ ] pm-proto
- [ ] pm-tech
- [ ] pm-feature
- [ ] pm-data
- [ ] pm-position
- [ ] pm-user-story

**验证**：从需求到PRD的完整流程

### Phase 3: 增长与风控模块（1周）

**目标**：实现剩余12个skill

**清单**：
- [ ] 增长迭代模块（7个）
- [ ] 风控管理模块（5个）

**验证**：全流程测试

### Phase 4: 文档与发布（3天）

**目标**：完善文档、发布v1.0.0

**清单**：
- [ ] README.md
- [ ] INSTALL.md
- [ ] CHANGELOG.md
- [ ] CONTRIBUTING.md
- [ ] 示例项目

---

## 十、成功标准

### 10.1 功能验收

- [ ] 27个skill全部可用
- [ ] 强制入口逻辑正常
- [ ] 流程推荐准确
- [ ] 文档生成格式规范
- [ ] 异常兜底机制完善

### 10.2 性能验收

- [ ] Skill执行时间 < 30秒（交互式问答除外）
- [ ] 文档生成时间 < 10秒
- [ ] 联网搜索响应 < 15秒

### 10.3 用户验证

- [ ] 找5个产品经理试用
- [ ] 收集反馈
- [ ] 7日留存率 > 50%

---

## 十一、风险与应对

### 风险1: AI理解不准确

**应对**：
- 提供详细的skill指令
- 增加示例和模板
- 允许用户重新生成

### 风险2: 联网搜索失败

**应对**：
- MCP优先，WebSearch降级
- 提供手动输入选项
- 标注数据来源，便于验证

### 风险3: 用户学习成本

**应对**：
- 强制入口引导
- 清晰的流程推荐
- 提供快速模式（跳过步骤）

---

## 十二、后续优化方向

### v1.1.0

- 优化skill指令细节
- 增加更多行业模板
- 完善异常处理

### v1.2.0

- 增加团队协作功能
- 支持自定义模板
- 增加数据导出

### v2.0.0

- 多模型支持
- 自定义skill开发
- 插件生态

---

## 附录

### A. Skill完整清单

**需求洞察模块（8个）**：
1. pm-demand - 需求调研入口
2. pm-brainstorm - 头脑风暴
3. pm-clarify - 需求细化与验证
4. pm-market - 市场分析
5. pm-priority - 优先级排序
6. pm-mvp - MVP规划
7. pm-pool - 需求池管理
8. pm-journey - 用户旅程

**方案设计模块（7个）**：
9. pm-docs - 文档生成
10. pm-proto - 原型设计
11. pm-tech - 技术对接
12. pm-feature - 功能细节
13. pm-data - 数据指标
14. pm-position - 产品定位与商业化
15. pm-user-story - 用户故事

**增长迭代模块（7个）**：
16. pm-aarrr - AARRR增长分析
17. pm-growth - 增长方案
18. pm-report - 数据报告与用户反馈
19. pm-abtest - A/B测试
20. pm-iteration - 迭代计划
21. pm-retro - 迭代复盘
22. pm-roadmap - 产品路线图

**风控管理模块（5个）**：
23. pm-agile - 敏捷管理
24. pm-cross - 跨部门协作
25. pm-risk - 风险管控
26. pm-release - 上线方案
27. pm-change - 需求变更

**工具（1个）**：
28. super-pm-upgrade - 版本升级

### B. 参考资源

- superpowers:brainstorming skill设计
- gstack架构设计
- Claude Code官方文档

---

**文档状态**: 已完成，待实现
**下一步**: 开始Phase 1开发，实现需求洞察模块的8个核心skill