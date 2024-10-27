import type { MaybeRef } from 'vue';
import { isRef, ref } from 'vue';

export interface UseStepsOptions {
  index?: MaybeRef<number>;
  count?: number;
}

export function useSteps(options: UseStepsOptions = {}) {
  const { index, count = Infinity } = options;
  const activeStep = ref(initialActiveStep());

  function initialActiveStep() {
    if (isRef(index)) return index.value;
    if (typeof index === 'number') return index;
    return 0;
  }

  function onNext(): void {
    if (activeStep.value + 1 > count) return;
    activeStep.value += 1;
    return;
  }

  function onPrev(): void {
    const _index = initialActiveStep();
    if (activeStep.value - 1 < _index) return;
    activeStep.value -= 1;
    return;
  }

  function setStep(index: number) {
    const _index = initialActiveStep();
    if (index < _index) return;
    if (index > count) return;
    activeStep.value = index;
  }

  return {
    activeStep,
    onNext,
    onPrev,
    setStep,
  };
}
