// Category-related types
export interface Category {
  id: number;
  title: string;
  icon: string;
  isIncome: boolean;
  color: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryRequest {
  title: string;
  icon: string;
  isIncome: boolean;
  color: string;
}

export interface UpdateCategoryRequest {
  title?: string;
  icon?: string;
  isIncome?: boolean;
  color?: string;
}
