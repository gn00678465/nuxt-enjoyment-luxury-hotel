<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import type {  RoomEntry } from '~/types';
import * as z from 'zod';
import MdiWeb from '~icons/mdi/web';

definePageMeta({
  layout: 'admin-layout',
  name: 'admin_rooms-edit',
  meta: {
    title: '房型管理 Edit'
  },
})

const { $api } = useNuxtApp()
const route = useRoute()
const id = computed(() => route.query.id?.toString())
const roomInfo = useCookie<RoomEntry | null>('roomInfo')

const layoutInfoRef = ref([
  {
    title: '市景',
  },
  {
    title: '獨立衛浴'
  },
  {
    title: '客廳'
  },
  {
    title: '書房'
  },
  {
    title: '樓層電梯'
  }
])

const facilityInfoRef = ref([
  {
    title: '平面電視'
  },
  {
    title: '吹風機'
  },
  {
    title: '冰箱'
  },
  {
    title: '熱水壺'
  },
  {
    title: '檯燈'
  },
  {
    title: '衣櫃'
  },
  {
    title: '除濕機'
  },
  {
    title: '浴缸'
  },
  {
    title: '書桌'
  },
  {
    title: '音響'
  }
])

const amenityInfoRef = ref([
  {
    title: '衛生紙'
  },
  {
    title: '拖鞋'
  },
  {
    title: '沐浴用品'
  },
  {
    title: '清潔用品'
  },
  {
    title: '刮鬍刀'
  },
  {
    title: '吊衣架'
  },
  {
    title: '浴巾'
  },
  {
    title: '刷牙用品'
  },
  {
    title: '罐裝水'
  },
  {
    title: '梳子'
  }
])

const { defineField, handleSubmit, errors } = useForm({
  initialValues: computed(() => {
    if (roomInfo.value) {
      return transformObject(
        roomInfo.value,
        ['layoutInfo', 'facilityInfo', 'amenityInfo'],
        (items) => items.map(item => (item.title)))
    }
    return null
  }).value || {
    name: "",
    description: "",
    imageUrl: "https://fakeimg.pl/300/",
    imageUrlList: [
      "https://fakeimg.pl/300/",
      "https://fakeimg.pl/300/",
      "https://fakeimg.pl/300/"
    ],
    areaInfo: "",
    bedInfo: "",
    maxPeople: 0,
    price: 0,
    layoutInfo: [],
    facilityInfo: [],
    amenityInfo: []
  },
  validationSchema: toTypedSchema(z.object({
    name: z.string().min(1, { message: "name is required!" }),
    description: z.string().min(1, { message: "description is required!" }),
    imageUrl: z.string().min(1),
    imageUrlList: z.string().array(),
    areaInfo: z.string().min(1, { message: "areaInfo is required!" }),
    bedInfo: z.string().min(1, { message: "bedInfo is required!" }),
    maxPeople: z.number().gte(1, { message: "需要為正數與不得為 0" }),
    price: z.number().gte(1, { message: "需要為正數與不得為 0" }),
    layoutInfo: z.string().array(),
    facilityInfo: z.string().array(),
    amenityInfo: z.string().array(),
  }))
})
const [name] = defineField('name')
const [description] = defineField('description')
const [imageUrl] = defineField('imageUrl')
const [areaInfo] = defineField('areaInfo')
const [bedInfo] = defineField('bedInfo')
const [maxPeople] = defineField('maxPeople')
const [price] = defineField('price')
const [layoutInfo] = defineField('layoutInfo')
const [facilityInfo] = defineField('facilityInfo')
const [amenityInfo] = defineField('amenityInfo')

const onSubmit = handleSubmit(async (values) => {
  const vals = transformObject(
    values,
    ['layoutInfo', 'facilityInfo', 'amenityInfo'],
    (items) => items.map(item => ({ isProvide: true, title: item })))
  
    try {
      if (!roomInfo.value) {
        await $api('/api/v1/admin/rooms/', {
          method: 'post',
          body: vals
        })
      } else {
        await $api(`/api/v1/admin/rooms/${id.value}`, {
          method: 'put',
          body: vals
        })
      }
    } catch (error) {
      console.error(error)
    } finally {
      useRouter().go(-1)
    }
})

