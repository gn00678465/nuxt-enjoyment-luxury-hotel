<script setup lang="ts">

</script>

<template>
  <div class="h-full flex flex-col bg-body">
    <header class="h-auto fixed top-0 left-0 right-0 w-full">
      <AppNav
        class="py-4 md:py-6"
        :inverted="true"
      />
    </header>
    <main class="flex items-stretch grow-1">
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
      <div class="flex-1 pt-18 md:pt-30">
        <slot />
      </div>
    </main>
  </div>
</template>

<style scoped>

</style>
