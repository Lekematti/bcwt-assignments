// userController
'use strict';
const userModel = require('../models/userModel');

const users = userModel.users

for (const user of users){
    delete user.password;
}
const getUserList = (req, res) => {
    res.json(users);
}

const getUser = (req, res) => {
    const id = req.params.userId;
    const filteredUsers = users.find(user => user.id === id);
    //const filteredUsers2 = users.filter(uses => id == user.id); //other way of filtering
    if (!filteredUsers){
        res.status(404).send('user not found')
        return;
    }
    res.json(filteredUsers);
}

const postUser = (req, res) => {
    console.log(req.body);
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    console.log(req.body.name)
    users.push(newUser);
    res.status(201).send('added user' + req.body.name);
    //const createUsers = req.params.users
    //res.json(createUsers);
}

const putUser = (req, res) => {

    res.json()
}

const deleteUser = (req, res) => {

    res.json()
}

const userController = {getUserList, getUser, postUser, putUser, deleteUser}
module.exports = userController;

