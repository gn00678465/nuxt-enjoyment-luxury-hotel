import { definePreset } from 'unocss'
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
   * Dark mode options
   *
   * @default 'class'
   */
  dark?: 'class' | 'media' | DarkModeSelectors
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

  const { light, dark } = (options.theme && ('light' in options.theme) && 'dark' in options.theme
    ? { light: options.theme.light || {}, dark: options.theme.dark || {}}
    : { light: options.theme, dark: options.theme }) as { light: ColorsTheme; dark: ColorsTheme }
  
  const res = createTheme({ light, dark }, options.variablePrefix);

  return {
    name: '@unocss/preset-dark-mode-theme',
    postprocess: VarPrefixPostprocessor(options.variablePrefix),
    options
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