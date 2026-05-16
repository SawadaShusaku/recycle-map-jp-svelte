<svelte:head>
  <title>{buildPageTitle('更新情報')}</title>
  <meta
    name="description"
    content={`${SITE_NAME_JA}の更新履歴。機能追加やデータ改善などの変更情報を掲載しています。`}
  />
</svelte:head>

<script lang="ts">
  import { buildPageTitle, SITE_NAME_JA } from '$lib/site.js';

  const updates = [
    {
      title: 'コンテンツページとサイドバーの改善',
      description: '「データについて」「更新情報」「プライバシーポリシー」のページを新設。サイドバーのセクション順序を変更し、これらのページへ直接ナビゲートできるようにしました。',
    },
    {
      title: 'UI装飾素材の追加と適用',
      description: 'コンテンツページ用のSVGデコレーション素材を追加し、既存の装飾コンポーネントをSvelte 5 runesモードに対応させました。',
    },
    {
      title: 'OGP・Twitter Card対応',
      description: 'SNSシェア時のリンクプレビューに対応するため、OGPおよびTwitter Card用のメタタグを追加しました。',
    },
    {
      title: '都道府県単位での選択とオートズーム',
      description: '都道府県を選択すると、対象エリアに自動的にズームする機能を追加しました。',
    },
    {
      title: '行政区画サマリーへの移行',
      description: '地図上のクラスター円表示を、行政区画ベースのサマリー表示に変更しました。',
    },
    {
      title: 'D1カテゴリメタデータの導入',
      description: 'Cloudflare D1にカテゴリのメタデータ（色、アイコン、順序など）を持たせ、ローカルと同期する仕組みを導入しました。',
    },
    {
      title: 'ルート所要時間表示の削除',
      description: '経路所要時間の表示を削除しました。',
    },
    {
      title: 'Google座標パイプラインと場所マージングの改善',
      description: '複数データソースからの座標取得パイプラインを改善し、同一施設の重複排除（マージング）精度を向上させました。',
    },
    {
      title: 'ベータ版リリース',
      description: `${SITE_NAME_JA}をベータ版として公開しました。地図表示、カテゴリ絞り込み、検索機能を搭載しています。`,
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
      <img
        src="/decorations/sparkle_star.svg"
        alt=""
        aria-hidden="true"
        class="pointer-events-none absolute z-[1] opacity-[0.90] -right-2 top-4 h-10 w-10 sm:-right-4 sm:top-8 sm:h-12 sm:w-12"
      />
      <div class="relative z-10">
        <p class="text-xs font-bold tracking-[0.18em] text-stone-500">UPDATES</p>
      <h1 class="mt-2 text-3xl font-black tracking-tight text-stone-900 sm:text-4xl">更新情報</h1>
      <p class="mt-6 text-base leading-8 text-stone-600 sm:text-lg">
        {SITE_NAME_JA}の機能追加、その他の変更履歴を掲載しています。
      </p>
      </div>
    </section>

    <img
      src="/decorations/dots_pattern.svg"
      alt=""
      aria-hidden="true"
      class="pointer-events-none absolute z-[1] opacity-[0.50] -left-8 top-[45%] h-[20rem] w-[20rem] sm:-left-12 sm:top-[50%] sm:h-[28rem] sm:w-[28rem]"
    />

    <section class="relative z-10 rounded-3xl bg-white p-10 shadow-sm sm:p-12">
      <img
        src="/decorations/blob_pink_purple.svg"
        alt=""
        aria-hidden="true"
        class="pointer-events-none absolute z-[1] opacity-[0.90] -top-12 -right-12 h-56 w-56 sm:-top-24 sm:-right-24 sm:h-80 sm:w-80"
      />
      <div class="relative z-10 space-y-10">
        {#each updates as update}
          <article class="border-b border-stone-200 pb-10 last:border-b-0 last:pb-0">
            <h2 class="text-lg font-black text-stone-900 sm:text-xl">{update.title}</h2>
            <p class="mt-4 text-base leading-8 text-stone-700 sm:text-lg">{update.description}</p>
          </article>
        {/each}
      </div>
    </section>
  </div>
</div>
