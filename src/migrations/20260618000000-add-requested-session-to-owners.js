'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.addColumn('Owners', 'RequestedSessionID', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'AuctionSessions', key: 'SessionID' }
      });
    } catch (err) {
      if (!err.message.includes('Duplicate column') && !err.message.includes('already exists')) throw err;
    }
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('Owners', 'RequestedSessionID');
  }
};