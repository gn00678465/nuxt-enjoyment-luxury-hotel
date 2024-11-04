import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

export const useAppStore = defineStore('app-store', () => {
  const breakpoints = useBreakpoints(breakpointsTailwind);

  const isMobile = computed(() => breakpoints.isSmallerOrEqual('md'));

  return {
    isMobile,
  };
});
