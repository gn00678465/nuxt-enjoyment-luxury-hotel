import { presetDarkModeTheme } from '@nuxt-enjoyment-luxury-hotel/uno-preset';
import { defineConfig, presetUno, transformerVariantGroup, transformerCompileClass } from 'unocss';
import presetWebFonts from 'unocss/preset-web-fonts';
// import { presetGrid } from 'unocss-preset-grid';
import { luxuryHotelTheme } from './build/luxury-hotel-theme';

export default defineConfig({
  presets: [
    presetUno(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Noto Serif TC',
        mono: ['Fira Code', 'Fira Mono:400,700'],
      },
    }),
    presetDarkModeTheme({
      theme: luxuryHotelTheme,
      variablePrefix: 'un-',
    }),
    // presetGrid({
    //   prefix: 'luxury',
    //   gutter: '12px',
    //   columns: 12,
    //   breakpoints: { 0: '375px', sm: '640px', md: '768px', lg: '1024px', xl: '1296px' },
    // }),
  ],
  preflights: [
    {
      getCSS() {
        return `
          html,
          body,
          #__nuxt {
            height: 100%;
          }

          html {
            font-family: "Noto Serif TC", sans-serif, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
            font-size: 16px;
          }
          * {
            font-weight: 500;
            letter-spacing: 0.02em;
            line-height: 1.5;
          }
          h1,h2,h3,h4,h5,h6 {
            font-weight: 700;
            letter-spacing: 0.05em;
            line-height: 1.2;
          }
          :root {
            --gutter: 24px;
          }
        `;
      },
    },
  ],
  rules: [
    [/^m-(\d+)$/, ([, d]) => ({ margin: `${parseInt(d) / 4}rem` })],
    [/^p-(\d+)$/, match => ({ padding: `${parseInt(match[1]) / 4}rem` })],
    [/^luxury-(button|input)$/, ([,]) => {
      const wrap = (str: string) => `calc(var(${str}) - var(--border-width, 0px))`;
      const varArr = ['--padding-top', '--padding-left', '--padding-bottom', '--padding-left'];
      return {
        'padding': varArr.map(wrap).join(' '),
        'border-radius': 'var(--border-radius)',
      };
    }],
    [/^linear-gradient-to-(t|b|l|r|tl|tr|bl|br)$/, ([, d]) => {
      const gradientDirectionMap: Record<string, string> = {
        t: 'top',
        b: 'bottom',
        l: 'left',
        r: 'right',
        tl: 'top left',
        tr: 'top right',
        bl: 'bottom left',
        br: 'bottom right',
      };
      return { background: `linear-gradient(to ${gradientDirectionMap[d]}, #BE9C7C, #FFF)` };
    }],
    [/^col(-([1-9]|1[0-2]))?$/, ([, , d]) => {
      if (!d) {
        return {
          flex: '1 0 0% !important',
        };
      }
      // 如果有數字參數，計算寬度百分比
      const width = (Number(d) / 12) * 100;
      return {
        flex: '0 0 auto',
        width: `${width}%`,
      };
    }, { layer: 'components' }],
  ],
  theme: {
    breakpoints: { 0: '375px', sm: '640px', md: '768px', lg: '1024px', xl: '1296px' },
    fontSize: {
      tiny: [`${12 / 16}rem`, { 'font-weight': 500 }],
      body2: [`${14 / 16}rem`, { 'font-weight': 500 }],
      body: [`${16 / 16}rem`, { 'font-weight': 500 }],
      subtitle: [`${14 / 16}rem`, { 'font-weight': 700 }],
      title: [`${16 / 16}rem`, { 'font-weight': 700 }],
      h6: [`${20 / 16}rem`, { 'font-weight': 700, 'letter-spacing': '0.05em', 'line-height': 1.2 }],
      h5: [`${24 / 16}rem`, { 'font-weight': 700, 'letter-spacing': '0.05em', 'line-height': 1.2 }],
      h4: [`${28 / 16}rem`, { 'font-weight': 700, 'letter-spacing': '0.05em', 'line-height': 1.2 }],
      h3: [`${32 / 16}rem`, { 'font-weight': 700, 'letter-spacing': '0.05em', 'line-height': 1.2 }],
      h2: [`${40 / 16}rem`, { 'font-weight': 700, 'letter-spacing': '0.05em', 'line-height': 1.2 }],
      h1: [`${48 / 16}rem`, { 'font-weight': 700, 'letter-spacing': '0.05em', 'line-height': 1.2 }],
      display: [`${100 / 16}rem`, { 'font-weight': 700, 'letter-spacing': '0.05em', 'line-height': 1.2 }],
    },
  },
  transformers: [
    transformerVariantGroup(),
    transformerCompileClass(),
  ],
});
