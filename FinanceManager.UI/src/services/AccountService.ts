import { apiService } from '@services/api';
import type { Account, CreateAccountRequest, UpdateAccountRequest, AccountListResponse } from '@/types/account';

class AccountService {
  /**
   * Fetch all accounts for the authenticated user
   */
  async getAccounts(page: number = 1, limit: number = 10): Promise<AccountListResponse> {
    const response = await apiService.get<AccountListResponse>(`/accounts?page=${page}&limit=${limit}`);
    return response.data;
  }

  /**
   * Fetch a specific account by ID
   */
  async getAccountById(id: number): Promise<Account> {
    const response = await apiService.get<Account>(`/accounts/${id}`);
    return response.data;
  }

  /**
   * Create a new account
   */
  async createAccount(accountData: CreateAccountRequest): Promise<Account> {
    const response = await apiService.post<Account>('/accounts', accountData);
    return response.data;
  }

  /**
   * Update an existing account
   */
  async updateAccount(id: number, accountData: UpdateAccountRequest): Promise<Account> {
    const response = await apiService.put<Account>(`/accounts/${id}`, accountData);
    return response.data;
  }

  /**
   * Delete an account
   */
  async deleteAccount(id: number): Promise<void> {
    await apiService.delete(`/accounts/${id}`);
  }
}

export const accountService = new AccountService();
export default accountService;
