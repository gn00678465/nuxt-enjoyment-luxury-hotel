import { defineConfig, presetUno } from 'unocss'
import { presetDarkModeTheme } from '@nuxt-enjoyment-luxury-hotel/uno-preset'

export default defineConfig({
  presets: [
    presetUno(),
  ],
  theme: {
    backgroundColor: {
      test: {
        DEFAULT: '#722ED1'
      }
    },
    textColor: {
      test: {
        DEFAULT: '#fff'
      }
    }
  }
})