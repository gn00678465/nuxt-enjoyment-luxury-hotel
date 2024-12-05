<script setup lang="ts">
import type { CarouselImgs } from '~/components/Carousel.vue';
import type { RoomCardProps } from '~/components/RoomCard.vue';

definePageMeta({
  name: 'rooms',
  layout: 'front-layout',
  meta: {
    title:'客房旅宿'
  }
})

const router = useRouter()

function goToRoomDetail(id?: string) {
  router.push({ name: 'room-detail', params: { roomId: id } })
}

const heroImgs = computed<CarouselImgs>(() => [...new Array(5)].map(() => ({
  src: '/images/home-hero.png',
  srcset: '',
  format: 'png',
  fit: 'cover',
  style: {
    width: '100%',
    filter: 'brightness(40%)'
  },
  sources: [
    {
      src: '/images/home-hero-sm.png',
      media: '(orientation: portrait)',
      modifiers: {
        format: 'png'
      }
    },
    {
      src: '/images/home-hero.png',
      media: '(orientation: landscape)',
      modifiers: {
        format: 'png'
      }
    }
  ]
})))

const roomInfos = computed<(RoomCardProps & { roomId?: string })[]>(() => [
  {
    title: '尊爵雙人房',
    description: '享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。',
    price: 10000,
    info: {
      size: 24,
      bads: 2,
      person: [2,4]
    },
    images: [1,2,3,4,5].map((num) => {
      return {
        src: `/images/room-a-sm-${num}.png`,
        srcset: '',
        format: 'png',
        fit: 'cover',
        style: {
          width: '100%',
          height: '100%'
        },
        sources: [
          {
            src: `/images/room-a-${num}.png`,
            media: '(min-width:576px)',
            modifiers: { format: 'png' }
          },
        ]
      }
    }),
    roomId: 'a'
  },
  {
    title: '景觀雙人房',
    description: '景觀雙人房擁有絕美的高雄市景觀，讓您在舒適的環境中欣賞城市之美。',
    price: 10000,
    info: {
      size: 28,
      bads: 2,
      person: [2,4]
    },
    images: [1,2,3,4,5].map((num) => {
      return {
        src: `/images/room-b-sm-${num}.png`,
        srcset: '',
        format: 'png',
        fit: 'cover',
        style: {
          width: '100%',
          height: '100%'
        },
        sources: [
          {
            src: `/images/room-b-${num}.png`,
            media: '(min-width:576px)',
            modifiers: { format: 'png' }
          }
        ]
      }
    }),
    roomId: 'b'
  },
  {
    title: '豪華雅緻房',
    description: '享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。',
    price: 10000,
    info: {
      size: 36,
      bads: 2,
      person: [2,4]
    },
    images: [1,2,3,4,5].map((num) => {
      return {
        src: `/images/room-c-sm-${num}.png`,
        srcset: '',
        format: 'png',
        fit: 'cover',
        style: {
          width: '100%',
          height: '100%'
        },
        sources: [
          {
            src: `/images/room-c-${num}.png`,
            media: '(min-width:576px)',
            modifiers: { format: 'png' }
          }
        ]
      }
    }),
    roomId: 'c'
  },
  {
    title: '景觀尊榮家庭房',
    description: '景觀尊榮家庭房不僅有寬敞的空間，還有絕美的市景視野，是帶給家庭最尊榮的待遇。',
    price: 10000,
    info: {
      size: 48,
      bads: 2,
      person: [2,4]
    },
    images: [1,2,3,4,5].map((num) => {
      return {
        src: `/images/room-d-sm-${num}.png`,
        srcset: '',
        format: 'png',
        fit: 'cover',
        style: {
          width: '100%',
          height: '100%'
        },
        sources: [
          {
            src: `/images/room-d-${num}.png`,
            media: '(min-width:576px)',
            modifiers: { format: 'png' }
          }
        ]
      }
    }),
    roomId: 'd'
  }
])

</script>

<template>
  <main>
    <section class="hero position-relative">

      <Carousel :aspect-ratio="{ xs: '375/466', lg: '1920 / 800' }" :imgs="heroImgs"></Carousel>

      <div class="hero-wrapper d-flex flex-column justify-content-center align-items-center flex-md-row gap-10 gap-md-20 w-100 position-absolute z-2">
        <div class="d-flex flex-column align-items-center text-center d-md-block text-md-start">
          <div class="mt-10 mb-5 mt-md-0 mb-md-10 text-primary-100 fw-bold">
            <h2 class="fw-semibold">
              享樂酒店
            </h2>
            <h5 class="fs-7 fs-md-5 fw-semibold">
              Enjoyment Luxury Hotel
            </h5>
          </div>
          <div class="deco-line" />
        </div>
        <h1 class="mb-0 text-neutral-0 fw-bold">
          客房旅宿
        </h1>
      </div>
    </section>
  
    <section class="py-10 py-md-30 bg-primary-10">
      <div class="container mb-md-12">
        <h4 class="mb-2 mb-md-4 fs-8 fs-md-6 fw-bold text-neutral-80">
          房型選擇
        </h4>
        <h2 class="mb-10 mb-md-20 fs-1 fw-bold text-primary-100">
          各種房型，任您挑選
        </h2>
        <ul class="d-flex flex-column gap-6 gap-md-12 list-unstyled">
          <li v-for="room of roomInfos" class="card flex-lg-row border-0 rounded-3xl overflow-hidden">
            <room-card :title="room.title" :description="room.description"  :price="room.price"  style="flex-grow: 1" :info="room.info" :images="room.images"
              @click="goToRoomDetail(room.roomId)" />
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
@import "bootstrap/scss/mixins/breakpoints";

$grid-breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px,
  xxxl: 1537px
);

.hero img {
  width: 100%;
  height: 100vh;
  object-fit: cover;
  filter: brightness(40%);
}

.hero-wrapper {
  inset: 0;
}

.deco-line {
  width: 33vw;
  height: 2px;
  background-image: linear-gradient(to right, #BE9C7C, #FFFFFF);
}

.hero .deco-line {
  @include media-breakpoint-down(md) {
    width: 2px;
    height: 83px;
    z-index: 1;
    background-image: linear-gradient(to bottom, #BE9C7C, #FFF);
    margin-bottom: 2.5rem;
  }
}

.rounded-3xl {
  border-radius: 1.25rem;
}

.swiper {
  display: grid;
}
.swiper :deep(.swiper-wrapper) {
  min-width: 0;
}

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

.hero .swiper :deep(.swiper-pagination) {
  bottom: 32px;
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