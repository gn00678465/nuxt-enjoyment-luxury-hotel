<template>
  <div class="layout-row">
    <slot />
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
:where(.layout-row) {
  --layout-gutter-x: var(--gutter);
  --layout-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(-1* var(--layout-gutter-y));
  margin-right: calc(-.5* var(--layout-gutter-x));
  margin-left: calc(-.5* var(--layout-gutter-x));
}

.layout-row > :where(*) {
  flex-shrink: 0;
  width: 100%;
  max-width: 100%;
  padding-right: calc(var(--layout-gutter-x)* .5);
  padding-left: calc(var(--layout-gutter-x)* .5);
  margin-top: var(--layout-gutter-y);
}
</style>
