<script setup lang="ts">
import MaterialSymbolsKeyboardArrowLeft from '~icons/material-symbols/keyboard-arrow-left';
import FluentSlideSize24Filled from '~icons/fluent/slide-size-24-filled';
import MaterialSymbolsKingBed from '~icons/material-symbols/king-bed';
import IcBaselinePerson from '~icons/ic/baseline-person';
import MaterialSymbolsCloseRounded from '~icons/material-symbols/close-rounded';
import type { RoomResponse } from '~/types';
import { orderMachine } from '~/machines/order-machine';
import { useMachine } from '@xstate/vue';
import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale'
import type { Snapshot } from 'xstate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';

definePageMeta({
  name: 'booking',
  layout: 'front-layout',
  meta: {
    title:'預約房型'
  },
  props: true
})

const props = defineProps({
  roomId: {
    type: String,
    required: true
  }
})

const { cities, counties } = useCity()
const { userData } = storeToRefs(useAuthStore())
const router = useRouter();
const { roomId } = toRefs(props)
const { $api, $formatNumber } = useNuxtApp()
const { data: roomInfo, refresh } = useAsyncData(`/api/v1/rooms/${roomId.value}`, async () => {
  const res = await $api<RoomResponse>(`/api/v1/rooms/${roomId.value}`)
  return res.result
})
const persistenceSnapshotData = useCookie<Snapshot<unknown> | null>('persistenceSnapshotData')
const { snapshot, send, actorRef } = useMachine(orderMachine, {
  snapshot: persistenceSnapshotData.value || undefined,
  input: {}
})

actorRef.on('onSuccess', (event) => {
  console.log("🚀 ~ actorRef.on ~ event:", event)
  const { _id } = event.data.result
  router.push({
    name: 'booking-confirmation',
    params: {
      bookingId: _id
    }
  })
})

const { defineField, handleSubmit, isSubmitting, setValues, validate, errors } = useForm({
  initialValues: {
    name: '',
    email: '',
    phone: '',
    address: {
      city: '',
      county: '',
      detail: '',
      zipcode: 0
    }
  },
  validationSchema: toTypedSchema(
    zod.object({
      name: zod.string().min(1, { message: 'This is required' }),
      phone: zod.string().min(1, { message: 'This is required' }),
      email: zod.string().min(1, { message: 'This is required' }).email({ message: 'Must be a valid email' }),
      address: zod.object({
        detail: zod.string().min(1, { message: 'This is required' }),
        city: zod.string().min(1, { message: 'This is required' }),
        county: zod.string().min(1, { message: 'This is required' }),
        zipcode: zod.number(),
      })
    }),
  ),
  validateOnMount: false
})
const [name] = defineField('name')
const [email] = defineField('email')
const [phone] = defineField('phone')
const [city] = defineField('address.city')
const [county] = defineField('address.county')
const [detail] = defineField('address.detail')
const [zipCode] = defineField('address.zipcode')

function setUserData() {
  setValues({
    name: userData.value?.name,
    phone: userData.value?.phone,
    email: userData.value?.email,
    address: userData.value?.address
  })
}

const onSubmit = handleSubmit((values) => {
  send({ type: 'ORDER', data: { userInfo: values, roomId: roomId.value } })
})

watch(city, (newCity, oldCity) => {
  if (newCity !== oldCity) {
    county.value = ''
    zipCode.value = 0
  }
})

watchEffect(() => {
  if (county.value) {
    const _zipCode = counties.value(city.value).find((item) => item.AreaName === county.value)?.ZipCode
    if (_zipCode && !isNaN(parseInt(_zipCode))) {
      zipCode.value = parseInt(_zipCode)
    } else {
      zipCode.value = 0
    }
  }
})

const goBack = () => {
  send({ type: 'PREV' })
  router.back();
}
const isLoading = ref(false);

</script>

