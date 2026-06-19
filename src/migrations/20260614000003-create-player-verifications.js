'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PlayerVerifications', {
      VerificationID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PlayerID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'PlayerMasters',
          key: 'PlayerID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      DocumentPath: {
        type: Sequelize.STRING,
        allowNull: false
      },
      DocumentType: {
        type: Sequelize.STRING,
        allowNull: true
      },
      Status: {
        type: Sequelize.ENUM('pending', 'verified', 'rejected'),
        defaultValue: 'pending',
        allowNull: false
      },
      Notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      VerifiedBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'UserID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      VerifiedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PlayerVerifications');
  }
};
