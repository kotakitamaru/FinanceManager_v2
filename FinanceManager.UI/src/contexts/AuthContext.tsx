// Authentication context for managing user state
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from '@/types/user';
import { authService, tokenService } from '@services/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!user;

  // Helper function to clear errors
  const clearError = () => {
    setError(null);
  };

  // Helper function to handle authentication errors
  const handleAuthError = (error: unknown): string => {
    if (error instanceof Error) {
      return error.message;
    }
    return 'An unexpected error occurred. Please try again.';
  };

  // Check for existing token on app load
  useEffect(() => {
    const checkExistingToken = () => {
      const user = tokenService.validateStoredToken();
      
      if (user) {
        setUser(user);
      } else if (tokenService.hasToken()) {
        // Token existed but was invalid/expired
        setError('Your session has expired. Please log in again.');
      }
      
      setIsLoading(false);
    };

    checkExistingToken();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);
      clearError(); // Clear any previous errors
      
      // Make actual API call to login
      const authResponse = await authService.login(email, password);
      
      // Store user data and token
      setUser(authResponse.user);
      tokenService.setToken(authResponse.token);
    } catch (error) {
      const errorMessage = handleAuthError(error);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<void> => {
    try {
      setIsLoading(true);
      clearError(); // Clear any previous errors
      
      // Make actual API call to register
      const authResponse = await authService.register(userData);
      
      // Store user data and token
      setUser(authResponse.user);
      tokenService.setToken(authResponse.token);
    } catch (error) {
      const errorMessage = handleAuthError(error);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
    tokenService.removeToken();
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
