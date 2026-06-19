const { Op } = require('sequelize');
const { AuctionSession, AuctionTeam, TeamMaster } = require('../models');
const BaseService = require('./base.service');

const service = new BaseService(AuctionSession);

const getAllAuctionSessions = async () => {
    return await service.getAll();
};

const getUpcomingAuctionSessions = async () => {
    const sessions = await AuctionSession.findAll({
        where: {
            Status: { [Op.in]: ['upcoming', 'live'] },
        },
        order: [['StartDate', 'ASC']],
        include: [
            {
                model: AuctionTeam,
                required: false,
                include: [
                    { model: TeamMaster, attributes: ['TeamID', 'Name', 'LogoURL', 'Location'] }
                ]
            }
        ]
    });
    return sessions;
};

const getAuctionSessionById = async (id) => {
    return await service.getById(id);
};

const createAuctionSession = async (data) => {
    return await service.create(data);
};

const updateAuctionSession = async (id, data) => {
    return await service.update(id, data);
};

const deleteAuctionSession = async (id) => {
    return await service.delete(id);
};

module.exports = {
    getAllAuctionSessions,
    getUpcomingAuctionSessions,
    getAuctionSessionById,
    createAuctionSession,
    updateAuctionSession,
    deleteAuctionSession
};
