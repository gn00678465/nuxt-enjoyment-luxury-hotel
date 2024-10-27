<script setup lang="ts">
import IconLogo from '~icons/custom/logo';
import MdiAdd from '~icons/mdi/add';
</script>

<template>
  <div class="p-10 bg-neutral-10 h-full">
    <dl>
      <dt>Checkbox: BaseCheckBox</dt>
      <dd><BaseCheckbox /></dd>

      <dt>Button: BaseButton</dt>
      <dd class="flex items-center gap-x-3">
        <BaseButton>
          Primary Button
          <template #icon>
            <MdiAdd />
          </template>
        </BaseButton>
        <BaseButton
          type="secondary"
          :render-icon="() => h(MdiAdd)"
        >
          Secondary Button
        </BaseButton>
        <BaseButton ghost>
          Ghost Button
        </BaseButton>
        <BaseButton text>
          Text Button
        </BaseButton>
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
          class="w-72"
          label="Text"
          required
          placeholder="placeholder"
        />
        <BaseInput
          class="w-72"
          label="Err"
          status="error"
        />
      </dd>
    </dl>
  </div>
</template>

<style scoped>

</style>
