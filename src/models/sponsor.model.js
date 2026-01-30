module.exports = (sequelize, DataTypes) => {
    const Sponsor = sequelize.define('Sponsor', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        Name: { type: DataTypes.STRING, allowNull: false },
        LogoURL: { type: DataTypes.STRING, allowNull: false },
        Description: { type: DataTypes.STRING },
        WebsiteURL: { type: DataTypes.STRING },
        Order: { type: DataTypes.INTEGER, defaultValue: 0 },
        IsActive: { type: DataTypes.BOOLEAN, defaultValue: true }
    }, {
        tableName: 'Sponsors',
        timestamps: true
    });

    return Sponsor;
};
