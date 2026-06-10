# super-pm 产品经理技能包

**版本**: v2.3.0
**对标**: superpowers/gstack 工业级标准

## 简介

super-pm 是专为产品经理设计的 Claude Code Skill Pack，覆盖需求洞察、方案设计、增长迭代、风控管理全生命周期。

## 核心特性

- ✅ 37个核心skill，简洁高效
- ✅ Markdown文件存储，人机可读
- ✅ 强制入口引导 + 流程推荐
- ✅ 风险前置，早期验证需求真伪
- ✅ 完善的兜底机制
- ✅ Subagent 并行架构（v2技能）

## 快速开始

在Claude Code中执行：
```
/super-pm
```

或直接说："我要做一个XX产品"

## Skill清单

### 需求洞察模块（9个）
- `/pm-demand` - 需求调研入口
- `/pm-brainstorm` - 头脑风暴
- `/pm-clarify` - 需求细化与验证
- `/pm-market` - 市场分析
- `/pm-search` - 联网搜索整合
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
- `/pm-position` - 产品定位
- `/pm-user-story` - 用户故事

### 增长迭代模块（8个）
- `/pm-aarrr` - AARRR增长分析
- `/pm-growth` - 增长方案
- `/pm-report` - 数据报告与用户反馈
- `/pm-feedback` - 用户反馈分析
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

### 产品策略模块（5个）
- `/pm-business-model` - 商业模式画布
- `/pm-decision` - 战略决策支持
- `/pm-funnel` - 漏斗分析
- `/pm-portfolio` - 产品组合管理
- `/pm-resource` - 资源分配与ROI

## 安装

```bash
# Claude Code Marketplace
/plugin install konglong87/super-pm

# 或手动安装
git clone https://github.com/konglong87/super-pm.git ~/.claude/skills/super-pm
```

## 推荐搭配

super-pm 的搜索能力依赖外部工具增强，不安装也能用（自动降级到内置 WebSearch），但安装后搜索质量显著提升：

| 搭配工具 | 类型 | 效果 | 安装方式 |
|---------|------|------|---------|
| **AnySearch** | skill | 中文搜索质量大幅提升，支持17个垂直域（金融、法律、学术、电商等） | `git clone https://github.com/konglong87/anysearch.git ~/.claude/skills/anysearch` |
| **Exa MCP** | MCP server | 英文/语义搜索增强，公司信息、代码搜索 | 见 [exa-mcp 官方文档](https://github.com/exa-labs/exa-mcp-server) 配置 `mcpServers` |

> 💡 搜索优先级：AnySearch → Exa MCP → WebSearch（内置兜底）。未安装 AnySearch/Exa 时自动降级，不影响技能包正常使用。

## 文档

- [技能索引](./INDEX.md) - 全部技能及依赖关系
- [Subagent 模板](./templates/subagent-skill-template.md) - v2 技能架构模板

## 许可证

MIT License