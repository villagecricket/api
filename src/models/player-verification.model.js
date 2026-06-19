module.exports = (sequelize, DataTypes) => {
    const PlayerVerification = sequelize.define('PlayerVerification', {
        VerificationID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        PlayerID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        DocumentPath: {
            type: DataTypes.STRING,
            allowNull: false
        },
        DocumentType: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Status: {
            type: DataTypes.ENUM('pending', 'verified', 'rejected'),
            defaultValue: 'pending',
            allowNull: false
        },
        Notes: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        VerifiedBy: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        VerifiedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'PlayerVerifications',
        timestamps: true,
        createdAt: 'CreatedAt',
        updatedAt: 'UpdatedAt'
    });

    PlayerVerification.associate = (models) => {
        PlayerVerification.belongsTo(models.PlayerMaster, { foreignKey: 'PlayerID', as: 'Player' });
        PlayerVerification.belongsTo(models.User, { foreignKey: 'VerifiedBy', as: 'Verifier' });
    };

    return PlayerVerification;
};
