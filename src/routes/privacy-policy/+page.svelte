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
  <div class="relative mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-10">
    <img
      src="/decorations/outline_blob.svg"
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
      <p class="text-xs font-bold tracking-[0.18em] text-stone-500">PRIVACY</p>
      <h1 class="mt-2 text-3xl font-black tracking-tight text-stone-900 sm:text-4xl">プライバシーポリシー</h1>
      <p class="mt-4 text-sm leading-8 text-stone-600 sm:text-base">
        {SITE_NAME_JA}では、ユーザーのプライバシーを尊重し、最小限の情報のみを利用しています。
      </p>
    </section>

    <section class="space-y-8">
      <article>
        <h2 class="text-xl font-black leading-tight text-stone-900 sm:text-2xl">位置情報の利用</h2>
        <div class="mt-3 space-y-3 text-sm leading-7 text-stone-700 sm:text-base">
          <p>
            本アプリは、ユーザーが「現在地」ボタンを押したり、経路検索をリクエストした際にのみ、ブラウザのGeolocation APIを利用して位置情報を取得します。
          </p>
          <p>
            取得した位置情報は本アプリのサーバーに送信されることはなく、経路計算のためにのみOSRM（Open Source Routing Machine）に送信されます。
          </p>
        </div>
      </article>

      <article>
        <h2 class="text-xl font-black leading-tight text-stone-900 sm:text-2xl">設定の保存（localStorage）</h2>
        <div class="mt-3 space-y-3 text-sm leading-7 text-stone-700 sm:text-base">
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
        <div class="mt-3 space-y-3 text-sm leading-7 text-stone-700 sm:text-base">
          <p>本アプリは以下の外部サービスにリクエストを送信します。</p>
          <ul class="space-y-2">
            <li class="flex gap-3">
              <span class="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-stone-500"></span>
              <span>
                <strong class="text-stone-900">OpenFreeMap</strong> — 地図タイルの表示
              </span>
            </li>
            <li class="flex gap-3">
              <span class="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-stone-500"></span>
              <span>
                <strong class="text-stone-900">Mapillary</strong> — 施設周辺のストリートビュー画像
              </span>
            </li>
            <li class="flex gap-3">
              <span class="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-stone-500"></span>
              <span>
                <strong class="text-stone-900">OSRM</strong> — 経路計算
              </span>
            </li>
          </ul>
          <p>
            これらのサービスでは、それぞれのプライバシーポリシーに基づきリクエストのメタデータが記録される可能性があります。
          </p>
        </div>
      </article>

      <article class="rounded-3xl border border-[#d8d3c7] bg-[#fffdf8] p-5 sm:p-6">
        <div class="flex items-start gap-3">
          <img
            src="/decorations/sparkle_asterisk.svg"
            alt=""
            aria-hidden="true"
            class="mt-1 h-6 w-6 shrink-0 opacity-60"
          />
          <div>
            <h2 class="text-xl font-black leading-tight text-stone-900 sm:text-2xl">個人情報の収集について</h2>
            <div class="mt-3 space-y-3 text-sm leading-7 text-stone-700 sm:text-base">
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
