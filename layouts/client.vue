<script setup lang="ts">

</script>

<template>
  <div class="w-full h-full flex flex-col">
    <header class="flex-shrink-0">
      <AppNav :inverted="true" />
    </header>
    <main class="flex-grow">
      <slot />
    </main>
    <AppFooter class="flex-shrink-0" />
  </div>
</template>

<style scoped>

</style>
