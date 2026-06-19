'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addColumn('AuctionTeams', 'RemainingBudget', {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true
      });
    } catch (err) {
      if (!err.message.includes('Duplicate column') && !err.message.includes('already exists')) throw err;
    }

    try {
      await queryInterface.addColumn('AuctionTeams', 'PlayersCount', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      });
    } catch (err) {
      if (!err.message.includes('Duplicate column') && !err.message.includes('already exists')) throw err;
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('AuctionTeams', 'RemainingBudget');
    await queryInterface.removeColumn('AuctionTeams', 'PlayersCount');
  }
};