const { AuctionPlayer } = require('../models');
const playerService = require('../services/players-master.service')
const ApiError = require('../utils/ApiError');
const response = require('../utils/response');
const { PLAYERS } = require('../utils/messages');
const HTTP = require('../utils/httpStatusCodes');

const createAuctionPlayers = async (data) => {
    const { SessionID, BasePrice, Mobile } = data;

    let players = await playerService.findPlayer({ Mobile });

    if (!players) {
        players = await playerService.createPlayers(data);
    }

    const existingPoolEntry = await AuctionPlayer.findOne({
        where: { SessionID, PlayerID: players.PlayerID }
    });

    if (existingPoolEntry) {
        throw new ApiError(HTTP.CONFLICT, 'Player is already registered for this auction.');
    }

    const payload = {
        SessionID,
        PlayerID: players.PlayerID,
        BasePrice,
        Status: 'available'
    }

    return await AuctionPlayer.create(payload);
};

module.exports = { createAuctionPlayers }
