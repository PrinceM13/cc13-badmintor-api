const { Employee } = require('../models');
const createError = require('../utils/create-error');

module.exports = (authLevel) => {
    return async (req, res, next) => {
        try {
            // check if authenticated user is employee and role = auth level
            const isAuthLevel = await Employee.findOne({
                where: {
                    userId: req.user.id,
                    role: authLevel
                }
            });
            if (!isAuthLevel) { createError(`you are unauthorized, require ${authLevel} role`, 401) }

            // go to next middleware
            next();
        } catch (err) {
            next(err);
        }
    };
};