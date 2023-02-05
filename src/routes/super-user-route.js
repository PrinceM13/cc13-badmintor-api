const express = require('express');

const { Employee } = require('../models');

const crudController = require('../controllers/crud-controller');
const { EMPLOYEE } = require('../config/constant');

const router = express.Router();

router.post('/employees', crudController.createRecord(Employee, EMPLOYEE));   // role = ADMIN by default
router.get('/employees', crudController.getAllRecords(Employee));
router.patch('/employees/:employeeId', crudController.updateRecord(Employee, 'employeeId', EMPLOYEE));
router.delete('/employees/:employeeId', crudController.deleteRecord(Employee, 'employeeId', EMPLOYEE));

module.exports = router;