const express = require('express');
const { createUser, getUsers, userRole } = require('../Controller/userController');
const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.get('/admin', userRole); 

module.exports = router;
