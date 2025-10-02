import { QueryInterface, DataTypes } from 'sequelize';
import { MigrationFn } from 'umzug';

type Ctx = {
  queryInterface: QueryInterface;
};

export const up: MigrationFn<Ctx> = async ({ context: { queryInterface } }) => {
  await queryInterface.addColumn('categories', 'user_id', {
    type: DataTypes.BIGINT,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  });

  // Add index for better performance
  await queryInterface.addIndex('categories', ['user_id']);
};

export const down: MigrationFn<Ctx> = async ({ context: { queryInterface } }) => {
  await queryInterface.removeIndex('categories', ['user_id']);
  await queryInterface.removeColumn('categories', 'user_id');
};
