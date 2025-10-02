import { QueryInterface, DataTypes } from 'sequelize';
import { MigrationFn } from 'umzug';

type Ctx = {
  queryInterface: QueryInterface;
};

export const up: MigrationFn<Ctx> = async ({ context: { queryInterface } }) => {
  await queryInterface.createTable('categories', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false, unique: true},
    icon: {type: DataTypes.STRING, allowNull: false},
    is_income: {type: DataTypes.BOOLEAN, allowNull: false},
    color: {type: DataTypes.STRING, allowNull: false},
    created_at: {type: DataTypes.DATE, allowNull: false},
    updated_at: {type: DataTypes.DATE, allowNull: true},
  });

  await queryInterface.bulkInsert('categories', [
    {title: 'Salary', icon: 'wallet', is_income: true, color: '#2ecc71', created_at: new Date()},
    {title: 'Gift', icon: 'gift', is_income: true, color: '#27ae60', created_at: new Date()},
    {title: 'Groceries', icon: 'shopping-cart', is_income: false, color: '#e74c3c', created_at: new Date()},
    {title: 'Transport', icon: 'bus', is_income: false, color: '#e74c3c', created_at: new Date()},
    {title: 'Utilities', icon: 'bolt', is_income: false, color: '#e74c3c', created_at: new Date()},
    {title: 'Entertainment', icon: 'gamepad', is_income: false, color: '#e74c3c', created_at: new Date()},
    {title: 'Cafes and restaurants', icon: 'cafe', is_income: false, color: '#e74c3c', created_at: new Date()},
    {title: 'Health', icon: 'heart', is_income: false, color: '#e74c3c', created_at: new Date()},
    {title: 'Clothes', icon: 'clothes', is_income: false, color: '#e74c3c', created_at: new Date()},
    {title: 'Gambling', icon: 'casino', is_income: false, color: '#e74c3c', created_at: new Date()},
    {title: 'Housing', icon: 'house', is_income: false, color: '#e74c3c', created_at: new Date()},
    {title: 'Sport', icon: 'house', is_income: false, color: '#e74c3c', created_at: new Date()},
  ]);
};

export const down: MigrationFn<Ctx> = async ({ context: { queryInterface } }) => {
  await queryInterface.dropTable('categories');
};