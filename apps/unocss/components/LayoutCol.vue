<script setup lang="ts">
import type { PropType } from 'vue';

type ResponsiveDescription = Partial<Record<0 | 'sm' | 'md' | 'lg' | 'xl', number>>;

const props = defineProps({
  span: {
    type: [Number, Object] as PropType<number | ResponsiveDescription>,
    default: undefined,
    validator: (value: number) => {
      if (value === undefined) return true;
      if (1 <= value && value <= 12) return true;
      return true;
    },
  },
});

// 轉換 number 到對應的 class
const getColClass = (value: number | undefined) => {
  if (value === undefined) return 'col';
  if (value === 0) return 'col';
  if (value >= 1 && value <= 12) return `col-${value}`;
  return '';
};

// 計算最終的 class 列表
const classes = computed(() => {
  if (!props.span) return getColClass(props.span);
  if (typeof props.span === 'number') {
    return getColClass(props.span);
  }

  if (typeof props.span === 'object') {
    return [
      getColClass(props.span[0]),
      props.span.sm && `sm:${getColClass(props.span.sm)}`,
      props.span.md && `md:${getColClass(props.span.md)}`,
      props.span.lg && `lg:${getColClass(props.span.lg)}`,
      props.span.xl && `xl:${getColClass(props.span.xl)}`,
    ].filter(Boolean).join(' ');
  }

  return 'col';
});
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<style scoped>
</style>
