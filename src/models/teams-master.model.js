module.exports = (sequelize, DataTypes) => {
    const TeamMaster = sequelize.define('TeamMaster', {
        TeamID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        LogoURL: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Captain: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Founded: {
            type: DataTypes.STRING,
            allowNull: true
        },
        OwnerName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Contact: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Bio: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        Slogan: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Location: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Coach: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'TeamMasters',
        timestamps: true,
        createdAt: 'CreatedAt',
        updatedAt: 'UpdatedAt'
    });

    TeamMaster.associate = function (models) {
        TeamMaster.hasMany(models.AuctionTeam, {
            foreignKey: 'TeamID',
            as: 'AuctionTeams'
        });
        // Add association with TournamentTeams if needed
    };

    return TeamMaster;
};
