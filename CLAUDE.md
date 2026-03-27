# CLAUDE.md - super-pm 项目配置文件

## first
 call me 🦖恐龙

## 项目基本信息

**项目名称**: super-pm 产品经理技能包
**版本**: v2.0.1 (开发中)
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

Co-Authored-By: Claude Sonnet 4.7 <noreply@anthropic.com>"
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

## Skill 开发规范（全模块通用）

### Skill 标准结构模板

每个 SKILL.md 必须遵循以下结构：

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
  - Edit
  - AskUserQuestion
  - WebSearch
  - Bash
---

## Preamble (run first)

\`\`\`bash
# 创建必要的目录
mkdir -p docs/模块目录
\`\`\`

## 执行流程

### 步骤1: 读取前置数据

使用 Read 工具读取前序skill生成的文档。

### 步骤2: 核心逻辑

[具体实现逻辑]

### 步骤3: 生成输出

使用 Write 工具生成文档到 `docs/` 目录。

### 步骤4: 推荐下一步

输出2-3个下一步建议。
```

---

### 核心设计原则（所有Skill必须遵循）

#### 1. 轻量级原则

**规范**：
- ✅ 纯Markdown指令，无代码依赖
- ✅ 依赖Claude的理解能力，不编写复杂逻辑
- ✅ 每个SKILL.md控制在100-300行
- ❌ 不使用外部脚本或可执行文件
- ❌ 不创建package.json、node_modules等

**示例**：

```markdown
## 步骤2: 收集信息

使用 AskUserQuestion 逐个询问：

问题1：请问您的产品名称是什么？

问题2：目标用户是谁？
```

**AI会自动理解并执行，无需编写JavaScript代码。**

---

#### 2. 风险前置原则

**规范**：
- 在需求调研阶段立即验证痛点
- 避免在后续阶段发现伪需求
- 每个关键决策点都进行验证

**实现**：

```markdown
## pm-demand中的痛点验证

问题4（关键）：
> 解决了什么用户痛点？
>
> 💡 提示：思考用户为什么需要这个产品

AI立即判断：
- 如果用户答不上来 → 提示可能为伪需求
- 如果痛点清晰 → 继续记录
```

**适用于所有skill**：
- pm-clarify：验证需求细节是否清晰
- pm-market：验证市场假设
- pm-mvp：验证MVP范围合理性

---

#### 3. 一次一问原则（交互式Skill）

**规范**：
- 使用 AskUserQuestion 时，每次只问一个问题
- 每个问题提供3-5个选项
- 最后一个选项永远是"其他（请手动输入）"
- 避免一次呈现多个问题

**正确示例**：

```markdown
### 步骤2: 确定发散方向

使用 AskUserQuestion：

> 我要探索产品的哪个方向？
>
> A) 产品功能创新
> B) 用户增长方案
> C) 商业模式设计
> D) 用户体验优化
> E) 其他方向（请手动输入）

用户选择后，继续下一个问题...
```

**错误示例**：

```markdown
❌ 请告诉我：
1. 产品名称？
2. 目标用户？
3. 业务目标？

（一次问多个问题，用户负担重）
```

**适用skill**：pm-demand、pm-brainstorm、pm-clarify、pm-priority等所有交互式skill

---

#### 4. MCP优先原则（联网搜索Skill）

**规范**：
- 优先使用MCP Search（如exa-mcp）
- MCP不可用时降级使用WebSearch
- 明确数据源优先级

**实现模板**：

```markdown
## 步骤2: 执行联网搜索

### 尝试MCP Search

如果项目配置了exa-mcp，优先调用：

使用exa_search工具搜索：
- query: "{关键词}"
- includeDomains: ["iresearch.cn", "analysys.cn"]
- numResults: 5

### 降级WebSearch

如果MCP不可用，使用WebSearch：

搜索关键词："{关键词} site:iresearch.cn"
```

**数据源优先级**（所有市场分析类skill通用）：

1. 艾瑞咨询、易观分析、QuestMobile（权威报告）
2. 七麦数据、蝉妈妈（应用数据）
3. 36氪、虎嗅（行业媒体）
4. 工信部、网信办（政策法规）

**适用skill**：pm-market、pm-report、所有需要联网搜索的skill

---

#### 5. Markdown数据流转原则

**规范**：
- 前序skill使用Write输出Markdown文档
- 后序skill使用Read读取文档
- 文档格式标准化，人类可读
- 支持跳过步骤、手动创建

**流转模式**：

```
pm-demand (Write)
  → docs/01-需求调研/需求调研报告.md
  ↓
pm-clarify (Read)
  → 理解内容
  → Write
  → docs/01-需求调研/确认需求清单.md
  ↓
pm-priority (Read)
  → 理解内容
  → Write
  → docs/01-需求调研/优先级排序报告.md
```

**兜底机制**：

