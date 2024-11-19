<script setup lang="ts">
definePageMeta({
  layout: 'room-layout',
  contentClass: 'bg-primary-40',
  slideClass: 'aspect-[375/466] md:aspect-[1920/800]',
});
</script>

<template>
  <div class="py-10 md:px-0 md:(pt-30 pb-42)">
    <div class="container mx-auto px-3 md:px-0">
      <p class="text-subtitle text-neutral-80 md:hidden">
        房型選擇
      </p>
      <h5 class="text-neutral-80 hidden text-title md:block">
        房型選擇
      </h5>
      <h3 class="mt-2 text-h3 text-primary md:text-h1">
        各種房型，任您挑選
      </h3>
      <div class="grid mt-10 grid-cols-1 gap-y-6 md:(gap-y-12 mt-20)">
        <RoomCard
          title="尊爵雙人房"
          describe="享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。"
          :price="10000"
        />
        <RoomCard
          title="尊爵雙人房"
          describe="享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。"
          :price="10000"
        />
        <RoomCard
          title="尊爵雙人房"
          describe="享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。"
          :price="10000"
        />
        <RoomCard
          title="尊爵雙人房"
          describe="享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。"
          :price="10000"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
