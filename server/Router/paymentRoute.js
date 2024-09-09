const express = require('express')
const { createPayment, getPayment } = require('../Controller/paymentController')
const router = express.Router() 

router.get('/' , getPayment)
router.post('/' , createPayment)

module.exports = router