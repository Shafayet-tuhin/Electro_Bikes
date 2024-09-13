const express = require('express')
const { postFav, getFav, deleteFav } = require('../Controller/favotiteController')
const router = express.Router() 
const varifyJWT = require('../Middleware/varifyJWT')
const verifyJWT = require('../Middleware/varifyJWT')

router.get('/', getFav)
router.post('/' , postFav)
router.delete('/:id' , deleteFav)

module.exports = router