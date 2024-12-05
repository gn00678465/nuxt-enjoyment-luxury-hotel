<script setup lang="ts">
import MaterialSymbolsCheckRounded from '~icons/material-symbols/check-rounded'

const slots = defineSlots()
const attrs = useAttrs
const props = defineProps({
  tag: {
    type: String,
    default: 'div'
  }
})
const { tag } = toRefs(props)

const Tag = () => h(tag.value, { ...attrs }, {
  default: () => 'default slot',
})
</script>

<template>
  <component :is="Tag">
    <slot></slot>
  </component>
</template>

<style scoped>

</style>