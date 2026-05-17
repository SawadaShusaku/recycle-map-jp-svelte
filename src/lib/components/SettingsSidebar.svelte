<script lang="ts">
  import brandLogo from '$lib/assets/logo.svg';
  import { SITE_NAME_EN, SITE_NAME_JA } from '$lib/site.js';
  import type { FontTarget, LogoFont, MarkerStyle } from '$lib/types.js';
  import {
    getMarkerStyle,
    setMarkerStyle,
    getSolidColor,
    setSolidColor,
  } from '$lib/marker-style.js';
  import {
    getFontChoice,
    setFontChoice,
    getLogoFontLabel,
  } from '$lib/font-style.js';
  import {
    X,
    ChevronRight,
    ChevronLeft,
    Palette,
    Type,
    HelpCircle,
    FileText,
    Sparkles,
    ShieldCheck,
  } from 'lucide-svelte';
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';

  let {
    open = $bindable(false),
    markerStyle = $bindable(getMarkerStyle()),
    solidColor = $bindable(getSolidColor()),
  } = $props<{
    open: boolean;
    markerStyle: MarkerStyle;
    solidColor: string;
  }>();

  type Section = 'home' | 'marker' | 'fonts';

  let currentSection = $state<Section>('home');

  let logoFont = $state<LogoFont>(getFontChoice('logo'));
  let popupFont = $state<LogoFont>(getFontChoice('popup'));
  let uiFont = $state<LogoFont>(getFontChoice('ui'));

  type InfoMenuItem = {
    label: string;
    description?: string;
    href?: string;
    external?: boolean;
    icon: typeof HelpCircle;
    accent?: boolean;
  };

  const styleOptions: { value: MarkerStyle; label: string; sub: string }[] = [
    { value: 'adaptive', label: '同心円（デフォルト）', sub: 'カテゴリ数に応じて自動切替' },
    { value: 'solid', label: '単色', sub: '指定した1色で統一' },
    { value: 'gradient', label: 'グラデーション', sub: 'カテゴリ色をグラデーション表示' },
  ];

  const fontOptions: LogoFont[] = [
    'zen-kaku-gothic',
    'm-plus-rounded',
    'klee-one',
    'biz-udp-mincho',
    'dot-gothic',
    'hachi-maru-pop',
    'kaisei-decol',
    'kiwi-maru',
    'rampart-one',
    'zen-kurenaido',
    'zen-maru-gothic',
  ];

  const fontTargets: { key: FontTarget; label: string }[] = [
    { key: 'ui', label: 'UIフォント' },
  ];

  const settingSections = [
    {
      id: 'marker' as Section,
      label: 'マーカーデザイン',
      icon: Palette,
    },
    {
      id: 'fonts' as Section,
      label: 'フォント設定',
      icon: Type,
    },
  ];

  const infoMenuItems: InfoMenuItem[] = [
    { label: '使い方', href: '/usage', icon: HelpCircle },
    { label: 'データについて', href: '/about-data', icon: FileText },
    { label: '更新情報', href: '/updates', icon: Sparkles },
    { label: 'プライバシーポリシー', href: '/privacy-policy', icon: ShieldCheck },
  ];

  function handleStyleChange(style: MarkerStyle) {
    markerStyle = style;
    setMarkerStyle(style);
  }

  function handleSolidColorChange(color: string) {
    solidColor = color;
    setSolidColor(color);
  }

  function handleFontChange(target: FontTarget, font: LogoFont) {
    if (target === 'logo') logoFont = font;
    if (target === 'popup') popupFont = font;
    if (target === 'ui') uiFont = font;
    setFontChoice(target, font);
  }

  function goHome() {
    currentSection = 'home';
  }

  function goSection(section: Section) {
    currentSection = section;
  }

  function getFontPreviewStyle(font: LogoFont): string {
    const map: Partial<Record<LogoFont, string>> = {
      'zen-kaku-gothic': '"Zen Kaku Gothic New"',
      'm-plus-rounded': '"M PLUS Rounded 1c"',
      'klee-one': '"Klee One"',
      'biz-udp-mincho': '"BIZ UDPMincho"',
      'dot-gothic': '"DotGothic16"',
      'hachi-maru-pop': '"Hachi Maru Pop"',
      'kaisei-decol': '"Kaisei Decol"',
      'kiwi-maru': '"Kiwi Maru"',
      'rampart-one': '"Rampart One"',
      'zen-kurenaido': '"Zen Kurenaido"',
      'zen-maru-gothic': '"Zen Maru Gothic"',
    };
    return `font-family: ${map[font] ?? 'inherit'}, sans-serif;`;
  }
