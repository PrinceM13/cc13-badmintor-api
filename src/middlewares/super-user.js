const { Employee } = require('../models');
const { SUPER_USER } = require('../config/constant');
const createError = require('../utils/create-error');

module.exports = async (req, res, next) => {
    try {
        // check if authenticated user is employee and role = SUPER_USER
        const isSuperUser = await Employee.findOne({
            where: {
                userId: req.user.id,
                role: SUPER_USER
            }
        });
        if (!isSuperUser) { createError('you are unauthorized, require SUPER_USER role', 401) }

        // go to next middleware
        next();
    } catch (err) {
        next(err);
    }
};