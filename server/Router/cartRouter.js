const express = require('express')
const { getCart, createCart, deleteItem, paymentDone, updateQuantity } = require('../Controller/cartController')
const router = express.Router() 

const varifyJWT = require('../Middleware/varifyJWT')

router.delete('/paymentDone', paymentDone)
router.get('/' , varifyJWT , getCart)
router.post('/' , createCart)
router.delete('/:id', deleteItem)
router.patch('/:id', updateQuantity)


module.exports = router