import { sequelize } from '../config/database';
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import UserStatus from '../enums/user-status.enum';
import { literal } from 'sequelize';

export type UserAttributes = InferAttributes<User>;
export type UserCreationAttributes = InferCreationAttributes<User>;

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: string;
  declare auth0_sub: string;
  declare username: string;
  declare display_name: string;
  declare bio: CreationOptional<string | null>;
  declare avatar_key: CreationOptional<string | null>;
  declare cover_key: CreationOptional<string | null>;
  declare signup_country: CreationOptional<string | null>;
  declare device_type: CreationOptional<string | null>;
  declare status: CreationOptional<UserStatus>;
  declare sessions_valid_after: CreationOptional<Date | null>;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
  declare deleted_at: CreationOptional<Date | null>;
  declare deletion_requested_at: CreationOptional<Date | null>;
  declare purge_after: CreationOptional<Date | null>;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: literal('uuidv7()'),
    },
    auth0_sub: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    display_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    avatar_key: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cover_key: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    signup_country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    device_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: UserStatus.ACTIVE,
    },
    sessions_valid_after: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deletion_requested_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    purge_after: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

export default User;
