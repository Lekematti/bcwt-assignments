// userController
'use strict';
const userModel = require('../models/userModel');

// TODO: add DB connection and functions to userModel
const users = userModel.users;
// remove passwords
for (const user of users) {
    delete user.password;
}

const getUserList =  async (req, res) => {
    try{
        const users = await userModel.getAllUsers();
        res.json(users);
    }
    catch (error){
        res.status(500).json({error: 500, message: error.message})
    }
}

const getUser = async (req, res) => {
    //convert id value to number
    const userId = Number(req.params.userId);
    //check if a number is not an integer
    if(!Number.isInteger(userId)) {
        res.status(400).json({error: 500, message: 'invalid id'})
        return;
    }
    try {
        const [user] = await catModel.getCatById(userId)
        console.log('getUser', user);
        res.json(user);
    }
   catch (error){
       res.status(404).send('user not found');
   }
}

const postUser = async (req, res) => {
    console.log('posting a user', req.body);
    try {
        // add cat details to cats array
        const newUser = req.body;
        const result = await userModel.insertUser(newUser)
        // send correct response if upload successful
        res.status(201).send('new user added!');
    }
    catch (error){
        res.status(400).json({error: 500, message: 'adding new user failed'})
    }
};

const putUser = async (reg, res) => {
    console.log('modify a user', req.body);
    try {
        const user = req.body;
        const result = await userModel.modifyUser(user)
        // send correct response if upload successful
        res.status(200).send('user modified');
    }
    catch (error){
        res.status(400).json({error: 500, message: 'user modifying failed'})
    }
}

const deleteUser = async (reg, res) => {
    console.log('delete a cat', req.params.userId);
    try {
        const result = await catModel.deleteCat(req.params.userId)
        // send correct response if upload successful
        res.status(200).send('cat deleted');
    }
    catch (error){
        res.status(400).json({error: 500, message: 'user deletion failed'})
    }
}

const userController = {getUserList, getUser, postUser, putUser, deleteUser}
module.exports = userController;

