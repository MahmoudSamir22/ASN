import { sequelize } from '../config/database';
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

class UserPrivacySettings extends Model<
  InferAttributes<UserPrivacySettings>,
  InferCreationAttributes<UserPrivacySettings>
> {
  declare user_id: string;
  declare show_online_status: CreationOptional<boolean>;
  declare comments_public: CreationOptional<boolean>;
  declare likes_public: CreationOptional<boolean>;
  declare reposts_public: CreationOptional<boolean>;
  declare follows_public: CreationOptional<boolean>;
}

UserPrivacySettings.init(
  {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    show_online_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    comments_public: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    likes_public: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    reposts_public: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    follows_public: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'user_privacy_settings',
    timestamps: false,
  },
);

export default UserPrivacySettings;
