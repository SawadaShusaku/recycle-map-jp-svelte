<svelte:head>
  <title>{buildPageTitle('更新情報')}</title>
  <meta
    name="description"
    content={`${SITE_NAME_JA}の更新履歴。データの全国対応、機能追加、カテゴリ拡充などの変更情報を掲載しています。`}
  />
</svelte:head>

<script lang="ts">
  import { buildPageTitle, SITE_NAME_JA } from '$lib/site.js';

  const updates = [
    {
      date: '2026-05',
      title: 'サイドバー情報ページの充実',
      description: '「データについて」「更新情報」「プライバシーポリシー」の各ページを新設し、サイドバーから直接アクセスできるようにしました。',
    },
    {
      date: '2026-04',
      title: 'UI装飾素材の統合',
      description: 'コンテンツページにSVGデコレーションを追加し、読みやすさと視覚的な質感を向上させました。',
    },
    {
      date: '2026-03',
      title: '全国対応（都道府県単位のデータ追加）',
      description: '東京都内に限定していた回収拠点データを、全国の都道府県単位で拡充しました。',
    },
    {
      date: '2026-02',
      title: 'カテゴリの追加',
      description: '乾電池、充電式電池、ボタン電池など、回収品目のカテゴリを追加し、絞り込み機能を強化しました。',
    },
    {
      date: '2026-01',
      title: 'Cloudflare D1へのデータ移行',
      description: 'データ管理をSQLiteからCloudflare D1に移行し、より安定した高速クエリを実現しました。',
    },
    {
      date: '2025-12',
      title: 'ベータ版リリース',
      description: `${SITE_NAME_JA}をベータ版として公開しました。地図表示、カテゴリ絞り込み、検索機能を搭載しています。`,
    },
  ];
</script>

<div class="min-h-screen bg-[#f7f7f2] text-stone-800">
  <div class="relative mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-10">
    <img
      src="/decorations/blob_pink_purple.svg"
      alt=""
      aria-hidden="true"
      class="pointer-events-none absolute -right-12 -top-8 w-48 opacity-40 sm:w-64"
    />

    <a
      href="/"
      class="inline-flex w-fit items-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-bold text-stone-700 transition-colors hover:bg-stone-50"
    >
      <span aria-hidden="true">‹</span>
      地図に戻る
    </a>

    <section class="border-b border-stone-300 pb-6">
      <p class="text-xs font-bold tracking-[0.18em] text-stone-500">UPDATES</p>
      <h1 class="mt-2 text-3xl font-black tracking-tight text-stone-900 sm:text-4xl">更新情報</h1>
      <p class="mt-4 text-sm leading-8 text-stone-600 sm:text-base">
        {SITE_NAME_JA}の機能追加、データ拡充、その他の変更履歴を掲載しています。
      </p>
    </section>

    <section class="space-y-6">
      {#each updates as update, index}
        <article class="relative border-b border-stone-200 pb-6 last:border-b-0 last:pb-0">
          <div class="flex items-baseline gap-3">
            <time class="shrink-0 text-sm font-bold tabular-nums text-stone-500">{update.date}</time>
            <div class="h-px flex-1 bg-stone-200"></div>
          </div>
          <h2 class="mt-3 text-lg font-black text-stone-900 sm:text-xl">{update.title}</h2>
          <p class="mt-2 text-sm leading-7 text-stone-700 sm:text-base">{update.description}</p>
        </article>
      {/each}
    </section>

    <img
      src="/decorations/sparkle_star.svg"
      alt=""
      aria-hidden="true"
      class="pointer-events-none mx-auto w-24 opacity-40"
    />

    <a
      href="/"
      class="inline-flex w-fit items-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-bold text-stone-700 transition-colors hover:bg-stone-50"
    >
      <span aria-hidden="true">‹</span>
      地図に戻る
    </a>
  </div>
</div>
