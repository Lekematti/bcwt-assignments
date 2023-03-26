// catController
'use strict';

const catModel = require('../models/catModel');

const getCatList = async (req, res) => {
    try{
        const cats = await catModel.getAllCats();
        res.json(cats);
    }
    catch (error){
        res.status(500).json({error: 500, message: error.message})
    }
    //console.log(cats);
}

const getCat = async (req, res) => {
    //convert id value to number
    const catId = Number(req.params.catId);
    //check if a number is not an integer
    if(Number.isInteger(catId)) {
        res.status(400).json({error: 500, message: 'invalid id'})
        return;
    }
    //TODO wrap to try catch
    if (cat) {
        const [cat] = await catModel.getCatById(catId)
        // const filteredCats = cats.find(cat => cat.id === id);
        //const filteredCats2 = cats.filter(cat => id == cat.id); //other way of filtering
        console.log('getCat', cat);
        res.json(cat);
    }
    else
    {
        res.status(404).send('cat not found');
    }
}

const postCat = async (req, res) => {
    console.log('posting a cat', req.body, req.file);
    // add cat details to cats array
    const newCat = req.body;
    newCat.filename = req.file.filename;
    const result = await catModel.insertCat(newCat)
    // send correct response if upload successful
    res.status(201).send('new cat added!');
};

const putCat = async (reg, res) => {
    console.log('modify a cat', req.body);
    //TODO: ADD try catch
    const cat = req.body;
    const result = await catModel.modifyCat(cat)
    // send correct response if upload successful
    res.status(200).send('cat modified');
}

const deleteCat = async (req, res) => {
    console.log('deleting a cat', req.params.catId);
    // TODO: add try-catch
    const result = await catModel.deleteCat(req.params.catId);
    // TODO: send correct json response if delete successful
    res.status(200).send('cat deleted!');
};

const catController = {getCatList, getCat, postCat, putCat, deleteCat}
module.exports = catController;

