module.exports = (sequelize, DataTypes) => {
    const Gallery = sequelize.define('Gallery', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        Title: { type: DataTypes.STRING },
        Description: { type: DataTypes.TEXT },
        Category: { type: DataTypes.STRING, defaultValue: 'General' },
        ImageURL: { type: DataTypes.STRING, allowNull: false },
        ThumbnailURL: { type: DataTypes.STRING },
        UploadedBy: { type: DataTypes.STRING },
        IsActive: { type: DataTypes.BOOLEAN, defaultValue: true },
        Order: { type: DataTypes.INTEGER, defaultValue: 0 },
        Tags: { type: DataTypes.JSON },
        Date: { type: DataTypes.DATE }
    }, {
        tableName: 'Galleries',
        timestamps: true
    });

    return Gallery;
};
