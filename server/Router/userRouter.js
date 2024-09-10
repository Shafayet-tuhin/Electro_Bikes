const express = require('express');
const { createUser, getUsers, userRole, updateRole } = require('../Controller/userController');
const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.get('/admin', userRole); 
router.put('/:id', updateRole);

module.exports = router;
