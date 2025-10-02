import 'dotenv/config';
import { createMigrator } from '../migrator';
import {closeDatabaseConnection, getDatabaseConnection, initializeDatabase} from "@/config/database";

async function main() {
  const [cmd, argKey, argValue] = process.argv.slice(2);
  await initializeDatabase();
  const sequelize = getDatabaseConnection()
  const migrator = createMigrator(sequelize);

  try {
    switch (cmd) {
      case 'up': {
        await sequelize.authenticate();
        await migrator.up();
        console.log('Migrations applied');
        break;
      }
      case 'down': {
        await sequelize.authenticate();
        await migrator.down();
        console.log('Last migration reverted');
        break;
      }
      case 'pending': {
        const pending = await migrator.pending();
        console.log(pending.map(m => m.name));
        break;
      }
      case 'executed': {
        const executed = await migrator.executed();
        console.log(executed.map(m => m.name));
        break;
      }
      default:
        console.log('Usage: node DatabaseMigrationTool <up|down|pending|executed>');
    }
  } finally {
    await closeDatabaseConnection();
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});