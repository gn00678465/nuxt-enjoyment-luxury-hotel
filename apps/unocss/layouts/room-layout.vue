<script setup lang="ts">
import type { LuxuryCarouselSourceAttributes } from '../components/carousel';

const route = useRoute();

const sources: Array<LuxuryCarouselSourceAttributes> = [{
  media: '(min-width:640px)',
  srcset: '/home-hero.png',
}];
</script>

<template>
  <div class="w-full h-full flex flex-col relative">
    <header class="flex-shrink-0">
      <AppNav
        :inverted="false"
        class="fixed top-0 left-0 w-full h-auto z-10"
      />
      <LuxuryCarousel
        slide-class="aspect-[375/466] md:aspect-[1920/800]"
        image-class="h-full object-cover"
      >
        <LuxuryCarouselImage
          v-for="i of 5"
          :key="i"
          src="/home-hero-sm.png"
          :sources="sources"
        />
      </LuxuryCarousel>
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
