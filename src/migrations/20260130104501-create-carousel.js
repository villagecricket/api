'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Carousels', {
            id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
            Title: { type: Sequelize.STRING },
            Description: { type: Sequelize.TEXT },
            ImageURL: { type: Sequelize.STRING, allowNull: false },
            AltText: { type: Sequelize.STRING },
            Order: { type: Sequelize.INTEGER, defaultValue: 0 },
            IsActive: { type: Sequelize.BOOLEAN, defaultValue: true },
            createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
            updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('Carousels');
    }
};
