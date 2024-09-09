const express = require('express')
const { createBike, getBike, getSingleBike } = require('../Controller/bikeController')
const router = express.Router() 

router.get('/' , getBike)
router.get('/:id' , getSingleBike)
router.post('/' , createBike)

module.exports = router