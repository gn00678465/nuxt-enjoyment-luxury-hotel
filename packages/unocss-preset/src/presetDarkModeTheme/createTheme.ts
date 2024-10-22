import type { Theme } from 'unocss/preset-mini'
import type { CSSEntry } from 'unocss'
import { mergeDeep } from 'unocss'
import { wrapVar } from './helpers'

type UnoCssThemeKeys = 'colors' | 'accentColor' | 'textColor' | 'backgroundColor' | 'borderColor' | 'shadowColor'

export type ColorsTheme = Pick<Theme, UnoCssThemeKeys>

const filterKeys = (keys: string[]) => keys.filter((k) => !['colors', 'DEFAULT'].includes(k))

const getTheme = (theme: any, keys: string[]) => {
  for (const key of keys) {
    theme = theme[key];
    if (theme === undefined) return;
  }
  return theme;
};

export function createTheme(theme: { light: ColorsTheme; dark: ColorsTheme }, variablePrefix: string = '') {
  const lightPreflight: CSSEntry[] = []
  const darkPreflight: CSSEntry[] = []

  const recursiveTheme = (curTheme: ColorsTheme, preKeys: string[] = []): ColorsTheme => {
    return Object.keys(curTheme).reduce((acc, key) => {
      const val = Reflect.get(curTheme, key)
      const nextKeys = preKeys.concat(key)
  
      if (typeof val !== "object" && !Array.isArray(val)) {
        const filteredKeys = filterKeys(nextKeys)
        const name = `--${variablePrefix}${filteredKeys.join('-')}`
        const varName = wrapVar(name)
        lightPreflight.push([`${name}`, `${getTheme(theme.light, nextKeys)}`])
        darkPreflight.push([`${name}`, `${getTheme(theme.dark, nextKeys)}`])
        acc[key] = varName
      }
      else {
        acc[key] = recursiveTheme(val, nextKeys)
      }
      return acc
    }, {} as Record<string, any>)
  }

  const _theme = recursiveTheme(mergeDeep(theme.light, theme.dark))

  return {
    lightPreflight,
    darkPreflight,
    theme: _theme
  }
}