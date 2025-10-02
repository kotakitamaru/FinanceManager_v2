import { QueryInterface, DataTypes } from 'sequelize';
import { MigrationFn } from 'umzug';

type Ctx = {
  queryInterface: QueryInterface;
};

export const up: MigrationFn<Ctx> = async ({ context: { queryInterface } }) => {
  await queryInterface.createTable('transactions', {
    id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    amount: {type: DataTypes.DECIMAL, allowNull: false},
    note: {type: DataTypes.STRING, allowNull: false},
    date: {type: DataTypes.DATE, allowNull: false,},
    category_id: {type: DataTypes.INTEGER, allowNull: false},
    account_id: {type: DataTypes.INTEGER, allowNull: false},
    create_date: {type: DataTypes.DATE, allowNull: false},
    update_date: {type: DataTypes.DATE, allowNull: false},
  });
};

export const down: MigrationFn<Ctx> = async ({ context: { queryInterface } }) => {
  await queryInterface.dropTable('transactions');
};