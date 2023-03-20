'use strict';
const multer = require('multer')
const express = require('express');
const router = express.Router();
const catController = require('../controllers/catController')

const upload = multer({dest: 'uploads/'})

router.get('/:catId',catController.getCat)
router.get('/', catController.getCatList)

router.post('/',upload.single('cat'),catController.postCat)
router.get('/',catController.putCat)
router.delete('/',catController.deleteCat)

router.get("/", (req, res) => {
    res.send("From this endpoint you can get cats.");
});
router.get("/:catId", (req, res) => {
    //console.log(req.params)
    res.send("From this endpoint you can get a cat with id: " + req.params.catId + ".");
});

/*router.post("/", (req, res) => {
    res.send("With this endpoint you can add cats.");
});*/

/*router.put("/", (req, res) => {
    res.send("With this endpoint you can modify cats.");
});*/

/*router.delete("/", (req, res) => {
    res.send("With this endpoint you can delete a cat.");
});*/

module.exports = router;