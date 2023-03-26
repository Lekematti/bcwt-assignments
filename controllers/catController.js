// catController
'use strict';

const catModel = require('../models/catModel');

const getCatList = async (req, res) => {
    console.log(cats);
    try{
        const cats = await catModel.getAllCats();
        res.json(cats);
    }
    catch (error){
        res.status(500).json({error: 500, message: error.message})
    }
}

const getCat = async (req, res) => {
    //convert id value to number
    const catId = Number(req.params.catId);
    //check if a number is not an integer
    if(!Number.isInteger(catId)) {
        res.status(400).json({error: 500, message: 'invalid id'})
        return;
    }
    try {
        const [cat] = await catModel.getCatById(catId)
        console.log('getCat', cat);
        res.json(cat);
    }
    catch (error) {
        res.status(404).send('cat not found');
    }
}

const postCat = async (req, res) => {
    console.log('posting a cat', req.body, req.file);
    try {
        // add cat details to cats array
        const newCat = req.body;
        newCat.filename = req.file.filename;
        const result = await catModel.insertCat(newCat)
        // send correct response if upload successful
        res.status(201).send('new cat added!');
    }
    catch (error){
        res.status(400).json({error: 500, message: 'adding new cat failed'})
    }
};

const putCat = async (reg, res) => {
    console.log('modify a cat', req.body);
    try {
        const cat = req.body;
        const result = await catModel.modifyCat(cat)
        // send correct response if upload successful
        res.status(200).send('cat modified');
    }
    catch (error){
        res.status(400).json({error: 500, message: 'cat modifying failed'})
    }
}

const deleteCat = async (req, res) => {
    console.log('deleting a cat', req.params.catId);
    try {
        const result = await catModel.deleteCat(req.params.catId);
        res.status(200).send('cat deleted!');
    }
    catch (error){
        res.status(400).json({error: 500, message: 'cat deletion failed'})
    }
};

const catController = {getCatList, getCat, postCat, putCat, deleteCat}
module.exports = catController;

