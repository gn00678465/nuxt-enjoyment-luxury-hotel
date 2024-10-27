<script setup lang="ts">
import MdiCheck from '~icons/mdi/check';

const [value] = defineModel<boolean>('value', { default: false });

const props = withDefaults(defineProps<BaseCheckboxProps>(), {
  size: 24,
});

const styles = computed(() => {
  const _size = convertCSSUnit(props.size, '24px');
  return {
    '--width': _size,
    '--height': _size,
  };
});
</script>

<script lang="ts">
export interface BaseCheckboxProps {
  size?: number | string;
}
</script>

<template>
  <label
    class="warper relative cursor-pointer inline-block"
    :style="styles"
  >
    <input
      v-model="value"
      type="checkbox"
      class="absolute opacity-0"
    >
    <div
      class="checkmark ring ring-transparent hover:ring-primary-40 ring-offset-1 rounded-md flex items-center justify-center inline-block"
      :class="[value && 'bg-primary-120']"
    >
      <MdiCheck
        v-if="value"
        class="text-white"
      />
    </div>
  </label>
</template>

<style scoped>
.checkmark {
  width: var(--width);
  height: var(--width);
  position: relative;
  top: 0;
  left: 0;
  transition: all 0.3s;

  svg {
    width: calc(var(--width) - 4px);
    height: calc(var(--width) - 4px);
  }
}
</style>
