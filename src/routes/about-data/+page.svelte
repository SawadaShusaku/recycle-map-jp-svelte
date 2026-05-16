<svelte:head>
  <title>{buildPageTitle('データについて')}</title>
  <meta
    name="description"
    content={`${SITE_NAME_JA}で使用しているデータソース、データの正確性に関する注意事項、およびライセンスについて説明しています。`}
  />
  <meta property="og:title" content={buildPageTitle('データについて')} />
  <meta
    property="og:description"
    content={`${SITE_NAME_JA}で使用しているデータソース、データの正確性に関する注意事項、およびライセンスについて説明しています。`}
  />
</svelte:head>

<script lang="ts">
  import { buildPageTitle, SITE_NAME_JA } from '$lib/site.js';

  const dataSources = [
    {
      name: '一般社団法人電池工業会',
      category: '乾電池',
      url: 'http://www.botankaishu.jp/srch/srch10.php',
    },
    {
      name: '一般社団法人JBRC',
      category: '充電式電池',
      url: 'https://www.jbrc-system.com/page/pc/techc010/',
    },
    {
      name: 'インクカートリッジ里帰りプロジェクト',
      category: 'インクカートリッジ',
      url: 'https://www.inksatogaeri.jp/',
    },
    {
      name: '使用済み食用油の都内回収所',
      category: '食用油',
      url: 'https://www.kankyo.metro.tokyo.lg.jp/resource/recycle/wastecookingoil/collectionpoint',
    },
    {
      name: '加熱式たばこ機器等の回収・リサイクル活動',
      category: '加熱式たばこ',
      url: 'https://www.tioj.or.jp/recycling/index.html',
    },
  ];
</script>

<div class="min-h-screen bg-[#f7f7f2] text-stone-800">
  <div class="relative mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-10">
    <img
      src="/decorations/blob_green_blue.svg"
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
      <p class="text-xs font-bold tracking-[0.18em] text-stone-500">DATA</p>
      <h1 class="mt-2 text-3xl font-black tracking-tight text-stone-900 sm:text-4xl">データについて</h1>
      <p class="mt-4 text-sm leading-8 text-stone-600 sm:text-base">
        {SITE_NAME_JA}は、複数の外部データソースから取得・整形した回収拠点情報を統合して提供しています。
      </p>
    </section>

    <section class="space-y-6">
      <h2 class="text-xl font-black leading-tight text-stone-900 sm:text-2xl">データソース</h2>
      <div class="space-y-4">
        {#each dataSources as source}
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-4 transition-colors hover:bg-stone-50 sm:p-5"
          >
            <div class="flex-1 min-w-0">
              <p class="font-bold text-stone-900">{source.name}</p>
              <p class="text-sm text-stone-500">{source.category}</p>
            </div>
            <span class="shrink-0 text-stone-400">›</span>
          </a>
        {/each}
      </div>
    </section>

    <section class="rounded-3xl border border-[#d8d3c7] bg-[#fffdf8] p-5 sm:p-6">
      <div class="flex items-start gap-3">
        <img
          src="/decorations/sparkle_asterisk.svg"
          alt=""
          aria-hidden="true"
          class="mt-1 h-6 w-6 shrink-0 opacity-60"
        />
        <div>
          <h2 class="text-xl font-black leading-tight text-stone-900 sm:text-2xl">データの正確性について</h2>
          <ul class="mt-4 space-y-3 text-sm leading-7 text-stone-700 sm:text-base">
            <li class="flex gap-3">
              <span class="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-stone-500"></span>
              <span>掲載されているデータは最新のものではなく、間違っている可能性があります。</span>
            </li>
            <li class="flex gap-3">
              <span class="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-stone-500"></span>
              <span>施設を利用する前に、必ず事前に電話または各データソースの公式情報で受け入れ条件を確認してください。</span>
            </li>
            <li class="flex gap-3">
              <span class="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-stone-500"></span>
              <span>回収できる品目や受付条件は区や施設ごとに異なります。</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="border-t border-stone-300 pt-6">
      <h2 class="text-xl font-black leading-tight text-stone-900 sm:text-2xl">ライセンス</h2>
      <div class="mt-4 space-y-4 text-sm leading-7 text-stone-700 sm:text-base">
        <p>
          回収拠点データは、それぞれのデータソースの利用規約に従います。詳細は各データソースの公式サイトをご確認ください。
        </p>
        <p>
          地図タイルは <a href="https://openfreemap.org/" target="_blank" rel="noopener noreferrer" class="font-bold underline decoration-stone-400 underline-offset-2 hover:text-stone-900">OpenFreeMap</a> の利用規約に従います。
        </p>
      </div>
    </section>

    <img
      src="/decorations/dots_pattern.svg"
      alt=""
      aria-hidden="true"
      class="pointer-events-none mx-auto w-32 opacity-30"
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
