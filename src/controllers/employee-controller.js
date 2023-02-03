const { Employee } = require('../models');
const createError = require("../utils/create-error");

exports.createEmployee = async (req, res, next) => {
    try {
        // check if authenticated user try to create his/her self
        if (req.user.id === +req.params.userId) { createError("can't create yourself, you are employee", 400) }

        // check if user exist in Employee table
        const isExist = await Employee.findOne({ where: { userId: +req.params.userId } });
        if (isExist) { createError('this user is already exist in employees table', 400) }

        // create employee in Employee table
        const employee = {
            userId: +req.params.userId,
            role: req.body.role
        };
        await Employee.create(employee);

        // response with success message
        res.status(200).json({ message: 'employee was successfully created' });
    } catch (err) {
        next(err);
    }
};