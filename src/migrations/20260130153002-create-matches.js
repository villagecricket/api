'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Matches', {
            MatchID: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            TournamentID: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'Tournaments',
                    key: 'TournamentID'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            MatchNumber: {
                type: Sequelize.INTEGER
            },
            TeamA_ID: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'TeamMasters',
                    key: 'TeamID'
                }
            },
            TeamB_ID: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'TeamMasters',
                    key: 'TeamID'
                }
            },
            MatchDate: {
                type: Sequelize.DATE
            },
            Venue: {
                type: Sequelize.STRING
            },
            Status: {
                type: Sequelize.ENUM('Scheduled', 'Live', 'Completed', 'Abandoned'),
                defaultValue: 'Scheduled'
            },
            TossWinnerID: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'TeamMasters',
                    key: 'TeamID'
                }
            },
            TossDecision: {
                type: Sequelize.ENUM('Bat', 'Bowl'),
                allowNull: true
            },
            WinnerID: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'TeamMasters',
                    key: 'TeamID'
                }
            },
            ResultNote: {
                type: Sequelize.STRING
            },
            CurrentInnings: {
                type: Sequelize.INTEGER,
                defaultValue: 1
            },
            TeamA_Runs: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            TeamA_Wickets: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            TeamA_Overs: {
                type: Sequelize.FLOAT,
                defaultValue: 0.0
            },
            TeamB_Runs: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            TeamB_Wickets: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            TeamB_Overs: {
                type: Sequelize.FLOAT,
                defaultValue: 0.0
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
        await queryInterface.dropTable('Matches');
    }
};