```markdown
## 步骤1: 读取前置数据

尝试读取 docs/01-需求调研/需求调研报告.md

如果文件不存在：
> ⚠️ 未找到需求调研报告
>
> 您可以选择：
> A) 执行 /pm-demand 完成需求调研
> B) 手动输入需求列表（快速模式）
```

---

### 全生命周期开发规范

#### Phase 1: Skill 设计阶段

**设计检查清单**：

- [ ] **目标清晰**：一句话说明skill解决什么问题
- [ ] **触发场景明确**：Use when描述准确
- [ ] **前置依赖识别**：需要读取哪些文件
- [ ] **输出定义**：生成什么文档，存放在哪
- [ ] **交互流程设计**：需要几个问题，如何分支
- [ ] **异常处理**：文件缺失、参数错误如何处理
- [ ] **推荐下一步**：完成后推荐哪2-3个skill

**设计评审**：

在编写SKILL.md前，先回答：
1. 用户在什么场景下会执行这个skill？
2. 执行前需要什么前置信息？
3. 执行中需要用户输入什么？
4. 执行后输出什么？
5. 下一步推荐什么？

---

#### Phase 2: Skill 实现阶段

**开发流程（TDD）**：

**步骤1：编写skill指令**

创建SKILL.md，包含完整的执行流程。

**步骤2：自测基本功能**

在Claude Code中执行skill，验证：
- 能否正常触发
- 问题是否清晰
- 输出是否生成

**步骤3：测试联动逻辑**

测试与前序/后序skill的联动：
- 读取前序文档是否正确
- 生成的文档是否可被后序skill使用

**步骤4：异常场景测试**

测试异常情况：
- 前置文件缺失时的提示
- 参数错误时的处理
- 用户中途取消的处理

**步骤5：文档完善**

确保生成的文档：
- 格式规范、结构清晰
- 包含关键信息
- 可读性强（人类可编辑）

---

#### Phase 3: Skill 验证阶段

**验证清单**：

**功能验证**：
- [ ] Skill可正常执行
- [ ] 输入输出符合预期
- [ ] 文档生成路径正确
- [ ] 推荐下一步准确

**交互验证**：
- [ ] 问题清晰易懂
- [ ] 选项数量合理（3-5个）
- [ ] 用户输入提示友好

**数据验证**：
- [ ] 读取前序文档正确
- [ ] 数据提取准确
- [ ] 写入文档格式规范

**异常验证**：
- [ ] 文件缺失时提示清晰
- [ ] 参数错误时不崩溃
- [ ] 降级方案可用（如MCP→WebSearch）

**性能验证**：
- [ ] 执行时间 < 30秒
- [ ] 文档生成 < 10秒

---

#### Phase 4: Skill 集成阶段

**集成测试流程**：

**测试场景1：完整流程**

从第一个skill执行到最后一个，验证：
- 数据流转正确
- 无断层、无死循环
- 输出完整

**测试场景2：跳过步骤**

跳过中间某个skill，验证：
- 后续skill能否兜底
- 提示是否清晰
- 手动输入是否可用

**测试场景3：跨会话**

中途关闭会话，重新打开后：
- 能否恢复进度
- 已有文档是否可读
- 推荐是否准确

**测试场景4：异常处理**

故意制造错误：
- 删除前置文档
- 输入错误参数
- 网络断开

验证兜底机制是否完善。

---

### 文档生成规范

#### 文档结构标准

所有生成的Markdown文档必须包含：

```markdown
# [文档标题]

## 一、[核心章节]

[内容]

---

## 二、[次级章节]

[内容]

---

## 三、下一步建议

建议执行：
1. /pm-xxx（推荐）
2. /pm-yyy
3. /pm-zzz

---

**项目状态**: [当前阶段]
**生成时间**: [时间戳]
**生成工具**: super-pm v1.0.0
```

#### 文档命名规范

**需求洞察模块**：
- `需求调研报告.md` - pm-demand输出
- `创意方案库.md` - pm-brainstorm输出
- `确认需求清单.md` - pm-clarify输出
- `市场调研报告.md` - pm-market输出
- `优先级排序报告.md` - pm-priority输出
- `MVP方案.md` - pm-mvp输出
- `需求池管理表.md` - pm-pool输出
- `用户旅程地图.md` - pm-journey输出

**方案设计模块**：
- `PRD产品需求文档.md` - pm-docs输出
- `BRD商业需求文档.md` - pm-docs输出
- `MRD市场需求文档.md` - pm-docs输出
- `原型设计方案.md` - pm-proto输出
- `技术对接方案.md` - pm-tech输出
- `功能细节拆解.md` - pm-feature输出
- `数据指标体系.md` - pm-data输出
- `产品定位方案.md` - pm-position输出
- `用户故事清单.md` - pm-user-story输出

**增长迭代模块**：
- `AARRR增长分析.md` - pm-aarrr输出
- `增长执行方案.md` - pm-growth输出
- `数据报告与用户反馈.md` - pm-report输出
- `A/B测试方案.md` - pm-abtest输出
- `迭代计划.md` - pm-iteration输出
- `迭代复盘报告.md` - pm-retro输出
- `产品路线图.md` - pm-roadmap输出

