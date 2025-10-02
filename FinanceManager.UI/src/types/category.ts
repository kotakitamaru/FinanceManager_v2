// Category-related types
export interface Category {
  id: string;
  userId: string;
  name: string;
  isIncome: boolean;
  color: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryRequest {
  name: string;
  isIncome: boolean;
  color: string;
  icon: string;
}

export interface UpdateCategoryRequest {
  name?: string;
  isIncome?: boolean;
  color?: string;
  icon?: string;
}
