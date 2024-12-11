<script setup lang="ts">
const props = defineProps({
  tag: {
    type: String,
    default: 'div'
  },
  text: {
    type: String,
    default: ''
  }
})

const { tag, text } = toRefs(props)
</script>

<template>
  <tag>

  </tag>
</template>

<style scoped>
.title-deco {
  display: flex;
  align-items: center;
}

.title-deco::before {
  --color: #BF9D7D;
  content: '';
  display: inline-block;
  width: 4px;
  height: 24px;
  background-color: var(--color);
  border-radius: 10px;
  margin-right: 0.75rem;
}

.title-deco:nth-child(2)::before {
  --color: #909090;
}
</style>