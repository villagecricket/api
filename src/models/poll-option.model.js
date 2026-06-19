module.exports = (sequelize, DataTypes) => {
    const PollOption = sequelize.define('PollOption', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        PollId: { type: DataTypes.INTEGER, allowNull: false },
        OptionText: { type: DataTypes.STRING, allowNull: false },
        Votes: { type: DataTypes.INTEGER, defaultValue: 0 },
        Order: { type: DataTypes.INTEGER, defaultValue: 0 }
    }, {
        tableName: 'PollOptions',
        timestamps: true,
        createdAt: 'CreatedAt',
        updatedAt: 'UpdatedAt'
    });

    PollOption.associate = (models) => {
        PollOption.belongsTo(models.Poll, { foreignKey: 'PollId' });
    };

    return PollOption;
};
