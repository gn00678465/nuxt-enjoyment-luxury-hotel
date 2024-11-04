<script setup lang="ts">
definePageMeta({
  layout: 'auth-layout',
  contentClass: 'flex-1 flex items-center justify-center h-full min-h-0',
});

const { t } = useI18n();
</script>

<template>
  <form
    class="flex-1 text-white flex flex-col space-y-10 px-5 md:px-0 max-w-104 bg-body"
    @submit.prevent
  >
    <div class="space-y-2">
      <p class="text-primary text-subtitle md:text-title">
        {{ t('welcome_message') }}
      </p>
      <p class="text-h3 text-white md:text-h1">
        立即開始旅程
      </p>
    </div>
    <div class="self-stretch space-y-4">
      <LuxuryInput
        :label="t('email')"
        :show-feedback="false"
        placeholder="請輸入電子信箱"
      />
      <LuxuryInput
        :label="t('password')"
        :show-feedback="false"
        placeholder="請輸入密碼"
      />
      <p class="flex items-center justify-between relative block">
        <ClientOnly>
          <BaseCheckbox>記住帳號</BaseCheckbox>
        </ClientOnly>
        <NuxtLink
          to="/"
          class="text-primary underline underline-primary font-700"
        >
          忘記密碼？
        </NuxtLink>
      </p>
    </div>
    <LuxuryButton
      block
      :disabled="true"
    >
      {{ t('sign_in') }}
    </LuxuryButton>
    <p class="text-body2 md:text-body">
      沒有會員嗎？
      <NuxtLink
        to="/sign-up"
        class="text-primary underline underline-primary font-700"
      >
        前往註冊
      </NuxtLink>
    </p>
  </form>
</template>

<style scoped>

</style>
