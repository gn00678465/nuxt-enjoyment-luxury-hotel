import { definePreset, entriesToCss, toArray } from 'unocss'
import type { Postprocessor, PresetOptions } from 'unocss'
import type { Theme } from 'unocss/preset-mini'
import { createTheme } from './createTheme'


type UnoCssThemeKeys = 'colors' | 'accentColor' | 'textColor' | 'backgroundColor' | 'borderColor' | 'shadowColor'

export type ColorsTheme = Pick<Theme, UnoCssThemeKeys>

export interface DarkModeSelectors {
  /**
   * Selector for light variant.
   *
   * @default '.light'
   */
  light?: string

  /**
   * Selector for dark variant.
   *
   * @default '.dark'
   */
  dark?: string
}

export interface PresetBuildVariableOptions extends PresetOptions {
  /**
   * Customize the selectors of the generated css variables
   * @default { light: ':root', dark: 'dark' }
   */
  selectors?: DarkModeSelectors
  /**
   * Prefix for CSS variables.
   *
   * @default 'un-'
   */
  variablePrefix?: string

  theme?: ColorsTheme | { light: ColorsTheme; dark: ColorsTheme }
}


export default definePreset((options: PresetBuildVariableOptions = {}) => {
  options.dark = options.dark ?? 'class'
  options.variablePrefix = options.variablePrefix ?? 'un-'
  options.selectors = options.selectors || {}
  const selectors: DarkModeSelectors = { light: ':root', dark: 'dark' }

  const { light, dark } = (options.theme && ('light' in options.theme) && 'dark' in options.theme
    ? { light: options.theme.light || {}, dark: options.theme.dark || {}}
    : { light: options.theme, dark: options.theme }) as { light: ColorsTheme; dark: ColorsTheme }
  
  const theme = createTheme({ light, dark }, options.variablePrefix);

  return {
    name: '@unocss/preset-dark-mode-theme',
    layers: {
      theme: 0,
      default: 1,
    },
    postprocess: VarPrefixPostprocessor(options.variablePrefix),
    options,
    theme: theme.theme,
    preflights: [
      {
        layer: 'theme',
        async getCSS() {
          const returnCss: string[] = []

          // light theme
          const lightCss = entriesToCss(theme.lightPreflight)
          const lightRoots = toArray([selectors.light, `::backdrop`])
          returnCss.push(lightRoots.map(root => `${root}{${lightCss}}`).join(''))
          // dark theme
          const darkCss = entriesToCss(theme.darkPreflight)
          const darkRoots = toArray([`:root.${selectors.dark}`, '@media (prefers-color-scheme: dark)', `:root.${selectors.dark}::backdrop`])
          returnCss.push(darkRoots.map(root => `${root}{${darkCss}}`).join(''))

          return returnCss.join('')
        },
      },
    ]
  }
})


export function VarPrefixPostprocessor(prefix: string): Postprocessor | undefined {
  if (prefix !== 'un-') {
    return (obj) => {
      obj.entries.forEach((i) => {
        i[0] = i[0].replace(/^--un-/, `--${prefix}`)
        if (typeof i[1] === 'string')
          i[1] = i[1].replace(/var\(--un-/g, `var(--${prefix}`)
      })
    }
  }
}
