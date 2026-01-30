'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Galleries', {
            id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
            Title: { type: Sequelize.STRING },
            Description: { type: Sequelize.TEXT },
            Category: { type: Sequelize.STRING, defaultValue: 'General' },
            ImageURL: { type: Sequelize.STRING, allowNull: false },
            ThumbnailURL: { type: Sequelize.STRING },
            UploadedBy: { type: Sequelize.STRING },
            IsActive: { type: Sequelize.BOOLEAN, defaultValue: true },
            Order: { type: Sequelize.INTEGER, defaultValue: 0 },
            Tags: { type: Sequelize.JSON },
            Date: { type: Sequelize.DATE },
            createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
            updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('Galleries');
    }
};
