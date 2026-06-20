module.exports = (sequelize, DataTypes) => {
    const AppSetting = sequelize.define('AppSetting', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        AppName: { type: DataTypes.STRING, defaultValue: 'Village Cricket' },
        AppLogoURL: { type: DataTypes.STRING },
        AppDescription: { type: DataTypes.TEXT },
        PrimaryColor: { type: DataTypes.STRING, defaultValue: '#1a73e8' },
        SecondaryColor: { type: DataTypes.STRING, defaultValue: '#34a853' },
        ContactEmail: { type: DataTypes.STRING },
        ContactPhone: { type: DataTypes.STRING },
        Address: { type: DataTypes.TEXT },
        FacebookURL: { type: DataTypes.STRING },
        InstagramURL: { type: DataTypes.STRING },
        TwitterURL: { type: DataTypes.STRING },
        YoutubeURL: { type: DataTypes.STRING },
        UPIScannerImageURL: { type: DataTypes.STRING },
        UPIName: { type: DataTypes.STRING },
        UPIId: { type: DataTypes.STRING }
    }, {
        tableName: 'AppSettings',
        timestamps: true,
        createdAt: 'CreatedAt',
        updatedAt: 'UpdatedAt'
    });

    return AppSetting;
};
