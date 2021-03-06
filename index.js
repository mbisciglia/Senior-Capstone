"use strict";

const express = require("express");
const bodyParser = require("body-parser");
var firebase = require("firebase");

const app = express();
const handlebars = require("express-handlebars").create({
  defaultLayout: "main"
});

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

var config = {
  apiKey: "AIzaSyCLg4YBPW6KMlFoF7nFIr1ZtADSPmxMp80",
  authDomain: "fir-web-43830.firebaseapp.com",
  databaseURL: "https://fir-web-43830.firebaseio.com",
  projectId: "fir-web-43830",
  storageBucket: "fir-web-43830.appspot.com",
  messagingSenderId: "567827194064"
};
firebase.initializeApp(config);

app.get("/", async (req, res) => {
  res.render("login");
});

app.get("/display", async (req, res) => {
  var user = firebase.auth().currentUser;

  if (user) {
    res.render("display");
  } else {
    res.status(400).send("CAN NOT DISPLAY UNTIL SIGNED IN");
  }
});

app.get("/addRoom", async (req, res) => {
  var user = firebase.auth().currentUser;

  if (user) {
    res.render("addRoom");
  } else {
    res.status(400).send("CAN NOT ADD ROOM UNTIL SIGNED IN");
  }
});

app.get("/signOut", async (req, res) => {
  var user = firebase.auth().currentUser;

  if (user) {
    clearCookie();
    res.render("login");
  } else {
    res.status(400).send("CAN NOT SIGN OUT UNTIL SIGNED IN");
  }
});


app.get("/addFloor", async (req, res) => {
  var user = firebase.auth().currentUser;
  if (user) {
    res.render("addFloor");
  } else {
    res.status(400).send("CAN NOT ADD FLOOR UNTIL SIGNED IN");
  }
});

app.get("/map1", async (req, res) => {
  res.render("map1");
});

app.get("/map2", async (req, res) => {
  res.render("map2");
});

//DOES NOT WORK
app.post("/uploadImage", async (req, res) => {
  const path = req.body.path;
  var db = firebase.database();
  var ref = db.ref().storageBucket();

  ref
    .child("images")
    .put(path)
    .then(function(snapshot) {
      console.log("Uploaded a blob or file!");
      res.status(200).send("SUCCESS");
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      res.status(400).send("FAIL");
    });
});

app.post("/signIn", async (req, res) => {
  const email = req.body.email;
  const password = req.body.pass;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(success => {
      res.status(200).send(success.user.uid);
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      res.status(400).send("FAIL");
    });
});

app.post("/createAcc", async (req, res) => {
  const email = req.body.email;
  const password = req.body.pass;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(success => {
      res.status(200).send("SUCCESS");
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      res.status(400).send("FAIL");
    });
});

app.post("/forgotPass", async (req, res) => {
  const email = req.body.email;

  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(success => {
      console.log(success);
      res.status(200).send("SUCCESS");
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      res.status(400).send("FAIL");
    });
});

app.get("/currentUser", async (req, res) => {
  var user = firebase.auth().currentUser;

  if (user) {
    var data = { email: user.email, id: user.uid };
    console.log("Current user: " + data.email + " with id: " + data.uid);
    res.status(200).send(data);
  } else {
    console.log("No current user.");
    res.status(400).send("FAIL");
  }
});

app.use((req, res) => {
  res
    .status(404)
    .send(`<h2>Uh Oh!</h2><p>Sorry ${req.url} cannot be found here</p>`);
});

app.listen(53140, () => console.log("The server is up and running..."));
``;
