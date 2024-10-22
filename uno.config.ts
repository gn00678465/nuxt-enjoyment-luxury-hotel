import { defineConfig, presetUno } from 'unocss'
import { presetDarkModeTheme } from '@nuxt-enjoyment-luxury-hotel/uno-preset'
import { luxuryHotelTheme } from './build/luxury-hotel-theme'

export default defineConfig({
  presets: [
    presetUno({ dark: 'class' }),
    presetDarkModeTheme({
      theme: luxuryHotelTheme,
      variablePrefix: 'un-'
    }),
  ],
})