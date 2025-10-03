import { BaseRepository } from '@/repositories/BaseRepository';
import { getDatabaseConnection } from '@/config/database';
import { CreateCategoryRequest, UpdateCategoryRequest, CategoryResponse } from '@/types/CategoryTypes';
import { QueryTypes } from '@/types/enums/queryTypesEnum';

export class CategoryRepository extends BaseRepository {
  async findAll(page: number = 1, limit: number = 10, isIncome?: boolean, userId?: number): Promise<{
    categories: CategoryResponse[];
    total: number;
  }> {
    const conn = getDatabaseConnection();

    const offset = (page - 1) * limit;
    let whereClause = '';
    const params: any[] = [];

    const conditions = [];
    if (typeof userId === 'number') {
      conditions.push(`c.user_id = $${params.length + 1}`);
      params.push(userId);
    }
    if (typeof isIncome === 'boolean') {
      conditions.push(`c.is_income = $${params.length + 1}`);
      params.push(isIncome);
    }

    if (conditions.length > 0) {
      whereClause = 'WHERE ' + conditions.join(' AND ');
    }

    const countQuery = `SELECT COUNT(*)
                        FROM categories c ${whereClause}`;
    const totalResult = await conn.query(countQuery, { 
      bind: params,
      type: QueryTypes.SELECT
    });
    const total = parseInt((totalResult[0] as any).count);

    const query = `
      SELECT c.id,
             c.title,
             c.is_income as "isIncome",
             c.color,
             c.icon,
             c.created_at as "createdAt",
             c.updated_at as "updatedAt",
             COALESCE(SUM(t.amount * CASE WHEN c.is_income = true THEN 1 ELSE -1 END), 0) as amount
      FROM categories c
      LEFT JOIN transactions t ON c.id = t.category_id
      ${whereClause}
      GROUP BY c.id, c.title, c.is_income, c.color, c.icon, c.created_at, c.updated_at
      ORDER BY c.created_at DESC LIMIT $${params.length + 1}
      OFFSET $${params.length + 2}
    `;

    const result = await conn.query(query, {
      bind : [...params, limit, offset],
      type : QueryTypes.SELECT
    });

    return {
      categories : result as CategoryResponse[],
      total
    };
  }

  async findById(id: number, userId?: number): Promise<CategoryResponse | null> {
    const conn = getDatabaseConnection();

    let whereClause = 'WHERE c.id = $1';
    const params: any[] = [id];

    if (typeof userId === 'number') {
      whereClause += ' AND c.user_id = $2';
      params.push(userId);
    }

    const query = `
      SELECT c.id,
             c.title,
             c.is_income as "isIncome",
             c.color,
             c.icon,
             c.created_at as "createdAt",
             c.updated_at as "updatedAt",
             COALESCE(SUM(t.amount * CASE WHEN c.is_income = true THEN 1 ELSE -1 END), 0) as amount
      FROM categories c
      LEFT JOIN transactions t ON c.id = t.category_id
      ${whereClause}
      GROUP BY c.id, c.title, c.is_income, c.color, c.icon, c.created_at, c.updated_at`;

    const result = await conn.query(query, {
      bind: params,
      type: QueryTypes.SELECT
    });

    return (result as CategoryResponse[])[0] || null;
  }

  async create(categoryData: CreateCategoryRequest, userId: number): Promise<CategoryResponse> {
    const conn = getDatabaseConnection();

    const query = `
      INSERT INTO categories (title,
                              icon,
                              is_income,
                              color,
                              user_id,
                              created_at,
                              updated_at)
      VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) RETURNING id,
                title,
                icon,
                is_income as "isIncome",
                color,
                created_at as "createdAt",
                updated_at as "updatedAt",
                0 as amount`;

    const result = await conn.query(query, {
      bind: [
        categoryData.title,
        categoryData.icon,
        categoryData.isIncome,
        categoryData.color,
        userId
      ],
      type: QueryTypes.INSERT
    });

    return (result as any)[0];
  }

  async update(id: number, categoryData: UpdateCategoryRequest, userId?: number): Promise<CategoryResponse> {
    const conn = getDatabaseConnection();

    const setClause = [];
    const values = [];
    let paramCount = 1;

    if (categoryData.title !== undefined) {
      setClause.push(`title = $${paramCount}`);
      values.push(categoryData.title);
      paramCount++;
    }

    if (categoryData.color !== undefined) {
      setClause.push(`color = $${paramCount}`);
      values.push(categoryData.color);
      paramCount++;
    }

    if (categoryData.icon !== undefined) {
      setClause.push(`icon = $${paramCount}`);
      values.push(categoryData.icon);
      paramCount++;
    }

    if (categoryData.isIncome !== undefined) {
      setClause.push(`is_income = $${paramCount}`);
      values.push(categoryData.isIncome);
      paramCount++;
    }

    setClause.push(`updated_at = NOW()`);

    let whereClause = `WHERE id = $${paramCount}`;
    values.push(id);
    paramCount++;

    if (typeof userId === 'number') {
      whereClause += ` AND user_id = $${paramCount}`;
      values.push(userId);
    }

    const query = `
      UPDATE categories
      SET ${setClause.join(', ')}
      ${whereClause} RETURNING id,
                title,
                is_income as "isIncome",
                color,
                icon,
                created_at as "createdAt",
                updated_at as "updatedAt",
                COALESCE((SELECT SUM(t.amount * CASE WHEN categories.is_income = true THEN 1 ELSE -1 END) 
                         FROM transactions t 
                         WHERE t.category_id = categories.id), 0) as amount`;

    const result = await conn.query(query, {
      bind: values,
      type: QueryTypes.UPDATE
    });

    return (result as any)[0];
  }

  async delete(id: number, userId?: number): Promise<void> {
    const conn = getDatabaseConnection();

    let whereClause = 'WHERE id = $1';
    const params: any[] = [id];

    if (typeof userId === 'number') {
      whereClause += ' AND user_id = $2';
      params.push(userId);
    }

    const query = `DELETE
                   FROM categories
                   ${whereClause}`;

    await conn.query(query, {
      bind: params,
      type: QueryTypes.DELETE
    });
  }
}
