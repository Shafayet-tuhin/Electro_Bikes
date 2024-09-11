const express = require('express')
const { createPayment, getPayment } = require('../Controller/paymentController')
const router = express.Router() 
const verifyJWT = require('../Middleware/varifyJWT')

router.get('/',verifyJWT , getPayment)
router.post('/' , createPayment)

module.exports = router