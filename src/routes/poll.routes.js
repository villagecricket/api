const express = require('express');
const router = express.Router();
const controller = require('../controllers/poll.controller');
const asyncHandler = require('../utils/asyncHandler');

router.get('/', asyncHandler(controller.getPolls));
router.post('/', asyncHandler(controller.createPoll));
router.post('/:pollId/vote/:optionId', asyncHandler(controller.vote));
router.patch('/:id/toggle', asyncHandler(controller.toggleStatus));
router.delete('/:id', asyncHandler(controller.deletePoll));

module.exports = router;
