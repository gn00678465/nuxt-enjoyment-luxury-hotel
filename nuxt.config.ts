import { promises as fs } from 'node:fs';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    '@unocss/nuxt',
    '@nuxtjs/sitemap',
    '@nuxt/eslint',
    '@nuxt/icon',
    ['unplugin-icons/nuxt', {
      compiler: 'vue3',
      autoInstall: true,
      customCollections: {
        custom: {
          logo: () => fs.readFile('./assets/svgs/logo.svg', 'utf-8'),
        },
      },
    }],
    '@nuxt/image',
  ],

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  devtools: { enabled: true },

  css: ['@unocss/reset/tailwind.css'],

  compatibilityDate: '2024-04-03',

  eslint: {
    config: {
      stylistic: {
        semi: true,
      },
    },
  },

  i18n: {
    langDir: 'locales',
    locales: [
      { code: 'zh-tw', iso: 'zh-TW', file: 'zh-tw.json' },
    ],
    defaultLocale: 'zh-tw',
  },

  icon: {
    provider: 'iconify',
    serverBundle: {
      externalizeIconsJson: true,
    },
  },

  image: {
    dir: 'assets/images',
  },
});
