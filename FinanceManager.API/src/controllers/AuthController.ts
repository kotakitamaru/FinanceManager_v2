import { Post, Route, Tags, Body } from 'tsoa';
import { BaseController } from '@/controllers/BaseController';
import { AuthService } from '@/services/AuthService';
import { CreateUserRequest, UserLoginRequest, UserLoginResponse } from '@/types/UserTypes';
import { ApiResponse } from '@/types/CommonTypes';

@Route('auth')
@Tags('Authentication')
export class AuthController extends BaseController {
  private authService: AuthService;

  constructor() {
    super();
    this.authService = new AuthService();
  }

  @Post('/register')
  public async register(@Body() userData: CreateUserRequest): Promise<ApiResponse<UserLoginResponse>> {
    try {
      const result = await this.authService.register(userData);
      return {
        success: true,
        data: result,
        message: 'User registered successfully'
      };
    } catch (error) {
      return this.handleApiError(error);
    }
  }

  @Post('/login')
  public async login(@Body() loginData: UserLoginRequest): Promise<ApiResponse<UserLoginResponse>> {
    try {
      const result = await this.authService.login(loginData);
      return {
        success: true,
        data: result,
        message: 'Login successful'
      };
    } catch (error) {
      return this.handleApiError(error);
    }
  }
}
