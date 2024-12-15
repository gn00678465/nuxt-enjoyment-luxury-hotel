import { FileSystemIconLoader } from 'unplugin-icons/loaders';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxt/eslint',
    '@nuxtjs/sitemap',
    '@nuxtjs/google-fonts',
    '@nuxt/icon',
    'nuxt-swiper',
    '@vee-validate/nuxt',
    ['unplugin-icons/nuxt', {
      compiler: 'vue3',
      autoInstall: true,
      customCollections: {
        custom: FileSystemIconLoader('./assets/svgs'),
        prefix: 'icons',
      },
    }],
    'nuxt-viewport',
    ['@pinia/nuxt', {
      autoImports: ["defineStore", "acceptHMRUpdate"],
    }],
    '@unocss/nuxt',
  ],
  extends: [
    'assets'
  ],
  runtimeConfig: {
    public: {
      API_URL: 'http://localhost:3005'
    }
  },
  imports: {
    dirs: ['stores']
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
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
    format: ['webp', 'png'],
    screens: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1400,
      xxxl: 1537
    },
    presets: {
      avatar: {
        modifiers: {
          format: 'png',
          width: 144,
          height: 144
        }
      }
    },
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/drhaq32ec/image/upload/'
    }
  },
  icon: {
    serverBundle: {
      externalizeIconsJson: true,
      collections: ['bi', 'mdi', 'ic', 'fluent']
    }
  },
  viewport: {
    breakpoints: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1400,
      xxxl: 1537
    },
    feature: 'minWidth',
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