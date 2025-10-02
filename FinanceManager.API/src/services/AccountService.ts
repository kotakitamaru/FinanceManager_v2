import { BaseService } from '@/services/BaseService';
import { AccountRepository } from '@/repositories/AccountRepository';
import { CreateAccountRequest, UpdateAccountRequest, AccountResponse } from '@/types/AccountTypes';

export class AccountService extends BaseService {
  private accountRepository: AccountRepository;

  constructor() {
    super();
    this.accountRepository = new AccountRepository();
  }

  async getAccounts(
    page: number = 1,
    limit: number = 10,
    userId?: number
  ): Promise<{
    accounts: AccountResponse[];
    total: number;
    page: number;
    limit: number;
  }> {
    const result = await this.accountRepository.findAll(page, limit, userId);
    return {
      ...result,
      page,
      limit,
    };
  }

  async getAccountById(id: number, userId?: number): Promise<AccountResponse> {
    const account = await this.accountRepository.findById(id, userId);
    if (!account) {
      throw new Error('Account not found');
    }
    return account;
  }

  async createAccount(accountData: CreateAccountRequest, userId: number): Promise<AccountResponse> {
    return await this.accountRepository.create(accountData, userId);
  }

  async updateAccount(id: number, accountData: UpdateAccountRequest, userId?: number): Promise<AccountResponse> {
    return await this.accountRepository.update(id, accountData, userId);
  }

  async deleteAccount(id: number, userId?: number): Promise<void> {
    await this.accountRepository.delete(id, userId);
  }
}
