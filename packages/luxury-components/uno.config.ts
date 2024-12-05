import { defineConfig, presetUno, transformerVariantGroup, transformerCompileClass } from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
  ],
  theme: {
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
    }]
  ],
  transformers: [
    transformerVariantGroup(),
    transformerCompileClass(),
  ],
});
