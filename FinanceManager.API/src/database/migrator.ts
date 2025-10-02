import { Umzug, SequelizeStorage } from 'umzug';
import { Sequelize, QueryInterface } from 'sequelize';
import path from 'path';

type MigrationContext = {
  sequelize: Sequelize;
  queryInterface: QueryInterface;
};

export function createMigrator(sequelize: Sequelize) {
  const isTsRuntime =
      Boolean(process.env.TS_NODE) ||
      Boolean(process.env.TS_NODE_DEV) ||
      require.main?.filename?.endsWith('.ts') ||
      process.execArgv.some(arg => arg.includes('ts-node'));

  // Use absolute path based on current file location. This works for both src (TS) and dist (JS) builds.
  const migrationsGlob = path.join(__dirname, '..', 'database/migrations', isTsRuntime ? '*.ts' : '*.js');
  console.log(`Using migrations from: ${migrationsGlob}`);
  return new Umzug<MigrationContext>({
    migrations: {
      glob: migrationsGlob,
    },
    context: {
      sequelize,
      queryInterface: sequelize.getQueryInterface(),
    },
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
  });
}