const express = require('express');

const { Employee } = require('../models');

const crudController = require('../controllers/crud-controller');

const router = express.Router();

router.post('/employees', crudController.createRecord(Employee, 'employee'));   // role = ADMIN by default
router.get('/employees', crudController.getAllRecords(Employee));
router.patch('/employees/:employeeId', crudController.updateRecord(Employee, 'employeeId', 'employee'));
router.delete('/employees/:employeeId', crudController.deleteRecord(Employee, 'employeeId', 'employee'));

module.exports = router;