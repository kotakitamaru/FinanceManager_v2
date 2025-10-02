// Transaction-related types
export interface Transaction {
  id: string;
  accountId: string;
  categoryId: string;
  amount: number;
  description: string;
  isIncome: boolean;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTransactionRequest {
  accountId: string;
  categoryId: string;
  amount: number;
  description: string;
  isIncome: boolean;
  date: string;
}

export interface UpdateTransactionRequest {
  accountId?: string;
  categoryId?: string;
  amount?: number;
  description?: string;
  isIncome?: boolean;
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
}
