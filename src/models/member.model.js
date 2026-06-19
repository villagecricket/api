module.exports = (sequelize, DataTypes) => {
    const Member = sequelize.define('Member', {
        MemberID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        UserID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        FullName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ContactNumber: {
            type: DataTypes.STRING,
            allowNull: true
        },
        VerificationStatus: {
            type: DataTypes.ENUM('pending', 'approved', 'rejected'),
            defaultValue: 'pending',
            allowNull: false
        }
    }, {
        tableName: 'Members',
        timestamps: true,
        createdAt: 'CreatedAt',
        updatedAt: 'UpdatedAt'
    });

    Member.associate = (models) => {
        Member.belongsTo(models.User, { foreignKey: 'UserID', as: 'User' });
    };

    return Member;
};