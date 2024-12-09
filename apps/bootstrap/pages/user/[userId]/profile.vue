<script setup lang="ts">
import { parseISO } from 'date-fns'
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';
import { editMachine } from '~/machines/edit-machine'
import { useMachine } from '@xstate/vue'
import type { AuthEntry } from '~/types'
import { formatRFC3339 } from "date-fns"

defineOptions({
  name: 'UserProfile'
})

definePageMeta({
  layout: 'user-layout',
  name: 'user-profile',
  meta: {
    title: '個人資料'
  },
  props: true,
})

const props = defineProps({
  userId: {
    type: String,
    required: true
  }
})
const { userId } = toRefs(props)

const { cities, counties } = useCity()
const { $api } = useNuxtApp()
const { token, userData } = storeToRefs(useAuthStore())
const { setUserData } = useAuthStore()
const { data, status, error, refresh, clear } = await useAsyncData(
  'user-profile',
  async () => {
    const res = await $api<AuthEntry>('/api/v1/user/')
    const birthday = parseISO(res.result.birthday)
    
    return { ...res.result, birthday: [birthday.getFullYear(), birthday.getMonth() + 1, birthday.getDate()] }
  }
)

/**
 * 更新密碼
 */
const { handleSubmit: handleAuthSubmit, isSubmitting: isAuthSubmitting, defineField: defineAuthField, errors: authErrors } = useForm({
  initialValues: {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  },
  validationSchema: toTypedSchema(
    zod.object({
      oldPassword: zod.string().min(1, { message: 'This is required' }),
      newPassword: zod.string().min(1, { message: 'This is required' }),
      confirmNewPassword: zod.string().min(1, { message: 'This is required' })
    }).refine((data) => data.newPassword === data.confirmNewPassword, {
      message: '兩次密碼輸入不一致',
      path: ['confirmNewPassword']
    })
  ),
  validateOnMount: false
})
const [oldPassword] = defineAuthField('oldPassword')
const [newPassword] = defineAuthField('newPassword')
const [confirmNewPassword] = defineAuthField('confirmNewPassword')

const { snapshot: authSnapshot, send: authSend } = useMachine(editMachine)

const onAuthSubmit = handleAuthSubmit(async(values) => {
  const { confirmNewPassword, ...data } = values
  try {
    await $api('/api/v1/user/', {
      method: 'put',
      body: { userId: userId.value, ...data }
    })
    authSend({ type: 'SUBMIT' })
  } catch (error) {
    console.error("🚀 ~ onAuthSubmit ~ error:", error)
  }
})

const isPasswdEdit = computed(() => authSnapshot.value.context.isEdit)

/**
 * 更新資本資料
 */
const { defineField: defineInfoField, handleSubmit: handleBasicSubmit, isSubmitting: isBasicSubmitting } = useForm({
  initialValues: data.value
})
const [name] = defineInfoField('name')
const [phone] = defineInfoField('phone')
const [birthday] = defineInfoField('birthday')
const [city] = defineInfoField('address.city')
const [county] = defineInfoField('address.county')
const [detail] = defineInfoField('address.detail')
const [zipCode] = defineInfoField('address.zipcode')

const { snapshot: basicSnapshot, send: basicSend } = useMachine(editMachine)

const isEditProfile = computed(() => basicSnapshot.value.context.isEdit)

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

const onBasicSubmit = handleBasicSubmit(async (values) => {
  try {
    const basicData = {...values, birthday: formatRFC3339(new Date(values.birthday[0], values.birthday[1] - 1, values.birthday[2])) }
    await $api('/api/v1/user/', {
      method: 'put',
      body: {
        userId: userId.value,
        ...basicData
      }
    })
    basicSend({ type: 'SUBMIT' })
    refresh()
  } catch (error) {
    console.error("🚀 ~ onBasicSubmit ~ error:", error)
  }
  
})
</script>

