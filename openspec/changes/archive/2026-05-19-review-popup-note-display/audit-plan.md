# Note欄 データ調査方針

## 1. 調査の目的

ポップアップの「基本情報」タブに表示される `notes` 欄に、施設種別名（「自治体施設」「郵便局」など）や営業時間表現が混入している問題について、実際のデータベース内でどのような文字列がどの程度含まれているかを定量的・定性的に把握する。

## 2. 調査対象フィールド

| テーブル | カラム | 表示箇所 | 優先度 |
|---|---|---|---|
| `facilities` | `notes` | ポップアップ「基本情報」タブ | **高** |
| `place_collection_entries` | `notes` | ポップアップ「カテゴリ詳細」タブ | 中 |

**注記**: ユーザーからの指摘はポップアップ表示（基本情報タブ）に関するものであり、`facilities.notes` を最優先で調査する。`place_collection_entries.notes` は二次的に確認する。

## 3. 事前想定される混入パターン

### 3.1 施設種別名（タグ的な短い文字列）
- 「自治体施設」
- 「郵便局」
- 「市役所」「区役所」
- 「コンビニ」「スーパー」「ドラッグストア」
- その他、データソース由来の分類ラベル

### 3.2 営業時間・受付時間表現
- 「開館時間」「閉館時間」
- 「営業時間」
- 「受付時間」

### 3.3 その他のデータノイズ
- データ収集時のメタデータ
- 空文字や空白のみのレコード

## 4. 調査手順

### Step 1: 接続先の確認
- ** primary**: local D1（`wrangler d1 execute RECYCLING_DB --local --command "..."`）
- ** fallback**: preview D1（`wrangler d1 execute RECYCLING_DB --env preview --command "..."`）
- local D1にデータがない場合は、`.local/recycling-dev.db` がある場合は直接SQLiteでクエリ実行

### Step 2: 全体サマリーの取得
```sql
-- 対象レコード数の把握
SELECT 
  COUNT(*) AS total_facilities,
  COUNT(notes) AS notes_not_null,
  COUNT(CASE WHEN notes = '' THEN 1 END) AS notes_empty
FROM facilities;

-- place_collection_entries も同様
SELECT 
  COUNT(*) AS total_entries,
  COUNT(notes) AS notes_not_null,
  COUNT(CASE WHEN notes = '' THEN 1 END) AS notes_empty
FROM place_collection_entries;
```

### Step 3: ユニーク値の抽出（頻度集計）
```sql
-- facilities.notes の出現頻度上位
SELECT notes, COUNT(*) AS cnt
FROM facilities
WHERE notes IS NOT NULL AND notes != ''
GROUP BY notes
ORDER BY cnt DESC
LIMIT 100;

-- place_collection_entries.notes も同様
```

### Step 4: 特定パターンの絞り込み検索
```sql
-- 施設種別名を含むレコードの抽出
SELECT id, name, notes
FROM facilities
WHERE notes LIKE '%自治体施設%'
   OR notes LIKE '%郵便局%'
   OR notes LIKE '%市役所%'
   OR notes LIKE '%区役所%'
   OR notes LIKE '%コンビニ%'
   OR notes LIKE '%スーパー%'
   OR notes LIKE '%ドラッグストア%';

-- 営業時間表現を含むレコードの抽出
SELECT id, name, notes
FROM facilities
WHERE notes LIKE '%開館時間%'
   OR notes LIKE '%閉館時間%'
   OR notes LIKE '%営業時間%'
   OR notes LIKE '%受付時間%';
```

### Step 5: パターン発見型の探索
頻度集計の結果から、明らかに不要と思われる文字列パターンを抽出し、手動でリストアップする。例えば：
- 非常に短い文字列（5文字以下）で、かつ頻出するもの
- 施設名そのものがnotesに入っているもの
- カテゴリ名と同一の文字列

## 5. レポート出力形式

調査結果は `openspec/changes/review-popup-note-display/audit-report.md` に出力する。

### レポート構成
1. **サマリー**: 対象レコード数、notes非Null数、空文字数
2. **頻出パターン一覧**: 上位30件のnotes値と出現回数
3. **問題パターン分類**:
   - 施設種別名混入（件数、具体例5件）
   - 営業時間表現混入（件数、具体例5件）
   - その他ノイズ（件数、具体例）
4. **混入率の推定**: 問題パターンが `notes` 非Nullレコードのうちどの割合を占めるか
5. **推奨対応方針**: 各パターンに対して「APIサニタイズで対応」「DB修正が必要」「パイプラインフィードバック」などの分類

## 6. 注意事項・リスク

- **過度なLIKE検索**: D1（SQLite）でのLIKE検索はフルスキャンとなるため、頻度集計後に絞り込む。全体SELECTは避ける。
- **個人情報**: notesに電話番号や担当者名が含まれていないか、探索中に目視確認する。含まれていた場合は個別対応が必要。
- **有用データの誤特定**: 「入口横」のような有用なnoteと、施設種別名を混同しないよう、具体例を十分に確認してからパターン化する。

## 7. 調査完了基準

以下が判明した時点で調査フェーズを完了とする：
- [ ] `facilities.notes` の頻出値トップ30の把握
- [ ] 施設種別名の混入件数・具体例の特定
- [ ] 営業時間表現の混入件数・具体例の特定
- [ ] 問題パターンがnotes非Nullの何%を占めるかの推定
- [ ] レポート（`audit-report.md`）の作成

---

**次のアクション**: 上記方針に基づき、local D1またはpreview D1に対してSQLを発行し、調査を開始する。
