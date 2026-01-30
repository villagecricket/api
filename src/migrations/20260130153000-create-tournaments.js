'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Tournaments', {
            TournamentID: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            Name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            Description: {
                type: Sequelize.TEXT
            },
            BannerURL: {
                type: Sequelize.STRING
            },
            Type: {
                type: Sequelize.ENUM('League', 'Knockout', 'Hybrid'),
                defaultValue: 'League'
            },
            Status: {
                type: Sequelize.ENUM('Upcoming', 'Ongoing', 'Completed'),
                defaultValue: 'Upcoming'
            },
            StartDate: {
                type: Sequelize.DATE
            },
            EndDate: {
                type: Sequelize.DATE
            },
            CreatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            UpdatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Tournaments');
    }
};
