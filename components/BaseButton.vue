<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import type { VNodeChild } from 'vue';

const slots = defineSlots<{
  default: () => any;
  icon: () => any;
}>();

const emits = defineEmits<{
  click: [e: MouseEvent];
}>();

const props = withDefaults(defineProps<BaseButtonProps>(), {
  type: 'primary',
  ghost: false,
  text: false,
  disabled: false,
  themeOverride: undefined,
  renderIcon: undefined,
  block: false,
});

const { type, ghost, text, themeOverrides, renderIcon, block } = toRefs(props);

const icon = computed(() => {
  if (text.value) return null;
  return 'icon' in slots && typeof slots.icon === 'function' ? slots.icon()?.[0] : renderIcon.value ? renderIcon.value() : null;
});

const styles = computed(() => {
  const _themeOverride: ThemeOverride = Object.assign({
    padding: '16px 32px',
    borderRadius: '8px',
  }, themeOverrides.value?.padding || {});
  const _padding = convertPaddingToCSSVars(_themeOverride.padding);
  return {
    ..._padding,
    '--border-radius': _themeOverride.borderRadius,
  };
});

function setClassName(): string[] {
  if (text.value) return ['text-primary', 'hover:text-primary-120', 'base-button__text', 'after:bg-primary', 'hover:after:bg-primary-120'];
  if (ghost.value) return ['text-white', 'hover:text-primary'];
  if (type.value === 'primary') return ['bg-primary', 'hover:bg-primary-120', 'text-white', 'border', 'border-primary', 'hover:border-primary-120'];
  if (type.value === 'secondary') return ['bg-white border', 'border-primary', 'hover:border-primary-120', 'hover:bg-primary-tint', 'text-primary', 'hover:text-primary-120'];
  return [];
}

const className = computed(setClassName);
</script>

<script lang="ts">
export interface BaseButtonProps {
  type?: 'primary' | 'secondary';
  ghost?: boolean;
  text?: boolean;
  disabled?: boolean;
  themeOverrides?: Partial<ThemeOverride>;
  renderIcon?: () => VNodeChild;
  block?: boolean;
}

type ThemeOverride = {
  padding: string;
  borderRadius: string;
};
</script>

<template>
  <button
    class="text-title base-button transition-colors duration-300 flex items-center justify-center"
    :class="[...className, block && 'w-full']"
    :style="styles"
    @click="(e) => emits('click', e)"
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
.base-button {
  padding: var(--padding-top) var(--padding-left) var(--padding-bottom) var(--padding-left);
  border-radius: var(--border-radius);
}

.base-button__text {
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
