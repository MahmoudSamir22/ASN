'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_blocks', {
      blocker_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      blocked_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });

    await queryInterface.addConstraint('user_blocks', {
      fields: ['blocker_id', 'blocked_id'],
      type: 'check',
      name: 'user_blocks_blocker_id_not_equal_blocked_id',
      where: {
        blocker_id: {
          [Sequelize.Op.ne]: Sequelize.col('blocked_id'),
        },
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('user_blocks');
  }
};
