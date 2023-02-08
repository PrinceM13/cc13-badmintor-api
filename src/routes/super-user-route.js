const express = require('express');

const { Employee } = require('../models');

const crudController = require('../controllers/crud-controller');
const { EMPLOYEE, EMPLOYEE_ID } = require('../config/constant');

const router = express.Router();

router.post('/employees', crudController.createRecord(Employee, EMPLOYEE));   // role = ADMIN by default
router.get('/employees', crudController.getAllRecords(Employee, EMPLOYEE));
router.patch('/employees/:employeeId', crudController.updateRecord(Employee, EMPLOYEE_ID, EMPLOYEE));
router.delete('/employees/:employeeId', crudController.deleteRecord(Employee, EMPLOYEE_ID, EMPLOYEE));

module.exports = router;