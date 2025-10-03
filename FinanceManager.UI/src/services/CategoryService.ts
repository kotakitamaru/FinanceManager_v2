import { apiService } from '@services/api';
import type { Category, CreateCategoryRequest, UpdateCategoryRequest } from '@/types/category';

export interface CategoryListResponse {
  categories: Category[];
  total: number;
  page: number;
  limit: number;
}

class CategoryService {
  /**
   * Fetch all categories for the authenticated user
   */
  async getCategories(page: number = 1, limit: number = 10, isIncome?: boolean): Promise<CategoryListResponse> {
    let url = `/categories?page=${page}&limit=${limit}`;
    if (typeof isIncome === 'boolean') {
      url += `&isIncome=${isIncome}`;
    }
    const response = await apiService.get<CategoryListResponse>(url);
    return response.data;
  }

  /**
   * Fetch a specific category by ID
   */
  async getCategoryById(id: number): Promise<Category> {
    const response = await apiService.get<Category>(`/categories/${id}`);
    return response.data;
  }

  /**
   * Create a new category
   */
  async createCategory(categoryData: CreateCategoryRequest): Promise<Category> {
    const response = await apiService.post<Category>('/categories', categoryData);
    return response.data;
  }

  /**
   * Update an existing category
   */
  async updateCategory(id: number, categoryData: UpdateCategoryRequest): Promise<Category> {
    const response = await apiService.put<Category>(`/categories/${id}`, categoryData);
    return response.data;
  }

  /**
   * Delete a category
   */
  async deleteCategory(id: number): Promise<void> {
    await apiService.delete(`/categories/${id}`);
  }
}

export const categoryService = new CategoryService();
export default categoryService;
