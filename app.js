'use strict';
const express = require('express');
<<<<<<< HEAD
const cors = require('cors');
const catRoute = require("./routes/catRoute");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const passPort = require('./utils/passPort');
const app = express();
const port = 3000;

// Log middleware
app.use ((req, res, next) => {
    console.log(Date.now() + ': request: ' + req.method + '' + req.path)
    next()
});

// serve example ui
app.use(express.static('example-ui'))
// serve uploaded image files
app.use('/uploads', express.static('uploads'))

// add cors headers
app.use(cors());

// middleware for parsing request body
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(passPort.initialize());

app.use("/cat", passPort.authenticate('jwt', {session: false}), catRoute);
app.use('/user', passPort.authenticate('jwt', {session: false}), userRoute)
app.use('/auth', authRoute)

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
=======
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
const port = 3000;

const user = {name: 'foo', password: 'bar'};

app.set('views', './views');
app.set('view engine', 'pug');

app.use(session({secret:'zxc', resave: false, saveUninitialized: true}))
app.use(express.urlencoded({extended: true}));
//parseria käytetään vain arvojen lukemiseen
app.use(cookieParser());

app.get('/', (req, res) => {
  res.render('home');
});
app.get('/form', (req, res) => {
  res.render('form');
});
app.get('/secret', (req, res) => {
  if (req.session.loggedIn){
    res.render('secret');

  }
  else{
    res.status(403).send('you must login to see this')
  }
});
app.post('/login', (req, res) =>{
  console.log('trying to log in', req.body);
  //
  //dummy login
  if (req.body.username === user.name &&
      req.body.password === user.password){
    req.session.loggedIn = true;
    res.redirect('/secret');
  }
  else{
    res.status(401).send('login failed!');
  }
})

app.get('/logout', (req, res) =>{
  req.session.loggedIn = false;
})

//Cookies
app.get('/setCookie/:color', (req,res) => {
  console.log('setting cookie', req.params.color);
  res.cookie('color', req.params.color).send('cookie set');
});

app.get('/getCookie', (req,res) => {
  console.log('Cookies: ', req.cookies);
  res.send('Color cookie value: ' + req.cookies.color);
});

app.get('/deleteCookie', (req,res) => {
  res.clearCookie('color').send('color cookie deleted');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
>>>>>>> 440a17bf83a2e3b698f67e58ff2328cc08c6105f
