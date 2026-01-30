module.exports = (sequelize, DataTypes) => {
    const Poll = sequelize.define('Poll', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        Question: { type: DataTypes.STRING, allowNull: false },
        Description: { type: DataTypes.TEXT },
        IsActive: { type: DataTypes.BOOLEAN, defaultValue: true },
        EndDate: { type: DataTypes.DATE },
        TotalVotes: { type: DataTypes.INTEGER, defaultValue: 0 }
    }, {
        tableName: 'Polls',
        timestamps: true
    });

    Poll.associate = (models) => {
        Poll.hasMany(models.PollOption, { foreignKey: 'PollId', as: 'options' });
        Poll.hasMany(models.PollVote, { foreignKey: 'PollId', as: 'votes' });
    };

    return Poll;
};
