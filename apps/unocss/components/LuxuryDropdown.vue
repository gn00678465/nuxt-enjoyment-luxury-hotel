<script setup lang="ts">
import type { VNodeChild } from 'vue';
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue';
import IcRoundKeyboardArrowDown from '~icons/ic/round-keyboard-arrow-down';
import FluentDrawerDismiss24Regular from '~icons/fluent/drawer-dismiss-24-regular';
import MdiCloseCircle from '~icons/mdi/close-circle';

defineOptions({
  name: 'LuxuryDropdown',
});

const modelValue = defineModel<LuxuryDropdownOption['value']>('value', { default: undefined });

const props = withDefaults(defineProps<LuxuryDropdownProps>(), {
  block: false,
  options: () => [],
  closeable: false,
});

const { themeOverrides, block, placeholder, options } = toRefs(props);

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

const _options = computed<LuxuryDropdownOptions>(() => ([
  { id: 0, label: '', disabled: true },
  ...options.value,
]));

const selectedOptions = computed({
  get() {
    return (!modelValue.value || !options.value.length) ? _options.value[0] : options.value.find(item => item.value === modelValue.value);
  },
  set(v) {
    if (v) {
      modelValue.value = v.value;
    }
  },
});

function onClear(e: MouseEvent) {
  e.stopPropagation();
  modelValue.value = undefined;
}
</script>

<script lang="ts">
export interface LuxuryDropdownProps {
  themeOverrides?: Partial<ThemeOverride>;
  block?: boolean;
  placeholder?: string;
  options?: LuxuryDropdownOption[];
  closeable?: boolean;
}

export interface LuxuryDropdownOption {
  id?: number | string;
  label?: string | (() => VNodeChild);
  value?: string | number;
  disabled?: boolean;
}

export type LuxuryDropdownOptions = LuxuryDropdownOption[];

type ThemeOverride = {
  padding: string;
  borderRadius: string;
};
</script>

<template>
  <Listbox
    v-slot="{ open }"
    v-model="selectedOptions"
    :default-value="{ id: 0, label: 'Please select', disabled: true }"
    as="div"
    :style="styles"
    name="LuxuryDropdown"
    :class="{
      'inline-block w-auto': !block,
      'block w-full': block,
    }"
  >
    <ListboxButton
      class="w-full inline-flex items-center justify-between luxury-dropdown border text-body2 md:text-body text-neutral-80 placeholder:text-neutral-80 bg-white group"
      :class="{
        'border-primary active:border-primary text-neutral-100': open,
        'border-transparent text-neutral-100': !open && !modelValue,
        'border-neutral-80 text-neutral-100': !!modelValue && !open,
      }"
    >
      {{ selectedOptions?.label || placeholder || $t('pls_select') }}
      <IcRoundKeyboardArrowDown
        width="24"
        height="24"
        class="transition duration-100"
        :class="{
          'rotate-180': open,
          'group-hover:hidden': !!modelValue && closeable,
        }"
      />
      <MdiCloseCircle
        class="hidden text-neutral-60"
        :class="{
          'group-hover:inline-block': !!modelValue && closeable,
        }"
        @click.stop="onClear"
      />
    </ListboxButton>

    <div class="mt-1 relative">
      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions class="w-full bg-white mt-1 absolute top-0 left-0 right-0 py-3 rounded-5">
          <template v-if="!options.length">
            <div class="flex flex-col gap-y-1 items-center justify-center text-neutral-60/50 text-body2 md:text-body">
              <FluentDrawerDismiss24Regular
                width="64"
                height="64"
              />
              <span>無數據</span>
            </div>
          </template>
          <template v-else>
            <template
              v-for="(opt, idx) in _options"
              :key="opt.id"
            >
              <ListboxOption
                v-if="idx !== 0"
                v-slot="{ active, selected }"
                :value="opt"
                :disabled="opt.disabled"
                class="cursor-pointer"
              >
                <p
                  class="flex items-center justify-between py-4 px-6 text-neutral-80"
                  :class="{
                    'text-primary bg-primary-tint': selected,
                    'text-primary-80': active && !selected,
                  }"
                >
                  <template v-if="typeof opt.label === 'string'">
                    <span
                      class="transition-colors duration-150"
                    >{{ opt.label }}</span>
                  </template>
                  <template v-if="typeof opt.label === 'function'">
                    <component :is="opt.label" />
                  </template>
                </p>
              </ListboxOption>
            </template>
          </template>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<style scoped>
.luxury-dropdown {
  padding: var(--padding-top) var(--padding-left) var(--padding-bottom) var(--padding-left);
  border-radius: var(--border-radius);
}
</style>
