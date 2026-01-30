module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Polls', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            Question: {
                type: Sequelize.STRING,
                allowNull: false
            },
            Description: {
                type: Sequelize.TEXT
            },
            IsActive: {
                type: Sequelize.BOOLEAN,
                defaultValue: true
            },
            EndDate: {
                type: Sequelize.DATE
            },
            TotalVotes: {
                type: Sequelize.INTEGER,
                defaultValue: 0
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

        await queryInterface.createTable('PollOptions', {
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
            OptionText: {
                type: Sequelize.STRING,
                allowNull: false
            },
            Votes: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            Order: {
                type: Sequelize.INTEGER,
                defaultValue: 0
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
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('PollOptions');
        await queryInterface.dropTable('Polls');
    }
};
