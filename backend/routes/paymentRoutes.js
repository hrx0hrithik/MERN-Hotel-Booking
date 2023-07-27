// paymentRoutes.js

const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/createPayment', paymentController.createPaymentOrder);
router.post('/paymentCallback', paymentController.handlePaymentCallback);
router.post('/generateReceipt', paymentController.generateReceipt);

module.exports = router;
