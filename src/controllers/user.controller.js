const userService = require('../services/user.service');
const response = require('../utils/response');
const MSG = require('../utils/messages');
const HTTP = require('../utils/httpStatusCodes');
const asyncHandler = require('../utils/asyncHandler');

/**
 * Handle user registration
 */
const handleRegister = asyncHandler(async (req, res) => {
    const result = await userService.handleRegister(req.body);
    response.success(res, 'User registered successfully', result, HTTP.CREATED);
});

/**
 * Handle user login
 */
const handleLogin = asyncHandler(async (req, res) => {
    const { payload, accessToken, refreshToken } = await userService.handleLogin(req.body);

    // Set refresh token in HttpOnly cookie
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    response.success(res, MSG.AUTH.LOGIN_SUCCESS, { user: payload, accessToken });
});

/**
 * Handle user logout
 */
const handleLogout = asyncHandler(async (req, res) => {
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict'
    });
    response.success(res, MSG.AUTH.LOGOUT_SUCCESS, {});
});

/**
 * Handle refresh token
 */
const handleRefreshToken = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
        return response.error(res, { message: 'Refresh token missing' }, HTTP.UNAUTHORIZED);
    }

    const { accessToken, user } = await userService.handleRefreshToken(refreshToken);
    response.success(res, 'Token refreshed successfully', { user, accessToken });
});

module.exports = { 
    handleRegister, 
    handleLogin, 
    handleLogout, 
    handleRefreshToken 
};