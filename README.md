# super-pm 产品经理技能包

**版本**: v2.0.0
**状态**: 生产就绪 ✅
**对标**: [superpowers](https://github.com/anthropics/superpowers) 工业级标准

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/konglong87/super-pm)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-≥0.15.0-orange.svg)](https://claude.ai/code)

---

## 📖 项目简介

**super-pm** 是专为产品经理设计的 Claude Code Skill Pack，提供全生命周期的产品管理工作流支持。

### 核心特性

- ✅ **27个核心技能** - 覆盖需求、方案、增长、风控全流程
- ✅ **轻量级设计** - 纯 Markdown 指令，无代码依赖
- ✅ **智能交互** - 一次一问，逐步引导
- ✅ **数据流转** - Markdown 文档自动传递，人类可读
- ✅ **风险前置** - 早期验证需求真伪，避免无效工作
- ✅ **兜底完善** - 异常处理、跨会话恢复、灵活跳过

---

## 🚀 快速开始

### 方式一：Claude Code 一键安装（推荐）

在 Claude Code 会话中直接执行：

```bash
# 安装最新版本
git clone https://github.com/konglong87/super-pm.git ~/.claude/skills/super-pm
```

重启 Claude Code 后自动生效。

### 方式二：本地开发安装

```bash
# 克隆仓库
git clone https://github.com/konglong87/super-pm.git
cd super-pm

# 创建软链接到 Claude Code skills 目录
ln -s $(pwd)/skills ~/.claude/skills/super-pm

# 验证安装
ls -la ~/.claude/skills/super-pm/SKILL.md
```

### 方式三：从发布版本安装

```bash
# 下载最新发布版本
cd /tmp
curl -L https://github.com/konglong87/super-pm/archive/refs/tags/v2.0.0.tar.gz -o super-pm.tar.gz
tar -xzf super-pm.tar.gz
mv super-pm-2.0.0 ~/.claude/skills/super-pm
```

### 验证安装

在 Claude Code 中执行：

```
/super-pm
```

如果看到 super-pm 的欢迎信息，说明安装成功！

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
/pm-demand
```

输出: `docs/01-需求调研/需求调研报告.md`

---

## 📊 核心技能（25个）

### 需求洞察模块 (6个)
- **pm-demand** - 需求调研入口
- **pm-search** - 联网调研整合（市场/竞品/数据/舆情/合规）
- **pm-priority** - 优先级排序（RICE/KANO/MoSCoW）
- **pm-mvp** - MVP最小可行产品拆解
- **pm-pool** - 需求池管理
- **pm-journey** - 用户旅程地图

### 方案落地模块 (7个)
- **pm-docs** - 文档生成（BRD/MRD/PRD/用户故事）
- **pm-proto** - 原型设计
- **pm-tech** - 技术对接方案
- **pm-feature** - 功能细节拆解
- **pm-data** - 数据指标体系
- **pm-position** - 产品定位
- **pm-commercial** - 商业化方案

### 增长迭代模块 (7个)
- **pm-aarrr** - 增长分析
- **pm-growth** - 增长方案
- **pm-report** - 数据报告（周报/月报/季报）
- **pm-feedback** - 用户反馈分析
- **pm-abtest** - A/B测试方案
- **pm-iteration** - 迭代计划
- **pm-retro** - 迭代复盘

### 风控管理模块 (5个)
- **pm-agile** - 敏捷管理
- **pm-cross** - 跨部门协作
- **pm-risk** - 风险管控
- **pm-release** - 上线方案
- **pm-change** - 需求变更管理

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

## 📈 版本计划

### v2.0.0 (当前版本 - 已发布 ✅)
- ✅ 27个核心技能全部完成
- ✅ 5大模块：需求洞察、方案设计、增长迭代、风控管理、产品战略
- ✅ 中英文双语支持
- ✅ 完整文档和示例

### v2.1.0 (计划中)
- ⏳ 性能优化和体验改进
- ⏳ 更多行业模板
- ⏳ 用户反馈收集和优化

### v2.2.0 (计划中)
- ⏳ 自定义模板支持
- ⏳ 团队协作功能
- ⏳ 数据导出功能

### v3.0.0 (未来规划)
- ⏳ 多模型支持
- ⏳ 自定义 skill 开发框架
- ⏳ 插件生态系统

---

## 📚 文档

- [实施方案](./plan/final_implementation_plan_v2.md) - 详细的技术设计和实施计划
- [安装教程](./plan/installation_guide_v2.md) - 完整的安装使用指南
- [开发任务清单](./plan/phase1_development_checklist.md) - Phase 1开发任务详解

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
- [gstack](https://github.com/anthropics/gstack) - Claude Code技能框架
- [superpowers](https://github.com/anthropics/superpowers) - 技能集合参考

---

**PM-Skills Team** © 2027

**让每个产品经理都能高效工作** 🚀