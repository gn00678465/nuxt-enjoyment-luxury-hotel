import type { Theme } from 'unocss/preset-mini'
import type { CSSEntry } from 'unocss'
import { mergeDeep } from '@unocss/core'
import { parseCssColor, colorToString } from '@unocss/rule-utils'
import { wrapVar, wrapCSSFunction } from './helpers'
import { execStrategyActions, type ExecStrategyAction } from './utility'

type UnoCssThemeKeys = 'colors' | 'accentColor' | 'textColor' | 'backgroundColor' | 'borderColor' | 'shadowColor'

export type ColorsTheme = Pick<Theme, UnoCssThemeKeys>

const filterKeys = (keys: string[]) => keys.filter((k) => !['DEFAULT'].includes(k))

const getTheme = (theme: any, keys: string[]) => {
  for (const key of keys) {
    theme = theme[key];
    if (theme === undefined) return;
  }
  return theme as string;
};

const convertRGBTheme = (themeValue: string | undefined) => {
  const cssColor = parseCssColor(themeValue)
  if (cssColor) return colorToString(cssColor, 1)
  return themeValue
}

const getMapKey = (key: string) => {
  const map: Record<string, string> = {
    backgroundColor: 'background',
    textColor: 'foreground'
  }

  if (key in map) {
    return map[key]
  }

  return key
}

export function createTheme(theme: { light: ColorsTheme; dark: ColorsTheme }, variablePrefix: string = '') {
  const lightPreflight: CSSEntry[] = []
  const darkPreflight: CSSEntry[] = []

  const recursiveTheme = (curTheme: ColorsTheme, preKeys: string[] = []): ColorsTheme => {
    return Object.keys(curTheme).reduce((acc, key) => {
      const val = Reflect.get(curTheme, key)
      const nextKeys = preKeys.concat(key)
  
      if (typeof val !== "object" && !Array.isArray(val)) {
        const filteredKeys = filterKeys(nextKeys.map(getMapKey))
        const name = `--${variablePrefix}${filteredKeys.join('-')}`
        const varName = wrapVar(name)
        acc[key] = varName

        const isColor = nextKeys[0] === 'colors'
        const actions: ExecStrategyAction[] = [
          [
            isColor,
            () => {
              const lightCssColor = parseCssColor(getTheme(theme.light, nextKeys) || val)
              const darkCssColor = parseCssColor(getTheme(theme.dark, nextKeys) || val)
              lightPreflight.push([`${name}`, `${lightCssColor?.components.join(' ')}`])
              darkPreflight.push([`${name}`, `${darkCssColor?.components.join(' ')}`])
              acc[key] = wrapCSSFunction(lightCssColor!.type, acc[key], wrapVar(`${name}--alpha`, '1'))
            }
          ],
          [
            !isColor,
            () => {
              lightPreflight.push([`${name}`, `${convertRGBTheme(getTheme(theme.light, nextKeys))}`])
              darkPreflight.push([`${name}`, `${convertRGBTheme(getTheme(theme.dark, nextKeys))}`])
            }
          ]
        ]

        execStrategyActions(actions)
        
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