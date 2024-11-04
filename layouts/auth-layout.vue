<script lang="ts">
import type { PropType } from 'vue';
import type { AppNavProps } from '../components/AppNav.vue';

export default defineComponent({
  props: {
    navProps: {
      type: Object as PropType<AppNavProps>,
      default: () => ({}),
    },
  },
  setup(props) {
    const { isMobile } = storeToRefs(useAppStore());

    const router = useRouter();

    const contentClass = computed(() => {
      if ('contentClass' in router.currentRoute.value.meta) return router.currentRoute.value.meta.contentClass;
      return 'flex-1 flex items-start justify-center h-full min-h-0 pt-18 md:(pt-0 items-center)';
    });

    return {
      ...toRefs(props),
      contentClass,
      isMobile,
      router,
    };
  },
});
</script>

<template>
  <div class="h-full flex flex-col bg-body">
    <header class="h-auto fixed top-0 left-0 right-0 w-full">
      <AppNav
        class="py-4 md:py-6"
        v-bind="{ inverted: true, showActions: isMobile }"
      />
    </header>
    <main class="flex items-stretch grow-1 h-full">
      <div class="hidden md:inline-block flex-1">
        <nuxt-img
          class="h-vh w-[50vw]"
          src="/auth-page.avif"
          format="avif,webp"
          fit="cover"
          preload
          loading="lazy"
        />
      </div>
      <div :class="contentClass">
        <slot />
      </div>
    </main>
  </div>
</template>

<style scoped>

</style>
