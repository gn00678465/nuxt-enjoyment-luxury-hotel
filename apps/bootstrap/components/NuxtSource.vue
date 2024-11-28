<script setup lang="ts">
import type { PropType } from 'vue';
import type { ImageModifiers } from '@nuxt/image'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  media: {
    type: String,
    default: undefined
  },
  sizes: {
    type: String,
    default: undefined
  },
  modifiers: {
    type: Object as PropType<Partial<ImageModifiers>>,
    default: () => ({})
  }
})
const { src, media, sizes, modifiers } = toRefs(props)
const img = useImage()

const _srcset = computed(() => {
  return img.getSizes(src.value, {
    sizes: sizes?.value || 'sm:375px md:768px lg:992px xl:1200px xxl: 1400px xxxl:1537px',
    modifiers: modifiers.value
  })
})
</script>

<script lang="ts">
export interface NuxtSourceProps {
  src: string
  media?: string
  sizes?: string
  modifiers?: Partial<ImageModifiers>
}
</script>

<template>
  <source :media="media" :srcset="_srcset.srcset" :sizes="_srcset.sizes" />
</template>

<style scoped>

</style>