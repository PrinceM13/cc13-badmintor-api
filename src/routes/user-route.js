const express = require('express');

const userController = require('../controllers/user-controller');

const router = express.Router();

router.get('/profile', userController.getMyInfo);
router.get('/cart', userController.getMyCart);

module.exports = router;