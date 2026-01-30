'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('TournamentTeams', {
            ID: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            TournamentID: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Tournaments',
                    key: 'TournamentID'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            TeamID: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'TeamMasters',
                    key: 'TeamID'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
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

        // Add unique constraint to prevent duplicate team entries in same tournament
        await queryInterface.addConstraint('TournamentTeams', {
            fields: ['TournamentID', 'TeamID'],
            type: 'unique',
            name: 'unique_tournament_team'
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('TournamentTeams');
    }
};
