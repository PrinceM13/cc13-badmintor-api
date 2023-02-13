const express = require('express');

const userController = require('../controllers/user-controller');

const router = express.Router();

// profile
router.get('/profile', userController.getMyInfo);
// cart
router.post('/cart', userController.addMyCart);
router.get('/cart', userController.getMyCart);
router.patch('/cart/:cartId', userController.updateMyCart);
router.delete('/cart/:productId', userController.deleteMyCart);
// order
router.post('/orders', userController.createOrder);
// router.delete('/orders',);
// order item
router.post('/order-items', userController.createOrderItems);
// router.delete('/order-items',);

module.exports = router;