![全国リサイクルマップ](static/title-logo.png)

リサイクル対象となる電池・インクカートリッジ・使用済み食用油・加熱式たばこ機器などの
回収拠点を、地図上から横断的に検索できるWebアプリケーションです。

これらの品目は事業者ごとに回収拠点情報が分散しており、
「どこに持ち込めばよいか分からない」ことが適切なリサイクルの障壁になっています。
本アプリは複数のデータソースを統合し、ユーザーが品目と地域から
最寄りの拠点を一度に確認できるようにすることを目的としています。

**[ライブデモ](https://tokyo-recycle-map.com/)**

![スクリーンショット](docs/screenshots/screenshot-main.png)

## ご利用にあたって

メーカーや製品の状態によっては回収対象外となる場合があります。
各拠点の受け入れ条件は、必ず拠点詳細または各データソースの公式情報をご確認ください。

## 主な機能

- 回収拠点のマーカー表示
- 品目別フィルタリング
- テキスト検索
- 距離計測とルート検索
- 拠点詳細情報の表示

## 技術スタック

- [SvelteKit](https://kit.svelte.dev/) / [Svelte 5](https://svelte.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [svelte-maplibre-gl](https://github.com/MIERUNE/svelte-maplibre-gl)（[MIERUNE](https://www.mierune.co.jp/)開発）
- [MapLibre GL](https://maplibre.org/)
- [Lucide Svelte](https://lucide.dev/) - アイコン
- [Tailwind CSS](https://tailwindcss.com/) v4
- [Cloudflare Workers](https://workers.cloudflare.com/) / [D1](https://developers.cloudflare.com/d1/)
- [Wrangler](https://developers.cloudflare.com/workers/wrangler/) - Cloudflare Workers / D1 の開発・デプロイ
- [OpenFreeMap](https://openfreemap.org/) - 地図タイル
- [OpenRouteService](https://openrouteservice.org/) - 経路検索
- [Mapillary](https://www.mapillary.com/) - ストリートビュー画像
- [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) - お問い合わせフォームのbot対策
- [Resend](https://resend.com/) - お問い合わせメール送信
- [Google Analytics](https://analytics.google.com/) - アクセス解析
- [ESLint](https://eslint.org/) / [typescript-eslint](https://typescript-eslint.io/) / [eslint-plugin-svelte](https://sveltejs.github.io/eslint-plugin-svelte/) - 静的解析
- [Vitest](https://vitest.dev/) - ユニットテスト
- [Playwright](https://playwright.dev/) - E2Eテスト

## データソース

以下の外部データソースから取得・整形したデータを使用しています。

### 一般社団法人電池工業会
- http://www.botankaishu.jp/srch/srch10.php

### 一般社団法人JBRC
- https://www.jbrc-system.com/page/pc/techc010/

### インクカートリッジ里帰りプロジェクト
- https://www.inksatogaeri.jp/

### 使用済み食用油の都内回収所
- https://www.kankyo.metro.tokyo.lg.jp/resource/recycle/wastecookingoil/collectionpoint

### 加熱式たばこ機器等の回収・リサイクル活動
- https://www.tioj.or.jp/recycling/index.html

## セルフホスティング

ご自身の環境で本アプリケーションを構築・デプロイする場合は、[docs/self-hosting.md](docs/self-hosting.md) を参照してください。

## License

本プロジェクトのソースコードは [MIT License](LICENSE) の下で公開されています。

### データの取り扱い

- 回収拠点データは各自治体・データソースの利用規約に従います
- 地図タイルは [OpenFreeMap](https://openfreemap.org/) の利用規約に従います
