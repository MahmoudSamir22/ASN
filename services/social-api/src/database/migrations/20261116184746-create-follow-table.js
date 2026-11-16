'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('follows', {
      follower_id: {
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
      followee_id: {
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

    await queryInterface.addConstraint('follows', {
      fields: ['follower_id', 'followee_id'],
      type: 'check',
      name: 'follows_follower_id_not_equal_followee_id',
      where: {
        follower_id: {
          [Sequelize.Op.ne]: Sequelize.col('followee_id'),
        },
      },
    });

    await queryInterface.addIndex('follows', ['followee_id', { name: 'created_at', order: 'DESC' }], {
      name: 'follows_followee_id_created_at_idx',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('follows');
  },
};
