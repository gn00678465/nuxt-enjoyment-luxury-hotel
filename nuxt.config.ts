// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    '@unocss/nuxt',
    '@nuxtjs/sitemap',
    '@nuxt/eslint',
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
});
