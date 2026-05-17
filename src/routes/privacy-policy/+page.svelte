<svelte:head>
  <title>{buildPageTitle('プライバシーポリシー')}</title>
  <meta
    name="description"
    content={`${SITE_NAME_JA}のプライバシーポリシー。位置情報、localStorage、外部サービス利用について説明しています。`}
  />
</svelte:head>

<script lang="ts">
  import { buildPageTitle, SITE_NAME_JA } from '$lib/site.js';
</script>

<div class="min-h-screen bg-[#f7f7f2] text-stone-800">
  <div class="mx-auto flex w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl flex-col gap-12 px-8 py-12 sm:px-12 sm:py-16">
    <a
      href="/"
      onclick={() => sessionStorage.setItem('openSidebar', '1')}
      class="group relative z-20 inline-flex w-fit items-center gap-2"
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
        src="/decorations/blob_green_blue.svg"
        alt=""
        aria-hidden="true"
        class="pointer-events-none absolute z-[1] opacity-[0.90] -left-16 -top-12 h-44 w-44 sm:-left-36 sm:-top-28 sm:h-64 sm:w-64"
      />
      <div class="relative z-10">
        <p class="text-xs font-bold tracking-[0.18em] text-stone-500">PRIVACY</p>
        <h1 class="mt-2 text-3xl font-black tracking-tight text-stone-900 sm:text-4xl">プライバシーポリシー</h1>
        <p class="mt-6 text-base leading-8 text-stone-600 sm:text-lg">
          {SITE_NAME_JA}では、ユーザーのプライバシーを尊重し、最小限の情報のみを利用しています。
        </p>
      </div>
    </section>

    <section class="space-y-12">
      <article>
        <h2 class="text-xl font-black leading-tight text-stone-900 sm:text-2xl">位置情報の利用</h2>
        <div class="mt-6 space-y-6 text-base leading-8 text-stone-700 sm:text-lg">
          <p>
            本アプリは、ユーザーが「現在地」ボタンを押したり、経路検索をリクエストした際にのみ、ブラウザのGeolocation APIを利用して位置情報を取得します。
          </p>
          <p>
            取得した位置情報は本アプリのサーバーに送信されることはなく、経路計算のためにのみopenrouteserviceに送信されます。
          </p>
        </div>
      </article>

      <article>
        <h2 class="text-xl font-black leading-tight text-stone-900 sm:text-2xl">設定の保存（localStorage）</h2>
        <div class="mt-6 space-y-6 text-base leading-8 text-stone-700 sm:text-lg">
          <p>
            マーカーの表示スタイル、フォント設定、単色マーカーの色選択などの表示設定は、ブラウザのlocalStorageに保存されます。
          </p>
          <p>
            保存される情報は表示設定のみであり、個人を特定できる情報は含まれません。設定を削除する場合は、ブラウザのストレージ削除機能をご利用ください。
          </p>
        </div>
      </article>

      <article>
        <h2 class="text-xl font-black leading-tight text-stone-900 sm:text-2xl">外部サービスの利用</h2>
        <div class="mt-6 space-y-6 text-base leading-8 text-stone-700 sm:text-lg">
          <p>本アプリは以下の外部サービスにリクエストを送信します。</p>
          <ul class="space-y-4">
            <li class="flex gap-3">
              <span class="mt-3 h-1.5 w-1.5 flex-none rounded-full bg-stone-500"></span>
              <span>
                <strong class="text-stone-900">OpenFreeMap</strong> — 地図タイルの表示
              </span>
            </li>
            <li class="flex gap-3">
              <span class="mt-3 h-1.5 w-1.5 flex-none rounded-full bg-stone-500"></span>
              <span>
                <strong class="text-stone-900">Mapillary</strong> — 施設周辺のストリートビュー画像
              </span>
            </li>
            <li class="flex gap-3">
              <span class="mt-3 h-1.5 w-1.5 flex-none rounded-full bg-stone-500"></span>
              <span>
                <strong class="text-stone-900">openrouteservice</strong> — 経路計算
              </span>
            </li>
          </ul>
          <p>
            これらのサービスでは、それぞれのプライバシーポリシーに基づきリクエストのメタデータが記録される可能性があります。
          </p>
        </div>
      </article>

      <article class="relative overflow-hidden rounded-3xl border border-[#d8d3c7] bg-[#fffdf8] p-5 sm:p-8">
        <img
          src="/decorations/blob_pink_purple.svg"
          alt=""
          aria-hidden="true"
          class="pointer-events-none absolute z-[1] opacity-[0.90] right-[-4rem] bottom-[-4rem] h-[24rem] w-[24rem] sm:right-[-6rem] sm:bottom-[-6rem] sm:h-[36rem] sm:w-[36rem]"
        />
        <div class="relative z-10 flex items-start gap-3">
          <img
            src="/decorations/sparkle_asterisk.svg"
            alt=""
            aria-hidden="true"
            class="mt-1.5 h-5 w-5 shrink-0"
          />
          <div>
            <h2 class="text-xl font-black leading-tight text-stone-900 sm:text-2xl">個人情報の収集について</h2>
            <div class="mt-6 space-y-6 text-base leading-8 text-stone-700 sm:text-lg">
              <p>
                本アプリは、ユーザーの個人情報を収集、保存、または送信することはありません。
              </p>
              <p>
                また、アクセス解析や追跡クッキー（tracking cookies）も使用しておりません。
              </p>
            </div>
          </div>
        </div>
      </article>
    </section>
  </div>
</div>
