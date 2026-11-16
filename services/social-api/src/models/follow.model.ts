import { sequelize } from '../config/database';
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

class Follow extends Model<InferAttributes<Follow>, InferCreationAttributes<Follow>> {
  declare follower_id: string;
  declare followee_id: string;
  declare created_at: CreationOptional<Date>;
}

Follow.init(
  {
    follower_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    followee_id: {
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
    tableName: 'follows',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    indexes: [
      {
        name: 'follows_followee_id_created_at_idx',
        fields: ['followee_id', { name: 'created_at', order: 'DESC' }],
      },
    ],
    validate: {
      distinctUsers() {
        if (this.follower_id === this.followee_id) {
          throw new Error('A user cannot follow themselves');
        }
      },
    },
  },
);

export default Follow;
