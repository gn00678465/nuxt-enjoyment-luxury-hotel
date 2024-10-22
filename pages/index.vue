<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div>
    <h1>Nuxt Routing set up successfully!</h1>
    <p>Current route: {{ route.path }}</p>
    <p class="text-primary">primary</p>
    <p class="text-info">info</p>
    <p class="text-success">success</p>
    <p class="text-warning">warning</p>
    <p class="text-error">error</p>
    <a href="https://nuxt.com/docs/getting-started/routing" target="_blank">Learn more about Nuxt Routing</a>
  </div>
</template>