</script>

{#if open}
  <div
    class="refined-backdrop"
    onclick={() => (open = false)}
    role="button"
    tabindex="0"
    onkeydown={(e) => e.key === 'Escape' && (open = false)}
    aria-label="閉じる"
    transition:fade={{ duration: 200 }}
  ></div>

  <aside
    class="refined-sidebar"
    aria-label="設定メニュー"
    transition:fly={{ x: -420, duration: 320, easing: cubicOut }}
  >
    <header class="refined-sidebar__head">
      <img src={brandLogo} alt="" class="refined-sidebar__logo" />
      <div class="refined-sidebar__brand">
        <p class="refined-sidebar__brand-kicker">{SITE_NAME_EN.toUpperCase()}</p>
        <p class="refined-sidebar__brand-title">{SITE_NAME_JA}</p>
      </div>
      <button class="refined-sidebar__close" onclick={() => (open = false)} aria-label="閉じる">
        <X size={18} />
      </button>
    </header>

    <div class="refined-sidebar__body">
      {#if currentSection === 'home'}
        <section class="refined-section">
          <h3 class="refined-section__title">ヘルプ</h3>
          {#each infoMenuItems as item}
            {@const Icon = item.icon}
            {@const available = Boolean(item.href)}
            {#if available}
              <a
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                class="refined-list-row"
              >
                <span class="refined-list-row__icon">
                  <Icon size={18} />
                </span>
                <div class="refined-list-row__main">
                  <p class="refined-list-row__label">{item.label}</p>
                  {#if item.description}
                    <p class="refined-list-row__sub">{item.description}</p>
                  {/if}
                </div>
                <ChevronRight class="refined-list-row__chev" size={16} />
              </a>
            {:else}
              <div class="refined-list-row refined-list-row--disabled" aria-disabled="true">
                <span class="refined-list-row__icon">
                  <Icon size={18} />
                </span>
                <div class="refined-list-row__main">
                  <p class="refined-list-row__label">{item.label}</p>
                  {#if item.description}
                    <p class="refined-list-row__sub">{item.description}</p>
                  {/if}
                </div>
                <ChevronRight class="refined-list-row__chev" size={16} />
              </div>
            {/if}
          {/each}
        </section>

        <section class="refined-section">
          <h3 class="refined-section__title">表示設定</h3>
          {#each settingSections as sec}
            {@const Icon = sec.icon}
            <button class="refined-list-row" onclick={() => goSection(sec.id)}>
              <span class="refined-list-row__icon">
                <Icon size={18} />
              </span>
              <div class="refined-list-row__main">
                <p class="refined-list-row__label">{sec.label}</p>
              </div>
              <ChevronRight class="refined-list-row__chev" size={16} />
            </button>
          {/each}
        </section>

      {:else if currentSection === 'marker'}
        <button class="refined-back" onclick={goHome}>
          <ChevronLeft size={20} />
          戻る
        </button>
        <h3 class="refined-detail-title">マーカーデザイン</h3>

        <div class="refined-options">
          {#each styleOptions as opt}
            <label class="refined-option" class:refined-option--selected={markerStyle === opt.value}>
              <input
                type="radio"
                name="marker-style"
                value={opt.value}
                checked={markerStyle === opt.value}
                onchange={() => handleStyleChange(opt.value)}
              />
              <span class="refined-option__radio" aria-hidden="true"></span>
              <span class="refined-option__main">
                <span class="refined-option__label">{opt.label}</span>
                <span class="refined-option__sub">{opt.sub}</span>
              </span>
            </label>
          {/each}
        </div>

        {#if markerStyle === 'solid'}
          <div class="refined-color-row">
            <label for="solid-color">単色マーカーの色</label>
            <div class="refined-color-row__pick">
              <input
                id="solid-color"
                type="color"
                value={solidColor}
                oninput={(e) => handleSolidColorChange(e.currentTarget.value)}
              />
              <span class="refined-color-row__hex">{solidColor}</span>
            </div>
          </div>
        {/if}

      {:else if currentSection === 'fonts'}
        <button class="refined-back" onclick={goHome}>
          <ChevronLeft size={20} />
          戻る
        </button>
        <h3 class="refined-detail-title">フォント設定</h3>

        {#each fontTargets as ft}
          {@const currentValue = ft.key === 'logo' ? logoFont : ft.key === 'popup' ? popupFont : uiFont}
          <div class="refined-font-group">
            <p class="refined-font-group__label">{ft.label}</p>
            <div class="refined-options">
              {#each fontOptions as opt}
                <label
                  class="refined-option"
                  class:refined-option--selected={currentValue === opt}
                  style={getFontPreviewStyle(opt)}
                >
                  <input
                    type="radio"
                    name="font-{ft.key}"
                    value={opt}
                    checked={currentValue === opt}
                    onchange={() => handleFontChange(ft.key, opt)}
                  />
                  <span class="refined-option__radio" aria-hidden="true"></span>
                  <span class="refined-option__main">
                    <span class="refined-option__label">{getLogoFontLabel(opt)}</span>
                  </span>
                </label>
              {/each}
            </div>
          </div>
        {/each}
      {/if}
    </div>

    <footer class="refined-sidebar__footer">
      <div class="refined-sidebar__links">
        <a
          href="https://github.com/SawadaShusaku/recycle-map-jp-svelte"
          target="_blank"
          rel="noopener noreferrer"
          class="refined-sidebar__icon-link"
          aria-label="GitHubでソースコードを表示"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24" aria-hidden="true">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        </a>
        <a
          href="https://x.com/sawac_s"
          target="_blank"
          rel="noopener noreferrer"
          class="refined-sidebar__icon-link"
          aria-label="X（旧Twitter）で開発者をフォロー"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>
      </div>
      <p class="refined-sidebar__copyright">© 2026 {SITE_NAME_EN}</p>
    </footer>
  </aside>
{/if}

<style>
  .refined-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.32);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    z-index: 40;
  }

  .refined-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: min(400px, calc(100% - 32px));
    background: #fff;
    z-index: 50;
    display: flex;
    flex-direction: column;
    box-shadow: 0 24px 64px rgba(15, 23, 42, 0.18), 0 8px 16px rgba(15, 23, 42, 0.08);
  }

  .refined-sidebar__head {
    padding: 18px 18px 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    border-bottom: 1px solid rgba(15, 23, 42, 0.05);
  }
  .refined-sidebar__logo {
    width: 44px;
    height: 44px;
    flex-shrink: 0;
  }
  .refined-sidebar__brand {
    min-width: 0;
    flex: 1;
  }
  .refined-sidebar__brand-kicker {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.18em;
    color: #00766f;
    margin: 0 0 3px;
    line-height: 1;
  }
  .refined-sidebar__brand-title {
    font-size: 22px;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: #0b1116;
    margin: 0;
    line-height: 1.1;
  }
  .refined-sidebar__close {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6b7480;
    background: transparent;
    border: 0;
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease;
    flex-shrink: 0;
  }
  .refined-sidebar__close:hover { background: #f7f8fa; color: #0b1116; }

  .refined-sidebar__body {
    flex: 1;
    overflow-y: auto;
    padding: 18px 16px 24px;
  }

  .refined-section { margin-bottom: 22px; }
  .refined-section:last-child { margin-bottom: 0; }
  .refined-section__title {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.12em;
    color: #374151;
    text-transform: uppercase;
    margin: 0 8px 10px;
  }

  .refined-list-row {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 12px 14px;
    border-radius: 14px;
    text-decoration: none;
    color: inherit;
    background: transparent;
    border: 0;
    width: 100%;
    text-align: left;
    cursor: pointer;
    transition: background 0.15s ease, transform 0.15s ease;
    font: inherit;
  }
  .refined-list-row + .refined-list-row { margin-top: 2px; }
  .refined-list-row:hover { background: #f7f8fa; }
  .refined-list-row:active { transform: scale(0.99); }
  .refined-list-row--disabled {
    cursor: default;
    opacity: 0.55;
  }
  .refined-list-row--disabled:hover { background: transparent; }

  .refined-list-row__icon {
    width: 42px;
    height: 42px;
    border-radius: 10px;
    color: #1a2127;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .refined-list-row__icon :global(svg) {
    width: 20px;
    height: 20px;
  }

  .refined-list-row__main {
    flex: 1;
    min-width: 0;
  }
  .refined-list-row__label {
    font-size: 16px;
    font-weight: 600;
    color: #0b1116;
    margin: 0 0 2px;
    line-height: 1.3;
  }
  .refined-list-row__sub {
    font-size: 13.5px;
    color: #6b7480;
    margin: 0;
    line-height: 1.4;
  }
  :global(.refined-list-row__chev) {
    color: #9ba3ad;
    flex-shrink: 0;
  }

  .refined-sidebar__footer {
    padding: 12px 18px 18px;
    border-top: 1px solid rgba(15, 23, 42, 0.05);
    font-size: 13px;
    color: #1f2937;
  }

  .refined-sidebar__links {
    display: flex;
    gap: 4px;
    margin-bottom: 10px;
  }

  .refined-sidebar__icon-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 10px;
    color: #1f2937;
    transition: background 0.15s ease, color 0.15s ease;
  }

  .refined-sidebar__icon-link:hover {
    background: #f7f8fa;
    color: #0b1116;
  }

  .refined-sidebar__copyright {
    margin: 0;
  }

  /* Detail screens */
  .refined-back {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: transparent;
    border: 0;
    color: #6b7480;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    padding: 6px 8px;
    border-radius: 8px;
    margin-bottom: 8px;
    transition: color 0.15s ease, background 0.15s ease;
  }
  .refined-back:hover { color: #0b1116; background: #f7f8fa; }

  .refined-detail-title {
    font-size: 19px;
    font-weight: 700;
    color: #0b1116;
    letter-spacing: -0.01em;
    margin: 0 8px 14px;
  }

  .refined-options {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .refined-option {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    border-radius: 12px;
    cursor: pointer;
    transition: background 0.15s ease;
    position: relative;
  }
  .refined-option:hover { background: #f7f8fa; }
  .refined-option input[type="radio"] {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }
  .refined-option__radio {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #cbd5e1;
    flex-shrink: 0;
    position: relative;
    transition: border-color 0.15s ease;
  }
  .refined-option--selected .refined-option__radio {
    border-color: #0b1116;
  }
  .refined-option--selected .refined-option__radio::after {
    content: "";
    position: absolute;
    inset: 3px;
    background: #0b1116;
    border-radius: 50%;
  }
  .refined-option__main {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
    flex: 1;
  }
  .refined-option__label {
    font-size: 15px;
    font-weight: 600;
    color: #0b1116;
    line-height: 1.3;
  }
  .refined-option__sub {
    font-size: 13px;
    color: #6b7480;
    line-height: 1.4;
  }

  .refined-color-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 14px;
    margin-top: 10px;
  }
  .refined-color-row label {
    font-size: 13.5px;
    font-weight: 500;
    color: #1a2127;
  }
  .refined-color-row__pick {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .refined-color-row__pick input[type="color"] {
    width: 36px;
    height: 36px;
    border: 1px solid rgba(15, 23, 42, 0.08);
    border-radius: 8px;
    background: transparent;
    cursor: pointer;
    padding: 2px;
  }
  .refined-color-row__hex {
    font-size: 11.5px;
    color: #6b7480;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  }

  .refined-font-group {
    margin-bottom: 18px;
  }
  .refined-font-group:last-child { margin-bottom: 0; }
  .refined-font-group__label {
    font-size: 12px;
    font-weight: 700;
    color: #4a525b;
    letter-spacing: 0.04em;
    margin: 0 8px 6px;
  }
</style>
