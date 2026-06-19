const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', userController.handleRegister);
router.post('/login', userController.handleLogin);
router.post('/logout', userController.handleLogout);
router.post('/refresh', userController.handleRefreshToken);

router.get('/me', authMiddleware, (req, res) => {
    res.status(200).json({ user: req.user });
});

module.exports = router;
