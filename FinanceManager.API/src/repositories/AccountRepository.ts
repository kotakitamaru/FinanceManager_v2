import { BaseRepository } from '@/repositories/BaseRepository';
import { getDatabaseConnection } from '@/config/database';
import { CreateAccountRequest, UpdateAccountRequest, AccountResponse } from '@/types/AccountTypes';
import { QueryTypes } from '@/types/enums/queryTypesEnum';

export class AccountRepository extends BaseRepository {
  async findAll(
    page: number = 1,
    limit: number = 10,
    userId?: number
  ): Promise<{
    accounts: AccountResponse[];
    total: number;
  }> {
    const conn = getDatabaseConnection();

    const offset = (page - 1) * limit;
    let whereClause = '';
    const params: any[] = [];

    if (typeof userId === 'number') {
      whereClause = 'WHERE a.user_id = $1';
      params.push(userId);
    }

    const countQuery = `SELECT COUNT(*) FROM accounts a ${whereClause}`;
    const totalResult = await conn.query(countQuery, { 
      bind: params,
      type: QueryTypes.SELECT
    });
    const total = parseInt((totalResult[0] as any).count);

    const query = `
      SELECT a.id,
             a.title,
             a.icon,
             a.color,
             a.create_date as "createDate",
             a.update_date as "updateDate",
             COALESCE(SUM(t.amount * CASE WHEN c.is_income = true THEN 1 ELSE -1 END), 0) as balance
      FROM accounts a
      LEFT JOIN transactions t ON a.id = t.account_id
      LEFT JOIN categories c ON t.category_id = c.id
      ${whereClause}
      GROUP BY a.id, a.title, a.icon, a.color, a.create_date, a.update_date
      ORDER BY a.id ASC LIMIT $${params.length + 1} OFFSET $${params.length + 2}
    `;

    const result = await conn.query(query, {
      bind: [...params, limit, offset],
      type: QueryTypes.SELECT
    });

    return {
      accounts: result as AccountResponse[],
      total
    };
  }

  async findById(id: number, userId?: number): Promise<AccountResponse | null> {
    const conn = getDatabaseConnection();

    let whereClause = 'WHERE id = $1';
    const params: any[] = [id];

    if (typeof userId === 'number') {
      whereClause += ' AND a.user_id = $2';
      params.push(userId);
    }

    const query = `
      SELECT a.id,
             a.title,
             a.icon,
             a.color,
             a.create_date as "createDate",
             a.update_date as "updateDate",
             COALESCE(SUM(t.amount * CASE WHEN c.is_income = true THEN 1 ELSE -1 END), 0) as balance
      FROM accounts a
      LEFT JOIN transactions t ON a.id = t.account_id
      LEFT JOIN categories c ON t.category_id = c.id
      ${whereClause}
      GROUP BY a.id, a.title, a.icon, a.color, a.create_date, a.update_date`;

    const result = await conn.query(query, {
      bind: params,
      type: QueryTypes.SELECT
    });

    return (result as AccountResponse[])[0] || null;
  }

  async create(accountData: CreateAccountRequest, userId: number): Promise<AccountResponse> {
    const conn = getDatabaseConnection();

    const query = `
      INSERT INTO accounts (title,
                           icon,
                           color,
                           user_id,
                           create_date,
                           update_date)
      VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING id,
                title,
                icon,
                color,
                create_date as "createDate",
                update_date as "updateDate"`;

    const result = await conn.query(query, {
      bind: [
        accountData.title,
        accountData.icon,
        accountData.color,
        userId
      ],
      type: QueryTypes.INSERT
    });

    return (result as any)[0];
  }

  async update(id: number, accountData: UpdateAccountRequest, userId?: number): Promise<AccountResponse> {
    const conn = getDatabaseConnection();

    const setClause = [];
    const values = [];
    let paramCount = 1;

    if (accountData.title !== undefined) {
      setClause.push(`title = $${paramCount}`);
      values.push(accountData.title);
      paramCount++;
    }

    if (accountData.icon !== undefined) {
      setClause.push(`icon = $${paramCount}`);
      values.push(accountData.icon);
      paramCount++;
    }

    if (accountData.color !== undefined) {
      setClause.push(`color = $${paramCount}`);
      values.push(accountData.color);
      paramCount++;
    }

    setClause.push(`update_date = NOW()`);

    let whereClause = `WHERE id = $${paramCount}`;
    values.push(id);
    paramCount++;

    if (typeof userId === 'number') {
      whereClause += ` AND user_id = $${paramCount}`;
      values.push(userId);
    }

    const query = `
      UPDATE accounts
      SET ${setClause.join(', ')}
      ${whereClause} RETURNING id,
                title,
                icon,
                color,
                create_date as "createDate",
                update_date as "updateDate"`;

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

    const query = `DELETE FROM accounts ${whereClause}`;

    await conn.query(query, {
      bind: params,
      type: QueryTypes.DELETE
    });
  }
}
