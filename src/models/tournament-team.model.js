module.exports = (sequelize, DataTypes) => {
    const TournamentTeam = sequelize.define('TournamentTeam', {
        ID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        TournamentID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        TeamID: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'TournamentTeams',
        timestamps: true,
        createdAt: 'CreatedAt',
        updatedAt: 'UpdatedAt'
    });

    return TournamentTeam;
};
