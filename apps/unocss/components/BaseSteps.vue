<script setup lang="ts">
import type { VNodeChild } from 'vue';
import MdiCheck from '~icons/mdi/check';

const props = withDefaults(defineProps<BaseStepsProps>(), {
});

const modelValue = defineModel<number>('step', { default: 0 });

const { steps, renderCheckIcon } = toRefs(props);

const isActive = computed(() => (idx: number) => (modelValue.value === (idx + 1)));
const isDone = computed(() => (idx: number) => (modelValue.value > (idx + 1)));
</script>

<script lang="ts">
type StepProp = {
  title?: string;
};

export interface BaseStepsProps {
  renderCheckIcon?: () => VNodeChild;
  steps?: StepProp[];
  onStepComplete?: () => void;
}
</script>

<template>
  <ul class="flex items-center w-full">
    <template
      v-for="(_step, idx) of steps"
      :key="idx"
    >
      <li class="flex-shrink-0 text-center flex flex-col items-center gap-y-1">
        <div
          class="rounded-full w-8 h-8 flex items-center justify-center border"
          :class="[(isActive(idx) || isDone(idx)) ? 'bg-primary text-white border-primary' : 'text-neutral-60 border-neutral-60']"
        >
          <component
            :is="renderCheckIcon"
            v-if="isDone(idx) && renderCheckIcon"
          />
          <MdiCheck
            v-else-if="isDone(idx) && !renderCheckIcon"
            width="16"
            height="16"
          />
          <p
            v-else
            class="text-title"
            :class="isActive(idx) ? 'text-white' : 'text-neutral-60'"
          >
            {{ idx + 1 }}
          </p>
        </div>
        <p
          class="text-subtitle md:text-title"
          :class="(isActive(idx) || isDone(idx)) ? 'text-white' : 'text-neutral-60'"
        >
          {{ _step.title }}
        </p>
      </li>
      <li
        v-if="(idx + 1) !== steps?.length"
        class="flex-grow self-center mx-2"
      >
        <div
          class="h-[2px] rounded-[10px]"
          :class="isDone(idx) ? 'bg-neutral-40' : 'bg-neutral-60'"
        />
      </li>
    </template>
  </ul>
</template>

<style scoped>

</style>
