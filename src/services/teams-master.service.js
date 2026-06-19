const { TeamMaster, TeamPlayer, PlayerMaster } = require('../models');
const BaseService = require('./base.service');

const service = new BaseService(TeamMaster);

const getAllTeams = async () => {
    const teams = await TeamMaster.findAll();
    for (const team of teams) {
        const players = await PlayerMaster.findAll({
            include: [{
                model: TeamPlayer,
                where: { TeamID: team.TeamID, Status: 'Active' },
                required: false
            }]
        });
        team.dataValues.Players = players;
    }
    return teams;
};

const getTeamsById = async (id) => {
    const team = await TeamMaster.findByPk(id);
    if (!team) return null;
    const players = await PlayerMaster.findAll({
        include: [{
            model: TeamPlayer,
            where: { TeamID: id, Status: 'Active' },
            required: false
        }]
    });
    team.dataValues.Players = players;
    return team;
};

const createTeams = async (data) => {
    let { PlayerIDs, ...teamData } = data;
    const team = await service.create(teamData);

    if (PlayerIDs) {
        if (!Array.isArray(PlayerIDs)) PlayerIDs = [PlayerIDs];

        const teamPlayers = PlayerIDs.map(playerId => ({
            TeamID: team.TeamID,
            PlayerID: playerId,
            JoinedDate: new Date(),
            Status: 'Active'
        }));
        await TeamPlayer.bulkCreate(teamPlayers);
    }

    return team;
};

const updateTeams = async (id, data) => {
    let { PlayerIDs, ...teamData } = data;
    const team = await service.update(id, teamData);

    if (PlayerIDs !== undefined) {
        if (PlayerIDs && !Array.isArray(PlayerIDs)) PlayerIDs = [PlayerIDs];
        const ids = PlayerIDs || [];

        // Set all current players to Inactive
        await TeamPlayer.update({ Status: 'Inactive' }, { where: { TeamID: id } });

        if (ids.length > 0) {
            for (const playerId of ids) {
                const [tp, created] = await TeamPlayer.findOrCreate({
                    where: { TeamID: id, PlayerID: playerId },
                    defaults: { JoinedDate: new Date(), Status: 'Active' }
                });
                if (!created) {
                    tp.Status = 'Active';
                    await tp.save();
                }
            }
        }
    }

    return team;
};

const deleteTeamsByID = async (id) => {
    return await service.delete(id);
};

module.exports = {
    getAllTeams,
    getTeamsById,
    createTeams,
    updateTeams,
    deleteTeamsByID
};
