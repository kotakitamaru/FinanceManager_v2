import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import {createMigrator} from "@/database/migrator";

dotenv.config();

let sequelize: Sequelize;

export function getDatabaseConnection(): Sequelize {
  if (!sequelize) {
    throw new Error('Database not initialized. Call initializeDatabase() first.');
  }
  return sequelize;
}

export async function initializeDatabase(): Promise<void> {
  const {
    DB_HOST = 'localhost',
    DB_PORT = '5432',
    DB_NAME = 'finance_manager',
    DB_USER = 'dbuser',
    DB_PASSWORD = '12345',
    DB_DIALECT = 'postgres'
  } = process.env;

  sequelize = new Sequelize({
    host: DB_HOST,
    port: parseInt(DB_PORT),
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASSWORD,
    dialect: DB_DIALECT as 'postgres' | 'mysql' | 'sqlite',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true,
      underscored: true,
      freezeTableName: true
    }
  });

  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
}

export async function runMigrations(): Promise<void> {
  const migrator = createMigrator(sequelize);
  await migrator.up();
}


export async function closeDatabaseConnection(): Promise<void> {
  if (sequelize) {
    await sequelize.close();
    console.log('Database connection closed.');
  }
}
