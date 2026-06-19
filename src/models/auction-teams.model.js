module.exports = (sequelize, DataTypes) => {
    const AuctionTeam = sequelize.define('AuctionTeam', {
        AuctionTeamID: { 
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true 
        },
        SessionID: { 
            type: DataTypes.INTEGER 
        },
        TeamID: { 
            type: DataTypes.INTEGER 
        },
        Budget: { 
            type: DataTypes.INTEGER 
        },
        RemainingBudget: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: true
        },
        PlayersCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        CreatedAt: DataTypes.DATE,
        UpdatedAt: DataTypes.DATE
    }, {
        tableName: 'AuctionTeams',
        timestamps: true,
        createdAt: 'CreatedAt',
        updatedAt: 'UpdatedAt'
    });

    AuctionTeam.associate = models => {
        AuctionTeam.belongsTo(models.AuctionSession, { foreignKey: 'SessionID' });
        AuctionTeam.belongsTo(models.TeamMaster, { foreignKey: 'TeamID' });
    };

    return AuctionTeam;
};
