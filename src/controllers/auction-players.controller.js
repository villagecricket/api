const playerService = require('../services/players-master.service');
const auctionPlayerService = require('../services/auction-players.service');

const response = require('../utils/response');
const { PLAYERS } = require('../utils/messages');
const HTTP = require('../utils/httpStatusCodes');


exports.createAuctionPlayer = async (req, res) => {

    const { SessionID, Mobile } = req.body;

    if (!SessionID) {
        return response.error(res, PLAYERS.MISSINGID);
    }

    try {
        const auctionPlayer = await auctionPlayerService.createAuctionPlayers(req.body);
        return response.success(res, PLAYERS.CREATED, { auctionPlayer }, HTTP.CREATED);
    } catch (error) {
        return response.error(res, { message: error.message }, error.statusCode || HTTP.BAD_REQUEST);
    }
};
