const express = require('express');
const router = express.Router();
const playerController = require('../controllers/players-master.controller');
const { createPlayerValidator } = require('../validations/players-master.validator');
const validateRequest = require('../middlewares/validateRequest');
const { uploadPlayerImage } = require('../middlewares/upload.middleware.js');

router.get('/', playerController.getAllPlayers);

router.get('/:id', playerController.getPlayerById);

router.post('/', uploadPlayerImage.single('image'), createPlayerValidator, validateRequest, playerController.createPlayer);

router.put('/:id', uploadPlayerImage.single('image'), createPlayerValidator, validateRequest, playerController.updatePlayer);

router.delete('/:id', playerController.deletePlayer);

module.exports = router;
