<script setup lang="ts">
import type { CSSProperties, PropType } from 'vue';
import type { SwiperOptions} from 'swiper/types';
import type { ImageModifiers } from '@nuxt/image'
import type { NuxtSourceProps } from './NuxtSource.vue'

type BreakPoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl'

const attrs = useAttrs()
const props = defineProps({
  aspectRatio: {
    type: [String, Object] as PropType<string | Partial<Record<BreakPoints, string>>>,
    default: undefined
  },
  options: {
    type: Object as PropType<SwiperOptions>,
    default: () => ({})
  },
  imgs: {
    type: Array as PropType<ImageOptions[]>,
    default: () => []
  },
  provider: {
    type: String,
    default: undefined
  }
})
const { aspectRatio, options, imgs, provider } = toRefs(props)

const viewport = useViewport()

const aspectRatioContent = computed(() => {
  // 如果是字串，直接返回
  if (typeof aspectRatio?.value === 'string') {
    return aspectRatio?.value
  }
  
  // 確保是物件且非 null
  if (typeof aspectRatio?.value === 'object' && aspectRatio?.value !== null) {
    const breakpointOrder = ['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs'] as const
    
    // 使用 type guard 確保型別安全
    if (typeof aspectRatio.value === 'object' && aspectRatio.value !== null) {
      for (const bp of breakpointOrder) {
        // 使用 Object.prototype.hasOwnProperty 確保型別安全
        if (
          viewport.isGreaterOrEquals(bp) && 
          Object.prototype.hasOwnProperty.call(aspectRatio.value, bp)
        ) {
          return (aspectRatio.value as Record<string, string>)[bp]
        }
      }
      
      // 如果沒找到，返回第一個（通常是 xs）
      return Object.values(aspectRatio.value)[0]
    }
  }
  
  // 其他情況返回 undefined
  return undefined
})

const containerRef = ref(null)

const swiperOptions = computed<SwiperOptions>(() => {
  return Object.assign({
    slidesPerView: 'auto',
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: true,
    navigation: false,
    injectStyles: [
      `
      .swiper .swiper-button-prev,
      .swiper .swiper-button-next {
        width: 56px;
        height: 56px;
        background-color: #FFFFFF;
        color: #4B4B4B;
        border-radius: 100px;
        background-repeat: no-repeat;
        background-size: 100% auto;
        background-position: center;
      }

      @media (max-width: 768px) { 
        .swiper-button-prev,
        .swiper-button-next {
          display: none;
        }
      }

      .swiper-button-next svg,
      .swiper-button-prev svg{
        width: 15%;
      }

      .swiper .swiper-button-prev::after,
      .swiper .swiper-button-next::after {
        font-size: 40px;
      }

      .swiper .swiper-button-prev::after {
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

      .swiper .swiper-button-next::after {
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

      .swiper .swiper-pagination {
        bottom: 24px;
      }

      .swiper .swiper-pagination-bullet {
        width: 32px;
        height: 4px;
        background-color: #F1EAE4;
        border-radius: 100px;
        opacity: 1;
      }

      .swiper .swiper-pagination-bullet-active {
        width: 60px;
        background-color: #BF9D7D;
      }

      `
    ],
    injectStylesUrls: [],
  }, options.value)
})

const swiper = useSwiper(containerRef, swiperOptions.value)

defineExpose<CarouselInst>({
  next: swiper.next,
  prev: swiper.prev,
  to: swiper.to,
  reset: swiper.reset
})
</script>

<script lang="ts">
export type ImageOptions = Partial<ImageModifiers> & {
  src: string
  alt?: string
  srcset: string
  sources?: NuxtSourceProps[]
  styles?: CSSProperties | string
}

export type CarouselImgs = Array<ImageOptions>

export type CarouselInst = {
  next: (speed?: number | undefined, runCallbacks?: boolean | undefined) => void;
  prev: (speed?: number | undefined, runCallbacks?: boolean | undefined) => void;
  to: (index: number, speed?: number | undefined, runCallbacks?: boolean | undefined) => void;
  reset: (speed?: number | undefined, runCallbacks?: boolean | undefined) => void;
}

</script>

<template>
  <ClientOnly>
    <swiper-container ref="containerRef" v-bind="attrs" :init="false" :style="{ 'aspect-ratio': aspectRatioContent }" >
      <swiper-slide v-for="(img, idx) of imgs" :key="idx">
        <picture>
          <NuxtSource
            v-for="(sour, idx) of img.sources" :key="idx"
            v-bind="sour"
            :provider="provider"
          />
          <NuxtImg
            v-bind="img"
            :provider="provider"
          />
        </picture>
      </swiper-slide>
    </swiper-container>
  </ClientOnly>
</template>

<style lang="css">
</style>