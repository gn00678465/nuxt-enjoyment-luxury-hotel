<script setup lang="ts">
import MdiArrowRight from '~icons/mdi/arrow-right';
import IcBaselineBed from '~icons/ic/baseline-bed';
import IcRoundPerson from '~icons/ic/round-person';
import FluentSlideSize24Filled from '~icons/fluent/slide-size-24-filled';

const props = withDefaults(defineProps<RoomCardProps>(), {
  title: '',
  describe: '',
  price: 0,
});

const { title, describe, price } = toRefs(props);
const currency = useCurrency(price, 'zh-TW', {
  style: 'decimal',
  currency: 'TWD',
  minimumFractionDigits: 0,
});
</script>

<script  lang="ts">
export type RoomCardProps = {
  title: string;
  describe: string;
  price: number;
};
</script>

<template>
  <div class="rounded-10 bg-white flex flex-col md:flex-row">
    <div class="h-50 md:h-auto md:(aspect-[1296/773] max-w-[773px] w-full)" />
    <div class="p-4 space-y-6 md:(p-10 space-y-10)">
      <div>
        <h4 class="text-h4 md:text-h2">
          {{ title }}
        </h4>
        <p class="mt-2 text-body2 text-neutral-80 md:text-body">
          {{ describe }}
        </p>
      </div>
      <ul class="flex gap-x-4 text-primary">
        <li class="flex-1 border rounded-2 p-4 border-primary-40 space-y-2 aspect-square max-w-[97px]">
          <FluentSlideSize24Filled
            :width="24"
            :height="24"
          />
          <p class="text-subtitle text-neutral-80 md:text-title">
            24坪
          </p>
        </li>
        <li class="flex-1 border rounded-2 p-4 border-primary-40 space-y-2 aspect-square max-w-[97px]">
          <IcBaselineBed
            :width="24"
            :height="24"
          />
          <p class="text-subtitle text-neutral-80 md:text-title">
            1 張大床
          </p>
        </li>
        <li class="flex-1 border rounded-2 p-4 border-primary-40 space-y-2 aspect-square max-w-[97px]">
          <IcRoundPerson
            :width="24"
            :height="24"
          />
          <p class="text-subtitle text-neutral-80 md:text-title">
            2-4 人
          </p>
        </li>
      </ul>
      <div class="h-0.5 w-full linear-gradient-to-r" />
      <div class="flex items-center justify-between text-title text-primary py-4">
        <p class="inline-block md:hidden">
          {{ `NT$ ${currency}` }}
        </p>
        <h5 class="hidden md:inline-block text-h5">
          {{ `NT$ ${currency}` }}
        </h5>
        <MdiArrowRight
          class="cursor-pointer"
          :width="24"
          :height="24"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
