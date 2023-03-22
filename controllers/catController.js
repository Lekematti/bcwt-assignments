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
    console.log('posting a cat', req.body, req.file);
    // add cat details to cats array
    const newCat = req.body;
    newCat.filename = 'http://localhost:3000/uploads/' + req.file.filename;
    cats.push(newCat);
    // send correct response if upload successful
    res.status(201).send('new cat added!');
};

const putCat = (reg, res) => {

    res.json()
}

const deleteCat = (reg, res) => {

    res.json()
}

const catController = {getCatList, getCat, postCat, putCat, deleteCat}
module.exports = catController;

