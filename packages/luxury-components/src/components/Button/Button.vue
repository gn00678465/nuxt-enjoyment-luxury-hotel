<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { computed, toRefs } from 'vue'
import type { VNodeChild } from 'vue';
import { convertPaddingToCSSVars } from '../../utility'

const slots = defineSlots<{
  default: () => any;
  icon: () => any;
}>();

const emits = defineEmits<{
  click: [e: MouseEvent];
}>();

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'primary',
  ghost: false,
  text: false,
  disabled: false,
  themeOverrides: undefined,
  renderIcon: undefined,
  block: false,
  attrType: 'button',
});

const { type, ghost, text, disabled, themeOverrides, renderIcon, block, attrType, form } = toRefs(props);
const icon = computed(() => {
  if (text.value) return null;
  return 'icon' in slots && typeof slots.icon === 'function' ? slots.icon()?.[0] : renderIcon.value ? renderIcon.value() : null;
});

const styles = computed(() => {
  const _themeOverride: ThemeOverride = Object.assign({
    padding: '16px 32px',
    borderRadius: '8px',
  }, themeOverrides.value || {});

  const _padding = convertPaddingToCSSVars(_themeOverride.padding);

  return {
    ..._padding,
    '--border-radius': _themeOverride.borderRadius,
    '--border-width': '1px',
  };
});

function setClassName(): string[] {
  if (disabled.value) return [':uno:', 'bg-neutral-40', 'text-neutral-60', 'cursor-not-allowed'];
  if (text.value) return [':uno:', 'text-primary', 'hover:text-primary-120', 'luxury-button--text', 'after:bg-primary', 'hover:after:bg-primary-120'];
  if (ghost.value) return [':uno:', 'text-white', 'hover:text-primary'];
  if (type.value === 'primary') return [':uno:', 'bg-primary', 'hover:bg-primary-120', 'text-white', 'border', 'border-primary', 'hover:border-primary-120'];
  if (type.value === 'secondary') return [':uno:', 'bg-white', 'border', 'border-primary', 'hover:border-primary-120', 'hover:bg-primary-tint', 'text-primary', 'hover:text-primary-120'];
  return [];
}

const className = computed(setClassName);
</script>

<script lang="ts">
export interface ButtonProps {
  type?: 'primary' | 'secondary';
  ghost?: boolean;
  text?: boolean;
  disabled?: boolean;
  themeOverrides?: Partial<ThemeOverride>;
  renderIcon?: () => VNodeChild;
  block?: boolean;
  attrType?: 'button' | 'submit' | 'reset';
  form?: string;
}

type ThemeOverride = {
  padding: string;
  borderRadius: string;
};
</script>

<template>
  <button
    class=":uno: text-title luxury-button transition-colors duration-300 flex items-center justify-center"
    :class="[...className, block && 'w-full']"
    :style="styles"
    :type="attrType"
    :form="form"
    @click="(e) => !disabled && emits('click', e)"
  >
    <slot />
    <component
      :is="icon"
      v-if="icon"
      class="ml-1"
      width="24"
      height="24"
    />
  </button>
</template>

<style scoped>
.luxury-button--text {
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: var(--padding-left);
    right: var(--padding-left);
    bottom: var(--padding-bottom);
    width: auto;
    margin-top: 1px;
    height: 1px;
  }
}
</style>
