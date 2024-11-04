<script setup lang="ts">
import BiInstagram from '~icons/bi/instagram';
import BiLine from '~icons/bi/line';
import IconLogo from '~icons/custom/logo';

const basicInfos = [
  [
    {
      label: 'TEL',
      value: '+886-7-1234567',
    },
    {
      label: 'FAX',
      value: '+886-7-1234567',
    },
  ],
  [
    {
      label: 'MAIL',
      value: 'elh@hexschool.com',
    },
    {
      label: 'WEB',
      value: 'www.hexschool.com.tw',
    },
  ],
];
</script>

<template>
  <footer class="bg-body px-3 text-neutral-0 py-20 md:(py-25 px-0)">
    <div class="container mx-auto relative flex flex-col md:(flex-row flex-wrap)">
      <div class="space-y-10 md:flex-grow">
        <IconLogo />
        <div class="flex gap-x-4 items-center">
          <button class="p-2 relative after:(content-[''] absolute top-0 left-0 bottom-0 right-0 border border-white rounded-full)">
            <BiLine
              width="24"
              height="24"
            />
          </button>
          <button class="p-2 relative after:(content-[''] absolute top-0 left-0 bottom-0 right-0 border border-white rounded-full)">
            <BiInstagram
              width="24"
              height="24"
            />
          </button>
        </div>
      </div>
      <ul class="mt-10 space-y-4 inline-block md:(mt-0 flex items-start space-y-0 gap-x-20)">
        <li
          v-for="(infoArr, idx) of basicInfos"
          :key="idx"
          class="space-y-4 md:(flex flex-col justify-between space-y-0 h-full)"
        >
          <div
            v-for="info of infoArr"
            :key="info.label"
            class="space-y-2"
          >
            <p class="text-title">
              {{ info.label }}
            </p>
            <p class="text-body2 md:text-body">
              {{ info.value }}
            </p>
          </div>
        </li>
      </ul>
      <ul class="mt-20 text-body2 space-y-4 md:(text-body space-y-0 flex items-center justify-between w-full)">
        <li>{{ $t('footer.address') }}</li>
        <li>{{ $t('footer.copyright') }}</li>
      </ul>
    </div>
  </footer>
</template>

<style scoped>

</style>
