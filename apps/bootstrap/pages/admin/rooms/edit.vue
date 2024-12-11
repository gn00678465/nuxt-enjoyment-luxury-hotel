<script setup lang="ts">
definePageMeta({
  layout: 'admin-layout',
  name: 'admin_rooms-edit',
  meta: {
    title: '房型管理 Edit'
  },
  props: true,
  alias: ['/rooms/create', '/rooms/edit']
})

const layoutInfo = ref([
  {
    title: '市景'
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

const facilityInfo = ref([
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

const amenityInfo = ref([
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

const { defineField } = useForm({
  initialValues: {
    "name": "",
  "description": "",
  "imageUrl": "https://fakeimg.pl/300/",
  "imageUrlList": [
    "https://fakeimg.pl/300/",
    "https://fakeimg.pl/300/",
    "https://fakeimg.pl/300/"
  ],
  "areaInfo": null,
  "bedInfo": null,
  "maxPeople": null,
  "price": 0,
  "layoutInfo": [],
  "facilityInfo": [],
  "amenityInfo": []
  }
})
const { remove, push, fields } = useFieldArray<{ title: string }>('layoutInfo');


</script>

<template>
  <div class="w-full h-full flex items-center justify-center">
    <form action="post">
      <div class="form-floating mb-3">
        <input type="type" class="form-control" id="name" placeholder="name">
        <label for="name">Name</label>
      </div>
      <div class="form-floating mb-3">
        <textarea class="form-control" placeholder="Leave a comment here" id="Description" style="height: 100px"></textarea>
        <label for="Description">Description</label>
      </div>

      <div class="mb-3">
        <img src="..." class="img-thumbnail" alt="...">
      </div>

      <div class="flex items-center gap-x-10 mb-3">
        <select class="form-select form-select-lg" aria-label="Large select example">
          <option selected disabled>Open this select menu</option>
          <option value="24坪">24坪</option>
          <option value="28坪">28坪</option>
          <option value="36坪">36坪</option>
          <option value="48坪">48坪</option>
        </select>

        <select class="form-select form-select-lg" aria-label="Large select example">
          <option selected>Open this select menu</option>
          <option value="1 張大床">1 張大床</option>
          <option value="2 張大床">2 張大床</option>
        </select>

        <select class="form-select form-select-lg" aria-label="Large select example">
          <option selected>Open this select menu</option>
          <option :value="1">1</option>
          <option :value="2">2</option>
          <option :value="3">1</option>
          <option :value="4">2</option>
        </select>
      </div>

      <div class="input-group mb-3">
        <span class="input-group-text">$</span>
        <input type="text" class="form-control" aria-label="Dollar amount (with dot and two decimal places)">
      </div>

      <div class="mb-3">
        <h4>房間格局</h4>
        <div class="grid gap-x-10 grid-cols-5">
          <div class="form-check" v-for="(layout, idx) of layoutInfo">
            <input class="form-check-input" type="checkbox" :value="layout.title" :id="`layoutInfo-${idx}`">
            <label class="form-check-label" :for="`layoutInfo-${idx}`">
              {{ layout.title }}
            </label>
          </div>
        </div>
      </div>
      <div class="mb-3">
        <h4>房內設備</h4>
        <div class="grid gap-x-10 grid-cols-5 gap-y-2">
          <div class="form-check" v-for="(facility, idx) of facilityInfo">
            <input class="form-check-input" type="checkbox" :value="facility.title" :id="`facilityInfo-${idx}`">
            <label class="form-check-label" :for="`facilityInfo-${idx}`">
              {{ facility.title }}
            </label>
          </div>
        </div>
      </div>
      <div class="mb-3">
        <h4>備品</h4>
        <div class="grid gap-x-10 grid-cols-5 gap-y-2">
          <div class="form-check" v-for="(amenity, idx) of amenityInfo">
            <input class="form-check-input" type="checkbox" :value="amenity.title" :id="`amenityInfo-${idx}`">
            <label class="form-check-label" :for="`amenityInfo-${idx}`">
              {{ amenity.title }}
            </label>
          </div>
        </div>
      </div>
    </form>
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


input[type="password"] {
  font: small-caption;
  font-size: 1.5rem;
}

input::placeholder {
  color: #909090;
  font-size: 1rem;
  font-weight: 500;

  @include media-breakpoint-down(md) {
    font-size: 14px;
  }
}

.form-check-input {
  width: 1.5rem;
  height: 1.5rem;
}

.form-check-input:checked {
  background-color: #BF9D7D;
  border-color: #BF9D7D;
}
</style>