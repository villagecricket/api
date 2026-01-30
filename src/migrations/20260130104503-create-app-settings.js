'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('AppSettings', {
            id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
            AppName: { type: Sequelize.STRING, defaultValue: 'Village Cricket' },
            AppLogoURL: { type: Sequelize.STRING },
            AppDescription: { type: Sequelize.TEXT },
            PrimaryColor: { type: Sequelize.STRING, defaultValue: '#1a73e8' },
            SecondaryColor: { type: Sequelize.STRING, defaultValue: '#34a853' },
            ContactEmail: { type: Sequelize.STRING },
            ContactPhone: { type: Sequelize.STRING },
            Address: { type: Sequelize.TEXT },
            FacebookURL: { type: Sequelize.STRING },
            InstagramURL: { type: Sequelize.STRING },
            TwitterURL: { type: Sequelize.STRING },
            YoutubeURL: { type: Sequelize.STRING },
            createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
            updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
        });

        // Insert default settings
        await queryInterface.bulkInsert('AppSettings', [{
            AppName: 'Kattur Cricket Club',
            AppDescription: 'Village Cricket League Management System',
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('AppSettings');
    }
};
