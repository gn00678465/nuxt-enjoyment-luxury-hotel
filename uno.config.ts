import { presetDarkModeTheme } from '@nuxt-enjoyment-luxury-hotel/uno-preset';
import { defineConfig, presetUno, transformerVariantGroup, transformerCompileClass } from 'unocss';
import presetWebFonts from 'unocss/preset-web-fonts';
import { luxuryHotelTheme } from './build/luxury-hotel-theme';

export default defineConfig({
  presets: [
    presetUno({ dark: 'class' }),
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
        `;
      },
    },
  ],
  rules: [
    [/^m-(\d+)$/, ([, d]) => ({ margin: `${parseInt(d) / 4}rem` })],
    [/^p-(\d+)$/, match => ({ padding: `${parseInt(match[1]) / 4}rem` })],
    [/^luxury-button$/, ([,]) => {
      return {
        'padding': 'var(--padding-top) var(--padding-left) var(--padding-bottom) var(--padding-left)',
        'border-radius': 'var(--border-radius)',
      };
    }],
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
