const express = require('express');
const router = express.Router();
const UserController = require('../app/controllers/userController');
const auth = require('../middlewares/auth')

router.get('/users', auth, UserController.get);
router.get('/users/:_id', auth, UserController.findOne);
router.post('/users/create', auth, UserController.post);
router.post('/users/auth', auth, UserController.auth);

module.exports = router;