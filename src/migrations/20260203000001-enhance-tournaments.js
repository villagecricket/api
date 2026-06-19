'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Helper to add column only if it doesn't exist
        const addColumnIfNotExists = async (tableName, columnName, columnDefinition) => {
            try {
                await queryInterface.addColumn(tableName, columnName, columnDefinition);
            } catch (err) {
                // Column already exists, skip
                if (!err.message.includes('Duplicate column') && !err.message.includes('already exists')) {
                    throw err;
                }
            }
        };

        // Add new columns to Tournaments table
        await addColumnIfNotExists('Tournaments', 'RegistrationStartDate', {
            type: Sequelize.DATE,
            allowNull: true
        });

        await addColumnIfNotExists('Tournaments', 'RegistrationEndDate', {
            type: Sequelize.DATE,
            allowNull: true
        });

        await addColumnIfNotExists('Tournaments', 'IsRegistrationOpen', {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        });

        await addColumnIfNotExists('Tournaments', 'MaxTeams', {
            type: Sequelize.INTEGER,
            defaultValue: 16
        });

        await addColumnIfNotExists('Tournaments', 'MinTeams', {
            type: Sequelize.INTEGER,
            defaultValue: 4
        });

        await addColumnIfNotExists('Tournaments', 'CurrentTeamsCount', {
            type: Sequelize.INTEGER,
            defaultValue: 0
        });

        await addColumnIfNotExists('Tournaments', 'MatchFormat', {
            type: Sequelize.ENUM('T20', 'ODI', 'Test', 'T10', 'The100', 'Custom'),
            defaultValue: 'T20'
        });

        await addColumnIfNotExists('Tournaments', 'OversPerMatch', {
            type: Sequelize.INTEGER,
            defaultValue: 20,
            comment: 'Number of overs per innings'
        });

        await addColumnIfNotExists('Tournaments', 'PlayersPerTeam', {
            type: Sequelize.INTEGER,
            defaultValue: 11
        });

        await addColumnIfNotExists('Tournaments', 'RegistrationFee', {
            type: Sequelize.DECIMAL(10, 2),
            defaultValue: 0.00
        });

        await addColumnIfNotExists('Tournaments', 'ContactEmail', {
            type: Sequelize.STRING,
            allowNull: true
        });

        await addColumnIfNotExists('Tournaments', 'ContactPhone', {
            type: Sequelize.STRING,
            allowNull: true
        });

        await addColumnIfNotExists('Tournaments', 'WebsiteURL', {
            type: Sequelize.STRING,
            allowNull: true
        });

        await addColumnIfNotExists('Tournaments', 'IsPublic', {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
            comment: 'Whether tournament is visible to public'
        });

        await addColumnIfNotExists('Tournaments', 'VenueName', {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'Primary venue/ground name'
        });

        await addColumnIfNotExists('Tournaments', 'City', {
            type: Sequelize.STRING,
            allowNull: true
        });

        await addColumnIfNotExists('Tournaments', 'State', {
            type: Sequelize.STRING,
            allowNull: true
        });

        await addColumnIfNotExists('Tournaments', 'Country', {
            type: Sequelize.STRING,
            defaultValue: 'India'
        });

        await addColumnIfNotExists('Tournaments', 'GroupCount', {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            comment: 'Number of groups for group stage (0 for no groups)'
        });

        await addColumnIfNotExists('Tournaments', 'TeamsPerGroup', {
            type: Sequelize.INTEGER,
            defaultValue: 0
        });

        await addColumnIfNotExists('Tournaments', 'QualifiersCount', {
            type: Sequelize.INTEGER,
            defaultValue: 2,
            comment: 'Number of teams qualifying from each group'
        });

        await addColumnIfNotExists('Tournaments', 'PointsForWin', {
            type: Sequelize.INTEGER,
            defaultValue: 2
        });

        await addColumnIfNotExists('Tournaments', 'PointsForTie', {
            type: Sequelize.INTEGER,
            defaultValue: 1
        });

        await addColumnIfNotExists('Tournaments', 'PointsForNoResult', {
            type: Sequelize.INTEGER,
            defaultValue: 1
        });

        await addColumnIfNotExists('Tournaments', 'BallsPerOver', {
            type: Sequelize.INTEGER,
            defaultValue: 6
        });

        await addColumnIfNotExists('Tournaments', 'PowerplayOvers', {
            type: Sequelize.INTEGER,
            defaultValue: 6,
            comment: 'Number of powerplay overs'
        });

        await addColumnIfNotExists('Tournaments', 'FeaturedImage', {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'Featured/cover image URL'
        });
    },

    down: async (queryInterface, Sequelize) => {
        // Remove all added columns
        await queryInterface.removeColumn('Tournaments', 'RegistrationStartDate');
        await queryInterface.removeColumn('Tournaments', 'RegistrationEndDate');
        await queryInterface.removeColumn('Tournaments', 'IsRegistrationOpen');
        await queryInterface.removeColumn('Tournaments', 'MaxTeams');
        await queryInterface.removeColumn('Tournaments', 'MinTeams');
        await queryInterface.removeColumn('Tournaments', 'CurrentTeamsCount');
        await queryInterface.removeColumn('Tournaments', 'MatchFormat');
        await queryInterface.removeColumn('Tournaments', 'OversPerMatch');
        await queryInterface.removeColumn('Tournaments', 'PlayersPerTeam');
        await queryInterface.removeColumn('Tournaments', 'RegistrationFee');
        await queryInterface.removeColumn('Tournaments', 'ContactEmail');
        await queryInterface.removeColumn('Tournaments', 'ContactPhone');
        await queryInterface.removeColumn('Tournaments', 'WebsiteURL');
        await queryInterface.removeColumn('Tournaments', 'IsPublic');
        await queryInterface.removeColumn('Tournaments', 'VenueName');
        await queryInterface.removeColumn('Tournaments', 'City');
        await queryInterface.removeColumn('Tournaments', 'State');
        await queryInterface.removeColumn('Tournaments', 'Country');
        await queryInterface.removeColumn('Tournaments', 'GroupCount');
        await queryInterface.removeColumn('Tournaments', 'TeamsPerGroup');
        await queryInterface.removeColumn('Tournaments', 'QualifiersCount');
        await queryInterface.removeColumn('Tournaments', 'PointsForWin');
        await queryInterface.removeColumn('Tournaments', 'PointsForTie');
        await queryInterface.removeColumn('Tournaments', 'PointsForNoResult');
        await queryInterface.removeColumn('Tournaments', 'BallsPerOver');
        await queryInterface.removeColumn('Tournaments', 'PowerplayOvers');
        await queryInterface.removeColumn('Tournaments', 'FeaturedImage');
    }
};