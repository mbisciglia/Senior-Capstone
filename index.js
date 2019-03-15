'use strict'

const express = require('express');
const bodyParser = require("body-parser");


const app = express();
const handlebars = require('express-handlebars').create({defaultLayout: 'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');     
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));



app.get('/', async (req, res) => {
    
    res.render('map1');
});
app.get('/map1', async (req, res) => {
    
    res.render('map1');
});
app.get('/map2', async (req, res) => {
    
    res.render('map2');
});

app.get('/databaseExport', async (req, res) => {
    
    res.render('databaseExport');
});

app.use((req, res) => {
    res.status(404).send(`<h2>Uh Oh!</h2><p>Sorry ${req.url} cannot be found here</p>`);
});




app.listen(53140, () => console.log('The server is up and running...'));
``