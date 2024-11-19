<script setup lang="ts">
defineProps({
  fluid: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="layout-container container">
    <slot />
  </div>
</template>

<style scoped>
:where(.layout-container) {
  --layout-gutter-x: var(--gutter);
  --layout-gutter-y: 0;
  width: 100%;
  padding-right: calc(var(--layout-gutter-x)* .5);
  padding-left: calc(var(--layout-gutter-x)* .5);
  margin-right: auto;
  margin-left: auto;
}
</style>