**风控管理模块**：
- `敏捷管理方案.md` - pm-agile输出
- `跨部门协作方案.md` - pm-cross输出
- `风险管控方案.md` - pm-risk输出
- `上线执行方案.md` - pm-release输出
- `需求变更记录.md` - pm-change输出

---

### 模块间依赖关系

#### 需求洞察模块（8个skill）

```
pm-demand（入口）
  ↓
pm-brainstorm（可选）
  ↓
pm-clarify
  ↓
pm-market（可选，但推荐）
  ↓
pm-priority
  ↓
pm-mvp

pm-pool（独立，成熟产品入口）
pm-journey（独立，补充工具）
```

#### 方案设计模块（7个skill）

```
pm-docs（依赖mvp方案）
  ↓
pm-proto（依赖PRD）
  ↓
pm-tech（依赖PRD）
  ↓
pm-feature（依赖PRD）
  ↓
pm-data（依赖PRD）

pm-position（独立，可提前）
pm-user-story（依赖PRD）
```

#### 增长迭代模块（7个skill）

```
pm-aarrr（上线后执行）
  ↓
pm-growth
  ↓
pm-report
  ↓
pm-iteration
  ↓
pm-retro
  ↓
pm-roadmap

pm-abtest（独立，增长工具）
```

#### 风控管理模块（5个skill）

```
pm-agile（项目启动时）
  ↓
pm-cross（技术方案后）
  ↓
pm-risk（上线前）
  ↓
pm-release

pm-change（独立，变更时）
```

---

### Git 提交规范（开发阶段）

**Commit格式**：

```
<type>: <subject>

type:
- feat: 新功能
- fix: 修复bug
- docs: 文档更新
- test: 测试相关
- refactor: 重构
- chore: 构建/工具

示例：
feat: 实现pm-demand需求调研skill
fix: 修复pm-market搜索失败问题
docs: 完善skill使用说明
test: 添加pm-priority测试用例
```

**每个skill完成后必须提交**：

```bash
git add [文件路径]
git commit -m "feat: 实现pm-xxx skill"
```

---

### 质量保证规范

#### DRY原则（Don't Repeat Yourself）

**规范**：
- 相似的交互逻辑，在skill指令中复用描述
- 相同的文档格式，使用相同模板
- 相似的兜底逻辑，使用相同模式

**示例**：

所有需要读取前置文档的skill，使用相同的兜底模式：

```markdown
## 步骤1: 读取前置数据

尝试读取 docs/...

如果文件不存在：
> ⚠️ 未找到...
>
> 您可以选择：
> A) 执行 /pm-xxx
> B) 手动输入
```

#### YAGNI原则（You Aren't Gonna Need It）

**规范**：
- 不实现未明确需要的功能
- 不过度设计复杂的异常处理
- 保持skill简单聚焦

**错误示例**：

```markdown
❌ 实现了5种不同的搜索模式
❌ 支持10种文档输出格式
❌ 复杂的参数校验逻辑
```

**正确示例**：

```markdown
✅ 实现核心搜索功能
✅ 输出标准Markdown格式
✅ 必要的前置校验即可
```

#### TDD原则（Test-Driven Development）

**开发流程**：

1. **先写skill指令**（相当于测试用例）
2. **手动测试**，验证是否符合预期
3. **发现问题时**，修正指令
4. **完善细节**，提升体验

---

### 常见问题处理

#### 问题1：skill无法识别

**检查**：
- SKILL.md是否在正确目录
- YAML格式是否正确
- allowed-tools是否包含必要工具

**解决**：
```bash
# 验证文件存在
find ~/.claude/skills/super-pm -name "SKILL.md"

# 验证YAML格式
head -20 ~/.claude/skills/super-pm/SKILL.md
```

#### 问题2：读取文档失败

**检查**：
- 文档路径是否正确
- 文档是否已生成
- Read工具是否在allowed-tools

**解决**：

skill中添加兜底逻辑：
```markdown
如果文件不存在：
> ⚠️ 未找到文档
>
> 请先执行 /pm-xxx
```

#### 问题3：生成的文档格式混乱

**检查**：
- Write工具使用是否正确
- Markdown语法是否规范

**解决**：

使用标准文档模板，参考设计文档第4部分。

---

### 全局考虑要点

#### 模块间一致性

**所有skill保持一致**：
- Preamble结构相同
- 文档输出格式统一
- 推荐下一步格式相同
- 异常提示风格一致

#### 可扩展性

**预留扩展空间**：
- 参数设计支持未来扩展
- 文档格式可增加字段
- 联动逻辑可插入新skill

#### 向后兼容

**版本升级考虑**：
- 新版本skill可读取旧版本文档
- 文档格式变更提供迁移脚本
- Breaking Changes在升级时提示

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