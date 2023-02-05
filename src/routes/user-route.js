const express = require('express');

const userController = require('../controllers/user-controller');

const router = express.Router();

// profile
router.get('/profile', userController.getMyInfo);
// cart
router.post('/cart', userController.addMyCart);
router.get('/cart', userController.getMyCart);
router.patch('/cart/:cartId', userController.updateMyCart);
router.delete('/cart/:cartId', userController.deleteMyCart);

module.exports = router;