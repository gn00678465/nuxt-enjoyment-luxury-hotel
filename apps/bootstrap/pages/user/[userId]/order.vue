<script setup lang="ts">
import MaterialSymbolsCheckRounded from '~icons/material-symbols/check-rounded';
import type { OrdersResponse } from '~/types'
import { format, differenceInDays, parseISO } from 'date-fns';
import { zhTW } from 'date-fns/locale'

defineOptions({
  name: 'UserOrder'
})

definePageMeta({
  layout: 'user-layout',
  name: 'user-order',
  meta: {
    title: '訂單列表'
  },
  props: true,
})

const props = defineProps({
  userId: {
    type: String,
    required: true
  }
})
const { $formatNumber, $api } = useNuxtApp()
const { userId } = toRefs(props)
const { data: orders, refresh } = await useAPI<OrdersResponse>('/api/v1/orders/')

const roomId = computed(() => orders.value && orders.value.result[0].roomId._id)

const orderRecently = ref(orders.value && orders.value.result[0])

async function cancelOrder() {
  try {
    await $api(`/api/v1/orders/${orderRecently.value?._id}`, {
      method: 'delete'
    })
    refresh()
    orderRecently.value = (orders.value && orders.value.result[0]) || null
  } catch (error) {
    
  }
}
</script>

