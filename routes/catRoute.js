'use strict';

const multer = require('multer')
const express = require('express');
const router = express.Router();
const catController = require('../controllers/catController')

const upload = multer({dest: 'uploads/'})

// root of cat endpoint (e.g. https://localhost:3000/cat)
router.route('/')
    .get(catController.getCatList)
    .post(upload.single('cat'),catController.postCat)
    .put(catController.putCat)
// all /cat/:id endpoints
router.route('/:id')
    .get(catController.getCat)
    .delete(catController.deleteCat);

module.exports = router;