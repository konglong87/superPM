---
name: pm-retro
version: 1.0.0
description: |
  迭代复盘 - 总结迭代经验教训，持续改进
  Use when: 迭代结束后进行复盘、总结经验、改进流程
allowed-tools:
  - Read
  - Write
  - AskUserQuestion
  - Bash
---

## Preamble

```bash
mkdir -p docs/03-增长迭代/迭代复盘

echo "📝 迭代复盘工具已启动"
```

---

## 执行流程

### 步骤 1: 准备复盘会议

使用 AskUserQuestion:

> 🎯 迭代复盘准备
>
> 复盘三要素：
>
> **What happened?** - 发生了什么？
> **Why did it happen?** - 为什么发生？
> **What will we do?** - 下次怎么做？
>
> 本次复盘的迭代周期：{时间范围}
>
> 迭代目标完成情况：
> - 目标1：{完成情况}
> - 目标2：{完成情况}

### 步骤 2: 收集团队反馈

从团队成员收集：
- 做得好的地方（Keep）
- 需要改进的地方（Problem）
- 尝试的行动（Try）

### 步骤 3: 输出复盘报告

输出迭代复盘报告，包含：
- 目标达成情况
- 做得好的地方
- 遇到的问题
- 改进措施
- 行动项

---

## 输出文件

迭代复盘报告 → `docs/03-增长迭代/迭代复盘/复盘-v{版本号}.md`