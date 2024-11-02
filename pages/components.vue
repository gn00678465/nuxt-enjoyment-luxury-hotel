<script setup lang="ts">
import type { LuxuryDropdownOption } from '../components/LuxuryDropdown.vue';
import IconLogo from '~icons/custom/logo';
import MdiAdd from '~icons/mdi/add';

const dropdownOptions: LuxuryDropdownOption[] = [
  { id: 1, label: '111111', value: 1 },
  { id: 1, label: '222222', value: 2 },
];

const inputValue = ref('');

const dropdownValue = ref<number | string | undefined>(undefined);

const tabValue = ref('item3');
</script>

<template>
  <div class="p-10 bg-neutral-10 h-full">
    <dl>
      <dt>Checkbox: BaseCheckBox</dt>
      <dd><BaseCheckbox /></dd>

      <dt>Button: BaseButton</dt>
      <dd class="flex items-center gap-x-3">
        <LuxuryButton>
          Primary Button
          <template #icon>
            <MdiAdd />
          </template>
        </LuxuryButton>
        <!-- <BaseButton
          type="secondary"
          :render-icon="() => h(MdiAdd)"
        >
          Secondary Button
        </BaseButton> -->
        <LuxuryButton ghost>
          Ghost Button
        </LuxuryButton>
        <LuxuryButton text>
          Text Button
        </LuxuryButton>
      </dd>

      <dt>Logo SVG</dt>
      <dd>
        <IconLogo
          class="aspect-[196/72] text-primary"
        />
      </dd>

      <dt>Stepper: BaseSteps</dt>
      <dd>
        <div class="w-[375px] bg-black p-4">
          <BaseSteps
            :active-step="1"
            :steps="[{ title: 'Title' }, { title: 'Title' }, { title: 'Title' }]"
          />
        </div>
      </dd>

      <dt>Input: BaseInput</dt>
      <dd class="flex items-center gap-x-3">
        <BaseInput
          v-model:value="inputValue"
          class="w-72"
          label="Text"
          required
          placeholder="placeholder"
        />
        <BaseInput
          v-model:value="inputValue"
          class="w-72"
          label="Err"
          status="error"
        />
      </dd>

      <dt>Dropdown</dt>
      <dd class="flex items-center gap-x-4">
        <LuxuryDropdown
          :value="dropdownValue"
          :options="dropdownOptions"
          @update:value="(v) => {
            dropdownValue = v
          }"
        />
        <LuxuryDropdown
          :value="dropdownValue"
          :options="dropdownOptions"
          closeable
          @update:value="(v) => {
            dropdownValue = v
          }"
        />
      </dd>

      <dt>Hero button</dt>
      <dd>
        <LuxuryHeroButton>立即訂房</LuxuryHeroButton>
      </dd>

      <dt>Session tabs</dt>
      <dd>
        <LuxurySessionTabs v-model:value="tabValue">
          <LuxurySessionTab name="item1" />
          <LuxurySessionTab name="item2" />
          <LuxurySessionTab name="item3" />
        </LuxurySessionTabs>
      </dd>
    </dl>
  </div>
</template>

<style scoped>

</style>
