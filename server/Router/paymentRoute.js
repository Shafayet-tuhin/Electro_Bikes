const express = require('express')
const { createPayment, getPayment, getAllPayments } = require('../Controller/paymentController')
const router = express.Router() 
const verifyJWT = require('../Middleware/varifyJWT')


router.get('/',verifyJWT , getPayment)
router.post('/' , createPayment)
router.get('/allpayment' , getAllPayments)

module.exports = router