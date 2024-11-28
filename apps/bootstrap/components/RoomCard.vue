<script setup lang="ts">
import FluentSlideSize24Filled from '~icons/fluent/slide-size-24-filled';
import MdiArrowRight from '~icons/mdi/arrow-right';
import IcBaselinePerson from '~icons/ic/baseline-person';
import MaterialSymbolsKingBed from '~icons/material-symbols/king-bed';
import type { CarouselImgs } from '~/components/Carousel.vue';

const emits = defineEmits<{
  click: []
}>()
const props = withDefaults(defineProps<RoomCardProps>(), {
  title: '',
  price: 0,
  description: '',
  images: () => [],
  info: () => ({
    size: 36,
    bads: 2,
    person: [2,4]
  })
})

const { images, title, price, description, info } = toRefs(props)

const currency = useCurrency(price, 'zh-TW', {
  style: 'decimal',
  currency: 'TWD',
  minimumFractionDigits: 0,
});

</script>

<script lang="ts">
interface RoomInfo {
  size: number
  bads: number
  person: number[]
}

export interface RoomCardProps {
  title: string
  description?: string
  price: number
  images?: CarouselImgs
  info?: RoomInfo
}

</script>

<template>
  <div class="row overflow-hidden">
    <div class="col-12 col-lg-7">
      <Carousel :imgs="images" :options="{ navigation: true, autoplay: false }"></Carousel>
    </div>
    <div class="col-12 col-lg-5">
      <div class="card-body pe-md-10 py-md-10">
        <h3 class="card-title fs-2 fw-bold text-neutral-100">
          {{ title }}
        </h3>
        <p class="card-text mb-6 mb-md-10 fs-8 fs-md-7 fw-medium text-neutral-80">
          {{ description }}
        </p>
        <ul class="d-flex gap-4 mb-6 mb-md-10 list-unstyled">
          <li class="card-info px-4 py-5 border border-primary-40 rounded-3">
            <FluentSlideSize24Filled
              class="mb-2 fs-5 text-primary-100"
            />
            <p class="mb-0 fw-bold text-neutral-80 text-nowrap">
              {{ info.size }} 坪
            </p>
          </li>
          <li class="card-info px-4 py-5 border border-primary-40 rounded-3">
            <MaterialSymbolsKingBed
              class="mb-2 fs-5 text-primary-100"
            />
            <p class="mb-0 fw-bold text-neutral-80 text-nowrap">
              {{ info.bads }} 張大床
            </p>
          </li>
          <li class="card-info px-4 py-5 border border-primary-40 rounded-3">
            <IcBaselinePerson
              class="mb-2 fs-5 text-primary-100"
            />
            <p class="mb-0 fw-bold text-neutral-80 text-nowrap">
              {{ info.person.join('-') }} 人
            </p>
          </li>
        </ul>
        <div class="deco-line w-100 mb-6 mb-md-10" />
        <div class="d-flex justify-content-between align-items-center fs-7 fs-md-5 text-primary-100">
          <p class="mb-0 fw-bold">
            NT$ {{ currency }}
          </p>
          <a
            href="#"
            class="icon-link icon-link-hover text-primary-100 pe-auto"
            @click.prevent="emits('click')"
          >
          <MdiArrowRight
              class="bi fs-5"
              icon="mdi:arrow-right" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-info {
  width: 97px;
  height: 97px;
}
</style>