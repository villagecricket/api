const { Tournament, TeamMaster, Match } = require('../models');

exports.getAllTournaments = async () => {
    return await Tournament.findAll({
        include: [
            { model: TeamMaster, as: 'Teams' }
        ]
    });
};

exports.getTournamentById = async (id) => {
    return await Tournament.findByPk(id, {
        include: [
            { model: TeamMaster, as: 'Teams' },
            {
                model: Match,
                as: 'Matches',
                include: [
                    { model: TeamMaster, as: 'TeamA' },
                    { model: TeamMaster, as: 'TeamB' }
                ]
            }
        ]
    });
};

exports.createTournament = async (data) => {
    const { teams, ...tournamentData } = data;
    const tournament = await Tournament.create(tournamentData);
    if (teams && teams.length > 0) {
        await tournament.addTeams(teams);
    }
    return tournament;
};

exports.updateTournament = async (id, data) => {
    const { teams, ...tournamentData } = data;
    const tournament = await Tournament.findByPk(id);
    if (!tournament) return null;

    await tournament.update(tournamentData);
    if (teams) {
        await tournament.setTeams(teams);
    }
    return tournament;
};

exports.deleteTournament = async (id) => {
    return await Tournament.destroy({ where: { TournamentID: id } });
};

exports.getPointsTable = async (tournamentId) => {
    // Basic implementation - in a real app, this would calculate stats from completed matches
    // For now, return the teams and we'll handle the logic if needed or return empty stats
    const tournament = await Tournament.findByPk(tournamentId, {
        include: [{ model: TeamMaster, as: 'Teams' }]
    });

    if (!tournament) return [];

    // Placeholder logic for points table
    return tournament.Teams.map(team => ({
        teamId: team.TeamID,
        teamName: team.Name,
        matchesPlayed: 0,
        won: 0,
        lost: 0,
        draw: 0,
        noResult: 0,
        points: 0,
        netRunRate: 0.00
    }));
};
