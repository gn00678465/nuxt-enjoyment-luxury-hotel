<script lang="ts">
export const luxurySessionTabProps = {
  name: {
    type: [String, Number],
    required: true,
  },
  as: {
    type: String,
    default: 'div',
  },
};

export interface LuxurySessionTabProps {
  as?: string;
  name: string | number | undefined;
}

const LuxurySessionTab = defineComponent({
  name: 'LuxurySessionTab',
  props: luxurySessionTabProps,
  setup(props) {
    const { as, name } = toRefs(props);
    const attrs = useAttrs();

    const renderComponent = () => h(as.value, {
      class: attrs.class,
      style: attrs.style,
    }, name.value);

    return {
      renderComponent,
    };
  },
});

export default LuxurySessionTab;
</script>

<template>
  <component :is="renderComponent" />
</template>

<style scoped>

</style>
