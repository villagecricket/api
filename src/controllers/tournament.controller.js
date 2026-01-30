const tournamentService = require('../services/tournament.service');
const response = require('../utils/response');
const HTTP = require('../utils/httpStatusCodes');

exports.getAllTournaments = async (req, res) => {
    const tournaments = await tournamentService.getAllTournaments();
    return response.success(res, 'Tournaments fetched successfully', { tournaments });
};

exports.getTournamentById = async (req, res) => {
    const { id } = req.params;
    const tournament = await tournamentService.getTournamentById(id);
    if (!tournament) {
        return response.success(res, 'Tournament not found', {}, HTTP.NOT_FOUND);
    }
    return response.success(res, 'Tournament fetched successfully', { tournament });
};

exports.createTournament = async (req, res) => {
    const payload = { ...req.body };

    if (req.files) {
        if (req.files.logo) payload.LogoURL = `/uploads/tournaments/${req.files.logo[0].filename}`;
        if (req.files.banner) payload.BannerURL = `/uploads/tournaments/${req.files.banner[0].filename}`;
    }

    const tournament = await tournamentService.createTournament(payload);
    return response.success(res, 'Tournament created successfully', { tournament }, HTTP.CREATED);
};

exports.updateTournament = async (req, res) => {
    const { id } = req.params;
    const payload = { ...req.body };

    if (req.files) {
        if (req.files.logo) payload.LogoURL = `/uploads/tournaments/${req.files.logo[0].filename}`;
        if (req.files.banner) payload.BannerURL = `/uploads/tournaments/${req.files.banner[0].filename}`;
    }

    const tournament = await tournamentService.updateTournament(id, payload);
    if (!tournament) {
        return response.success(res, 'Tournament not found', {}, HTTP.NOT_FOUND);
    }
    return response.success(res, 'Tournament updated successfully', { tournament });
};

exports.deleteTournament = async (req, res) => {
    const { id } = req.params;
    const deleted = await tournamentService.deleteTournament(id);
    if (!deleted) {
        return response.success(res, 'Tournament not found', {}, HTTP.NOT_FOUND);
    }
    return response.success(res, 'Tournament deleted successfully', { deletedCount: deleted });
};

exports.getPointsTable = async (req, res) => {
    const { tournamentId } = req.params;
    const pointsTable = await tournamentService.getPointsTable(tournamentId);
    return response.success(res, 'Points table fetched successfully', { pointsTable });
};
