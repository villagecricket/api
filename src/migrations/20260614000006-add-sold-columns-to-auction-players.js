'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // SoldPrice: the final hammer price (if not exists)
    try {
      await queryInterface.addColumn('AuctionPlayers', 'SoldPrice', {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true
      });
    } catch (err) {
      if (!err.message.includes('Duplicate column') && !err.message.includes('already exists')) throw err;
    }

    // TeamID: which team won the player (if not exists)
    try {
      await queryInterface.addColumn('AuctionPlayers', 'TeamID', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'TeamMasters', key: 'TeamID' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      });
    } catch (err) {
      if (!err.message.includes('Duplicate column') && !err.message.includes('already exists')) throw err;
    }
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('AuctionPlayers', 'SoldPrice');
    await queryInterface.removeColumn('AuctionPlayers', 'TeamID');
  }
};