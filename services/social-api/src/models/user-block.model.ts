import { sequelize } from '../config/database';
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

class UserBlock extends Model<InferAttributes<UserBlock>, InferCreationAttributes<UserBlock>> {
  declare blocker_id: string;
  declare blocked_id: string;
  declare created_at: CreationOptional<Date>;
}

UserBlock.init(
  {
    blocker_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    blocked_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'user_blocks',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    validate: {
      distinctUsers() {
        if (this.blocker_id === this.blocked_id) {
          throw new Error('A user cannot block themselves');
        }
      },
    },
  },
);

export default UserBlock;
