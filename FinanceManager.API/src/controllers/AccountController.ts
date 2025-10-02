import { Get, Post, Put, Delete, Route, Tags, Body, Path, Query, Security, Request } from 'tsoa';
import { BaseController } from '@/controllers/BaseController';
import { AccountService } from '@/services/AccountService';
import { CreateAccountRequest, UpdateAccountRequest, AccountResponse } from '@/types/AccountTypes';
import { AuthenticatedRequest } from '@/middleware/authentication';

@Route('accounts')
@Tags('Accounts')
export class AccountController extends BaseController {
  private accountService: AccountService;

  constructor() {
    super();
    this.accountService = new AccountService();
  }

  @Get('/')
  @Security('bearer')
  public async getAccounts(
    @Query() page?: number,
    @Query() limit?: number,
    @Request() req?: AuthenticatedRequest
  ): Promise<{ accounts: AccountResponse[]; total: number; page: number; limit: number }> {
    try {
      const userId = req?.user?.id;
      return await this.accountService.getAccounts(page, limit, userId);
    } catch (error) {
      return this.handleError(error);
    }
  }

  @Get('/{id}')
  @Security('bearer')
  public async getAccountById(
    @Path() id: number,
    @Request() req?: AuthenticatedRequest
  ): Promise<AccountResponse> {
    try {
      const userId = req?.user?.id;
      return await this.accountService.getAccountById(id, userId);
    } catch (error) {
      return this.handleError(error);
    }
  }

  @Post('/')
  @Security('bearer')
  public async createAccount(
    @Body() accountData: CreateAccountRequest,
    @Request() req?: AuthenticatedRequest
  ): Promise<AccountResponse> {
    try {
      const userId = req?.user?.id;
      if (!userId) {
        throw new Error('User not authenticated');
      }
      return await this.accountService.createAccount(accountData, userId);
    } catch (error) {
      return this.handleError(error);
    }
  }

  @Put('/{id}')
  @Security('bearer')
  public async updateAccount(
    @Path() id: number,
    @Body() accountData: UpdateAccountRequest,
    @Request() req?: AuthenticatedRequest
  ): Promise<AccountResponse> {
    try {
      const userId = req?.user?.id;
      return await this.accountService.updateAccount(id, accountData, userId);
    } catch (error) {
      return this.handleError(error);
    }
  }

  @Delete('/{id}')
  @Security('bearer')
  public async deleteAccount(
    @Path() id: number,
    @Request() req?: AuthenticatedRequest
  ): Promise<{ message: string }> {
    try {
      const userId = req?.user?.id;
      await this.accountService.deleteAccount(id, userId);
      return { message: 'Account deleted successfully' };
    } catch (error) {
      return this.handleError(error);
    }
  }
}
