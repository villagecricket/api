const { Gallery, Carousel, Sponsor, AppSetting } = require('../models');

// Gallery Services
exports.getAllGallery = async (query = {}) => {
    return await Gallery.findAll({ where: query, order: [['Order', 'ASC'], ['createdAt', 'DESC']] });
};

exports.createGallery = async (data) => {
    return await Gallery.create(data);
};

exports.updateGallery = async (id, data) => {
    const record = await Gallery.findByPk(id);
    if (!record) return null;
    return await record.update(data);
};

exports.deleteGallery = async (id) => {
    const record = await Gallery.findByPk(id);
    if (!record) return null;
    await record.destroy();
    return true;
};

// Carousel Services
exports.getAllCarousel = async (query = {}) => {
    return await Carousel.findAll({ where: query, order: [['Order', 'ASC']] });
};

exports.createCarousel = async (data) => {
    return await Carousel.create(data);
};

exports.updateCarousel = async (id, data) => {
    const record = await Carousel.findByPk(id);
    if (!record) return null;
    return await record.update(data);
};

exports.deleteCarousel = async (id) => {
    const record = await Carousel.findByPk(id);
    if (!record) return null;
    await record.destroy();
    return true;
};

// Sponsor Services
exports.getAllSponsors = async (query = {}) => {
    return await Sponsor.findAll({ where: query, order: [['Order', 'ASC']] });
};

exports.createSponsor = async (data) => {
    return await Sponsor.create(data);
};

exports.updateSponsor = async (id, data) => {
    const record = await Sponsor.findByPk(id);
    if (!record) return null;
    return await record.update(data);
};

exports.deleteSponsor = async (id) => {
    const record = await Sponsor.findByPk(id);
    if (!record) return null;
    await record.destroy();
    return true;
};

// AppSettings Services
exports.getAppSettings = async () => {
    let settings = await AppSetting.findOne();
    if (!settings) {
        settings = await AppSetting.create({
            AppName: 'Kattur Cricket Club',
            AppDescription: 'Village Cricket League Management System'
        });
    }
    return settings;
};

exports.updateAppSettings = async (data) => {
    let settings = await AppSetting.findOne();
    if (!settings) {
        return await AppSetting.create(data);
    }
    return await settings.update(data);
};
