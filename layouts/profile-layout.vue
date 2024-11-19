<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <div class="w-full h-inherit flex flex-col relative">
    <header
      class="flex-shrink-0 relative"
      :class="route.meta.headerClass"
    >
      <AppNav
        :inverted="true"
        :class="route.meta.navClass"
      />
      <div class="relative">
        <NuxtImg
          src="/profile-layout-banner.avif"
          class="w-full aspect-[375/206] md:aspect-[5/1] object-cover"
        />
        <div class=":uno: bg-neutral-100/40 absolute top-0 left-0 w-full h-full" />
      </div>
    </header>
    <main
      class="flex-grow"
      :class="route.meta.contentClass"
    >
      <div class="mx-auto mt-10 container text-white px-3 md:(px-0 mt-20)">
        <LuxurySessionTabsList
          class="mb-10"
        >
          <LuxurySessionTab
            :to="{ path: '/profile/detail' }"
          >
            個人資料
          </LuxurySessionTab>
          <LuxurySessionTab
            :to="{ path: '/profile/order' }"
          >
            我的訂單
          </LuxurySessionTab>
        </LuxurySessionTabsList>
      </div>
      <slot />
    </main>
    <AppFooter class="flex-shrink-0" />
  </div>
</template>

<style scoped>

</style>
