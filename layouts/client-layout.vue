<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <div class="w-full h-inherit flex flex-col relative">
    <header
      class="flex-shrink-0 relative"
      :class="route.meta.headerClass"
    >
      <AppNav
        :inverted="true"
        :class="route.meta.navClass"
      />
    </header>
    <main
      class="flex-grow"
      :class="route.meta.contentClass"
    >
      <slot />
    </main>
    <AppFooter class="flex-shrink-0" />
  </div>
</template>

<style scoped>

</style>
