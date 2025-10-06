// Utility functions for transaction sorting
import { SORT_FIELDS, SORT_ORDERS, type SortField, type SortOrder } from '@/types/transaction';

/**
 * Get human-readable label for sort field
 */
export const getSortFieldLabel = (field: SortField): string => {
  const labels: Record<SortField, string> = {
    [SORT_FIELDS.DATE]: 'Date',
    [SORT_FIELDS.AMOUNT]: 'Amount'
  };
  
  return labels[field] || field;
};

/**
 * Get human-readable label for sort order
 */
export const getSortOrderLabel = (order: SortOrder): string => {
  const labels: Record<SortOrder, string> = {
    [SORT_ORDERS.ASC]: 'Ascending',
    [SORT_ORDERS.DESC]: 'Descending'
  };
  
  return labels[order] || order;
};

/**
 * Get all available sort fields with labels
 */
export const getSortFieldOptions = (): Array<{ value: SortField; label: string }> => {
  return Object.values(SORT_FIELDS).map(field => ({
    value: field,
    label: getSortFieldLabel(field)
  }));
};

/**
 * Get all available sort orders with labels
 */
export const getSortOrderOptions = (): Array<{ value: SortOrder; label: string }> => {
  return Object.values(SORT_ORDERS).map(order => ({
    value: order,
    label: getSortOrderLabel(order)
  }));
};

/**
 * Validate if a string is a valid sort field
 */
export const isValidSortField = (field: string): field is SortField => {
  return Object.values(SORT_FIELDS).includes(field as SortField);
};

/**
 * Validate if a string is a valid sort order
 */
export const isValidSortOrder = (order: string): order is SortOrder => {
  return Object.values(SORT_ORDERS).includes(order as SortOrder);
};

/**
 * Get default sorting configuration
 */
export const getDefaultSorting = (): { sortBy: SortField; sortOrder: SortOrder } => {
  return {
    sortBy: SORT_FIELDS.DATE,
    sortOrder: SORT_ORDERS.DESC
  };
};
