// userController
'use strict';
const userModel = require('../models/userModel');

// TODO: add DB connection and functions to userModel
/*const users = userModel.users;
// remove passwords
for (const user of users) {
    delete user.password;
}*/

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
    const userId = Number(req.params.id);
    //check if a number is not an integer
    if(!Number.isInteger(userId)) {
        res.status(400).json({error: 500, message: 'invalid id'})
        return;
    }
    try {
        const [user] = await userModel.getUserById(userId)
        res.json(user);
    }
   catch (error){
       res.status(404).json({message: 'user not found'});
   }
}

const postUser = async (req, res) => {
    try {
        // add cat details to cats array
        const newUser = req.body;
        const result = await userModel.insertUser(newUser)
        // send correct response if upload successful
        res.status(201).json({message: 'new user added'});
    }
    catch (error){
        res.status(400).json({error: 500, message: 'adding new user failed'})
    }
};

/*const putUser = async (reg, res) => {
    console.log('modify a user', req.body);
    try {
        const user = req.body;
        const result = await userModel.modifyUser(user)
        // send correct response if upload successful
        res.status(200).json({message: 'user modified'});
    }
    catch (error){
        res.status(400).json({error: 500, message: 'user modifying failed'})
    }
}

const deleteUser = async (reg, res) => {
    console.log('delete a cat', req.params.userId);
    try {
        const result = await userModel.deleteUser(req.params.userId)
        // send correct response if upload successful
        res.status(200).json({message: 'user deleted'});
    }
    catch (error){
        res.status(400).json({error: 500, message: 'user deletion failed'})
    }
}*/

const userController = {getUserList, getUser, postUser,} // putUser, deleteUser
module.exports = userController;

