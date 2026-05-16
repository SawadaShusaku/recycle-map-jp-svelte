#!/bin/bash

echo "🔍 負のz-indexを検索中..."

# 負のz-indexを検出
matches=$(grep -rn "z-\[-" src/ 2>/dev/null)

if [ -z "$matches" ]; then
    echo "✅ 負のz-indexは検出されませんでした"
    exit 0
fi

echo ""
echo "❌ 以下のファイルで負のz-indexが検出されました："
echo "$matches"
echo ""

# 自動修正の提案
echo "💡 自動修正オプション："
echo "   1. すべて z-10 に置換"
echo "   2. すべて z-20 に置換"
echo "   3. 手動で修正"
echo ""

# 対話式にするか、引数で処理
if [ "$1" = "--fix" ]; then
    echo "🔧 自動修正を実行します (z-[-*] → z-10)..."
    echo "$matches" | while read -r line; do
        file=$(echo "$line" | cut -d: -f1)
        echo "   修正: $file"
        sed -i '' 's/z-\[-[^]]*\]/z-10/g' "$file" 2>/dev/null || sed -i 's/z-\[-[^]]*\]/z-10/g' "$file"
    done
    echo "✅ 修正完了"
    
    # 残りを確認
    remaining=$(grep -rn "z-\[-" src/ 2>/dev/null)
    if [ -z "$remaining" ]; then
        echo "✅ すべての負のz-indexを修正しました"
        exit 0
    else
        echo "⚠️  一部のファイルが残っています："
        echo "$remaining"
        exit 1
    fi
else
    echo "自動修正するには: npm run precommit -- --fix"
    echo ""
    exit 1
fi
