const { Employee } = require('../models');
const createError = require("../utils/create-error");

exports.createEmployee = async (req, res, next) => {
    try {
        // check if authenticated user try to create his/her self
        if (req.user.id === +req.params.userId) { createError("can't create yourself, you are employee", 400) }

        // check if user exist in Employee table
        const isExist = await Employee.findOne({ where: { userId: +req.params.userId } });
        // throw error (already exist)
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

exports.updateEmployeeRole = async (req, res, next) => {
    try {
        // update employee role in Employee table
        const [totalUpdate] = await Employee.update(
            { role: req.body.role },
            { where: { id: +req.params.employeeId } }
        );

        // throw error (invalid employee id)
        if (totalUpdate === 0) { createError('invalid employee id', 400) }

        // response with success message
        res.status(200).json({ message: `employee's role was successfully updated to ${req.body.role}` });
    } catch (err) {
        next(err);
    }
};

exports.deleteEmployee = async (req, res, next) => {
    try {
        // delete employee from Employee table
        const totalDelete = await Employee.destroy({ where: { id: +req.params.employeeId } });

        // throw error (invalid employee id)
        if (totalDelete === 0) { createError('invalid employee id', 400) }

        // response just success status 204
        res.status(204).json();
    } catch (err) {
        next(err);
    }
};

exports.getAllEmployee = async (req, res, next) => {
    try {
        // get all employee from Employee table
        const employees = await Employee.findAll();

        // response with all employee data
        res.status(200).json({ employees });
    } catch (err) {
        next(err);
    }
};