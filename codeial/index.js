const express = require('express');
const cookieParser = require('cookie-parser'); //add to project
const bodyParser = require('body-parser'); // to read response body ex req.body.name
const app = express();
const port = 8000;
app.use(express.urlencoded());  //for URl encoding
app.use(cookieParser()); //tell app to use cookieParser
app.use(bodyParser.json()); // tell app to use bodyParser

app.use(express.static('./assets'));
const db = require('./config/mongoose')
const expresslayout = require('express-ejs-layouts');
const { urlencoded } = require('express');
app.use(expresslayout); // for layout.ejs layout
app.set('layout extractStyles',true); //for to user user.css 
app.set('layout extractScripts',true); //for to user user.js

app.use('/',require('./routes/'))
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port , function(err){
    if(err){
        console.log(`error : ${err}`);
    }
    console.log(`listeningg on port ${port} `);
})