/**
 * Formats a number as currency using the specified locale and currency
 * @param amount - The amount to format
 * @param currency - The currency code (default: 'USD')
 * @param locale - The locale string (default: 'en-US')
 * @returns Formatted currency string
 */
export const formatCurrency = (
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

/**
 * Formats a number as currency with compact notation for large amounts
 * @param amount - The amount to format
 * @param currency - The currency code (default: 'USD')
 * @param locale - The locale string (default: 'en-US')
 * @returns Formatted currency string with compact notation
 */
export const formatCurrencyCompact = (
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    notation: 'compact',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(amount);
};

/**
 * Formats a number as a simple decimal with specified decimal places
 * @param amount - The amount to format
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted number string
 */
export const formatNumber = (amount: number, decimals: number = 2): string => {
  return amount.toFixed(decimals);
};