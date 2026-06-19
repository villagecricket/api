module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define('Payment', {
        PaymentID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        OwnerID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Amount: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false
        },
        TransactionID: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        ReceiptPath: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Status: {
            type: DataTypes.ENUM('pending', 'verified', 'rejected'),
            defaultValue: 'pending',
            allowNull: false
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
        tableName: 'Payments',
        timestamps: true,
        createdAt: 'CreatedAt',
        updatedAt: 'UpdatedAt'
    });

    Payment.associate = (models) => {
        Payment.belongsTo(models.Owner, { foreignKey: 'OwnerID', as: 'Owner' });
        Payment.belongsTo(models.User, { foreignKey: 'VerifiedBy', as: 'Verifier' });
    };

    return Payment;
};
