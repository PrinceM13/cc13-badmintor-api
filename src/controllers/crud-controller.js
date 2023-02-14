const { EMPLOYEE, USER } = require("../config/constant");
const createError = require("../utils/create-error");
const { User, Employee } = require('../models');

exports.createRecord = (Model, recordName) => {
    return async (req, res, next) => {
        try {
            // for Employee: check if authenticated user try to create his/her self
            if (recordName === EMPLOYEE && req.user.id === req.body.userId) { createError("can't create yourself, you are employee", 400) }

            // insert record into table
            let addedRecord = await Model.create(req.body);

            // Employee
            if (recordName === EMPLOYEE) {
                addedRecord = await Model.findOne({ where: { userId: addedRecord.userId }, include: { model: User } })
            }

            // response with success message
            // res.status(200).json({ message: `${recordName} was successfully created` });
            res.status(200).json({ addedRecord });
        } catch (err) {
            next(err);
        }
    };
};

exports.updateRecord = (Model, recordId, recordName) => {
    return async (req, res, next) => {
        try {
            // update record in table
            const [totalUpdate] = await Model.update(req.body, { where: { id: +req.params[recordId] } });

            // throw error (invalid record id)
            if (totalUpdate === 0) { createError(`invalid ${recordName} id`, 400) }

            // response with success message
            res.status(200).json({ message: `${recordName} was successfully updated` });
        } catch (err) {
            next(err);
        }
    };
};

exports.deleteRecord = (Model, recordId, recordName) => {
    return async (req, res, next) => {
        try {
            // delete record from table
            const totalDelete = await Model.destroy({ where: { id: +req.params[recordId] } });

            // throw error (invalid record id)
            if (totalDelete === 0) { createError(`invalid ${recordName} id`, 400) }

            // response just success status 204
            res.status(204).json();
        } catch (err) {
            next(err);
        }
    };
};

exports.getAllRecords = (Model, recordName = '') => {
    return async (req, res, next) => {
        try {
            let records;
            // for Employee: check if authenticated user try to create his/her self
            if (recordName === EMPLOYEE) {
                records = await Model.findAll({
                    include: {
                        model: User,
                        attributes: { exclude: ['password'] }
                    }
                });
            } else if (recordName === USER) {
                records = await Model.findAll({
                    include: {
                        model: Employee,
                        attributes: ['role']
                    },
                    order: [['firstName', 'ASC']]
                });
            } else {
                // get all records from table
                records = await Model.findAll();
            }

            // response with all records data
            res.status(200).json({ records });
        } catch (err) {
            next(err);
        }
    };
};

exports.getRecordById = (Model, recordId, recordName) => {
    return async (req, res, next) => {
        try {
            // get record by id
            const record = await Model.findOne({ where: { id: req.params[recordId] } });

            // throw error (invalid record id)
            if (!record) { createError(`invalid ${recordName} id`, 400) }

            // response with 1 record
            res.status(200).json({ record })
        } catch (err) {
            next(err);
        }
    };
};