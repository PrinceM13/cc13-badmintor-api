const express = require('express');

const checkoutController = require('../controllers/checkout-controller');

const router = express.Router();

router.post('/credit-card', checkoutController.creditCard);

module.exports = router;