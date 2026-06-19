module.exports = (sequelize, DataTypes) => {
    const AuctionBid = sequelize.define('AuctionBid', {
        AuctionBidsID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        PlayerID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        TeamID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        SessionID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        BidAmount: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'AuctionBids',
        timestamps: true,
        createdAt: 'CreatedAt',
        updatedAt: 'UpdatedAt'
    });

    AuctionBid.associate = (models) => {
        AuctionBid.belongsTo(models.AuctionSession, { foreignKey: 'SessionID' });
        AuctionBid.belongsTo(models.PlayerMaster, { foreignKey: 'PlayerID' });
        AuctionBid.belongsTo(models.TeamMaster, { foreignKey: 'TeamID' });
    };

    return AuctionBid;
};
