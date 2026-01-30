const matchService = require('../services/match.service');
const response = require('../utils/response');
const HTTP = require('../utils/httpStatusCodes');

exports.getAllMatches = async (req, res) => {
    const matches = await matchService.getAllMatches(req.query);
    return response.success(res, 'Matches fetched successfully', { matches });
};

exports.getMatchById = async (req, res) => {
    const { id } = req.params;
    const match = await matchService.getMatchById(id);
    if (!match) {
        return response.success(res, 'Match not found', {}, HTTP.NOT_FOUND);
    }
    return response.success(res, 'Match fetched successfully', { match });
};

exports.createMatch = async (req, res) => {
    const match = await matchService.createMatch(req.body);
    return response.success(res, 'Match created successfully', { match }, HTTP.CREATED);
};

exports.updateMatch = async (req, res) => {
    const { id } = req.params;
    const match = await matchService.updateMatch(id, req.body);
    if (!match) {
        return response.success(res, 'Match not found', {}, HTTP.NOT_FOUND);
    }
    return response.success(res, 'Match updated successfully', { match });
};

exports.deleteMatch = async (req, res) => {
    const { id } = req.params;
    const deleted = await matchService.deleteMatch(id);
    if (!deleted) {
        return response.success(res, 'Match not found', {}, HTTP.NOT_FOUND);
    }
    return response.success(res, 'Match deleted successfully', { deletedCount: deleted });
};

exports.getLiveScore = async (req, res) => {
    const { id } = req.params;
    const liveScore = await matchService.getLiveScore(id);
    return response.success(res, 'Live score fetched successfully', { liveScore });
};
