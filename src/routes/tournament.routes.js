const express = require('express');
const router = express.Router();
const tournamentController = require('../controllers/tournament.controller');

const { uploadTournament } = require('../middlewares/upload.middleware.js');

const tournamentUploadFields = uploadTournament.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'banner', maxCount: 1 }
]);

router.get('/', tournamentController.getAllTournaments);
router.get('/:id', tournamentController.getTournamentById);
router.post('/', tournamentUploadFields, tournamentController.createTournament);
router.put('/:id', tournamentUploadFields, tournamentController.updateTournament);
router.delete('/:id', tournamentController.deleteTournament);
router.get('/:tournamentId/points-table', tournamentController.getPointsTable);

module.exports = router;
