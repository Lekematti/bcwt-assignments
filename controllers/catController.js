// catController
'use strict';
const catModel = require('../models/catModel');

const cats = catModel.cats

const getCatList = (req, res) => {
    res.json(cats);
}

const getCat = (req, res) => {
    const id = req.params.catId;
    // TODO: filter maching cat based on id
    // TODO: response 404vif id not found in array (res.status(404))
    const cat = cats(0)
    res.json(cat);
}

const catController = {getCatList, getCat}
module.exports = catController;

