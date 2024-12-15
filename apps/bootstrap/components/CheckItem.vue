<script setup lang="ts">
import MaterialSymbolsCheckRounded from '~icons/material-symbols/check-rounded'

defineOptions({
  name: 'CheckItem',
  inheritAttrs: false
})

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  textClass: {
    type: String,
    default: undefined
  },
  isProvide: {
    type: Boolean,
    default: false
  }
})
const { text, textClass, isProvide } = toRefs(props)
</script>

<template>
  <MaterialSymbolsCheckRounded class="fs-5" :class="{
    'text-primary-100': isProvide,
    'text-neutral-60': !isProvide,
  }" />
  <p :class="textClass">
    {{ text }}
  </p>
</template>

<style scoped>

</style>