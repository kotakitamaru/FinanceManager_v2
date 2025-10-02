import { Get, Post, Put, Delete, Route, Tags, Body, Path, Query, Security } from 'tsoa';
import { BaseController } from '@/controllers/BaseController';
import { UserService } from '@/services/UserService';
import { CreateUserRequest, UpdateUserRequest, UserResponse } from '@/types/UserTypes';

@Route('users')
@Tags('Users')
export class UserController extends BaseController {
  private userService: UserService;

  constructor() {
    super();
    this.userService = new UserService();
  }

  @Get('/')
  @Security('bearer')
  public async getUsers(
    @Query() page?: number,
    @Query() limit?: number,
    @Query() search?: string
  ): Promise<{ users: UserResponse[]; total: number; page: number; limit: number }> {
    try {
      return await this.userService.getUsers(page || 1, limit || 10, search);
    } catch (error) {
      return this.handleError(error);
    }
  }

  @Get('/{id}')
  @Security('bearer')
  public async getUserById(@Path() id: number): Promise<UserResponse> {
    try {
      return await this.userService.getUserById(id);
    } catch (error) {
      return this.handleError(error);
    }
  }

  @Post('/')
  @Security('bearer')
  public async createUser(@Body() userData: CreateUserRequest): Promise<UserResponse> {
    try {
      return await this.userService.createUser(userData);
    } catch (error) {
      return this.handleError(error);
    }
  }

  @Put('/{id}')
  @Security('bearer')
  public async updateUser(
    @Path() id: number,
    @Body() userData: UpdateUserRequest
  ): Promise<UserResponse> {
    try {
      return await this.userService.updateUser(id, userData);
    } catch (error) {
      return this.handleError(error);
    }
  }

  @Delete('/{id}')
  @Security('bearer')
  public async deleteUser(@Path() id: number): Promise<{ message: string }> {
    try {
      await this.userService.deleteUser(id);
      return { message: 'User deleted successfully' };
    } catch (error) {
      return this.handleError(error);
    }
  }
}