<template>
  <div class="row gap-6 gap-md-0">
    <div class="col-12 col-md-5">
      <section class="rounded-3xl d-flex flex-column gap-6 gap-md-10 p-6 p-md-10 bg-neutral-0">
        <h2 class="fs-6 fs-md-5 fw-bold">
          修改密碼
        </h2>
        <form class="d-flex flex-column gap-4 gap-md-6" @submit="onAuthSubmit">
          <div class="fs-8 fs-md-7">
            <p class="mb-2 text-neutral-80 fw-medium">
              電子信箱
            </p>
            <span
              class="form-control pe-none p-0 text-neutral-100 fw-bold border-0"
            >{{ data?.email }}</span>
          </div>

          <div
            class="d-flex justify-content-between align-items-center"
            :class="{'d-none': isPasswdEdit}"
          >
            <div>
              <label class="mb-0 text-neutral-80 fs-8 fs-md-7 fw-medium">
                密碼
              </label>
              <input
                class="form-control pe-none p-0 text-neutral-100 fs-5 fs-md-3 fw-bold border-0"
                type="password"
                value="**********"
              >
            </div>

            <button
              class="flex-shrink-0 text-primary-100 fs-8 fs-md-7 fw-bold text-decoration-underline border-0 bg-transparent"
              type="button"
              @click="authSend({ type: 'EDIT' })"
            >
              重設
            </button>
          </div>

          <div
            class="d-flex flex-column gap-4 gap-md-6"
            :class="{'d-none': !isPasswdEdit}"
          >
            <div>
              <label
                for="oldPassword"
                class="form-label fs-8 fs-md-7 fw-bold"
              >舊密碼</label>
              <input
                v-model="oldPassword"
                id="oldPassword"
                type="password"
                class="form-control p-4 fs-7 rounded-3"
                placeholder="請輸入舊密碼"
              >
            </div>

            <div>
              <label
                for="newPassword"
                class="form-label fs-8 fs-md-7 fw-bold"
              >新密碼</label>
              <input
                v-model="newPassword"
                id="newPassword"
                type="password"
                class="form-control p-4 fs-7 rounded-3"
                placeholder="請輸入新密碼"
              >
            </div>

            <div>
              <label
                for="confirmPassword"
                class="form-label fs-8 fs-md-7 fw-bold"
              >確認新密碼</label>
              <input
                v-model="confirmNewPassword"
                id="confirmPassword"
                type="password"
                class="form-control p-4 fs-7 rounded-3"
                placeholder="請再輸入一次新密碼"
              >
            </div>
          </div>

          <button
            :class="{'d-none': !isPasswdEdit}"
            class="btn btn-neutral-40 align-self-md-start px-8 py-4 text-neutral-60 rounded-3"
            type="submit"
            :disabled="isAuthSubmitting"
          >
            儲存設定
          </button>
        </form>
      </section>
    </div>

    <div class="col-12 col-md-7">
      <section class="rounded-3xl d-flex flex-column gap-6 gap-md-10 p-6 p-md-10 bg-neutral-0">
        <h2 class="fs-6 fs-md-5 fw-bold">
          基本資料
        </h2>
        <form id="basic-form" class="d-flex flex-column gap-4 gap-md-6" @submit="onBasicSubmit">
          <div class="fs-8 fs-md-7">
            <label
              class="form-label"
              :class="{'fw-bold text-neutral-100': isEditProfile, 'fw-medium text-neutral-80': !isEditProfile}"
              for="name"
            >
              姓名
            </label>
            <input
              v-model="name"
              id="name"
              name="name"
              class="form-control text-neutral-100 fw-bold"
              :class="{'pe-none p-0 border-0': !isEditProfile, 'p-4': isEditProfile}"
              type="text"
            >
          </div>

          <div class="fs-8 fs-md-7">
            <label
              class="form-label"
              :class="{'fw-bold text-neutral-100': isEditProfile, 'fw-medium text-neutral-80': !isEditProfile}"
              for="phone"
            >
              手機號碼
            </label>
            <input
              v-model="phone"
              id="phone"
              name="phone"
              class="form-control text-neutral-100 fw-bold"
              :class="{'pe-none p-0 border-0': !isEditProfile, 'p-4': isEditProfile}"
              type="tel"
            >
          </div>

          <div class="fs-8 fs-md-7">
            <label
              class="form-label"
              :class="{'fw-bold text-neutral-100': isEditProfile, 'fw-medium text-neutral-80': !isEditProfile}"
              for="birth"
            >
              生日
            </label>
            <span
              class="form-control pe-none p-0 text-neutral-100 fw-bold border-0"
              :class="{'d-none': isEditProfile}"
            >{{ data?.birthday[0] }} 年 {{ data?.birthday[1] }} 月 {{ data?.birthday[2] }} 日</span>
            <div
              class="d-flex gap-2"
              :class="{'d-none': !isEditProfile}"
            >
              <select
                v-model="birthday[0]"
                id="birth"
                class="form-select p-4 text-neutral-80 fw-medium rounded-3"
              >
                <option
                  v-for="year in 65"
                  :key="year"
                  :value="year + 1958"
                >
                  {{ year + 1958 }} 年
                </option>
              </select>
              <select
                v-model="birthday[1]"
                class="form-select p-4 text-neutral-80 fw-medium rounded-3"
              >
                <option
                  v-for="month in 12"
                  :key="month"
                  :value="month"
                >
                  {{ month }} 月
                </option>
              </select>
              <select
                v-model="birthday[2]"
                class="form-select p-4 text-neutral-80 fw-medium rounded-3"
              >
                <option
                  v-for="day in 30"
                  :key="day"
                  :value="day"
                >
                  {{ day }} 日
                </option>
              </select>
            </div>
          </div>

          <div class="fs-8 fs-md-7">
            <label
              class="form-label"
              :class="{'fw-bold text-neutral-100': isEditProfile, 'fw-medium text-neutral-80': !isEditProfile}"
              for="address"
            >
              地址
            </label>
            <span
              class="form-control pe-none p-0 text-neutral-100 fw-bold border-0"
              :class="{'d-none': isEditProfile}"
            >{{ `${city}${county} ${detail}` }}</span>
            <div :class="{'d-none': !isEditProfile}">
              <div
                class="d-flex gap-2 mb-2"
              >
                <select
                  v-model="city"
                  class="form-select p-4 text-neutral-80 fw-medium rounded-3"
                >
                  
                  <option v-for="city of cities" :value="city.CityName">
                    {{ city.CityName }}
                  </option>
                </select>
                <select
                  v-model="county"
                  class="form-select p-4 text-neutral-80 fw-medium rounded-3"
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
                class="form-control p-4 rounded-3"
                placeholder="請輸入詳細地址"
              >
            </div>
          </div>
        </form>
        <button
          :class="{'d-none': isEditProfile}"
          class="btn btn-outline-primary-100 align-self-start px-8 py-4 rounded-3"
          type="button"
          @click="basicSend({ type: 'EDIT' })"
        >
          編輯
        </button>

        <button
          :class="{'d-none': !isEditProfile}"
          class="btn btn-neutral-40 align-self-md-start px-8 py-4 text-neutral-60 rounded-3"
          type="submit"
          form="basic-form"
          :disabled="isBasicSubmitting"
        >
          儲存設定
        </button>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.rounded-3xl {
  border-radius: 1.25rem;
}

input[type="password"] {
  font: small-caption;
}

.form-control::placeholder {
  --neutral-60: #909090;
  color: var(--neutral-60);
  font-weight: 500;
}
</style>