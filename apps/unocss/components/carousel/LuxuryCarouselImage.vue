<script setup lang="ts">
import type { SourceHTMLAttributes } from 'vue';

const img = useImage();

const props = defineProps<LuxuryCarouselImageProps>();

const image = computed(() => img(props.src));
const sources = computed(() => props.sources?.map(({ srcset, ...other }) => ({ srcset: img(srcset), ...other })));
</script>

<script lang="ts">
export type LuxuryCarouselSourceAttributes = SourceHTMLAttributes & { srcset: string };

export interface LuxuryCarouselImageProps {
  src: string;
  sources?: LuxuryCarouselSourceAttributes[];
}
</script>

<template>
  <picture>
    <!-- <source
      :srcset="sourceImage"
      :media="props.media"
    > -->
    <source
      v-for="(s, idx) of sources"
      :key="idx"
      v-bind="s"
    >
    <img
      class="w-full object-cover"
      :src="image"
      alt="hero banner"
    >
  </picture>
</template>

<style scoped>

</style>
