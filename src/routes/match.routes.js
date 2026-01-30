const express = require('express');
const router = express.Router();
const matchController = require('../controllers/match.controller');

router.get('/', matchController.getAllMatches);
router.get('/:id', matchController.getMatchById);
router.post('/', matchController.createMatch);
router.put('/:id', matchController.updateMatch);
router.delete('/:id', matchController.deleteMatch);
router.get('/:id/live-score', matchController.getLiveScore);

module.exports = router;
