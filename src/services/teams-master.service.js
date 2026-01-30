const { TeamMaster } = require('../models');

const getAllTeams = async () => {
    return await TeamMaster.findAll();
};

const getTeamsById = async (id) => {
    return await TeamMaster.findByPk(id);
};

const createTeams = async (data) => {
    return await TeamMaster.create(data);
};

const updateTeams = async (id, data) => {
    const team = await TeamMaster.findByPk(id);
    if (!team) return null;
    await team.update(data);
    return team;
};

const deleteTeamsByID = async (id) => {
    return await TeamMaster.destroy({ where: { TeamID: id } });
};

module.exports = {
    getAllTeams,
    getTeamsById,
    createTeams,
    updateTeams,
    deleteTeamsByID
};
