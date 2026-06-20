'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn('AppSettings', 'UPIScannerImageURL', {
        type: Sequelize.STRING,
        allowNull: true
      }, { transaction });

      await queryInterface.addColumn('AppSettings', 'UPIName', {
        type: Sequelize.STRING,
        allowNull: true
      }, { transaction });

      await queryInterface.addColumn('AppSettings', 'UPIId', {
        type: Sequelize.STRING,
        allowNull: true
      }, { transaction });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('AppSettings', 'UPIScannerImageURL', { transaction });
      await queryInterface.removeColumn('AppSettings', 'UPIName', { transaction });
      await queryInterface.removeColumn('AppSettings', 'UPIId', { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
