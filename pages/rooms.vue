<script setup lang="ts">
definePageMeta({
  layout: 'room-layout',
});
</script>

<template>
  <div class="px-3 py-10">
    <h3 class="space-y-2 mb-10">
      <p class="text-subtitle">
        房型選擇
      </p>
      <p class="text-h3 text-primary">
        各種房型，任您挑選
      </p>
    </h3>
    <div class="grid">
      <RoomCard />
    </div>
  </div>
</template>

<style scoped>

</style>
