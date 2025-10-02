import { BaseService } from '@/services/BaseService';
import { TransactionRepository } from '@/repositories/TransactionRepository';
import { CreateTransactionRequest, UpdateTransactionRequest, TransactionResponse } from '@/types/TransactionTypes';

export class TransactionService extends BaseService {
  private transactionRepository: TransactionRepository;

  constructor() {
    super();
    this.transactionRepository = new TransactionRepository();
  }

  async getTransactions(
    page: number = 1,
    limit: number = 10,
    categoryId?: number,
    accountId?: number,
    startDate?: string,
    endDate?: string,
    userId?: number
  ): Promise<{
    transactions: TransactionResponse[];
    total: number;
    page: number;
    limit: number;
  }> {
    const result = await this.transactionRepository.findAll(page, limit, categoryId, accountId, startDate, endDate, userId);
    return {
      ...result,
      page,
      limit,
    };
  }

  async getTransactionById(id: number, userId?: number): Promise<TransactionResponse> {
    const transaction = await this.transactionRepository.findById(id, userId);
    if (!transaction) {
      throw new Error('Transaction not found');
    }
    return transaction;
  }

  async createTransaction(transactionData: CreateTransactionRequest, userId: number): Promise<TransactionResponse> {
    return await this.transactionRepository.create(transactionData, userId);
  }

  async updateTransaction(id: number, transactionData: UpdateTransactionRequest, userId?: number): Promise<TransactionResponse> {
    return await this.transactionRepository.update(id, transactionData, userId);
  }

  async deleteTransaction(id: number, userId?: number): Promise<void> {
    await this.transactionRepository.delete(id, userId);
  }
}
