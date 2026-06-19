'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add UserID to PlayerMasters (if not exists)
    try {
      await queryInterface.addColumn('PlayerMasters', 'UserID', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'UserID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      });
    } catch (err) {
      if (!err.message.includes('Duplicate column') && !err.message.includes('already exists')) throw err;
    }

    // Add TeamID to Owners (if not exists)
    try {
      await queryInterface.addColumn('Owners', 'TeamID', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'TeamMasters',
          key: 'TeamID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      });
    } catch (err) {
      if (!err.message.includes('Duplicate column') && !err.message.includes('already exists')) throw err;
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('PlayerMasters', 'UserID');
    await queryInterface.removeColumn('Owners', 'TeamID');
  }
};