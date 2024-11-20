// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxt/image',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    '@nuxtjs/sitemap',
    'nuxt-xstate',
    '@nuxtjs/google-fonts',
    '@nuxt/icon',
    'nuxt-swiper',
    '@vee-validate/nuxt',
    'unplugin-icons/nuxt',
    'nuxt-viewport',
    '@samk-dev/nuxt-vcalendar'
  ],
  css: ['@/assets/scss/main.scss'],
  googleFonts: {
    families: {
      'Noto+Serif+TC': true
    }
  },
  eslint: {
    config: {
      stylistic: {
        semi: true,
      },
    },
  },
  image: {
    dir: 'assets/images',
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['mixed-decls', 'color-functions', 'global-builtin', 'import']
        }
      }
    }
  }
})