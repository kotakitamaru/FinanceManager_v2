import { Get, Post, Put, Delete, Route, Tags, Body, Path, Query, Security, Request } from 'tsoa';
import { BaseController } from '@/controllers/BaseController';
import { TransactionService } from '@/services/TransactionService';
import { CreateTransactionRequest, UpdateTransactionRequest, TransactionResponse } from '@/types/TransactionTypes';
import { AuthenticatedRequest } from '@/middleware/authentication';

@Route('transactions')
@Tags('Transactions')
export class TransactionController extends BaseController {
  private transactionService: TransactionService;

  constructor() {
    super();
    this.transactionService = new TransactionService();
  }

  @Get('/')
  @Security('bearer')
  public async getTransactions(
    @Query() page?: number,
    @Query() limit?: number,
    @Query() categoryId?: number,
    @Query() accountId?: number,
    @Query() startDate?: string,
    @Query() endDate?: string,
    @Request() req?: AuthenticatedRequest
  ): Promise<{ transactions: TransactionResponse[]; total: number; page: number; limit: number }> {
    try {
      const userId = req?.user?.id;
      return await this.transactionService.getTransactions(page, limit, categoryId, accountId, startDate, endDate, userId);
    } catch (error) {
      return this.handleError(error);
    }
  }

  @Get('/{id}')
  @Security('bearer')
  public async getTransactionById(
    @Path() id: number,
    @Request() req?: AuthenticatedRequest
  ): Promise<TransactionResponse> {
    try {
      const userId = req?.user?.id;
      return await this.transactionService.getTransactionById(id, userId);
    } catch (error) {
      return this.handleError(error);
    }
  }

  @Post('/')
  @Security('bearer')
  public async createTransaction(
    @Body() transactionData: CreateTransactionRequest,
    @Request() req?: AuthenticatedRequest
  ): Promise<TransactionResponse> {
    try {
      const userId = req?.user?.id;
      if (!userId) {
        throw new Error('User not authenticated');
      }
      return await this.transactionService.createTransaction(transactionData, userId);
    } catch (error) {
      return this.handleError(error);
    }
  }

  @Put('/{id}')
  @Security('bearer')
  public async updateTransaction(
    @Path() id: number,
    @Body() transactionData: UpdateTransactionRequest,
    @Request() req?: AuthenticatedRequest
  ): Promise<TransactionResponse> {
    try {
      const userId = req?.user?.id;
      return await this.transactionService.updateTransaction(id, transactionData, userId);
    } catch (error) {
      return this.handleError(error);
    }
  }

  @Delete('/{id}')
  @Security('bearer')
  public async deleteTransaction(
    @Path() id: number,
    @Request() req?: AuthenticatedRequest
  ): Promise<{ message: string }> {
    try {
      const userId = req?.user?.id;
      await this.transactionService.deleteTransaction(id, userId);
      return { message: 'Transaction deleted successfully' };
    } catch (error) {
      return this.handleError(error);
    }
  }
}
