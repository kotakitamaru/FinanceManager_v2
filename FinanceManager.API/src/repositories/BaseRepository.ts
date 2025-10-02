import { QueryTypes, Sequelize } from 'sequelize';
import { getDatabaseConnection } from '@/config/database';

export abstract class BaseRepository {
  protected sequelize: Sequelize;

  constructor() {
    this.sequelize = getDatabaseConnection();
  }

  protected async executeQuery<T>(query: string, replacements?: any): Promise<T[]> {
    const result = await this.sequelize.query(query, {
      replacements,
      type: QueryTypes.SELECT
    });
    return result as T[];
  }

  protected async executeUpdate(query: string, replacements?: any): Promise<[number, number]> {
    const result = await this.sequelize.query(query, {
      replacements,
      type: QueryTypes.UPDATE
    });
    return result as unknown as [number, number];
  }

  protected async executeInsert(query: string, replacements?: any): Promise<[number, number]> {
    const result = await this.sequelize.query(query, {
      replacements,
      type: QueryTypes.INSERT
    });
    return result as unknown as [number, number];
  }

  protected async executeDelete(query: string, replacements?: any): Promise<number> {
    const result = await this.sequelize.query(query, {
      replacements,
      type: QueryTypes.DELETE
    });
    return (result as any)[1] as number;
  }
}
