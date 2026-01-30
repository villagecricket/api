module.exports = (sequelize, DataTypes) => {
    const Carousel = sequelize.define('Carousel', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        Title: { type: DataTypes.STRING },
        Description: { type: DataTypes.TEXT },
        ImageURL: { type: DataTypes.STRING, allowNull: false },
        AltText: { type: DataTypes.STRING },
        Order: { type: DataTypes.INTEGER, defaultValue: 0 },
        IsActive: { type: DataTypes.BOOLEAN, defaultValue: true }
    }, {
        tableName: 'Carousels',
        timestamps: true
    });

    return Carousel;
};
