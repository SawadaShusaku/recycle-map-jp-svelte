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
  <div class="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-10">
    <a
      href="/"
      class="inline-flex w-fit items-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-bold text-stone-700 transition-colors hover:bg-stone-50"
    >
      <span aria-hidden="true">‹</span>
      地図に戻る
    </a>

    <section class="relative overflow-hidden border-b border-stone-300 pb-6">
      <!-- Dots texture behind title: evokes "data points / grid" -->
      <img
        src="/decorations/dots_pattern.svg"
        alt=""
        aria-hidden="true"
        class="pointer-events-none absolute right-4 top-2 h-20 w-20 opacity-[0.12]"
      />
      <p class="text-xs font-bold tracking-[0.18em] text-stone-500">DATA</p>
      <h1 class="mt-2 text-3xl font-black tracking-tight text-stone-900 sm:text-4xl">データについて</h1>
      <p class="mt-4 text-sm leading-8 text-stone-600 sm:text-base">
        {SITE_NAME_JA}は、複数の外部データソースから取得・整形した回収拠点情報を統合して提供しています。
      </p>
    </section>

    <!-- Data sources: anchored background tint unifies the card list -->
    <section class="relative overflow-hidden rounded-3xl bg-white p-5 shadow-sm sm:p-6">
      <img
        src="/decorations/blob_green_blue.svg"
        alt=""
        aria-hidden="true"
        class="pointer-events-none absolute -right-16 -top-16 h-64 w-64 opacity-[0.08]"
      />
      <h2 class="text-xl font-black leading-tight text-stone-900 sm:text-2xl">データソース</h2>
      <div class="relative mt-4 space-y-3">
        {#each dataSources as source}
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-4 rounded-2xl border border-stone-200 bg-white/80 p-4 backdrop-blur-sm transition-colors hover:bg-stone-50 sm:p-5"
          >
            <div class="min-w-0 flex-1">
              <p class="font-bold text-stone-900">{source.name}</p>
              <p class="text-sm text-stone-500">{source.category}</p>
            </div>
            <span class="shrink-0 text-stone-400">›</span>
          </a>
        {/each}
      </div>
    </section>

    <!-- Accuracy warning: asterisk accent signals "attention / caution" -->
    <section class="rounded-3xl border border-[#d8d3c7] bg-[#fffdf8] p-5 sm:p-6">
      <div class="flex items-start gap-3">
        <img
          src="/decorations/sparkle_asterisk.svg"
          alt=""
          aria-hidden="true"
          class="mt-1.5 h-5 w-5 shrink-0 opacity-50"
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

    <!-- License: outline blob acts as a soft enclosing frame -->
    <section class="relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-5 sm:p-6">
      <img
        src="/decorations/outline_blob.svg"
        alt=""
        aria-hidden="true"
        class="pointer-events-none absolute -left-8 -top-8 h-48 w-48 opacity-[0.10]"
      />
      <div class="relative">
        <h2 class="text-xl font-black leading-tight text-stone-900 sm:text-2xl">ライセンス</h2>
        <div class="mt-4 space-y-4 text-sm leading-7 text-stone-700 sm:text-base">
          <p>
            回収拠点データは、それぞれのデータソースの利用規約に従います。詳細は各データソースの公式サイトをご確認ください。
          </p>
          <p>
            地図タイルは <a href="https://openfreemap.org/" target="_blank" rel="noopener noreferrer" class="font-bold underline decoration-stone-400 underline-offset-2 hover:text-stone-900">OpenFreeMap</a> の利用規約に従います。
          </p>
        </div>
      </div>
    </section>

    <a
      href="/"
      class="inline-flex w-fit items-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-bold text-stone-700 transition-colors hover:bg-stone-50"
    >
      <span aria-hidden="true">‹</span>
      地図に戻る
    </a>
  </div>
</div>
