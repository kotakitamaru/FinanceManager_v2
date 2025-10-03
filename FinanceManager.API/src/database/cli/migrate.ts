import 'dotenv/config';
import { createMigrator } from '../migrator';
import {closeDatabaseConnection, getDatabaseConnection, initializeDatabase} from "@/config/database";

async function main() {
  const [cmd] = process.argv.slice(2);
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
      case 'down:all': {
        await sequelize.authenticate();
        const executed = await migrator.executed();
        if (executed.length === 0) {
          console.log('No migrations to rollback');
          break;
        }
        
        console.log(`Rolling back ${executed.length} migrations...`);
        for (let i = 0; i < executed.length; i++) {
          await migrator.down();
          console.log(`Reverted migration: ${executed[executed.length - 1 - i].name}`);
        }
        console.log('All migrations reverted');
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
        console.log('Usage: node DatabaseMigrationTool <up|down|down:all|pending|executed>');
    }
  } finally {
    await closeDatabaseConnection();
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});