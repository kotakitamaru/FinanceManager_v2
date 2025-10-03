// Account-related types
export interface Account {
  id: number;
  title: string;
  icon: string;
  color: string;
  balance: number;
  createDate: string;
  updateDate: string;
}

export interface CreateAccountRequest {
  title: string;
  icon: string;
  color: string;
}

export interface UpdateAccountRequest {
  title?: string;
  icon?: string;
  color?: string;
}

export interface AccountListResponse {
  accounts: Account[];
  total: number;
  page: number;
  limit: number;
}
