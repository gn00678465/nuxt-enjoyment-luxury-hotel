// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  {
    ignores: ['**/packages/**', '**/node_modules/', '.git/'],
  },
  {
    rules: {
      'vue/no-multiple-template-root': 'off',
    },
  },
).override('nuxt/rules', {
  rules: {
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-explicit-any': 'warn',
  },
});
