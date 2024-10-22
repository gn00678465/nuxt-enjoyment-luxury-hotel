import { defineConfig, presetUno } from 'unocss'
import { presetDarkModeTheme } from '@nuxt-enjoyment-luxury-hotel/uno-preset'
import { naiveUiTheme } from './build/naive-ui'

export default defineConfig({
  presets: [
    presetUno({ dark: 'class' }),
    presetDarkModeTheme({
      theme: naiveUiTheme,
      variablePrefix: 'un-'
    }),
  ],
})