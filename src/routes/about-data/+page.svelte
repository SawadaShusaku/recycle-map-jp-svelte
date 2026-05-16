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
  <div class="relative mx-auto flex w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl flex-col gap-12 px-8 py-12 sm:px-12 sm:py-16">
    <a
      href="/"
      onclick={() => sessionStorage.setItem('openSidebar', '1')}
      class="group relative z-10 inline-flex w-fit items-center gap-2"
    >
      <svg
        class="h-7 w-7 text-stone-400 transition-colors group-hover:text-stone-800"
        viewBox="0 0 60 60"
        fill="none"
        stroke="currentColor"
        stroke-width="5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M 40 15 L 25 30 L 40 45" />
        <path d="M 25 15 L 10 30 L 25 45" />
      </svg>
      <span class="text-xl font-bold text-stone-600 transition-colors group-hover:text-stone-900">戻る</span>
    </a>

    <section class="relative border-b border-stone-300 pb-10">
      <div class="relative z-10">
        <p class="text-xs font-bold tracking-[0.18em] text-stone-500">DATA</p>
      <h1 class="mt-2 text-3xl font-black tracking-tight text-stone-900 sm:text-4xl">データについて</h1>
      <p class="mt-6 text-base leading-8 text-stone-600 sm:text-lg">
        {SITE_NAME_JA}は、複数の外部データソースから取得・整形した回収拠点情報を統合して提供しています。
      </p>
      </div>
    </section>

    <section class="relative overflow-hidden rounded-3xl bg-white p-10 shadow-sm sm:p-12">
      <img
        src="/decorations/blob_green_blue.svg"
        alt=""
        aria-hidden="true"
        class="pointer-events-none absolute z-[1] opacity-[0.90] -right-16 -top-12 h-56 w-56 sm:-right-32 sm:-top-24 sm:h-80 sm:w-80"
      />
      <img
        src="/decorations/dots_pattern.svg"
        alt=""
        aria-hidden="true"
        class="pointer-events-none absolute z-[1] opacity-[0.15] right-[-2rem] bottom-[-2rem] h-[16rem] w-[16rem] sm:right-[-4rem] sm:bottom-[-4rem] sm:h-[24rem] sm:w-[24rem]"
      />

      <div class="relative z-10">
        <h2 class="text-xl font-black leading-tight text-stone-900 sm:text-2xl">データソース</h2>
      <div class="relative mt-8 space-y-5">
        {#each dataSources as source}
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-5 rounded-2xl border border-stone-200 bg-white/80 p-6 backdrop-blur-sm transition-colors hover:bg-stone-50 sm:p-7"
          >
            <div class="min-w-0 flex-1">
              <p class="text-base font-bold text-stone-900 sm:text-lg">{source.name}</p>
              <p class="text-sm text-stone-500">{source.category}</p>
            </div>
            <span class="shrink-0 text-stone-400">›</span>
          </a>
        {/each}
      </div>
      </div>
    </section>

    <section class="relative overflow-hidden rounded-3xl border border-[#d8d3c7] bg-[#fffdf8] p-10 sm:p-12">
      <img
        src="/decorations/geo_cluster.svg"
        alt=""
        aria-hidden="true"
        class="pointer-events-none absolute z-[1] opacity-[0.60] right-[-4rem] top-1/2 h-[20rem] w-[20rem] -translate-y-1/2 sm:right-[-6rem] sm:h-[28rem] sm:w-[28rem]"
      />
      <div class="relative z-10 flex items-start gap-3">
        <img
          src="/decorations/sparkle_asterisk.svg"
          alt=""
          aria-hidden="true"
          class="mt-1.5 h-5 w-5 shrink-0"
        />
        <div>
          <h2 class="text-xl font-black leading-tight text-stone-900 sm:text-2xl">データの正確性について</h2>
          <ul class="mt-6 space-y-5 text-base leading-8 text-stone-700 sm:text-lg">
            <li class="flex gap-3">
              <span class="mt-3 h-1.5 w-1.5 flex-none rounded-full bg-stone-500"></span>
              <span>掲載されているデータは最新のものではなく、間違っている可能性があります。</span>
            </li>
            <li class="flex gap-3">
              <span class="mt-3 h-1.5 w-1.5 flex-none rounded-full bg-stone-500"></span>
              <span>施設を利用する前に、必ず事前に電話または各データソースの公式情報で受け入れ条件を確認してください。</span>
            </li>
            <li class="flex gap-3">
              <span class="mt-3 h-1.5 w-1.5 flex-none rounded-full bg-stone-500"></span>
              <span>回収できる品目や受付条件は区や施設ごとに異なります。</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="relative rounded-3xl border border-stone-200 bg-white p-10 sm:p-12">
      <img
        src="/decorations/blob_pink_purple.svg"
        alt=""
        aria-hidden="true"
        class="pointer-events-none absolute z-[1] opacity-[0.90] -left-16 -top-12 h-48 w-48 sm:-left-32 sm:-top-24 sm:h-64 sm:w-64"
      />
      <div class="relative z-10">
        <h2 class="text-xl font-black leading-tight text-stone-900 sm:text-2xl">ライセンス</h2>
        <div class="mt-6 space-y-6 text-base leading-8 text-stone-700 sm:text-lg">
          <p>
            回収拠点データは、それぞれのデータソースの利用規約に従います。詳細は各データソースの公式サイトをご確認ください。
          </p>
          <p>
            地図タイルは <a href="https://openfreemap.org/" target="_blank" rel="noopener noreferrer" class="font-bold underline decoration-stone-400 underline-offset-2 hover:text-stone-900">OpenFreeMap</a> の利用規約に従います。
          </p>
        </div>
      </div>
    </section>
  </div>
</div>
