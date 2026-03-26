#!/bin/bash

# 大规模重构脚本：删除 v1，将 v2 重命名为标准版本
# 作者：superPM Team
# 版本：1.0.0

set -e

PROJECT_ROOT="/Users/konglong/GolandProjects/superPM"
cd "$PROJECT_ROOT"

echo "🔄 大规模重构：将 v2 版本替换为标准版本"
echo "========================================"
echo ""

# 统计变量
total_deleted=0
total_renamed=0
deleted_list=()
renamed_list=()

# 查找所有 v2 版本
v2_dirs=$(find skills -name "*-v2" -type d | sort)

echo "📋 重构计划："
echo "  - 删除 v1 版本"
echo "  - 将 v2 重命名为标准版本"
echo "  - 更新 SKILL.md 中的 name"
echo ""

echo "🔍 检测到以下 v2 版本："
echo "$v2_dirs" | while read dir; do
  echo "  - $dir"
done
echo ""

# 确认操作
read -p "⚠️  此操作将删除所有 v1 版本，是否继续？(yes/no): " confirm
if [ "$confirm" != "yes" ]; then
  echo "❌ 操作已取消"
  exit 0
fi

echo ""
echo "🔨 开始重构..."
echo ""

# 处理每个 v2 版本
for v2_dir in $v2_dirs; do
  v1_dir="${v2_dir%-v2}"
  skill_name=$(basename "$v1_dir")

  echo "处理: $skill_name"
  echo "----------------------------------------"

  # 步骤 1: 删除 v1 版本
  if [ -d "$v1_dir" ]; then
    echo "  1️⃣  删除 v1: $v1_dir"
    rm -rf "$v1_dir"
    deleted_list+=("$v1_dir")
    ((total_deleted++))
  else
    echo "  1️⃣  v1 不存在，跳过删除"
  fi

  # 步骤 2: 重命名 v2 为标准版本
  echo "  2️⃣  重命名: $v2_dir → $v1_dir"
  mv "$v2_dir" "$v1_dir"
  renamed_list+=("$v1_dir")
  ((total_renamed++))

  # 步骤 3: 更新 SKILL.md 中的 name
  skill_file="$v1_dir/SKILL.md"
  if [ -f "$skill_file" ]; then
    echo "  3️⃣  更新 name: pm-$skill_name-v2 → pm-$skill_name"
    sed -i '' 's/^name: pm-\(.*\)-v2/name: pm-\1/' "$skill_file"

    # 更新 version 为 2.0.0（如果还不是）
    if grep -q "^version: 1\." "$skill_file"; then
      sed -i '' 's/^version: .*/version: 2.0.0/' "$skill_file"
      echo "  4️⃣  更新 version: 2.0.0"
    fi
  fi

  echo "  ✅ 完成: $skill_name"
  echo ""
done

echo "========================================"
echo "✨ 重构完成！"
echo ""
echo "📊 统计信息："
echo "  - 🗑️  已删除 v1: $total_deleted 个"
echo "  - 📝 已重命名 v2: $total_renamed 个"
echo ""

if [ ${#deleted_list[@]} -gt 0 ]; then
  echo "🗑️  已删除列表："
  for item in "${deleted_list[@]}"; do
    echo "  - $item"
  done
  echo ""
fi

if [ ${#renamed_list[@]} -gt 0 ]; then
  echo "📝 已重命名列表："
  for item in "${renamed_list[@]}"; do
    echo "  - $item"
  done
  echo ""
fi

echo "📝 下一步："
echo "  1. 检查重构结果: find skills -name 'pm-*' -type d | grep -v v2"
echo "  2. 验证 SKILL.md: grep '^name:' skills/*/SKILL.md"
echo "  3. 提交代码: git add skills/ && git commit -m 'refactor: v2版本替换为标准版本'"
echo ""
echo "🎉 完成！"