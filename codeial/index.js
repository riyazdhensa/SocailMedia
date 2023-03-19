const express = require('express');
const app = express();
const port = 8000;
app.use(express.static('./assets'));
const expresslayout = require('express-ejs-layouts');
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