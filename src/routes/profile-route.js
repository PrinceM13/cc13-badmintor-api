const express = require('express');

const profileController = require('../controllers/profile-controller');

const router = express.Router();

router.get('/', profileController.getMyInfo);

module.exports = router;