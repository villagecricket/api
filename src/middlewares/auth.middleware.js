const jwt = require('../utils/jwt');
const { error } = require('../utils/response');
const HTTP = require('../utils/httpStatusCodes');
const MSG = require('../utils/messages');

module.exports = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1] || req.cookies?.accessToken;

    if (!token) {
        return error(res, {
            message: MSG.AUTH.UNAUTHORIZED,
            statusCode: HTTP.UNAUTHORIZED,
            error: 'Authentication token is missing. Please log in.'
        }, HTTP.UNAUTHORIZED);
    }

    try {
        const decoded = jwt.verifyAccessToken(token);
        req.user = decoded; // Store decoded token payload containing userId, email, and role
        next();
    } catch (err) {
        return error(res, {
            message: MSG.AUTH.TOKEN_EXPIRED,
            statusCode: HTTP.UNAUTHORIZED,
            error: process.env.NODE_ENV === 'development' ? err.stack : 'Token is invalid or expired.'
        }, HTTP.UNAUTHORIZED);
    }
};
