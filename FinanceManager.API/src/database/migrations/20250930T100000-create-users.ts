import { QueryInterface, DataTypes } from 'sequelize';
import { MigrationFn } from 'umzug';

type Ctx = {
  queryInterface: QueryInterface;
};

export const up: MigrationFn<Ctx> = async ({ context: { queryInterface } }) => {
  await queryInterface.createTable('users', {
    id: { 
      type: DataTypes.BIGINT, 
      primaryKey: true, 
      autoIncrement: true 
    },
    email: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      unique: true 
    },
    name: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    password: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    created_at: { 
      type: DataTypes.DATE, 
      allowNull: false 
    },
    updated_at: { 
      type: DataTypes.DATE, 
      allowNull: false 
    },
  });
};

export const down: MigrationFn<Ctx> = async ({ context: { queryInterface } }) => {
  await queryInterface.dropTable('users');
};
