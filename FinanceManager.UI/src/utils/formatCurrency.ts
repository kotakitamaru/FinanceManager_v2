// Utility functions for currency formatting
export const formatCurrency = (
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const formatNumber = (
  amount: number,
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale).format(amount);
};

export const parseCurrency = (value: string): number => {
  // Remove currency symbols and parse as float
  const cleaned = value.replace(/[^\d.-]/g, '');
  return parseFloat(cleaned) || 0;
};