<template>
  <div class="row gap-6 gap-md-0">
    <div class="col-12 col-md-7">
      <div
        v-if="orderRecently"
        class="rounded-3xl d-flex flex-column gap-6 gap-md-10 p-4 p-md-10 bg-neutral-0"
        style="max-width: 730px;"
      >
        <div>
          <p class="mb-2 text-neutral-80 fs-8 fs-md-7 fw-medium">
            預訂參考編號： {{ orderRecently._id }}
          </p>
          <h2 class="mb-0 text-neutral-100 fs-7 fs-md-5 fw-bold">
            即將來的行程
          </h2>
        </div>

        <NuxtImg
          class="img-fluid rounded-3"
          :src="orderRecently.roomId.imageUrl"
          alt="room-a"
          format="png"
        />

        <section class="d-flex flex-column gap-6">
          <h3 class="d-flex align-items-center mb-0 text-neutral-80 fs-8 fs-md-6 fw-bold">
            <p class="mb-0">
              尊爵雙人房，{{ differenceInDays(parseISO(orderRecently.checkOutDate), parseISO(orderRecently.checkInDate)) }} 晚
            </p>
            <span
              class="d-inline-block mx-4 bg-neutral-80"
              style="width: 1px;height: 18px;"
            />
            <p class="mb-0">
              住宿人數：{{ orderRecently.peopleNum }} 位
            </p>
          </h3>

          <div class="text-neutral-80 fs-8 fs-md-7 fw-bold">
            <p class="title-deco mb-2">
              入住：{{ format(parseISO(orderRecently.checkInDate), 'MM月 dd日EEEE', { locale: zhTW }) }}，15:00 可入住
            </p>
            <p
              class="title-deco mb-0"
            >
              退房：{{ format(parseISO(orderRecently.checkOutDate), 'MM月 dd日EEEE', { locale: zhTW }) }}，12:00 前退房
            </p>
          </div>

          <p class="mb-0 text-neutral-80 fs-8 fs-md-7 fw-bold">
            NT$ {{ orderRecently.roomId.price }}
          </p>
        </section>

        <hr class="my-0 opacity-100 text-neutral-40">

        <section>
          <h3 class="title-deco mb-6 text-neutral-100 fs-8 fs-md-7 fw-bold">
            房內設備
          </h3>
          <ul class="d-flex flex-wrap row-gap-2 column-gap-10 p-6 mb-0 fs-8 fs-md-7 bg-neutral-0 border border-neutral-40 rounded-3 list-unstyled">
            <li v-for="facility of orderRecently.roomId.facilityInfo" class="flex-item d-flex gap-2">
              <MaterialSymbolsCheckRounded
                class="fs-5 text-primary-100"
              />
              <p class="mb-0 text-neutral-80 fw-bold">
                {{ facility.title }}
              </p>
            </li>
          </ul>
        </section>

        <section>
          <h3 class="title-deco mb-6 text-neutral-100 fs-8 fs-md-7 fw-bold">
            備品提供
          </h3>
          <ul class="d-flex flex-wrap row-gap-2 column-gap-10 p-6 mb-0 fs-8 fs-md-7 bg-neutral-0 border border-neutral-40 rounded-3 list-unstyled">
            <li v-for="amenity of orderRecently.roomId.amenityInfo" class="flex-item d-flex gap-2">
              <MaterialSymbolsCheckRounded
                class="fs-5 text-primary-100"
              />
              <p class="mb-0 text-neutral-80 fw-bold">
                {{ amenity.title }}
              </p>
            </li>
          </ul>
        </section>

        <div class="d-flex gap-4">
          <button
            data-bs-toggle="modal"
            data-bs-target="#cancelModal"
            class="btn btn-outline-primary-100 w-50 py-4 fw-bold"
            style="--bs-btn-hover-color: #fff"
            type="button"
          >
            取消預訂
          </button>
          <NuxtLink
            :to="{
              name: 'room-detail',
              params: { roomId }
            }"
            class="btn btn-primary-100 text-neutral-0 w-50 py-4 fw-bold"
            type="button"
          >
            查看詳情
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-5">
      <div
        class="rounded-3xl d-flex flex-column gap-6 gap-md-10 p-4 p-md-10 bg-neutral-0"
      >
        <h2 class="mb-0 text-neutral-100 fs-7 fs-md-5 fw-bold">
          歷史訂單
        </h2>

        <template v-for="(order, idx) of orders?.result ?? []">
          <div class="d-flex flex-column flex-lg-row gap-6" @click="() => { orderRecently = order }">
            <NuxtImg
              class="img-fluid object-fit-cover rounded-3"
              style="max-width: 120px; height: 80px;"
              :src="order.roomId.imageUrl"
              alt="room-a"
              format="png"
              provider="cloudinary"
            />
            <section class="d-flex flex-column gap-4">
              <p class="mb-0 text-neutral-80 fs-8 fs-md-7 fw-medium">
                預訂參考編號： {{ order?._id }}
              </p>
            
              <h3 class="d-flex align-items-center mb-0 text-neutral-80 fs-8 fs-md-6 fw-bold">
                {{ order?.roomId.name }}
              </h3>

              <div class="text-neutral-80 fw-medium">
                <p class="mb-2">
                  住宿天數： {{ differenceInDays(parseISO(order.checkOutDate), parseISO(order.checkInDate)) }} 晚
                </p>
                <p class="mb-0">
                  住宿人數：{{ order?.peopleNum }} 位
                </p>
              </div>

              <div class="text-neutral-80 fs-8 fs-md-7 fw-medium">
                <p class="title-deco mb-2">
                  入住：{{ format(parseISO(order.checkInDate), 'MM月 dd日EEEE', { locale: zhTW }) }}，15:00 可入住
                </p>
                <p
                  class="title-deco mb-0"
                >
                  退房：{{ format(parseISO(order.checkOutDate), 'MM月 dd日EEEE', { locale: zhTW }) }}，12:00 前退房
                </p>
              </div>
              <p class="mb-0 text-neutral-80 fs-8 fs-md-7 fw-bold">
                <ClientOnly>
                  NT$ {{ $formatNumber(order?.roomId?.price ?? 0) }}
                </ClientOnly>
              </p>
            </section>
          </div>

          <hr v-if="idx + 1 < (orders?.result.length ?? 0)" class="my-0 opacity-100 text-neutral-40">
        </template>

        <button
          class="btn btn-outline-primary-100 py-4 fw-bold"
          style="--bs-btn-hover-color: #fff"
          type="button"
        >
          查看更多
        </button>
      </div>
    </div>
  </div>

  <div
    id="cancelModal"
    class="modal fade"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered align-items-end align-items-md-center m-0 mx-md-auto h-100">
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div class="modal-body mx-auto my-10 my-md-15 text-neutral-80 fs-8 fs-md-6 fw-bold">
          確定要取消此房型的預訂嗎？
        </div>
        <div class="modal-footer d-flex gap-4">
          <button
            type="button"
            class="btn btn-outline-primary-100 flex-grow-1 m-0 py-4 fw-bold"
            style="--bs-btn-hover-color: #fff"
            data-bs-dismiss="modal"
          >
            關閉視窗
          </button>
          <button
            type="button"
            class="btn btn-primary-100 flex-grow-1 m-0 py-4 text-white fw-bold"
            @click="cancelOrder"
          >
            確定取消
          </button>
        </div>
      </div>
    </div>
  </div>
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


.rounded-3xl {
  border-radius: 1.25rem;
}

.title-deco {
  display: flex;
  align-items: center;
}

.title-deco::before {
  --color: #BF9D7D;
  content: '';
  display: inline-block;
  width: 4px;
  height: 24px;
  background-color: var(--color);
  border-radius: 10px;
  margin-right: 0.75rem;
}

.title-deco:nth-child(2)::before {
  --color: #909090;
}

.flex-item {
  max-width: 97px;
  width: 100%;
  white-space: nowrap;
}


.modal {
  backdrop-filter: blur(10px);

  @include media-breakpoint-down(md) {
    backdrop-filter: none;
  }
}

.modal-header {
  @include media-breakpoint-down(md) {
    border-bottom: 0 !important;
  }
}

.modal-content {
  @include media-breakpoint-down(md) {
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }
}
</style>