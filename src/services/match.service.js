const { Match, TeamMaster, Tournament } = require('../models');

exports.getAllMatches = async (params = {}) => {
    return await Match.findAll({
        where: params,
        include: [
            { model: TeamMaster, as: 'TeamA' },
            { model: TeamMaster, as: 'TeamB' },
            { model: Tournament, as: 'Tournament' }
        ],
        order: [['MatchDate', 'ASC']]
    });
};

exports.getMatchById = async (id) => {
    return await Match.findByPk(id, {
        include: [
            { model: TeamMaster, as: 'TeamA' },
            { model: TeamMaster, as: 'TeamB' },
            { model: TeamMaster, as: 'Winner' },
            { model: Tournament, as: 'Tournament' }
        ]
    });
};

exports.createMatch = async (data) => {
    return await Match.create(data);
};

exports.updateMatch = async (id, data) => {
    const match = await Match.findByPk(id);
    if (!match) return null;
    return await match.update(data);
};

exports.deleteMatch = async (id) => {
    return await Match.destroy({ where: { MatchID: id } });
};

exports.getLiveScore = async (matchId) => {
    // This would fetch from a Scorecard table or real-time state
    // For now, return basic match info
    return await this.getMatchById(matchId);
};
