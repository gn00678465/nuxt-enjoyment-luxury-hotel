<script lang="ts">
import type { PropType } from 'vue';
import SessionTab, { type LuxurySessionTabProps } from './LuxurySessionTab.vue';

const luxurySessionTabsProps = {
  value: {
    type: [String, Number] as PropType<string | number>,
    default: undefined,
  },
};

const SessionTabs = defineComponent({
  name: 'LuxurySessionTabs',
  props: luxurySessionTabsProps,
  emits: {
    'update:value': (value: string | number | undefined) => !!value,
  },
  setup(props, ctx) {
    const panels = computed(() => (ctx.slots.default?.() ?? []).filter(panel => panel.type === SessionTab));

    const { value } = toRefs(props);

    const tabNames = computed(() => panels.value.map(panel => panel.props?.name as NonNullable<LuxurySessionTabProps['name']>));

    function initialValue() {
      if (value.value) {
        return tabNames.value.find(name => name === value.value) ?? tabNames.value[0];
      }
      return tabNames.value[0];
    }

    const activeName = ref(initialValue());

    function onUpdateValue(value: string | number) {
      activeName.value = value;
      ctx.emit('update:value', value);
    }

    return {
      panels,
      tabNames,
      activeName,
      onUpdateValue,
    };
  },
});

export default SessionTabs;
</script>

<template>
  <ul class="flex items-center">
    <li
      v-for="(panel, idx) of panels"
      :key="idx"
      :data-name="tabNames[idx]"
      class=":uno: relative text-title py-4 px-5.5 cursor-pointer transition-colors duration-150 after:(content-[''] absolute w-8 h-1 left-1/2 -translate-x-1/2 bg-transparent rounded-2.5 bottom-2 transition-colors duration-150) hover:(text-primary) after:hover:bg-primary"
      :class="{
        ':uno: text-primary after:bg-primary': activeName === tabNames[idx],
      }"
      @click="onUpdateValue(tabNames[idx])"
    >
      <component
        :is="panel"
      />
    </li>
  </ul>
</template>

<style scoped>

</style>
