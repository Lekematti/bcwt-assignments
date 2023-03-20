'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')


router.get('/:userId',userController.getUser)
router.get('/', userController.getUserList)
router.post('/', userController.postUser)

//TODO: add  other endpoints needed

module.exports = router;