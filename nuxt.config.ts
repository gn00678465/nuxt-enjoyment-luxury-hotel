import { FileSystemIconLoader } from 'unplugin-icons/loaders';
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
        custom: FileSystemIconLoader('./assets/svgs'),
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
      { code: 'zh-TW', file: 'zh-TW.json' },
    ],
    defaultLocale: 'zh-TW',
    strategy: 'prefix_and_default',
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
