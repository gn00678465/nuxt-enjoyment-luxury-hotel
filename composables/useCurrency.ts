export const useCurrency = (price: MaybeRef<number>, locales?: MaybeRef<Intl.LocalesArgument>, options?: Intl.NumberFormatOptions) => {
  const intl = new Intl.NumberFormat(toValue(locales), options);

  return computed(() => intl.format(toValue(price)));
};
