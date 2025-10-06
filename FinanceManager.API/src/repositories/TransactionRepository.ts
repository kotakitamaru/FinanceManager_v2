import { BaseRepository } from '@/repositories/BaseRepository';
import { getDatabaseConnection } from '@/config/database';
import { CreateTransactionRequest, UpdateTransactionRequest, TransactionResponse } from '@/types/TransactionTypes';
import { QueryTypes } from '@/types/enums/queryTypesEnum';

export class TransactionRepository extends BaseRepository {
  async findAll(
    page: number = 1,
    limit: number = 10,
    categoryId?: number,
    accountId?: number,
    startDate?: string,
    endDate?: string,
    sortBy?: string,
    sortOrder?: string,
    userId?: number
  ): Promise<{
    transactions: TransactionResponse[];
    total: number;
  }> {
    const conn = getDatabaseConnection();

    const offset = (page - 1) * limit;
    let whereClause = '';
    const params: any[] = [];

    const conditions = [];
    if (typeof userId === 'number') {
      conditions.push(`user_id = $${params.length + 1}`);
      params.push(userId);
    }
    if (typeof categoryId === 'number') {
      conditions.push(`category_id = $${params.length + 1}`);
      params.push(categoryId);
    }
    if (typeof accountId === 'number') {
      conditions.push(`account_id = $${params.length + 1}`);
      params.push(accountId);
    }
    if (startDate) {
      conditions.push(`date >= $${params.length + 1}`);
      params.push(new Date(startDate));
    }
    if (endDate) {
      conditions.push(`date <= $${params.length + 1}`);
      params.push(new Date(endDate));
    }

    if (conditions.length > 0) {
      whereClause = 'WHERE ' + conditions.join(' AND ');
    }

    const countQuery = `SELECT COUNT(*) FROM transactions ${whereClause}`;
    const totalResult = await conn.query(countQuery, { 
      bind: params,
      type: QueryTypes.SELECT
    });
    const total = parseInt((totalResult[0] as any).count);

    // Build ORDER BY clause based on sortBy and sortOrder parameters
    let orderByClause = 'ORDER BY ';
    const validSortFields = ['id', 'amount', 'date', 'category_id', 'account_id', 'create_date', 'update_date'];
    const validSortOrders = ['ASC', 'DESC'];
    
    // Validate sortBy parameter
    const sortField = sortBy && validSortFields.includes(sortBy) ? sortBy : 'id';
    const sortDirection = sortOrder && validSortOrders.includes(sortOrder.toUpperCase()) ? sortOrder.toUpperCase() : 'DESC';
    
    orderByClause += `${sortField} ${sortDirection}`;

    const query = `
      SELECT id,
             amount,
             note,
             date,
             category_id as "categoryId",
             account_id as "accountId",
             create_date as "createDate",
             update_date as "updateDate"
      FROM transactions ${whereClause}
      ${orderByClause} LIMIT $${params.length + 1} OFFSET $${params.length + 2}
    `;

    const result = await conn.query(query, {
      bind: [...params, limit, offset],
      type: QueryTypes.SELECT
    });

    return {
      transactions: result as TransactionResponse[],
      total
    };
  }

  async findById(id: number, userId?: number): Promise<TransactionResponse | null> {
    const conn = getDatabaseConnection();

    let whereClause = 'WHERE id = $1';
    const params: any[] = [id];

    if (typeof userId === 'number') {
      whereClause += ' AND user_id = $2';
      params.push(userId);
    }

    const query = `
      SELECT id,
             amount,
             note,
             date,
             category_id as "categoryId",
             account_id as "accountId",
             create_date as "createDate",
             update_date as "updateDate"
      FROM transactions ${whereClause}`;

    const result = await conn.query(query, {
      bind: params,
      type: QueryTypes.SELECT
    });

    return (result as TransactionResponse[])[0] || null;
  }

  async create(transactionData: CreateTransactionRequest, userId: number): Promise<TransactionResponse> {
    const conn = getDatabaseConnection();

    const query = `
      INSERT INTO transactions (amount,
                               note,
                               date,
                               category_id,
                               account_id,
                               user_id,
                               create_date,
                               update_date)
      VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW()) RETURNING id,
                amount,
                note,
                date,
                category_id as "categoryId",
                account_id as "accountId",
                create_date as "createDate",
                update_date as "updateDate"`;

    const result = await conn.query(query, {
      bind: [
        transactionData.amount,
        transactionData.note,
        transactionData.date,
        transactionData.categoryId,
        transactionData.accountId,
        userId
      ],
      type: QueryTypes.INSERT
    });

    return (result as any)[0];
  }

  async update(id: number, transactionData: UpdateTransactionRequest, userId?: number): Promise<TransactionResponse> {
    const conn = getDatabaseConnection();

    const setClause = [];
    const values = [];
    let paramCount = 1;

    if (transactionData.amount !== undefined) {
      setClause.push(`amount = $${paramCount}`);
      values.push(transactionData.amount);
      paramCount++;
    }

    if (transactionData.note !== undefined) {
      setClause.push(`note = $${paramCount}`);
      values.push(transactionData.note);
      paramCount++;
    }

    if (transactionData.date !== undefined) {
      setClause.push(`date = $${paramCount}`);
      values.push(transactionData.date);
      paramCount++;
    }

    if (transactionData.categoryId !== undefined) {
      setClause.push(`category_id = $${paramCount}`);
      values.push(transactionData.categoryId);
      paramCount++;
    }

    if (transactionData.accountId !== undefined) {
      setClause.push(`account_id = $${paramCount}`);
      values.push(transactionData.accountId);
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
      UPDATE transactions
      SET ${setClause.join(', ')}
      ${whereClause} RETURNING id,
                amount,
                note,
                date,
                category_id as "categoryId",
                account_id as "accountId",
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

    const query = `DELETE FROM transactions ${whereClause}`;

    await conn.query(query, {
      bind: params,
      type: QueryTypes.DELETE
    });
  }

  async findByAccountId(
    accountId: number,
    page: number = 1,
    limit: number = 10,
    sortBy?: string,
    sortOrder?: string
  ): Promise<{
    transactions: TransactionResponse[];
    total: number;
  }> {
    return this.findAll(page, limit, undefined, accountId, undefined, undefined, sortBy, sortOrder);
  }
}