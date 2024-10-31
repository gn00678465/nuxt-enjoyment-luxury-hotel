import { ref } from 'vue';

export const useBoolean = (initialValue = false) => {
  const bool = ref(initialValue);

  const setBool = (value: boolean) => {
    bool.value = value;
  };

  const toggle = () => {
    bool.value = !bool.value;
  };

  const setTrue = () => {
    bool.value = true;
  };

  const setFalse = () => {
    bool.value = false;
  };

  return {
    bool,
    setBool,
    toggle,
    setTrue,
    setFalse,
  };
};
