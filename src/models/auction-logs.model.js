module.exports = (sequelize, DataTypes) => {
    const AuctionLog = sequelize.define('AuctionLog', {
        AuctionLogsID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        event: {
            type: DataTypes.STRING,
            allowNull: false
        },
        SessionID: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        TeamID: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        PlayerID: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        tableName: 'AuctionLogs',
        timestamps: true,
        createdAt: 'CreatedAt',
        updatedAt: 'UpdatedAt'
    });

    AuctionLog.associate = (models) => {
        AuctionLog.belongsTo(models.AuctionSession, { foreignKey: 'SessionID' });
        AuctionLog.belongsTo(models.PlayerMaster, { foreignKey: 'PlayerID' });
        AuctionLog.belongsTo(models.TeamMaster, { foreignKey: 'TeamID' });
    };

    return AuctionLog;
};
