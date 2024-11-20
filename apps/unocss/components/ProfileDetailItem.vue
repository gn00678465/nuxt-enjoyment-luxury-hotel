<script setup lang="ts">
import type { PropType } from 'vue';

const [modelValue] = defineModel<string>('value', { default: '' });
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String as PropType<HTMLInputElement['type']>,
    default: undefined,
  },
});
const { label, type } = toRefs(props);
</script>

<template>
  <div class="flex items-center ">
    <label
      class="w-full"
      for=""
    >
      <span class="block mb-2 text-body2 text-neutral-80">{{ label }}</span>
      <input
        :type="type"
        :value="modelValue"
        class="block outline-none text-subtitle"
        readonly
      >
    </label>
    <slot name="action" />
  </div>
</template>

<style scoped>

</style>
