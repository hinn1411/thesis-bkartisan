
type Currency = {
  currency: string;
  locale: string;
};

export const formatCurrency = (currentCost: number, option: Currency) => {
  return new Intl.NumberFormat(option.locale, {
    style: "currency",
    currency: option.currency,
  }).format(currentCost);
};
