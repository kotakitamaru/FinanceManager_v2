import { Get, Post, Put, Delete, Route, Tags, Body, Path, Query, Security, Request } from 'tsoa';
import { BaseController } from '@/controllers/BaseController';
import { CategoryService } from '@/services/CategoryService';
import { CreateCategoryRequest, UpdateCategoryRequest, CategoryResponse } from '@/types/CategoryTypes';
import { AuthenticatedRequest } from '@/middleware/authentication';

@Route('categories')
@Tags('Categories')
export class CategoryController extends BaseController {
  private categoryService: CategoryService;

  constructor() {
    super();
    this.categoryService = new CategoryService();
  }

  @Get('/')
  @Security('bearer')
  public async getCategories(
      @Query() page?: number,
      @Query() limit?: number,
      @Query() isIncome?: boolean,
      @Request() req?: AuthenticatedRequest
  ): Promise<{ categories: CategoryResponse[]; total: number; page: number; limit: number }> {
    try {
      const pageNumber = page || 1;
      const pageLimit = limit || 10;
      const userId = req?.user?.id;

      const result = await this.categoryService.getCategories(pageNumber, pageLimit, isIncome, userId);

      return {
        categories: result.categories,
        total: result.total,
        page: pageNumber,
        limit: pageLimit
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  @Get('/{id}')
  @Security('bearer')
  public async getCategoryById(
      @Path() id: number,
      @Request() req?: AuthenticatedRequest
  ): Promise<CategoryResponse> {
    try {
      const userId = req?.user?.id;
      return await this.categoryService.getCategoryById(id, userId);
    } catch (error) {
      return this.handleError(error);
    }
  }

  @Post('/')
  @Security('bearer')
  public async createCategory(
      @Body() categoryData: CreateCategoryRequest,
      @Request() req?: AuthenticatedRequest
  ): Promise<CategoryResponse> {
    try {
      const userId = req?.user?.id;
      if (!userId) {
        throw new Error('User not authenticated');
      }
      return await this.categoryService.createCategory(categoryData, userId);
    } catch (error) {
      return this.handleError(error);
    }
  }

  @Put('/{id}')
  @Security('bearer')
  public async updateCategory(
      @Path() id: number,
      @Body() categoryData: UpdateCategoryRequest,
      @Request() req?: AuthenticatedRequest
  ): Promise<CategoryResponse> {
    try {
      const userId = req?.user?.id;
      return await this.categoryService.updateCategory(id, categoryData, userId);
    } catch (error) {
      return this.handleError(error);
    }
  }

  @Delete('/{id}')
  @Security('bearer')
  public async deleteCategory(
      @Path() id: number,
      @Request() req?: AuthenticatedRequest
  ): Promise<{ message: string }> {
    try {
      const userId = req?.user?.id;
      await this.categoryService.deleteCategory(id, userId);
      return { message: 'Category deleted successfully' };
    } catch (error) {
      return this.handleError(error);
    }
  }
}