onBeforeRouteLeave(() => {
  roomInfo.value = null
})

</script>

<template>
  <div class="w-full h-full flex items-center justify-center py-10">
    <form @submit.prevent="onSubmit">
      <div class="form-floating mb-3">
        <input v-model="name" type="type" class="form-control" id="name" placeholder="name">
        <label for="name">Name</label>
      </div>
      <div class="form-floating mb-3">
        <textarea v-model="description" class="form-control" placeholder="Leave a comment here" id="Description" style="height: 100px"></textarea>
        <label for="Description">Description</label>
      </div>

      <div class="input-group mb-3 w-full">
        <span class="input-group-text" id="basic-addon1">
          <MdiWeb></MdiWeb>
        </span>
        <input v-model="imageUrl" type="text" class="form-control" placeholder="Image url" aria-label="Image url" aria-describedby="Image url">
      </div>

      <div class="mb-3">
        <img src="https://fakeimg.pl/300/" class="img-thumbnail" fit="cover" alt="...">
      </div>

      <div class="flex items-center gap-x-10 mb-3">

        <div class="form-floating">
          <select v-model="areaInfo" id="area-info" class="form-select form-select-lg" aria-label="Large select example">
            <option selected disabled value="">Please select one</option>
            <option value="24坪">24坪</option>
            <option value="28坪">28坪</option>
            <option value="36坪">36坪</option>
            <option value="48坪">48坪</option>
          </select>
          <label for="area-info">Area info</label>
        </div>

        <div class="form-floating">
          <select v-model="bedInfo" id="bad-info" class="form-select form-select-lg" aria-label="Large select example">
            <option selected disabled value="">Please select one</option>
            <option value="1 張大床">1 張大床</option>
            <option value="2 張大床">2 張大床</option>
          </select>
          <label for="bad-info">Bad info</label>
        </div>

        <div class="form-floating">
          <select v-model="maxPeople" id="max-people" class="form-select form-select-lg" aria-label="Large select example">
            <option selected disabled :value="0">Please select one</option>
            <option :value="1">1</option>
            <option :value="2">2</option>
            <option :value="3">3</option>
            <option :value="4">4</option>
          </select>
          <label for="max-people">Max People</label>
        </div>
      </div>

      <div class="input-group mb-3">
        <span class="input-group-text">NT$</span>
        <input v-model="price" type="number" class="form-control" aria-label="Dollar amount (with dot and two decimal places)">
      </div>

      <div class="mb-3">
        <h4>房間格局</h4>
        <div class="grid gap-x-10 grid-cols-5">
          <div class="form-check" v-for="(layout, idx) of layoutInfoRef">
            <input v-model="layoutInfo" class="form-check-input" type="checkbox" :value="layout.title" :id="`layoutInfo-${idx}`">
            <label class="form-check-label" :for="`layoutInfo-${idx}`">
              {{ layout.title }}
            </label>
          </div>
        </div>
      </div>
      <div class="mb-3">
        <h4>房內設備</h4>
        <div class="grid gap-x-10 grid-cols-5 gap-y-2">
          <div class="form-check" v-for="(facility, idx) of facilityInfoRef">
            <input v-model="facilityInfo" class="form-check-input" type="checkbox" :value="facility.title" :id="`facilityInfo-${idx}`">
            <label class="form-check-label" :for="`facilityInfo-${idx}`">
              {{ facility.title }}
            </label>
          </div>
        </div>
      </div>
      <div class="mb-3">
        <h4>備品</h4>
        <div class="grid gap-x-10 grid-cols-5 gap-y-2">
          <div class="form-check" v-for="(amenity, idx) of amenityInfoRef">
            <input v-model="amenityInfo" class="form-check-input" type="checkbox" :value="amenity.title" :id="`amenityInfo-${idx}`">
            <label class="form-check-label" :for="`amenityInfo-${idx}`">
              {{ amenity.title }}
            </label>
          </div>
        </div>
      </div>
      <div>
        <button type="submit" class="btn btn-secondary btn-lg">submit</button>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>

</style>