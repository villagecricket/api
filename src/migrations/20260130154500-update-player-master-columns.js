'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const tableInfo = await queryInterface.describeTable('PlayerMasters');

        const columnsToAdd = {
            Address: { type: Sequelize.TEXT, allowNull: true },
            BattingPosition: { type: Sequelize.STRING, allowNull: true },
            CanKeep: { type: Sequelize.BOOLEAN, defaultValue: false },
            CanCaptain: { type: Sequelize.BOOLEAN, defaultValue: false },
            CanField: { type: Sequelize.BOOLEAN, defaultValue: true },
            Height: { type: Sequelize.STRING, allowNull: true },
            Weight: { type: Sequelize.STRING, allowNull: true },
            JerseySize: { type: Sequelize.STRING, allowNull: true },
            PreviousTeam: { type: Sequelize.STRING, allowNull: true },
            Experience: { type: Sequelize.STRING, allowNull: true },
            Bio: { type: Sequelize.TEXT, allowNull: true },
            Nickname: { type: Sequelize.STRING, allowNull: true },
            EmergencyContact: { type: Sequelize.STRING, allowNull: true }
        };

        for (const [colName, colDef] of Object.entries(columnsToAdd)) {
            if (!tableInfo[colName]) {
                await queryInterface.addColumn('PlayerMasters', colName, colDef);
            }
        }
    },

    down: async (queryInterface, Sequelize) => {
        const columnsToRemove = [
            'Address', 'BattingPosition', 'CanKeep', 'CanCaptain',
            'CanField', 'Height', 'Weight', 'JerseySize',
            'PreviousTeam', 'Experience', 'Bio', 'Nickname', 'EmergencyContact'
        ];

        for (const colName of columnsToRemove) {
            await queryInterface.removeColumn('PlayerMasters', colName);
        }
    }
};
