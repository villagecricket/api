module.exports = (sequelize, DataTypes) => {
    const Tournament = sequelize.define('Tournament', {
        TournamentID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Description: DataTypes.TEXT,
        BannerURL: DataTypes.STRING,
        LogoURL: DataTypes.STRING,
        Type: {
            type: DataTypes.ENUM('League', 'Knockout', 'Hybrid'),
            defaultValue: 'League'
        },
        Status: {
            type: DataTypes.ENUM('Upcoming', 'Ongoing', 'Completed'),
            defaultValue: 'Upcoming'
        },
        StartDate: DataTypes.DATE,
        EndDate: DataTypes.DATE,
        Location: DataTypes.STRING,
        Organizer: DataTypes.STRING,
        PrizePool: DataTypes.STRING,
        Rules: DataTypes.TEXT,
        Category: DataTypes.STRING
    }, {
        tableName: 'Tournaments',
        timestamps: true,
        createdAt: 'CreatedAt',
        updatedAt: 'UpdatedAt'
    });

    Tournament.associate = (models) => {
        Tournament.belongsToMany(models.TeamMaster, {
            through: 'TournamentTeams',
            foreignKey: 'TournamentID',
            otherKey: 'TeamID',
            as: 'Teams'
        });
        Tournament.hasMany(models.Match, {
            foreignKey: 'TournamentID',
            as: 'Matches'
        });
    };

    return Tournament;
};
