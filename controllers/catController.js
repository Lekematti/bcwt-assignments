// catController
'use strict';

const catModel = require('../models/catModel');
const {validationResult} = require("express-validator");

const getCatList = async (req, res) => {
    try{
        let cats = await catModel.getAllCats();
        // convert ISO date to date only
        cats = cats.map(cat => {
           cat.birthdate = cat.birthdate.toISOString().split('T')[0];
           return cat;
        });
        res.json(cats);
    }
    catch (error){
        res.status(500).json({error: 500, message: error.message})
    }
}

const getCat = async (req, res) => {
    //convert id value to number
    const catId = Number(req.params.id);
    //check if a number is not an integer
    if(!Number.isInteger(catId)) {
        res.status(400).json({error: 500, message: 'invalid id'})
        return;
    }
    try {
        const [cat] = await catModel.getCatById(catId)
        res.json(cat);
    }
    catch (error) {
        res.status(404).json({message: 'cat not found'});
    }
}

const postCat = async (req, res) => {
    if(!req.file){
            res.status(400).json({
                status: 400,
                message: 'invalid or missing image file'
            });
            return;
    }
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        res.status(400).json({
            status: 400,
            errors: validationErrors.array(),
            message: 'invalid post data'
        });
        return;
    }
    const newCat = req.body;
    newCat.filename = req.file.filename;
    try {
        // add cat details to cats array
        const result = await catModel.insertCat(newCat)
        // send correct response if upload successful
        res.status(201).json({message: 'new cat added'});
    }
    catch (error){
        res.status(500).json({error: 500, message: 'adding new cat failed'})
    }
};

const putCat = async (req, res) => {
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        res.status(400).json({
            status: 400,
            errors: validationErrors.array(),
            message: 'invalid put data'
        });
        return;
    }
    const cat = req.body;
    try {
        const result = await catModel.modifyCat(cat)
        // send correct response if upload successful
        res.status(200).json({message: 'cat modified'});
    }
    catch (error){
        res.status(400).json({error: 500, message: 'cat modifying failed'})
    }
}

const deleteCat = async (req, res) => {
    try {
        const result = await catModel.deleteCat(req.params.id);
        res.status(200).json({message: 'cat deleted'});
    }
    catch (error){
        res.status(400).json({error: 500, message: 'cat deletion failed'})
    }
};

const catController = {getCatList, getCat, postCat, putCat, deleteCat}
module.exports = catController;

