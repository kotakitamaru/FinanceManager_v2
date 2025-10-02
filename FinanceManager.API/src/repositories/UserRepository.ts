import { BaseRepository } from '@/repositories/BaseRepository';
import { CreateUserRequest, UpdateUserRequest, UserResponse, User } from '@/types/UserTypes';
import { getDatabaseConnection } from '@/config/database';
import { Sequelize } from 'sequelize';
import { QueryTypes } from '@/types/enums/queryTypesEnum';

export class UserRepository extends BaseRepository {
  async findAll(page: number = 1, limit: number = 10, search?: string): Promise<{
    users: UserResponse[];
    total: number;
  }> {
    const db : Sequelize = getDatabaseConnection();
    const offset = (page - 1) * limit;
    
    let whereClause = '';
    let queryParams: any[] = [];
    
    if (search) {
      whereClause = 'WHERE name ILIKE $1 OR email ILIKE $2';
      queryParams = [`%${search}%`, `%${search}%`];
    }

    const countQuery = `
      SELECT COUNT(*) as total 
      FROM users 
      ${whereClause}
    `;

    const usersQuery = `
      SELECT id, email, name, created_at, updated_at 
      FROM users 
      ${whereClause}
      ORDER BY created_at DESC 
      LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}
    `;

    const countResult = await db.query(countQuery, { 
      bind: queryParams,
      type: QueryTypes.SELECT
    });
    const total = parseInt((countResult[0] as any).total);

    const usersResult = await db.query(usersQuery, { 
      bind: [...queryParams, limit, offset],
      type: QueryTypes.SELECT
    });

    const users = usersResult.map((row: any) => ({
      id: row.id,
      email: row.email,
      name: row.name,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }));

    return { users, total };
  }

  async findById(id: number): Promise<UserResponse | null> {
    const db = getDatabaseConnection();
    
    const query = `
      SELECT id, email, name, created_at, updated_at 
      FROM users 
      WHERE id = $1
    `;

    const result = await db.query(query, { 
      bind: [id],
      type: QueryTypes.SELECT
    });

    if ((result as any[]).length === 0) {
      return null;
    }

    const row = result[0] as any;
    return {
      id: row.id,
      email: row.email,
      name: row.name,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }

  async create(userData: CreateUserRequest): Promise<UserResponse> {
    const db = getDatabaseConnection();
    
    const query = `
      INSERT INTO users (email, name, password, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, email, name, created_at, updated_at
    `;

    const now = new Date();
    const result = await db.query(query, { 
      bind: [userData.email, userData.name, userData.password, now, now],
      type: QueryTypes.SELECT
    });

    const row = result[0] as any;
    return {
      id: row.id,
      email: row.email,
      name: row.name,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }

  async update(id: number, userData: UpdateUserRequest): Promise<UserResponse> {
    const db = getDatabaseConnection();
    
    const updateFields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (userData.email !== undefined) {
      updateFields.push(`email = $${paramCount}`);
      values.push(userData.email);
      paramCount++;
    }

    if (userData.name !== undefined) {
      updateFields.push(`name = $${paramCount}`);
      values.push(userData.name);
      paramCount++;
    }

    if (userData.password !== undefined) {
      updateFields.push(`password = $${paramCount}`);
      values.push(userData.password);
      paramCount++;
    }

    updateFields.push(`updated_at = $${paramCount}`);
    values.push(new Date());
    paramCount++;

    values.push(id);

    const query = `
      UPDATE users 
      SET ${updateFields.join(', ')}
      WHERE id = $${paramCount}
      RETURNING id, email, name, created_at, updated_at
    `;

    const result = await db.query(query, { 
      bind: values,
      type: QueryTypes.SELECT
    });

    if ((result as any[]).length === 0) {
      throw new Error('User not found');
    }

    const row = result[0] as any;
    return {
      id: row.id,
      email: row.email,
      name: row.name,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }

  async delete(id: number): Promise<void> {
    const db = getDatabaseConnection();
    
    const query = 'DELETE FROM users WHERE id = $1';
    
    const result = await db.query(query, { 
      bind: [id],
      type: QueryTypes.DELETE
    });

    if ((result as any)[1] === 0) {
      throw new Error('User not found');
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    const db = getDatabaseConnection();
    
    const query = `
      SELECT id, email, name, password, created_at, updated_at 
      FROM users 
      WHERE email = $1
    `;

    const result = await db.query(query, { 
      bind: [email],
      type: QueryTypes.SELECT
    });

    if ((result as any[]).length === 0) {
      return null;
    }

    const row = result[0] as any;
    return {
      id: row.id,
      email: row.email,
      name: row.name,
      password: row.password,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }
}
