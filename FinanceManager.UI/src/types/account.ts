// Account-related types
export interface Account {
  id: string;
  userId: string;
  name: string;
  isIncome: boolean;
  balance: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAccountRequest {
  name: string;
  isIncome: boolean;
  balance: number;
  currency: string;
}

export interface UpdateAccountRequest {
  name?: string;
  isIncome?: boolean;
  balance?: number;
  currency?: string;
}
