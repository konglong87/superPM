---
name: pm-preview
description: |
  产品文档实时预览 - 在浏览器中预览 docs/ 下的所有 MD 文档，文档更新时自动刷新
  Use when: 需要预览产品文档、查看 PRD/BRD/MRD 等 MD 文档的渲染效果
  Do NOT use when: 文档尚未生成（docs/ 为空）
allowed-tools:
  - Read
  - Bash
---

## Preamble (run first)

```bash
# 检查 docs/ 目录和文档数量
echo "📊 文档预览状态："
echo ""

if [ ! -d docs ]; then
  echo "  ❌ docs/ 目录不存在"
  echo "  💡 请先执行产品流程（/pm-brainstorm → /pm-demand → ... → /pm-docs）生成文档"
  exit 0
fi

total=0
for prefix in "01-需求调研" "02-方案设计" "03-增长迭代" "04-风控管理" "05-产品战略"; do
  count=$(ls docs/$prefix/*.md 2>/dev/null | wc -l | tr -d ' ')
  if [ "$count" -gt 0 ]; then
    echo "  $prefix: $count 个文档"
    total=$((total + count))
  fi
done

# 递归统计所有 .md 文件
all=$(find docs -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
echo ""
echo "  📄 总计: $all 个 MD 文档"
echo ""

if [ "$all" -eq 0 ]; then
  echo "  ❌ 没有找到任何文档"
  echo "  💡 请先执行产品流程生成文档"
fi
```

---

## 执行流程

### 步骤 1: 启动预览服务器

使用 `Bash` 工具启动预览服务器：

```bash
bash skills/pm-preview/scripts/start-preview.sh --project-dir .
```

**说明**：
- 服务器在随机高端口启动（49152-65535）
- 使用 `--project-dir .` 将 session 持久化到 `.superpm/preview/`，服务器停止后文件保留
- 后台运行，不阻塞终端

**输出示例**：
```json
{"type":"server-started","port":52341,"url":"http://localhost:52341","docs_dir":"/path/to/docs","state_dir":"/path/to/.superpm/preview/..."}
```

### 步骤 2: 告知用户打开预览

从输出中提取 `url` 字段，告知用户：

> 📄 文档预览已启动！
>
> 🌐 **预览地址**: {url}
>
> 在浏览器中打开上述地址，即可查看所有产品文档。
> - 左侧边栏：文档目录树
> - 右侧内容区：Markdown 渲染结果
> - 📝 文档更新时浏览器会自动刷新

### 步骤 3: 监控状态（可选）

如果用户需要持续预览，可以提醒：

> 💡 **提示**：
> - 预览服务器 30 分钟无活动后自动停止
> - 如需手动停止，执行：`bash skills/pm-preview/scripts/stop-preview.sh .superpm/preview/{session_id}`
> - 执行其他 skill（如 `/pm-docs`）生成新文档后，浏览器会自动刷新

---

## 停止预览

用户可通过以下方式停止：

```bash
# 查找 session 目录
ls -d .superpm/preview/*/

# 停止服务器
bash skills/pm-preview/scripts/stop-preview.sh .superpm/preview/{session_id}
```

---

## 功能特性

| 特性 | 说明 |
|------|------|
| 实时刷新 | 文档更新时通过 WebSocket 自动推送刷新 |
| 侧边栏导航 | 按目录分组展示所有文档，支持折叠/展开 |
| Markdown 渲染 | 浏览器端渲染，支持表格、代码块、流程图 |
| 亮/暗主题 | 跟随操作系统主题自动切换 |
| 零依赖 | 仅使用 Node.js 内置模块，无需 npm install |
| 自动清理 | 30 分钟无活动自动停止，/tmp 下临时文件自动删除 |

---

## 注意事项

1. **首次使用**：确保 `docs/` 目录下有至少一个 .md 文件
2. **浏览器兼容**：需要支持 WebSocket 的现代浏览器（Chrome/Firefox/Safari/Edge）
3. **网络要求**：Markdown 渲染使用 marked.js CDN，首次加载需要联网
4. **端口冲突**：如果随机端口被占用，服务器会自动使用其他端口
5. **多会话**：每次启动创建独立 session，可同时运行多个预览实例

---

## 常见误区 / Red Flags — STOP

| 误区 | 正确做法 |
|------|---------|
| 文档还没生成就启动预览 | 先执行产品流程生成文档，再启动预览 |
| 预览服务器启动失败时放弃 | 尝试 `--foreground` 模式查看错误信息 |
| 手动修改文档后期望即时刷新 | 文档更新后服务器有 100ms 防抖延迟 |