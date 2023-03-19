'use strict';
const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'pug')

app.get('/', (req, res) => {
    const name = 'name'
    const birthdate = 'birthdate'
    const weight = 'weight'
    const content = {name, birthdate, weight}
    res.render('index', content);
})

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use(express.static('public'));

app.get("/catinfo", (req, res) => {
    const cat = {
        name: "Frank",
        birthdate: "2010-12-25",
        weight: 5,
    };
    res.json(cat);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})