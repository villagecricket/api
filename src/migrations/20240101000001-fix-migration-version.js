'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // This migration records that previous migrations are already complete
    // Skip - just to allow migrations to proceed
  },

  down: async (queryInterface, Sequelize) => {
    // Nothing to undo
  }
};
