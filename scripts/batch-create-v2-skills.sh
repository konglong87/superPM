#!/bin/bash

# 批量创建 skills v2 版本脚本
# 作者：superPM Team
# 版本：1.0.0

set -e

PROJECT_ROOT="/Users/konglong/GolandProjects/superPM"
cd "$PROJECT_ROOT"

echo "🚀 批量创建 skills v2 版本"
echo "========================================"
echo ""

# 统计变量
total_created=0
total_skipped=0
created_list=()

# 创建函数：优化单个 skill
create_v2_skill() {
  local skill_path="$1"
  local template_info="$2"
  local priority="$3"

  local skill_name=$(basename "$skill_path")
  local skill_dir="skills/$skill_path"
  local v2_dir="skills/${skill_path}-v2"

  # 检查原始 skill 是否存在
  if [ ! -d "$skill_dir" ]; then
    echo "⚠️  跳过: $skill_name (原始 skill 不存在)"
    ((total_skipped++))
    return
  fi

  # 检查 v2 版本是否已存在
  if [ -d "$v2_dir" ]; then
    echo "⚠️  跳过: $skill_name (v2 已存在)"
    ((total_skipped++))
    return
  fi

  # 创建 v2 版本
  echo "✅ 创建: $skill_name-v2 [$priority] - $template_info"
  cp -r "$skill_dir" "$v2_dir"

  # 更新 YAML 头部
  local skill_file="$v2_dir/SKILL.md"
  if [ -f "$skill_file" ]; then
    # 更新 name
    sed -i '' "s/^name: pm-\(.*\)/name: pm-\1-v2/" "$skill_file"

    # 更新 version
    sed -i '' "s/^version: .*/version: 2.0.0/" "$skill_file"

    # 添加 Agent 工具（如果还没有）
    if ! grep -q "^  - Agent" "$skill_file"; then
      sed -i '' '/^allowed-tools:/a\
  - Agent
' "$skill_file"
    fi

    # 添加优化说明到 description
    if ! grep -q "优化点:" "$skill_file"; then
      sed -i '' '/^  Use when:/a\
  优化点: 使用 subagent 架构优化，详情见模板文档
' "$skill_file"
    fi

    ((total_created++))
    created_list+=("$skill_name [$priority]")
  else
    echo "❌ 错误: $skill_name (SKILL.md 不存在)"
    ((total_skipped++))
  fi
}

echo "📋 优化计划："
echo "  - P0 (已完成): 3 个"
echo "  - P1 (推荐): 5 个"
echo "  - P2 (可选): 10 个"
echo "  - 总计: 18 个"
echo ""

echo "🔨 开始创建 v2 版本..."
echo ""

# P1 优先级
echo "📦 P1 优先级 (推荐优化)："
echo "----------------------------------------"
create_v2_skill "01-demand-insight/pm-journey" "template3:数据分析" "P1"
create_v2_skill "02-solution-design/pm-data" "template3:数据分析" "P1"
create_v2_skill "02-solution-design/pm-feature" "template2:文档生成" "P1"
create_v2_skill "03-growth-iteration/pm-growth" "template3:数据分析" "P1"
create_v2_skill "05-product-strategy/pm-funnel" "template3:数据分析" "P1"

echo ""
echo "📦 P2 优先级 (可选优化)："
echo "----------------------------------------"
create_v2_skill "01-demand-insight/pm-demand" "template1:联网搜索" "P2"
create_v2_skill "01-demand-insight/pm-priority" "template3:数据分析" "P2"
create_v2_skill "02-solution-design/pm-tech" "template2:文档生成" "P2"
create_v2_skill "02-solution-design/pm-proto" "template2:文档生成" "P2"
create_v2_skill "02-solution-design/pm-user-story" "template2:文档生成" "P2"
create_v2_skill "03-growth-iteration/pm-iteration" "template3:数据分析" "P2"
create_v2_skill "04-risk-management/pm-risk" "template3:数据分析" "P2"
create_v2_skill "05-product-strategy/pm-business-model" "template2:文档生成" "P2"
create_v2_skill "05-product-strategy/pm-portfolio" "template4:竞品分析" "P2"
create_v2_skill "05-product-strategy/pm-decision" "template3:数据分析" "P2"

echo ""
echo "========================================"
echo "✨ 批量创建完成！"
echo ""
echo "📊 统计信息："
echo "  - ✅ 已创建: $total_created 个"
echo "  - ⚠️  已跳过: $total_skipped 个"
echo ""

if [ ${#created_list[@]} -gt 0 ]; then
  echo "✅ 已创建列表："
  for item in "${created_list[@]}"; do
    echo "  - $item"
  done
  echo ""
fi

echo "📝 下一步："
echo "  1. 检查生成的文件: find skills -name '*-v2' -type d"
echo "  2. 按模板重构每个 skill 的执行流程"
echo "  3. 添加优化对比说明"
echo "  4. 测试验证优化效果"
echo "  5. 提交代码"
echo ""
echo "📚 参考文档："
echo "  - 模板手册: skills/templates/subagent-skill-template.md"
echo "  - 快速指南: skills/templates/README.md"
echo ""
echo "🎉 完成！"