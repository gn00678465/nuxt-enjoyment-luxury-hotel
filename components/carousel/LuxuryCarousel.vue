<script lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const modules = ref([Autoplay, Navigation, Pagination]);

const luxuryCarouselProps = {
  slideClass: {
    type: String,
    default: undefined,
  },
  imageClass: {
    type: String,
    default: undefined,
  },
  showMask: {
    type: Boolean,
    default: true,
  },
};

const LuxuryCarousel = defineComponent({
  name: 'LuxuryCarousel',
  components: {
    Swiper,
    SwiperSlide,
  },
  props: luxuryCarouselProps,
  setup(props, ctx) {
    const images = computed(() => {
      const slots = ctx.slots.default?.(ctx.slots);
      if (Array.isArray(slots)) return slots[0].children;
      return [];
    });

    return {
      modules,
      images,
      ...toRefs(props),
      attrs: ctx.attrs,
    };
  },
});

export default LuxuryCarousel;
</script>

<template>
  <swiper
    v-bind="attrs"
    class="relative"
    :modules="modules"
    :slides-per-view="1"
    :pagination="true"
    :autoplay="{
      delay: 3000,
      disableOnInteraction: false,
    }"
  >
    <div
      v-if="showMask"
      class="absolute top-0 bottom-0 right-0 left-0 bg-black/60 z-1 select-none"
    />
    <template
      v-for="(image, idx) of images"
      :key="idx"
    >
      <swiper-slide
        class="w-full object-cover"
        :class="slideClass"
      >
        <component
          :is="image"
          :class="imageClass"
        />
      </swiper-slide>
    </template>
  </swiper>
</template>

<style scoped>
.swiper :deep(.swiper-button-prev),
.swiper :deep(.swiper-button-next) {
  width: 56px;
  height: 56px;
  background-color: #FFFFFF;
  color: #4B4B4B;
  border-radius: 100px;

  @include media-breakpoint-down(md) {
    display: none;
  }
}

.swiper :deep(.swiper-button-prev::after),
.swiper :deep(.swiper-button-next::after) {
  font-size: 40px;
}

.swiper :deep(.swiper-button-prev::after) {
  display: inline-block;
  width: 1em;
  height: 1em;
  --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='m14 18l-6-6l6-6l1.4 1.4l-4.6 4.6l4.6 4.6z'/%3E%3C/svg%3E");
  background-color: currentColor;
  -webkit-mask-image: var(--svg);
  mask-image: var(--svg);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
}

.swiper :deep(.swiper-button-next::after) {
  display: inline-block;
  width: 1em;
  height: 1em;
  --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12.6 12L8 7.4L9.4 6l6 6l-6 6L8 16.6z'/%3E%3C/svg%3E");
  background-color: currentColor;
  -webkit-mask-image: var(--svg);
  mask-image: var(--svg);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
}

.swiper :deep(.swiper-pagination) {
  bottom: 24px;
}

.swiper :deep(.swiper-pagination-bullet) {
  width: 32px;
  height: 4px;
  background-color: #F1EAE4;
  border-radius: 100px;
  opacity: 1;
}

.swiper :deep(.swiper-pagination-bullet-active) {
  width: 60px;
  background-color: #BF9D7D;
}
</style>
