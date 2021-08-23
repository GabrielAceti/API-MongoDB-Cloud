const express = require('express');
const router = express.Router();
const UserController = require('../app/controllers/userController');

router.get('/users', UserController.get);
router.get('/users?:_id', UserController.findOne);
router.post('/', UserController.post);

module.exports = router;