import { BaseService } from '@/services/BaseService';
import { CategoryRepository } from '@/repositories/CategoryRepository';
import { CreateCategoryRequest, UpdateCategoryRequest, CategoryResponse } from '@/types/CategoryTypes';

export class CategoryService extends BaseService {
  private categoryRepository: CategoryRepository;

  constructor() {
    super();
    this.categoryRepository = new CategoryRepository();
  }

  async getCategories(page: number = 1, limit: number = 10, isIncome?: boolean, userId?: number): Promise<{
    categories: CategoryResponse[];
    total: number;
    page: number;
    limit: number;
  }> {
    if (page < 1) {
      throw new Error('Page number must be greater than 0');
    }
    if (limit < 1) {
      throw new Error('Limit must be greater than 0');
    }

    const {categories, total} = await this.categoryRepository.findAll(page, limit, isIncome, userId);

    return {
      categories,
      total,
      page,
      limit
    };
  }

  async getCategoryById(id: number, userId?: number): Promise<CategoryResponse> {
    const category = await this.categoryRepository.findById(id, userId);
    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  }

  async createCategory(categoryData: CreateCategoryRequest, userId: number): Promise<CategoryResponse> {
    return await this.categoryRepository.create(categoryData, userId);
  }

  async updateCategory(id: number, categoryData: UpdateCategoryRequest, userId?: number): Promise<CategoryResponse> {
    return await this.categoryRepository.update(id, categoryData, userId);
  }

  async deleteCategory(id: number, userId?: number): Promise<void> {
    await this.categoryRepository.delete(id, userId);
  }
}
