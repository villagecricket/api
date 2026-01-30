'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Sponsors', {
            id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
            Name: { type: Sequelize.STRING, allowNull: false },
            LogoURL: { type: Sequelize.STRING, allowNull: false },
            Description: { type: Sequelize.STRING },
            WebsiteURL: { type: Sequelize.STRING },
            Order: { type: Sequelize.INTEGER, defaultValue: 0 },
            IsActive: { type: Sequelize.BOOLEAN, defaultValue: true },
            createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
            updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('Sponsors');
    }
};
