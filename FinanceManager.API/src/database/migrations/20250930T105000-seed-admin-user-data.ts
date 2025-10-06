import { QueryInterface, DataTypes, QueryTypes } from 'sequelize';
import { MigrationFn } from 'umzug';
import bcrypt from 'bcrypt';

type Ctx = {
  queryInterface: QueryInterface;
};

export const up: MigrationFn<Ctx> = async ({ context: { queryInterface } }) => {
  // Create admin user
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash('12345', saltRounds);
  
  // Get the user ID first to check if exists
  const existingUserResult = await queryInterface.sequelize.query(
    'SELECT id FROM users WHERE email = $1',
    { bind: ['admin'], type: QueryTypes.SELECT }
  ) as any[];

  let userId: number;
  if (existingUserResult.length > 0) {
    userId = existingUserResult[0].id;
    console.log(`Using existing admin user with ID: ${userId}`);
  } else {
    await queryInterface.bulkInsert('users', [{
      email: 'admin',
      name: 'Admin User',
      password: hashedPassword,
      created_at: new Date(),
      updated_at: new Date()
    }]);

    // Get the user ID after creation
    const userResult = await queryInterface.sequelize.query(
      'SELECT id FROM users WHERE email = $1',
      { bind: ['admin'], type: QueryTypes.SELECT }
    ) as any[];
    console.log('User result:', userResult);
    console.log('User result length:', userResult.length);
    console.log('First user:', userResult[0]);
    userId = userResult[0].id;
    console.log(`Created admin user with ID: ${userId}`);
  }

  // Create sample accounts for the admin user
  const accounts = [
    { title: 'Main Bank Account', icon: '🏦', color: '#3498db', create_date: new Date(), update_date: new Date(), user_id: userId },
    { title: 'Savings Account', icon: '💰', color: '#2ecc71', create_date: new Date(), update_date: new Date(), user_id: userId },
    { title: 'Cash Wallet', icon: '💵', color: '#f39c12', create_date: new Date(), update_date: new Date(), user_id: userId },
    { title: 'Credit Card', icon: '💳', color: '#e74c3c', create_date: new Date(), update_date: new Date(), user_id: userId },
    { title: 'Investment Account', icon: '📈', color: '#9b59b6', create_date: new Date(), update_date: new Date(), user_id: userId }
  ];

  await queryInterface.bulkInsert('accounts', accounts);
  console.log(`Created ${accounts.length} sample accounts`);

  // Create sample categories for the admin user
  const categories = [
    // Income categories
    { title: 'Salary', icon: '💼', is_income: true, color: '#2ecc71', created_at: new Date(), updated_at: new Date(), user_id: userId },
    { title: 'Freelance', icon: '💻', is_income: true, color: '#27ae60', created_at: new Date(), updated_at: new Date(), user_id: userId },
    { title: 'Investment Returns', icon: '📊', is_income: true, color: '#16a085', created_at: new Date(), updated_at: new Date(), user_id: userId },
    { title: 'Gift', icon: '🎁', is_income: true, color: '#f39c12', created_at: new Date(), updated_at: new Date(), user_id: userId },
    
    // Expense categories
    { title: 'Groceries', icon: '🛒', is_income: false, color: '#e74c3c', created_at: new Date(), updated_at: new Date(), user_id: userId },
    { title: 'Transportation', icon: '🚗', is_income: false, color: '#e67e22', created_at: new Date(), updated_at: new Date(), user_id: userId },
    { title: 'Utilities', icon: '⚡', is_income: false, color: '#f39c12', created_at: new Date(), updated_at: new Date(), user_id: userId },
    { title: 'Entertainment', icon: '🎬', is_income: false, color: '#9b59b6', created_at: new Date(), updated_at: new Date(), user_id: userId },
    { title: 'Restaurants', icon: '🍽️', is_income: false, color: '#e74c3c', created_at: new Date(), updated_at: new Date(), user_id: userId },
    { title: 'Healthcare', icon: '🏥', is_income: false, color: '#e74c3c', created_at: new Date(), updated_at: new Date(), user_id: userId },
    { title: 'Shopping', icon: '🛍️', is_income: false, color: '#e74c3c', created_at: new Date(), updated_at: new Date(), user_id: userId },
    { title: 'Housing', icon: '🏠', is_income: false, color: '#34495e', created_at: new Date(), updated_at: new Date(), user_id: userId },
    { title: 'Education', icon: '📚', is_income: false, color: '#3498db', created_at: new Date(), updated_at: new Date(), user_id: userId },
    { title: 'Travel', icon: '✈️', is_income: false, color: '#1abc9c', created_at: new Date(), updated_at: new Date(), user_id: userId }
  ];

  await queryInterface.bulkInsert('categories', categories);
  console.log(`Created ${categories.length} sample categories`);

  // Get account and category IDs for transactions
  const accountIds = await queryInterface.sequelize.query(
    'SELECT id FROM accounts WHERE user_id = $1 ORDER BY id',
    { bind: [userId], type: QueryTypes.SELECT }
  ) as any[];

  const categoryIds = await queryInterface.sequelize.query(
    'SELECT id FROM categories WHERE user_id = $1 ORDER BY id',
    { bind: [userId], type: QueryTypes.SELECT }
  ) as any[];

  // Create sample transactions
  const transactions = [
    // Income transactions
    { amount: 5000.00, note: 'Monthly salary', date: new Date('2024-01-01'), category_id: categoryIds[0].id, account_id: accountIds[0].id, create_date: new Date(), update_date: new Date(), user_id: userId },
    { amount: 1200.00, note: 'Freelance project payment', date: new Date('2024-01-05'), category_id: categoryIds[1].id, account_id: accountIds[0].id, create_date: new Date(), update_date: new Date(), user_id: userId },
    { amount: 150.00, note: 'Investment dividend', date: new Date('2024-01-10'), category_id: categoryIds[2].id, account_id: accountIds[4].id, create_date: new Date(), update_date: new Date(), user_id: userId },
    { amount: 200.00, note: 'Birthday gift from family', date: new Date('2024-01-15'), category_id: categoryIds[3].id, account_id: accountIds[2].id, create_date: new Date(), update_date: new Date(), user_id: userId },
    
    // Expense transactions
    { amount: -85.50, note: 'Weekly grocery shopping', date: new Date('2024-01-02'), category_id: categoryIds[4].id, account_id: accountIds[0].id, create_date: new Date(), update_date: new Date(), user_id: userId },
    { amount: -45.00, note: 'Gas for car', date: new Date('2024-01-03'), category_id: categoryIds[5].id, account_id: accountIds[0].id, create_date: new Date(), update_date: new Date(), user_id: userId },
    { amount: -120.00, note: 'Electricity bill', date: new Date('2024-01-04'), category_id: categoryIds[6].id, account_id: accountIds[0].id, create_date: new Date(), update_date: new Date(), user_id: userId },
    { amount: -25.00, note: 'Movie tickets', date: new Date('2024-01-06'), category_id: categoryIds[7].id, account_id: accountIds[2].id, create_date: new Date(), update_date: new Date(), user_id: userId },
    { amount: -65.00, note: 'Dinner at restaurant', date: new Date('2024-01-07'), category_id: categoryIds[8].id, account_id: accountIds[3].id, create_date: new Date(), update_date: new Date(), user_id: userId },
    { amount: -150.00, note: 'Doctor visit', date: new Date('2024-01-08'), category_id: categoryIds[9].id, account_id: accountIds[0].id, create_date: new Date(), update_date: new Date(), user_id: userId },
    { amount: -89.99, note: 'New shirt', date: new Date('2024-01-09'), category_id: categoryIds[10].id, account_id: accountIds[3].id, create_date: new Date(), update_date: new Date(), user_id: userId },
    { amount: -1200.00, note: 'Monthly rent', date: new Date('2024-01-01'), category_id: categoryIds[11].id, account_id: accountIds[0].id, create_date: new Date(), update_date: new Date(), user_id: userId },
    { amount: -299.00, note: 'Online course', date: new Date('2024-01-12'), category_id: categoryIds[12].id, account_id: accountIds[0].id, create_date: new Date(), update_date: new Date(), user_id: userId },
    { amount: -450.00, note: 'Weekend trip', date: new Date('2024-01-20'), category_id: categoryIds[13].id, account_id: accountIds[0].id, create_date: new Date(), update_date: new Date(), user_id: userId },
    { amount: -75.00, note: 'Grocery shopping', date: new Date('2024-01-16'), category_id: categoryIds[4].id, account_id: accountIds[0].id, create_date: new Date(), update_date: new Date(), user_id: userId },
    { amount: -30.00, note: 'Uber ride', date: new Date('2024-01-18'), category_id: categoryIds[5].id, account_id: accountIds[0].id, create_date: new Date(), update_date: new Date(), user_id: userId },
    { amount: -15.00, note: 'Coffee and pastry', date: new Date('2024-01-19'), category_id: categoryIds[8].id, account_id: accountIds[2].id, create_date: new Date(), update_date: new Date(), user_id: userId },
    { amount: -200.00, note: 'Gym membership', date: new Date('2024-01-01'), category_id: categoryIds[9].id, account_id: accountIds[0].id, create_date: new Date(), update_date: new Date(), user_id: userId },
    { amount: -180.00, note: 'Internet bill', date: new Date('2024-01-05'), category_id: categoryIds[6].id, account_id: accountIds[0].id, create_date: new Date(), update_date: new Date(), user_id: userId },
    { amount: -95.00, note: 'Grocery shopping', date: new Date('2024-01-23'), category_id: categoryIds[4].id, account_id: accountIds[0].id, create_date: new Date(), update_date: new Date(), user_id: userId }
  ];

  await queryInterface.bulkInsert('transactions', transactions);
  console.log(`Created ${transactions.length} sample transactions`);
};

export const down: MigrationFn<Ctx> = async ({ context: { queryInterface } }) => {
  // Find admin user
  const adminUser = await queryInterface.sequelize.query(
    'SELECT id FROM users WHERE email = $1',
    { 
      bind: ['admin'],
      type: QueryTypes.SELECT
    }
  );

  if ((adminUser as any[]).length === 0) {
    console.log('Admin user not found, nothing to rollback');
    return;
  }

  const userId = (adminUser[0] as any).id;

  // Delete transactions
  await queryInterface.sequelize.query(
    'DELETE FROM transactions WHERE user_id = $1',
    { bind: [userId], type: QueryTypes.DELETE }
  );

  // Delete accounts
  await queryInterface.sequelize.query(
    'DELETE FROM accounts WHERE user_id = $1',
    { bind: [userId], type: QueryTypes.DELETE }
  );

  // Delete categories
  await queryInterface.sequelize.query(
    'DELETE FROM categories WHERE user_id = $1',
    { bind: [userId], type: QueryTypes.DELETE }
  );

  // Delete user
  await queryInterface.sequelize.query(
    'DELETE FROM users WHERE id = $1',
    { bind: [userId], type: QueryTypes.DELETE }
  );

  console.log('Rolled back admin user and all associated data');
};
