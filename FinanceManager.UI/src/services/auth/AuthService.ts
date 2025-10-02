import { apiService } from '../api';
import type { LoginRequest, AuthResponse, CreateUserRequest } from '../../types/user';

class AuthService {
  /**
   * Authenticate user with email and password
   */
  async login(email: string, password: string): Promise<AuthResponse> {
    const loginData: LoginRequest = { email, password };
    const response = await apiService.post<AuthResponse>('/auth/login', loginData);
    return response.data;
  }

  /**
   * Register a new user account
   */
  async register(userData: CreateUserRequest): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>('/auth/register', userData);
    return response.data;
  }
}

export const authService = new AuthService();
export default authService;
