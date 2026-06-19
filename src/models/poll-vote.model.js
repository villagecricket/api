module.exports = (sequelize, DataTypes) => {
    const PollVote = sequelize.define('PollVote', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        PollId: { type: DataTypes.INTEGER, allowNull: false },
        OptionId: { type: DataTypes.INTEGER, allowNull: false },
        PlayerId: { type: DataTypes.INTEGER, allowNull: false }
    }, {
        tableName: 'PollVotes',
        timestamps: true,
        createdAt: 'CreatedAt',
        updatedAt: 'UpdatedAt'
    });

    PollVote.associate = (models) => {
        PollVote.belongsTo(models.Poll, { foreignKey: 'PollId' });
        PollVote.belongsTo(models.PollOption, { foreignKey: 'OptionId' });
        PollVote.belongsTo(models.PlayerMaster, { foreignKey: 'PlayerId' });
    };

    return PollVote;
};
