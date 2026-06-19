const { error } = require('../utils/response');
const HTTP = require('../utils/httpStatusCodes');

/**
 * Check if the authenticated user has one of the allowed roles
 * @param {string[]} allowedRoles
 */
module.exports = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return error(res, {
                message: 'Unauthorized. Authentication required.',
                statusCode: HTTP.UNAUTHORIZED
            }, HTTP.UNAUTHORIZED);
        }

        if (!allowedRoles.includes(req.user.role)) {
            return error(res, {
                message: 'Forbidden. Access denied.',
                statusCode: HTTP.FORBIDDEN
            }, HTTP.FORBIDDEN);
        }

        next();
    };
};
