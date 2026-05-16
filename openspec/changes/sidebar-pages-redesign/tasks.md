## 1. サイドバー修正

- [x] 1.1 `SettingsSidebar.svelte` のホーム画面で「情報・ヘルプ」セクションを「表示設定」セクションより上に移動する
- [x] 1.2 `infoMenuItems` 配列の `データについて` エントリに `href: '/about-data'` を追加する
- [x] 1.3 `infoMenuItems` 配列の `更新情報` エントリに `href: '/updates'` を追加する
- [x] 1.4 `infoMenuItems` 配列の `プライバシーポリシー` エントリに `href: '/privacy-policy'` を追加する
- [x] 1.5 `jj describe` でサイドバー修正をコミット記述する

## 2. データについてページ（/about-data）

- [x] 2.1 `src/routes/about-data/+page.svelte` を新規作成する
- [x] 2.2 ページタイトル・メタ説明・OGPを設定する（`buildPageTitle('データについて')`）
- [x] 2.3 データソース一覧（電池工業会、JBRC、インクカートリッジ里帰り、食用油、加熱式たばこ）をリンク付きで記述する
- [x] 2.4 データの正確性に関する注意事項（最新でない可能性・事前確認推奨）を記述する
- [x] 2.5 データライセンス（各プロバイダー利用規約・OpenFreeMap）を記述する
- [x] 2.6 `/static/decorations/*.svg` からblob・sparkle等の装飾SVGを `<img aria-hidden="true">` で組み込む
- [x] 2.7 地図に戻るリンクを設置する
- [x] 2.8 `jj describe` でデータページ実装をコミット記述する

## 3. 更新情報ページ（/updates）

- [x] 3.1 `src/routes/updates/+page.svelte` を新規作成する
- [x] 3.2 ページタイトル・メタ説明を設定する（`buildPageTitle('更新情報')`）
- [x] 3.3 更新エントリを逆時系列順で実装する（全国対応、D1移行、カテゴリ追加など）
- [x] 3.4 各エントリに日付・タイトル・説明を記載する
- [x] 3.5 `/static/decorations/*.svg` から装飾SVGを組み込む
- [x] 3.6 地図に戻るリンクを設置する
- [x] 3.7 `jj describe` で更新情報ページ実装をコミット記述する

## 4. プライバシーポリシーページ（/privacy-policy）

- [x] 4.1 `src/routes/privacy-policy/+page.svelte` を新規作成する
- [x] 4.2 ページタイトル・メタ説明を設定する（`buildPageTitle('プライバシーポリシー')`）
- [x] 4.3 位置情報（Geolocation API）の利用に関するセクションを記述する
- [x] 4.4 localStorage（表示設定保存）の利用に関するセクションを記述する
- [x] 4.5 外部サービス（OpenFreeMap・Mapillary・OSRM）へのリクエストに関するセクションを記述する
- [x] 4.6 個人情報の非収集・無アナリティクス・無追跡クッキーを明記するセクションを記述する
- [x] 4.7 `/static/decorations/*.svg` から装飾SVGを組み込む
- [x] 4.8 地図に戻るリンクを設置する
- [ ] 4.9 `jj describe` でプライバシーポリシーページ実装をコミット記述する

## 5. 使い方ページ（/usage）のUIデコレーション刷新

- [ ] 5.1 `/static/decorations/blob_green_blue.svg` および他の素材をページのビジュアル装飾として組み込む
- [ ] 5.2 全既存コンテンツ（注意事項・ガイドセクション・次に見るリンク）が維持されていることを確認する
- [ ] 5.3 装飾SVGに `aria-hidden="true"` が付与されていることを確認する
- [ ] 5.4 `jj describe` でusageページの更新をコミット記述する

## 6. 検証

- [ ] 6.1 `npm run smoke` を実行してSSRエラーがないことを確認する
- [ ] 6.2 `npm run check` を実行して型エラーがないことを確認する
- [ ] 6.3 ブラウザで `/about-data`・`/updates`・`/privacy-policy`・`/usage` の各ページが表示されることを確認する
- [ ] 6.4 サイドバーから各ページへナビゲートできることを確認する
- [ ] 6.5 `jj describe` で最終コミット記述をまとめる
