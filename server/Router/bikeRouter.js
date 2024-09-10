const express = require('express')
const { createBike, getBike, getSingleBike, deleteBike, updateBike } = require('../Controller/bikeController')
const router = express.Router() 

router.get('/' , getBike)
router.get('/:id' , getSingleBike)
router.post('/' , createBike)
router.delete('/:id' , deleteBike)
router.put('/:id' , updateBike)
module.exports = router