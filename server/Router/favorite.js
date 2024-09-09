const express = require('express')
const { postFav, getFav, deleteFav } = require('../Controller/favotiteController')
const router = express.Router() 

router.get('/' , getFav)
router.post('/' , postFav)
router.delete('/:id' , deleteFav)

module.exports = router