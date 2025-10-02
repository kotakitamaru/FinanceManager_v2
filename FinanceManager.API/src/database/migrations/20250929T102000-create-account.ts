import { QueryInterface, DataTypes } from 'sequelize';
import { MigrationFn } from 'umzug';

type Ctx = {
  queryInterface: QueryInterface;
};

export const up: MigrationFn<Ctx> = async ({ context: { queryInterface } }) => {
  await queryInterface.createTable('accounts', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false, unique: true },
    icon: { type: DataTypes.STRING , allowNull: false},
    color: { type: DataTypes.STRING, allowNull: false},
    create_date: { type: DataTypes.DATE, allowNull: false},
    update_date: { type: DataTypes.DATE, allowNull: false},
  });

  await queryInterface.bulkInsert('accounts', [
    {title: 'Card', icon: 'card', color: '#2ecc71', create_date: new Date(), update_date: new Date()},
    {title: 'Cash', icon: 'cash', color: '#2ecc71', create_date: new Date(), update_date: new Date()},
  ]);
};

export const down: MigrationFn<Ctx> = async ({ context: { queryInterface } }) => {
  await queryInterface.dropTable('accounts');
};