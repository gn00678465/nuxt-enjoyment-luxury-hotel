<script setup lang="ts">
const props = withDefaults(defineProps<BaseInputProps>(), {
  required: false,
  placeholder: '',
  status: undefined,
});

const [value] = defineModel<string | null>('value', { default: null });

const { themeOverrides, label, status, placeholder, required } = toRefs(props);

const styles = computed(() => {
  const _themeOverride: ThemeOverride = Object.assign({
    padding: '16px',
    borderRadius: '8px',
  }, themeOverrides.value?.padding || {});
  const _padding = convertPaddingToCSSVars(_themeOverride.padding);
  return {
    ..._padding,
    '--border-radius': _themeOverride.borderRadius,
  };
});

function setClassName(): string[] {
  if (status.value === 'error') return ['border-error'];
  return ['focus:border-primary', 'focus:ring', 'focus:ring-primary-40', 'focus:text-neutral-80'];
}

const className = computed(setClassName);
</script>

<script lang="ts">
export interface BaseInputProps {
  themeOverrides?: Partial<ThemeOverride>;
  label?: string;
  status?: 'error';
  placeholder?: string;
  required?: boolean;
}

type ThemeOverride = {
  padding: string;
  borderRadius: string;
};
</script>

<template>
  <div
    :style="styles"
  >
    <div class="text-title flex items-center">
      <label
        for="inputname"
        class="flex-grow text-white"
      >{{ label }}</label>
      <span
        v-if="required"
        class="flex-shrink-0 ml-auto text-primary"
      >必填</span>
    </div>
    <div class="mt-2">
      <input
        v-model="value"
        type="text"
        :placeholder="placeholder"
        name="inputname"
        class="base-input my-2 text-body block w-full border outline-none text-neutral-80  placeholder:text-neutral-40"
        :class="className"
      >
    </div>
    <p
      class="text-subtitle text-error visible"
      :class="status === 'error' ? 'visible': 'invisible'"
    >
      Some Description
    </p>
  </div>
</template>

<style scoped>
.base-input {
  padding: var(--padding-top) var(--padding-left) var(--padding-bottom) var(--padding-left);
  border-radius: var(--border-radius);
}
</style>