<template>
  <main class="pt-18 pt-md-30 bg-neutral-120">
    <section class="py-10 py-md-30 bg-primary-10">
      <div class="container">
        <button
          class="d-flex align-items-baseline gap-2 mb-10 bg-transparent border-0"
          type="button"
          @click="goBack"
        >
          <MaterialSymbolsKeyboardArrowLeft
            class="fs-5 text-neutral-100"
          />
          <h1 class="mb-0 text-neutral-100 fs-3 fw-bold">
            確認訂房資訊
          </h1>
        </button>

        <form class="row gap-10 gap-md-0" id="order-form" @submit.prevent="onSubmit">
          <div class="col-12 col-md-7">
            <section>
              <h2 class="mb-8 mb-md-10 text-neutral-100 fs-6 fs-md-4 fw-bold">
                訂房資訊
              </h2>
              <div class="d-flex flex-column gap-6">
                <div class="d-flex justify-content-between align-items-center text-neutral-100">
                  <div>
                    <h3 class="title-deco mb-2 fs-7 fw-bold">
                      選擇房型
                    </h3>
                    <p class="mb-0 fw-medium">
                      {{ roomInfo?.name }}
                    </p>
                  </div>
                  <button
                    class="bg-transparent border-0 fw-bold text-decoration-underline"
                    type="button"
                  >
                    編輯
                  </button>
                </div>
                <div class="d-flex justify-content-between align-items-center text-neutral-100">
                  <div>
                    <h3 class="title-deco mb-2 fs-7 fw-bold">
                      訂房日期
                    </h3>
                    <p class="mb-2 fw-medium">
                      入住：{{ format(snapshot.context.checkInDate!, 'MM月 dd日EEEE', { locale: zhTW }) }}
                    </p>
                    <p class="mb-0 fw-medium">
                      退房：{{ format(snapshot.context.checkOutDate!, 'MM月 dd日EEEE', { locale: zhTW }) }}
                    </p>
                  </div>
                  <button
                    class="bg-transparent border-0 fw-bold text-decoration-underline"
                    type="button"
                  >
                    編輯
                  </button>
                </div>
                <div class="d-flex justify-content-between align-items-center text-neutral-100">
                  <div>
                    <h3 class="title-deco mb-2 fs-7 fw-bold">
                      房客人數
                    </h3>
                    <p class="mb-0 fw-medium">
                      {{ snapshot.context.peopleNum }} 人
                    </p>
                  </div>
                  <button
                    class="bg-transparent border-0 fw-bold text-decoration-underline"
                    type="button"
                  >
                    編輯
                  </button>
                </div>
              </div>
            </section>

            <hr class="my-10 my-md-12 opacity-100 text-neutral-60">

            <section>
              <div class="d-flex justify-content-between align-items-center mb-10">
                <h2 class="mb-0 text-neutral-100 fs-6 fs-md-4 fw-bold">
                  訂房人資訊
                </h2>
                <button
                  class="text-primary-100 bg-transparent border-0 fw-bold text-decoration-underline"
                  type="button"
                  :disabled="!userData"
                  @click="setUserData"
                >
                  套用會員資料
                </button>
              </div>

              <div class="d-flex flex-column gap-6">
                <div class="text-neutral-100">
                  <label
                    for="name"
                    class="form-label fs-8 fs-md-7 fw-bold"
                  >姓名</label>
                  <input
                    v-model="name"
                    id="name"
                    type="text"
                    class="form-control p-4 fs-8 fs-md-7 rounded-3"
                    placeholder="請輸入姓名"
                  >
                </div>

                <div class="text-neutral-100">
                  <label
                    for="phone"
                    class="form-label fs-8 fs-md-7 fw-bold"
                  >手機號碼</label>
                  <input
                    v-model="phone"
                    id="phone"
                    type="tel"
                    class="form-control p-4 fs-8 fs-md-7 rounded-3"
                    placeholder="請輸入手機號碼"
                  >
                </div>

                <div class="text-neutral-100">
                  <label
                    for="email"
                    class="form-label fs-8 fs-md-7 fw-bold"
                  >電子信箱</label>
                  <input
                    v-model="email"
                    id="email"
                    type="email"
                    class="form-control p-4 fs-8 fs-md-7 rounded-3"
                    placeholder="請輸入電子信箱"
                  >
                </div>

                <div class="text-neutral-100">
                  <label
                    for="address"
                    class="form-label fs-8 fs-md-7 fw-bold"
                  >地址</label>
                  <div className="d-flex gap-2 mb-4">
                    <select
                      v-model="city"
                      class="form-select w-50 p-4 text-neutral-80 fs-8 fs-md-7 fw-medium rounded-3"
                    >
                      <option v-for="city of cities" :value="city.CityName">
                        {{ city.CityName }}
                      </option>
                    </select>
                    <select
                      v-model="county"
                      class="form-select w-50 p-4 text-neutral-80 fs-8 fs-md-7 fw-medium rounded-3"
                    >
                      <option v-for="county of counties(city)" :value="county.AreaName">
                        {{ county.AreaName }}
                      </option>
                    </select>
                  </div>
                  <input
                    v-model="detail"
                    id="address"
                    type="text"
                    class="form-control p-4 fs-8 fs-md-7 rounded-3"
                    placeholder="請輸入詳細地址"
                  >
                </div>
              </div>
            </section>

            <hr class="my-10 my-md-12 opacity-100 text-neutral-60">

            <section>
              <h2 class="mb-8 mb-md-10 text-neutral-100 fs-6 fs-md-4 fw-bold">
                房間資訊
              </h2>
              <div class="d-flex flex-column gap-6">
                <section>
                  <h3 class="title-deco mb-4 mb-md-6 fs-7 fs-md-5 fw-bold">
                    房型基本資訊
                  </h3>
                  <ul class="d-flex gap-4 list-unstyled">
                    <li class="card-info px-4 py-5 bg-neutral-0 border border-primary-40 rounded-3">
                      <FluentSlideSize24Filled
                        class="mb-2 fs-5 text-primary-100"
                      />
                      <p class="mb-0 fw-bold text-neutral-80 text-nowrap">
                        {{ roomInfo?.areaInfo }}
                      </p>
                    </li>
                    <li class="card-info px-4 py-5 bg-neutral-0 border border-primary-40 rounded-3">
                      <MaterialSymbolsKingBed
                        class="mb-2 fs-5 text-primary-100"
                      />
                      <p class="mb-0 fw-bold text-neutral-80 text-nowrap">
                        {{ roomInfo?.bedInfo }}
                      </p>
                    </li>
                    <li class="card-info px-4 py-5 bg-neutral-0 border border-primary-40 rounded-3">
                      <IcBaselinePerson
                        class="mb-2 fs-5 text-primary-100"
                      />
                      <p class="mb-0 fw-bold text-neutral-80 text-nowrap">
                        2-4 人
                      </p>
                    </li>
                  </ul>
                </section>

                <section>
                  <h3 class="title-deco mb-4 mb-md-6 text-neutral-100 fs-7 fs-md-5 fw-bold">
                    房間格局
                  </h3>
                  <ul class="d-flex flex-wrap gap-6 gap-md-10 p-6 fs-8 fs-md-7 bg-neutral-0 rounded-3 list-unstyled">
                    <li v-for="layout of roomInfo?.layoutInfo ?? []" class="d-flex gap-2">
                      <CheckItem :text="layout.title" :is-provide="layout.isProvide" text-class="mb-0 text-neutral-80 fw-bold"></CheckItem>
                    </li>
                  </ul>
                </section>

                <section>
                  <h3 class="title-deco mb-4 mb-md-6 text-neutral-100 fs-7 fs-md-5 fw-bold">
                    房內設備
                  </h3>
                  <ul class="d-flex flex-wrap row-gap-2 column-gap-10 p-6 mb-0 fs-8 fs-md-7 bg-neutral-0 rounded-3 list-unstyled">
                    <li v-for="facility of roomInfo?.facilityInfo ?? []" class="flex-item d-flex gap-2">
                      <CheckItem :text="facility.title" :is-provide="facility.isProvide" text-class="mb-0 text-neutral-80 fw-bold" />
                    </li>
                  </ul>
                </section>

                <section>
                  <h3 class="title-deco mb-4 mb-md-6 text-neutral-100 fs-7 fs-md-5 fw-bold">
                    備品提供
                  </h3>
                  <ul class="d-flex flex-wrap row-gap-2 column-gap-10 p-6 mb-0 fs-8 fs-md-7 bg-neutral-0 rounded-3 list-unstyled">
                    <li v-for="amenity of roomInfo?.amenityInfo ?? []" class="flex-item d-flex gap-2">
                      <CheckItem :text="amenity.title" :is-provide="amenity.isProvide" text-class="mb-0 text-neutral-80 fw-bold" />
                    </li>
                  </ul>
                </section>
              </div>
            </section>
          </div>

          <div class="col-12 col-md-5">
            <div
              class="confirm-form rounded-3xl d-flex flex-column gap-10 p-6 p-md-10 mx-auto ms-md-auto me-md-0 bg-neutral-0"
            >
              <NuxtImg
                class="img-fluid rounded-3"
                src="/images/room-a-1.png"
                alt="room-a"
                format="png"
              />

              <div>
                <h2 className="mb-6 text-neutral-100 fs-6 fs-md-4 fw-bold">
                  價格詳情
                </h2>
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <div class="d-flex align-items-center text-neutral-100 fw-medium">
                    <span>NT$ {{ $formatNumber(roomInfo?.price ?? 0) }}</span>
                    <MaterialSymbolsCloseRounded
                      class="ms-2 me-1 text-neutral-80"
                    />
                    <span class="text-neutral-80">{{ snapshot.context.daysCount }} 晚</span>
                  </div>
                  <span class="fw-medium">
                    NT$ {{ $formatNumber(roomInfo?.price ?? 0) }}
                  </span>
                </div>
                <div class="d-flex justify-content-between align-items-center fw-medium">
                  <p class="d-flex align-items-center mb-0 text-neutral-100">
                    住宿折扣
                  </p>
                  <span class="text-primary-100">
                    -NT$ 1,000
                  </span>
                </div>
                <hr class="my-6 opacity-100 text-neutral-40">
                <div class="d-flex justify-content-between align-items-center text-neutral-100 fw-bold">
                  <p class="d-flex align-items-center mb-0">
                    總價
                  </p>
                  <span>
                    NT$ {{ $formatNumber((roomInfo?.price ?? 0) * snapshot.context.daysCount) }}
                  </span>
                </div>
              </div>

              <button
                class="btn btn-primary-100 py-4 text-neutral-0 fw-bold rounded-3"
                type="submit"
                form="order-form"
                :disabled="isSubmitting"
                @click="() => {
                  validate()
                }"
              >
                確認訂房
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>

    <BookingLoading v-if="isLoading" />
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

.title-deco {
  display: flex;
  align-items: center;
}

.title-deco::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 24px;
  background-color: #BF9D7D;
  border-radius: 10px;
  margin-right: 0.75rem;
}

.form-control::placeholder {
  --neutral-60: #909090;
  color: var(--neutral-60);
  font-weight: 500;
}

.card-info {
  width: 97px;
  height: 97px;
}

.flex-item {
  flex: 1 1 15%;

  @include media-breakpoint-down(md) {
    flex-basis: 40%;
  }
}

.rounded-3xl {
  border-radius: 1.25rem;
}

.confirm-form {
  position: sticky;
  top: 160px;
  max-width: 478px;

  @include media-breakpoint-down(md) {
    position: static;
    top: 0;
    max-width: auto;
  }
}

</style>