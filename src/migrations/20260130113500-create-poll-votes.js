module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('PollVotes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            PollId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Polls',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            OptionId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'PollOptions',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            PlayerId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'PlayerMasters',
                    key: 'PlayerID'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });

        await queryInterface.addConstraint('PollVotes', {
            fields: ['PollId', 'PlayerId'],
            type: 'unique',
            name: 'unique_poll_player_vote'
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('PollVotes');
    }
};
