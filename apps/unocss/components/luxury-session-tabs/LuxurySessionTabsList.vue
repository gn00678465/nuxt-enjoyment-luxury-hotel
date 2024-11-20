<script lang="ts">
import { TabGroup, TabList } from '@headlessui/vue';
import type { PropType } from 'vue';

const luxurySessionTabsProps = {
  value: {
    type: [String, Number] as PropType<string | number>,
    default: undefined,
  },
};

const SessionTabs = defineComponent({
  name: 'LuxurySessionTabs',
  components: {
    TabGroup,
    TabList,
  },
  props: luxurySessionTabsProps,
  emits: {
    'update:value': (value: string | number | undefined) => !!value,
  },
  setup(props, ctx) {
    function onUpdateValue(value: string | number) {
      ctx.emit('update:value', value);
    }

    return {
      onUpdateValue,
    };
  },
});

export default SessionTabs;
</script>

<template>
  <TabGroup class="outline-none">
    <TabList class="flex items-center">
      <slot />
    </TabList>
  </TabGroup>
</template>

<style scoped>

</style>
