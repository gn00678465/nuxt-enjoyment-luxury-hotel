<script setup lang="ts">
definePageMeta({
  layout: 'auth-layout',
});

const { t } = useI18n();
</script>

<template>
  <div class="flex-1 text-white flex flex-col p-5 md:p-0 max-w-104 bg-body">
    <div class="space-y-2 mb-4">
      <p class="text-primary text-subtitle md:text-title">
        {{ t('welcome_message') }}
      </p>
      <p class="text-h3 text-white md:text-h1">
        立即註冊
      </p>
    </div>
    <BaseSteps
      :step="1"
      :steps="[{ title: '輸入信箱及密碼' }, { title: '填寫基本資料' }]"
      class="py-4 mb-10"
    />
    <Transition>
      <form
        v-if="false"
        @submit.prevent
      >
        <div class="grid grid-cols-1 gap-y-4 mb-10">
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
          <LuxuryInput
            label="確認密碼"
            :show-feedback="false"
            placeholder="請再輸入一次密碼"
          />
        </div>

        <LuxuryButton
          block
          :disabled="true"
        >
          下一步
        </LuxuryButton>
      </form>
      <form
        v-else
        class="grid grid-cols-1 gap-4"
        @submit.prevent
      >
        <LuxuryInput
          label="姓名"
          :show-feedback="false"
          placeholder="請輸入姓名"
        />
        <LuxuryInput
          label="手機號碼"
          :show-feedback="false"
          placeholder="請輸入手機號碼"
        />

        <div class="flex items-center gap-2 flex-wrap">
          <label class="w-full text-subtitle md:text-title">生日</label>
          <LuxuryDropdown class="flex-1" />
          <LuxuryDropdown class="flex-1" />
          <LuxuryDropdown class="flex-1" />
        </div>

        <div class="grid grid-cols-2 gap-x-2 gap-y-4">
          <label class="col-span-2 text-subtitle md:text-title">地址</label>
          <LuxuryDropdown />
          <LuxuryDropdown />
          <LuxuryInput
            class="col-span-2"
            :show-label="false"
            :show-feedback="false"
            placeholder="請輸入詳細地址"
          />
        </div>

        <BaseCheckbox class="mb-10">
          我已閱讀並同意本網站個資使用規範
        </BaseCheckbox>

        <LuxuryButton
          block
          :disabled="true"
        >
          完成註冊
        </LuxuryButton>
      </form>
    </Transition>
    <p class="text-subtitle md:text-title mt-4">
      已經有會員了嗎？
      <NuxtLink
        class="text-primary font-700 underline underline-primary ml-2"
        to="/sign-in"
      >
        立即登入
      </NuxtLink>
    </p>
  </div>
</template>

<style scoped>

</style>
