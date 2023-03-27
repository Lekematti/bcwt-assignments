'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.route('/')
    .get(userController.getUserList)
    .post(userController.postUser)
    //.put(userController.putUser)
// all /cat/:id endpoints
router.route('/:id')
    .get(userController.getUser)
    //.delete(userController.deleteUser);

//TODO: add validation &

module.exports = router;