/**
 * Utility functions for transaction-related operations
 */

/**
 * Formats a transaction date with relative time display
 * @param dateString - The date string to format
 * @returns Formatted date string with relative time
 */
export const formatTransactionDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const timeString = date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });

  if (diffDays === 1) {
    return `Today ${timeString}`;
  } else if (diffDays === 2) {
    return `Yesterday ${timeString}`;
  } else if (diffDays <= 7) {
    return `${diffDays - 1} days ago ${timeString}`;
  } else {
    const dateString = date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
    return `${dateString} ${timeString}`;
  }
};

/**
 * Gets the appropriate color for transaction amounts based on income/expense
 * @param isIncome - Whether the transaction is an income
 * @returns CSS color variable string
 */
export const getTransactionAmountColor = (isIncome: boolean): string => {
  return isIncome ? 'var(--color-income)' : 'var(--color-expense)';
};

/**
 * Gets the category icon with fallback to default icons
 * @param category - The category object
 * @returns Icon string (emoji or category icon)
 */
export const getCategoryIcon = (category?: { icon?: string; isIncome?: boolean }): string => {
  const isIncome = category?.isIncome ?? false;
  return category?.icon || (isIncome ? '💰' : '💸');
};

/**
 * Gets the category color with fallback to default colors
 * @param category - The category object
 * @returns Color string (hex or category color)
 */
export const getCategoryColor = (category?: { color?: string; isIncome?: boolean }): string => {
  const isIncome = category?.isIncome ?? false;
  return category?.color || (isIncome ? '#10B981' : '#EF4444');
};
