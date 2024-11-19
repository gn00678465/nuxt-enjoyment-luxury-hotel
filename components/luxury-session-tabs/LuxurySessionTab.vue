<script lang="ts">
import type { NuxtLinkProps } from 'nuxt/app';
import type { PropType } from 'vue';
import { Tab } from '@headlessui/vue';

export const luxurySessionTabProps = {
  to: {
    type: [String, Object] as PropType<NuxtLinkProps['to']>,
    default: undefined,
  },
};

export interface LuxurySessionTabProps {
  as?: string;
  name: string | number | undefined;
}

const LuxurySessionTab = defineComponent({
  name: 'LuxurySessionTab',
  components: {
    Tab,
  },
  props: luxurySessionTabProps,
  setup(props) {
    const { to } = toRefs(props);

    return {
      to,
    };
  },
});

export default LuxurySessionTab;
</script>

<template>
  <Tab
    as="template"
  >
    <NuxtLink
      class=":uno: relative text-title py-4 px-5.5 cursor-pointer transition-colors duration-150 outline-none after:(content-[''] absolute w-8 h-1 left-1/2 -translate-x-1/2 bg-transparent rounded-2.5 bottom-2 transition-colors duration-150) hover:(text-primary) after:hover:bg-primary"
      :active-class="':uno: text-primary after:bg-primary'"
      :to="to"
    >
      <slot />
    </NuxtLink>
  </Tab>
</template>

<style scoped>

</style>
