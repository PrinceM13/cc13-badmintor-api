const express = require('express');

const employeeController = require('../controllers/employee-controller');

const router = express.Router();

router.post('/employees/:userId', employeeController.createEmployee);
// router.patch('/employees/:employeeId');
// router.delete('/employees/:employeeId');

module.exports = router;