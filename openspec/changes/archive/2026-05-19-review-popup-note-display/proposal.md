## Why

ポップアップ表示の「基本情報」タブに表示されるNote（`notes`）欄に、開館時間や「自治体施設」「郵便局」などの不要な文字列が混入している。これらは本来Noteとして表示すべきでないデータであり、ユーザーにとってのノイズとなっている。データの品質を向上させ、適切な情報のみを表示するため、混入パターンの調査と修正が必要。

## What Changes

- 現在のデータパイプラインおよびデータベースに蓄積されている`notes`カラムの内容を調査し、不要な文字列の混入パターンを特定する
- データ正規化・クリーニング方針を設計し、不要な文字列をNoteから除外または適切なフィールドへ移動する
- 必要に応じて、フロントエンドでの表示フィルタリングまたはデータ移行スクリプトを実装する
- 既存の`sanitizePublicText`の対象範囲を見直し、新たな不要パターンを追加する

## Capabilities

### New Capabilities
- `note-data-audit`: 既存データのNote欄に含まれる不要文字列の自動検出とレポート生成
- `note-sanitization`: データベースレベルおよびAPIレスポンスレベルでのNoteクリーニング強化

### Modified Capabilities
- `public-facility`: `sanitizePublicText`関数の拡張。開館時間や施設種別名などの不要パターンを追加除外する。

## Impact

- `src/lib/server/public-facility.ts` — `sanitizePublicText`の拡張
- `src/lib/db/migrate.ts` — データ移行時のNote正規化（該当する場合）
- `src/routes/+page.svelte` — ポップアップ表示（表示ロジック変更が必要な場合）
- データパイプライン（private）— 上流データ生成時のNote欄の扱い見直し
