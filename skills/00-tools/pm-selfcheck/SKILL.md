---
name: pm-selfcheck
description: |
  Use when: 需要检查 super-pm 技能包安装完整性、元数据和体积
  Do NOT use when: 正在执行具体 PM 任务且不需要安装诊断
allowed-tools:
  - Read
  - Bash
---

# super-pm 安装与内容自检

这是**显式诊断工具**，不是每次技能调用都要运行的更新检查。先从已加载的本 SKILL.md 路径定位同目录下的 `scripts/selfcheck.sh`，然后执行：

```bash
bash "<当前 pm-selfcheck skill 的绝对目录>/scripts/selfcheck.sh"
```

不要把当前业务项目的 `VERSION`、`.git` 或工作目录当成技能包根目录。脚本根据自身的真实路径识别两种安装布局：

- 完整 Git 仓库/软链接：扫描包内技能和版本。
- `npx skills add --copy` 扁平安装：仅检查该包预期技能名；缺少任一技能时以非零状态报告 `MISSING`，不会把单独安装当作全包健康。

检查元数据（name、description、allowed-tools）和超长技能（>600 行）。把实际输出解释给用户；`MISSING` 和 `BAD_METADATA` 不能汇报为通过。单独复制此 skill 时提示安装完整技能包。不要在没有实际运行命令的情况下生成“健康报告”，也不要自动联网或改动业务项目。

需要升级时请另行调用 `/super-pm-upgrade`；本 skill 只读。
