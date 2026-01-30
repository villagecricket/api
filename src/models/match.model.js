module.exports = (sequelize, DataTypes) => {
    const Match = sequelize.define('Match', {
        MatchID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        TournamentID: DataTypes.INTEGER,
        MatchNumber: DataTypes.INTEGER,
        TeamA_ID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        TeamB_ID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        MatchDate: DataTypes.DATE,
        Venue: DataTypes.STRING,
        Status: {
            type: DataTypes.ENUM('Scheduled', 'Live', 'Completed', 'Abandoned'),
            defaultValue: 'Scheduled'
        },
        TossWinnerID: DataTypes.INTEGER,
        TossDecision: DataTypes.ENUM('Bat', 'Bowl'),
        WinnerID: DataTypes.INTEGER,
        ResultNote: DataTypes.STRING,
        CurrentInnings: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        TeamA_Runs: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        TeamA_Wickets: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        TeamA_Overs: {
            type: DataTypes.FLOAT,
            defaultValue: 0.0
        },
        TeamB_Runs: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        TeamB_Wickets: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        TeamB_Overs: {
            type: DataTypes.FLOAT,
            defaultValue: 0.0
        }
    }, {
        tableName: 'Matches',
        timestamps: true,
        createdAt: 'CreatedAt',
        updatedAt: 'UpdatedAt'
    });

    Match.associate = (models) => {
        Match.belongsTo(models.Tournament, {
            foreignKey: 'TournamentID',
            as: 'Tournament'
        });
        Match.belongsTo(models.TeamMaster, {
            foreignKey: 'TeamA_ID',
            as: 'TeamA'
        });
        Match.belongsTo(models.TeamMaster, {
            foreignKey: 'TeamB_ID',
            as: 'TeamB'
        });
        Match.belongsTo(models.TeamMaster, {
            foreignKey: 'TossWinnerID',
            as: 'TossWinner'
        });
        Match.belongsTo(models.TeamMaster, {
            foreignKey: 'WinnerID',
            as: 'Winner'
        });
    };

    return Match;
};
