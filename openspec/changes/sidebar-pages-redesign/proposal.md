## Why

サイドバーの「情報・ヘルプ」セクションには「データについて」「更新情報」「プライバシーポリシー」の3ページへのリンクが存在するが、これらの対応ページが未実装であり、ユーザーがアクセスしてもルートが存在しない状態になっている。また、ユーザーフィードバックを基に、情報系コンテンツを上部に、表示設定を下部に配置する順序変更が必要になった。さらに、`/static/decorations` のSVGアセット群がUI素材として整備されており、これらを既存の使い方ページや新規ページのビジュアルデザインに取り込むことでUI品質を向上させる機会がある。

## What Changes

- **サイドバーのセクション順序変更**: 「情報・ヘルプ」を上部に、「表示設定」を下部に移動
- **新規ページ実装**:
  - `/about-data` — データについて（データソース、利用規約、回収品目の注意点）
  - `/updates` — 更新情報（バージョン変更履歴・追加エリア情報）
  - `/privacy-policy` — プライバシーポリシー（位置情報・ローカルストレージ・外部APIの取り扱い）
- **サイドバーのリンク有効化**: 上記3ページへのリンクを `refined-list-row--disabled` から有効なナビゲーション行に昇格
- **UIデコレーション素材の活用**: `/static/decorations/*.svg` アセットを使い方ページ・新規ページのビジュアルとして統合
- **既存使い方ページのUI刷新**: シンプルさを維持しつつデコレーション素材を組み込み、プレミアムデザインに更新

## Capabilities

### New Capabilities

- `about-data-page`: データソース、カテゴリごとの利用規約、回収品目の注意事項を提供するコンテンツページ
- `updates-page`: アプリのデータ更新履歴・カバレッジ拡張情報を提供するコンテンツページ
- `privacy-policy-page`: 位置情報・ローカルストレージ・Mapillary API等の外部サービス利用に関するプライバシーポリシーページ
- `sidebar-section-order`: サイドバーホーム画面でのセクション表示順序（情報・ヘルプを上、表示設定を下）
- `decoration-assets-integration`: `/static/decorations` SVGをコンテンツページのビジュアル装飾として使用するパターン

### Modified Capabilities

- `sidebar-navigation`: 情報メニュー項目の順序変更（情報・ヘルプ → 上部）、表示設定 → 下部へ移動
- `sidebar-usage-page`: デコレーション素材を組み込んだビジュアルの刷新

## Impact

- **新規ルート**: `src/routes/about-data/+page.svelte`, `src/routes/updates/+page.svelte`, `src/routes/privacy-policy/+page.svelte`
- **変更コンポーネント**: `src/lib/components/SettingsSidebar.svelte`（セクション順序）
- **変更ページ**: `src/routes/usage/+page.svelte`（デコレーション追加）
- **参照アセット**: `static/decorations/*.svg`（blob_green_blue.svg, blob_pink_purple.svg, sparkle_asterisk.svg, dots_pattern.svg 等）
- **既存スペック影響**: `sidebar-navigation`, `sidebar-usage-page` specs に照合
- **外部依存なし**: 新しいAPIキー・ライブラリ追加不要
