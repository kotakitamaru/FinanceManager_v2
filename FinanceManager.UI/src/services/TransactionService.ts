import { apiService } from '@services/api';
import type { Transaction, CreateTransactionRequest, UpdateTransactionRequest, TransactionFilters } from '@/types/transaction';
import type { PaginatedResponse } from '@/types/api';

class TransactionService {
  /**
   * Fetch recent transactions for a specific account
   */
  async getRecentTransactions(accountId: number, limit: number = 5): Promise<Transaction[]> {
    const url = `/transactions?accountId=${accountId}&limit=${limit}`;
    const response = await apiService.get<any>(url);
    
    // Handle different possible response structures
    let transactions: Transaction[] = [];
    
    if (Array.isArray(response.data)) {
      // Direct array response
      transactions = response.data;
    } else if (response.data && Array.isArray(response.data.data)) {
      // Paginated response structure
      transactions = response.data.data;
    } else if (response.data && Array.isArray(response.data.transactions)) {
      // Alternative structure with transactions property
      transactions = response.data.transactions;
    }
    
    // Sort by transaction date (most recent first)
    transactions.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA; // Descending order (newest first)
    });
    
    return transactions;
  }

  /**
   * Fetch all transactions with optional filters
   */
  async getTransactions(filters: TransactionFilters = {}): Promise<PaginatedResponse<Transaction>> {
    const queryParams = new URLSearchParams();
    
    if (filters.accountId) queryParams.append('accountId', filters.accountId);
    if (filters.categoryId) queryParams.append('categoryId', filters.categoryId);
    if (filters.isIncome !== undefined) queryParams.append('isIncome', filters.isIncome.toString());
    if (filters.startDate) queryParams.append('startDate', filters.startDate);
    if (filters.endDate) queryParams.append('endDate', filters.endDate);
    if (filters.page) queryParams.append('page', filters.page.toString());
    if (filters.limit) queryParams.append('limit', filters.limit.toString());

    const url = `/transactions?${queryParams.toString()}`;
    const response = await apiService.get<PaginatedResponse<Transaction>>(url);
    return response.data;
  }

  /**
   * Fetch a specific transaction by ID
   */
  async getTransactionById(id: number): Promise<Transaction> {
    const response = await apiService.get<Transaction>(`/transactions/${id}`);
    return response.data;
  }

  /**
   * Create a new transaction
   */
  async createTransaction(transactionData: CreateTransactionRequest): Promise<Transaction> {
    const response = await apiService.post<Transaction>('/transactions', transactionData);
    return response.data;
  }

  /**
   * Update an existing transaction
   */
  async updateTransaction(id: number, transactionData: UpdateTransactionRequest): Promise<Transaction> {
    const response = await apiService.put<Transaction>(`/transactions/${id}`, transactionData);
    return response.data;
  }

  /**
   * Delete a transaction
   */
  async deleteTransaction(id: number): Promise<void> {
    await apiService.delete(`/transactions/${id}`);
  }
}

export const transactionService = new TransactionService();
export default transactionService;
