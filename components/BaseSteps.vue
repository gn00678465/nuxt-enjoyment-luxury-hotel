<script setup lang="ts">
import type { VNodeChild } from 'vue';
import MdiCheck from '~icons/mdi/check';

const props = withDefaults(defineProps<BaseStepsProps>(), {
  activeStep: 0,
});

const { activeStep, steps, renderCheckIcon } = toRefs(props);

const isActive = computed(() => (idx: number) => (activeStep.value >= (idx + 1)));
</script>

<script lang="ts">
type StepProp = {
  title?: string;
};

export interface BaseStepsProps {
  activeStep?: number;
  renderCheckIcon?: () => VNodeChild;
  steps?: StepProp[];
}
</script>

<template>
  <ul class="flex items-center w-full">
    <template
      v-for="(step, idx) of steps"
      :key="idx"
    >
      <li class="flex-shrink-0 text-center">
        <div
          class="rounded-full w-8 h-8 flex items-center justify-center mb-1 border"
          :class="[isActive(idx) ? 'bg-primary text-white border-primary' : 'text-neutral-60 border-neutral-60']"
        >
          <component
            :is="renderCheckIcon"
            v-if="isActive(idx) && renderCheckIcon"
          />
          <MdiCheck
            v-else-if="isActive(idx) && !renderCheckIcon"
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
          class="text-title"
          :class="isActive(idx) ? 'text-white' : 'text-neutral-60'"
        >
          {{ step.title }}
        </p>
      </li>
      <li
        v-if="(idx + 1) !== steps?.length"
        class="flex-grow self-center mx-2"
      >
        <div
          class="h-[2px] rounded-[10px]"
          :class="isActive(idx) ? 'bg-neutral-40' : 'bg-neutral-60'"
        />
      </li>
    </template>
  </ul>
</template>

<style scoped>

</style>
