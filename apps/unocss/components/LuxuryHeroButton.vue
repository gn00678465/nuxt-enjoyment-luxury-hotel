<script setup lang="ts">
const props = withDefaults(defineProps<LuxuryHeroButtonProps>(), {
  themeOverrides: undefined,
});

const attrs = useAttrs();
const { themeOverrides } = toRefs(props);

const styles = computed(() => {
  const _themeOverride: ThemeOverride = Object.assign({
    padding: '40px',
    borderRadius: '8px',
  }, themeOverrides.value || {});

  const _padding = convertPaddingToCSSVars(_themeOverride.padding);

  return {
    ..._padding,
    '--border-radius': _themeOverride.borderRadius,
  };
});
</script>

<script lang="ts">
export interface LuxuryHeroButtonProps {
  themeOverrides?: Partial<ThemeOverride>;
}

type ThemeOverride = {
  padding: string;
  borderRadius: string;
};
</script>

<template>
  <button
    v-bind="attrs"
    :style="styles"
    class="luxury-button group text-6 inline-flex items-center justify-end text-neutral-100 font-700 hover:(bg-primary text-neutral-0) active:(bg-primary text-neutral-0) transition-colors duration-150"
  >
    <span class="luxury-button__hero flex-shrink-0 transition-transform duration-300 mr-4 group-hover:(translate-x-7.5) group-active:(translate-x-7.5)">
      <slot />
    </span>
    <span
      class="flex-shrink-0 w-37.5 transition-all duration-300 origin-right h-[1px] border-neutral-100 border-t group-hover:(scale-x-80 border-neutral-0) group-active:(scale-x-80 border-neutral-0)"
    />
  </button>
</template>

<style scoped>
:where(.luxury-button) {
  width: auto;
}

.luxury-button > .luxury-button__hero {
  letter-spacing: 0.05em;
  line-height: 1.5;
}
</style>
