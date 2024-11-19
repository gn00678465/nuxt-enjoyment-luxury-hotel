<script setup lang="ts">
import { useBoolean } from '../../composables/common';

definePageMeta({
  layout: 'profile-layout',
  contentClass: 'bg-body',
});

const { bool: isEdit, toggle: toggleEdit } = useBoolean(false);
const { bool: isResetPasswd, toggle: toggleResetPasswd } = useBoolean(false);
</script>

<template>
  <div class="container mx-auto">
    <div class="mx-3 flex flex-col gap-y-6 md:(gap-x-10 flex-row mx-auto)">
      <div class="p-6 rounded-3xl bg-neutral-0 text-neutral-100 flex flex-col gap-y-6 col md:(flex-grow self-start col-5)">
        <h6 class="text-h6">
          修改密碼
        </h6>
        <form
          action="post"
          class="flex flex-col gap-y-4"
        >
          <ProfileDetailItem
            label="電子信箱"
            value="Jessica@exsample.com"
          />
          <template v-if="!isResetPasswd">
            <ProfileDetailItem
              label="密碼"
              value="密碼密碼密碼密碼"
              type="password"
            >
              <template #action>
                <LuxuryButton
                  text
                  class="flex-shrink-0"
                  :theme-overrides="{ padding: '0px' }"
                  @click="toggleResetPasswd"
                >
                  重設
                </LuxuryButton>
              </template>
            </ProfileDetailItem>
          </template>
          <template v-else>
            <LuxuryInput
              placeholder="請輸入舊密碼"
              :show-feedback="false"
            >
              <template #label>
                <span class="text-neutral-100 text-subtitle">舊密碼</span>
              </template>
            </LuxuryInput>
            <LuxuryInput
              placeholder="請輸入新密碼"
              :show-feedback="false"
            >
              <template #label>
                <span class="text-neutral-100 text-subtitle">新密碼</span>
              </template>
            </LuxuryInput>
            <LuxuryInput
              placeholder="請再輸入一次新密碼"
              :show-feedback="false"
            >
              <template #label>
                <span class="text-neutral-100 text-subtitle">確認新密碼</span>
              </template>
            </LuxuryInput>
          </template>
        </form>
        <fieldset v-if="isResetPasswd">
          <LuxuryButton
            :disabled="true"
            block
          >
            儲存設定
          </LuxuryButton>
        </fieldset>
      </div>
      <div class="p-6 rounded-3xl bg-neutral-0 text-neutral-100 flex flex-col gap-y-6 col md:(flex-grow self-start)">
        <h6 class="text-h6">
          基本資料
        </h6>
        <form
          id="basic-info-form"
          action="post"
          class="flex flex-col gap-y-4"
          @submit.prevent
        >
          <template v-if="!isEdit">
            <ProfileDetailItem
              label="姓名"
              value="Jessica Ｗang"
            />
            <ProfileDetailItem
              label="手機號碼"
              value="+886 912 345 678"
            />
            <ProfileDetailItem
              label="生日"
              value="1990 年 8 月 15 日"
            />
            <ProfileDetailItem
              label="地址"
              value="高雄市新興區六角路 123 號"
            />
          </template>
          <template v-else>
            <LuxuryInput
              placeholder="請輸入姓名"
              :show-feedback="false"
            >
              <template #label>
                <span class="text-neutral-100 text-subtitle">姓名</span>
              </template>
            </LuxuryInput>
            <LuxuryInput
              placeholder="請輸入手機號碼"
              :show-feedback="false"
            >
              <template #label>
                <span class="text-neutral-100 text-subtitle">手機號碼</span>
              </template>
            </LuxuryInput>
            <div>
              <label
                class="block mb-2 text-body2 text-neutral-80"
                for=""
              >生日</label>
              <div class="mt-2">
                <LuxuryDropdown />
                <LuxuryDropdown />
                <LuxuryDropdown />
              </div>
            </div>
          </template>
        </form>
        <fieldset form="basic-info-form">
          <template v-if="!isEdit">
            <LuxuryButton
              type="secondary"
              form="basic-info-form"
              attr-type="button"
              @click="toggleEdit"
            >
              編輯
            </LuxuryButton>
          </template>
          <template v-else>
            <LuxuryButton
              :disabled="true"
              block
            >
              儲存設定
            </LuxuryButton>
          </template>
        </fieldset>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
