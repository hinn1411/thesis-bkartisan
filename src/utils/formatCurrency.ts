export const formatCurrency = (currentCost: number, option: Object) => {
  return new Intl.NumberFormat(option.locale, {
    style: 'currency',
    currency: option.currency,
  }).format(currentCost);
};
