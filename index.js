'use strict'

const express = require('express');
const bodyParser = require("body-parser");
var firebase = require('firebase')



const app = express();
const handlebars = require('express-handlebars').create({ defaultLayout: 'main' });

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));


var config = {
  apiKey: "AIzaSyCLg4YBPW6KMlFoF7nFIr1ZtADSPmxMp80",
  authDomain: "fir-web-43830.firebaseapp.com",
  databaseURL: "https://fir-web-43830.firebaseio.com",
  projectId: "fir-web-43830",
  storageBucket: "fir-web-43830.appspot.com",
  messagingSenderId: "567827194064"
};
firebase.initializeApp(config);



app.get('/', async (req, res) => {
  res.render('login');
});

app.get('/custom', async (req, res) => {
  res.render('custom');
});

app.get('/map1', async (req, res) => {

  res.render('map1');
});

app.get('/map2', async (req, res) => {

  res.render('map2');
});


//DOES NOT WORK
app.post('/uploadImage', async (req, res) => {
  const path = req.body.path;
  var db = firebase.database();
  var ref = db.ref().storageBucket();

  ref.child("images").put(path).then(function(snapshot) {
    console.log('Uploaded a blob or file!');
    res.status(200).send('SUCCESS');
  }).catch(function (error){
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    res.status(400).send('FAIL');
  });
});

app.post('/signIn', async (req, res) => {
  const email = req.body.email;
  const password = req.body.pass;

  firebase.auth().signInWithEmailAndPassword(email, password).then(success => {
    res.status(200).send('SUCCESS');
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    res.status(400).send('FAIL');
  });


});

app.post('/createAcc', async (req, res) => {
  const email = req.body.email;
  const password = req.body.pass;

  firebase.auth().createUserWithEmailAndPassword(email, password).then(success => {
    res.status(200).send('SUCCESS');
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    res.status(400).send('FAIL');
  });
});


app.post('/forgotPass', async (req, res) => {
  const email = req.body.email;

  firebase.auth().sendPasswordResetEmail(email).then(success => {
    console.log(success);
    res.status(200).send('SUCCESS');
  }).catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    res.status(400).send('FAIL');
  });
});



firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    var name = user.displayName;
    var email = user.email;
    var photoUrl = user.photoURL;
    var emailVerified = user.emailVerified;
    var uid = user.uid;
    console.log("Current user is: " + email);
  } else {
    // No user is signed in.
  }
});


app.use((req, res) => {
  res.status(404).send(`<h2>Uh Oh!</h2><p>Sorry ${req.url} cannot be found here</p>`);
});




app.listen(53140, () => console.log('The server is up and running...'));
``