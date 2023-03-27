'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/', userController.getUserList)
.get('/:userId',userController.getUser)
.post('/', userController.postUser)
.put('/',userController.putUser)
.delete('/:userId',userController.deleteUser);


module.exports = router;