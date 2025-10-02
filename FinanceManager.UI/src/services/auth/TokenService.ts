import type { User } from '../../types/user';

class TokenService {
  private readonly TOKEN_KEY = 'authToken';

  /**
   * Get the stored auth token
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Store the auth token
   */
  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  /**
   * Remove the stored auth token
   */
  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  /**
   * Check if a token exists
   */
  hasToken(): boolean {
    return this.getToken() !== null;
  }

  /**
   * Parse JWT token payload
   */
  private parseTokenPayload(token: string): any {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch (error) {
      throw new Error('Invalid token format');
    }
  }

  /**
   * Check if token is expired
   */
  isTokenExpired(token: string): boolean {
    try {
      const payload = this.parseTokenPayload(token);
      const currentTime = Date.now() / 1000;
      return payload.exp && payload.exp <= currentTime;
    } catch (error) {
      return true; // Consider malformed tokens as expired
    }
  }

  /**
   * Get user data from token
   */
  getUserFromToken(token: string): User {
    const payload = this.parseTokenPayload(token);
    return {
      id: payload.id,
      email: payload.email,
      name: payload.name
    };
  }

  /**
   * Validate stored token and return user data if valid
   * Returns null if token is invalid, expired, or doesn't exist
   */
  validateStoredToken(): User | null {
    const token = this.getToken();
    
    if (!token) {
      return null;
    }

    try {
      if (this.isTokenExpired(token)) {
        this.removeToken();
        return null;
      }

      return this.getUserFromToken(token);
    } catch (error) {
      // Token is malformed, remove it
      this.removeToken();
      return null;
    }
  }
}

export const tokenService = new TokenService();
export default tokenService;
