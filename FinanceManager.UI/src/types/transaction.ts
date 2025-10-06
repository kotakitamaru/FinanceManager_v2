// Transaction-related types
import type { Category } from './category';

// Sorting constants for consistent sort options
export const SORT_FIELDS = {
  DATE: 'date',
  AMOUNT: 'amount'
} as const;

export const SORT_ORDERS = {
  ASC: 'ASC',
  DESC: 'DESC'
} as const;

export type SortField = typeof SORT_FIELDS[keyof typeof SORT_FIELDS];
export type SortOrder = typeof SORT_ORDERS[keyof typeof SORT_ORDERS];

export interface Transaction {
  id: string;
  accountId: string;
  categoryId: string;
  amount: number | string; // Can be number or string from API
  note: string; // Changed from description to note
  date: string;
  createDate: string; // Changed from createdAt
  updateDate: string; // Changed from updatedAt
  category?: Category; // Optional category object with icon and color
}

export interface CreateTransactionRequest {
  accountId: string;
  categoryId: string;
  amount: number;
  note: string; // Changed from description to note
  date: string;
}

export interface UpdateTransactionRequest {
  accountId?: string;
  categoryId?: string;
  amount?: number;
  note?: string;
  date?: string;
}

export interface TransactionFilters {
  accountId?: string;
  categoryId?: string;
  isIncome?: boolean;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
  sortBy?: SortField;
  sortOrder?: SortOrder;
}

export interface RecentTransactionsResponse {
  transactions: Transaction[];
  total: number;
  accountId: string;
}
