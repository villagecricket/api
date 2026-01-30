'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Check and add missing columns if they don't exist
        const tableInfo = await queryInterface.describeTable('TeamMasters');

        if (!tableInfo.Captain) {
            await queryInterface.addColumn('TeamMasters', 'Captain', {
                type: Sequelize.STRING,
                allowNull: true
            });
        }
        if (!tableInfo.Founded) {
            await queryInterface.addColumn('TeamMasters', 'Founded', {
                type: Sequelize.STRING,
                allowNull: true
            });
        }
        if (!tableInfo.Bio) {
            await queryInterface.addColumn('TeamMasters', 'Bio', {
                type: Sequelize.TEXT,
                allowNull: true
            });
        }
        if (!tableInfo.Slogan) {
            await queryInterface.addColumn('TeamMasters', 'Slogan', {
                type: Sequelize.STRING,
                allowNull: true
            });
        }
        if (!tableInfo.Location) {
            await queryInterface.addColumn('TeamMasters', 'Location', {
                type: Sequelize.STRING,
                allowNull: true
            });
        }
        if (!tableInfo.Coach) {
            await queryInterface.addColumn('TeamMasters', 'Coach', {
                type: Sequelize.STRING,
                allowNull: true
            });
        }
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('TeamMasters', 'Captain');
        await queryInterface.removeColumn('TeamMasters', 'Founded');
        await queryInterface.removeColumn('TeamMasters', 'Bio');
        await queryInterface.removeColumn('TeamMasters', 'Slogan');
        await queryInterface.removeColumn('TeamMasters', 'Location');
        await queryInterface.removeColumn('TeamMasters', 'Coach');
    }
};
