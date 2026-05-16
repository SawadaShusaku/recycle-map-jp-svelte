/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      zIndex: {
        // 正の値と0のみ定義。負のz-index (z-[-1] など) は使用禁止
        'auto': 'auto',
        '0': 0,
        '10': 10,
        '20': 20,
        '30': 30,
        '40': 40,
        '50': 50,
      },
    },
  },
  plugins: [],
};
