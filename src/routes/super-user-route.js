const express = require('express');

const employeeController = require('../controllers/employee-controller');

const router = express.Router();

router.post('/employees/:userId', employeeController.createEmployee);   // role = ADMIN by default
router.patch('/employees/:employeeId', employeeController.updateEmployeeRole);
router.delete('/employees/:employeeId', employeeController.deleteEmployee);

module.exports = router;