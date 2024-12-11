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
  }
})
const { text, textClass } = toRefs(props)
</script>

<template>
  <MaterialSymbolsCheckRounded class="fs-5 text-primary-100" />
  <p :class="textClass">
    {{ text }}
  </p>
</template>

<style scoped>

</style>