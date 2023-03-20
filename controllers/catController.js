// catController
'use strict';
const catModel = require('../models/catModel');

const cats = catModel.cats

const getCatList = (req, res) => {
    res.json(cats);
}

const getCat = (req, res) => {
    const id = req.params.catId;
    const filteredCats = cats.find(cat => cat.id === id);
    //const filteredCats2 = cats.filter(cat => id == cat.id); //other way of filtering
    if (!filteredCats){
        res.status(404).send('cat not found')
        return;
    }
    res.json(filteredCats);
}

const postCat = (req, res) => {
    const createCat = req.params.cats
    res.json(createCat);
}

const putCat = (reg, res) => {

    res.json()
}

const deleteCat = (reg, res) => {

    res.json()
}

const catController = {getCatList, getCat, postCat, putCat, deleteCat}
module.exports = catController;

