<script setup lang="ts">
import { createReusableTemplate } from '@vueuse/core';
import { useBoolean } from '../composables/common';
import IconLogo from '~icons/custom/logo';
import IcRoundClose from '~icons/ic/round-close';
import IcRoundMenu from '~icons/ic/round-menu';

const props = withDefaults(defineProps<AppNavProps>(), {
  inverted: false,
});

const { inverted } = toRefs(props);

const [DefineMenuTemplate, ReuseMenuTemplate] = createReusableTemplate<{ className?: string }>();

const { bool: mobileCollapse, setFalse, setTrue } = useBoolean(false);
</script>

<script lang="ts">
export interface AppNavProps {
  inverted?: boolean;
}
</script>

<template>
  <nav
    class="app-nav px-3 text-white"
    :class="inverted ? 'bg-body' : 'bg-transparent'"
  >
    <DefineMenuTemplate v-slot="{ className }">
      <ul
        :class="className"
      >
        <li class="w-full md:w-auto">
          <BaseButton
            ghost
            :theme-overrides="{ padding: '16px' }"
            class="w-full md:w-auto"
          >
            客房旅宿
          </BaseButton>
        </li>
        <li class="w-full md:w-auto">
          <BaseButton
            ghost
            :theme-overrides="{ padding: '16px' }"
            class="w-full md:w-auto"
          >
            會員登入
          </BaseButton>
        </li>
        <li class="w-full md:w-auto">
          <BaseButton
            type="primary"
            class="w-full md:w-auto"
          >
            立即訂房
          </BaseButton>
        </li>
      </ul>
    </DefineMenuTemplate>
    <!-- desktop rwd -->
    <div class="max-w-440 mx-auto flex items-center justify-between">
      <IconLogo
        class="aspect-[196/72] h-10 w-auto md:h-auto"
      />
      <button
        class="p-2 inline-block md:hidden"
        @click="setTrue"
      >
        <IcRoundMenu
          width="24"
          height="24"
        />
      </button>
      <ReuseMenuTemplate class-name="hidden md:(flex items-center gap-x-4)" />

      <!-- Mobile menu, show/hide based on menu state. -->
      <transition
        mode="out-in"
        enter-from-class="transform opacity-0"
        enter-to-class="transform opacity-100"
        enter-active-class="transition ease-out duration-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100"
        leave-to-class="transform opacity-0"
      >
        <div
          v-if="mobileCollapse"
          class="fixed top-0 left-0 bottom-0 right-0 bg-body z-50  md:hidden"
        >
          <div class="w-full h-full flex items-center justify-center relative">
            <button
              class="absolute top-3 right-3 p-2.5"
              @click="setFalse"
            >
              <IcRoundClose
                width="28"
                height="28"
              />
            </button>
            <ReuseMenuTemplate class-name="w-full px-5 space-y-4 md:hidden" />
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>

<style scoped>
:where(.app-nav) {
  padding-top: 1rem; /* 16px */
  padding-bottom: 1rem; /* 16px */
}
</style>
