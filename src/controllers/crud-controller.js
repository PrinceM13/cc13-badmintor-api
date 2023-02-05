const { EMPLOYEE } = require("../config/constant");
const createError = require("../utils/create-error");

exports.createRecord = (Model, recordName) => {
    return async (req, res, next) => {
        try {
            // for Employee: check if authenticated user try to create his/her self
            if (recordName === EMPLOYEE && req.user.id === req.body.userId) { createError("can't create yourself, you are employee", 400) }

            // insert record into table
            await Model.create(req.body);

            // response with success message
            res.status(200).json({ message: `${recordName} was successfully created` });
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

exports.getAllRecords = (Model) => {
    return async (req, res, next) => {
        try {
            // get all records from table
            const records = await Model.findAll();

            // response with all records data
            res.status(200).json({ records });
        } catch (err) {
            next(err);
        }
    };
};