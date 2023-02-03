const jwt = require('jsonwebtoken');

const { User } = require('../models');
const createError = require("../utils/create-error");

module.exports = async (req, res, next) => {
    try {
        // check if accessToken is attached
        const { authorization } = req.headers;
        // throw error (no accessToken attached or wrong format)
        if (!authorization || !authorization.startsWith('Bearer ')) { createError('you are unauthorized', 401) }

        // get accessToken
        const token = authorization.split(' ')[1];
        // get payload
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // get user data (id from payload)
        const user = await User.findOne({
            where: { id: payload.id },
            attributes: { exclude: ['password'] }
        });
        // throw error (invalid id)
        if (!user) { createError('you are unauthorized', 401) }

        // attach user's data with request
        req.user = user;

        // go to next middleware
        next();
    } catch (err) {
        next(err);
    }
};