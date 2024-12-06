<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
import type { AuthEntry } from '~/types'

definePageMeta({
  name: 'login',
  layout: 'account-layout',
  meta: {
    title:'會員登入'
  }
})

const authStore = useAuthStore()

// hooks
const router = useRouter()
const emailId = useId()
const passwordId = useId()
const { $api } = useNuxtApp()

/**
 * auth form
 */
 const validationAuthSchema = toTypedSchema(
  zod.object({
    email: zod.string().min(1, { message: 'This is required' }).email({ message: 'Must be a valid email' }),
    password: zod.string().min(1, { message: 'This is required' }),
    rememberMe: zod.boolean()
  })
)
const { handleSubmit, errors, isSubmitting, meta } = useForm({
  initialValues: {
    email: '',
    password: '',
    rememberMe: false
  },
  validationSchema: validationAuthSchema,
  validateOnMount: false
})
const { value: email } = useField('email')
const { value: password } = useField('password')
const { value: rememberMe } = useField('rememberMe')

const onSubmit = handleSubmit(async (values) => {
  const { rememberMe, ...data } = values
  const res = await $api<AuthEntry>('/api/v1/user/login', { method: 'post', body: data })
  authStore.setToken(res.token)
  authStore.setUserData(res.result)
  router.push({ name: 'user-profile', params: { userId: res.result._id }})
})

</script>

<template>
<div class="px-5 px-md-0">
    <div class="mb-10">
      <p class="mb-2 text-primary-100 fs-8 fs-md-7 fw-bold">
        享樂酒店，誠摯歡迎
      </p>
      <h1 class="text-neutral-0 fw-bold">
        立即開始旅程
      </h1>
    </div>

    <form class="mb-10" @submit.prevent="onSubmit">
      <div class="mb-4 fs-8 fs-md-7">
        <label
          class="mb-2 text-neutral-0 fw-bold"
          :for="emailId"
        >
          電子信箱
        </label>
        <input
          v-model="email"
          :id="emailId"
          class="form-control p-4 text-neutral-100 fw-medium border-neutral-40"
          placeholder="請輸入信箱"
          type="email"
        >
      </div>
      <div class="mb-4 fs-8 fs-md-7">
        <label
          class="mb-2 text-neutral-0 fw-bold"
          :for="passwordId"
        >
          密碼
        </label>
        <input
          v-model="password"
          :id="passwordId"
          class="form-control p-4 text-neutral-100 fw-medium border-neutral-40"
          placeholder="請輸入密碼"
          type="password"
        >
      </div>
      <div class="d-flex justify-content-between align-items-center mb-10 fs-8 fs-md-7">
        <div class="form-check d-flex align-items-end gap-2 text-neutral-0">
          <input
            v-model="rememberMe"
            id="remember"
            class="form-check-input"
            type="checkbox"
            value=""
          >
          <label
            class="form-check-label fw-bold"
            for="remember"
          >
            記住帳號
          </label>
        </div>
        <button
          class="text-primary-100 fw-bold text-decoration-underline bg-transparent border-0"
          type="button"
        >
          忘記密碼？
        </button>
      </div>
      <button
        class="btn btn-primary-100 w-100 py-4 text-neutral-0 fw-bold"
        type="submit"
        :disabled="isSubmitting"
      >
        會員登入
      </button>
    </form>

    <p class="mb-0 fs-8 fs-md-7">
      <span class="me-2 text-neutral-0 fw-medium">沒有會員嗎？</span>
      <NuxtLink
        to="signup"
        class="text-primary-100 fw-bold text-decoration-underline bg-transparent border-0"
      >
        <span>前往註冊</span>
      </NuxtLink>
    </p>
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