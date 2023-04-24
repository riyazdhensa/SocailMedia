const express = require('express');
const cookieParser = require('cookie-parser'); //add to project
const bodyParser = require('body-parser'); // to read response body ex req.body.name
const app = express();
const port = 8000;
app.use(express.urlencoded());  //for URl encoding
app.use(cookieParser()); //tell app to use cookieParser
app.use(bodyParser.json()); // tell app to use bodyParser
// use for session cookies and authentication parts
const session=require('express-session');
const passport = require('passport');
const passportlocal=require('./config/passport_local_strategy.js');
const passportJWT = require('./config/passport-jwt-strategy.js');
const MongoStore = require('connect-mongo');
const sassmidleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware.js')
//chcking 
app.use(sassmidleware({
    src:'./assets/scss/',
    dest:'./assets/css/',
    debug: true,
    outputStyle:'expanded',
    prefix:'/css',
}))

app.use(express.static('./assets'));
app.use('/upload', express.static(__dirname +'/upload'));  // asking app use avtar or uploadfile
const db = require('./config/mongoose')
const expresslayout = require('express-ejs-layouts');
const { urlencoded } = require('express');
app.use(expresslayout); // for layout.ejs layout
app.set('layout extractStyles',true); //for to user user.css 
app.set('layout extractScripts',true); //for to user user.js

app.set('view engine','ejs');
app.set('views','./views');
// always use session after view engine initialization
app.use(session({

    name:'codeial',
    //to do  chagne the secret before deploy to production
    secret:'something',
    saveUninitialized : false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongoUrl: 'mongodb://127.0.0.1/codeial_development',
        },
        {
        mongooseConnection : db,
        autoRemove : 'disable'

    },
    function(err){
        if (err) {
            console.error(err);
          }
          console.log('Setting up Mongo store');
    }
    )
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenicatedUser);

app.use(flash());  // need to set up after session bcoz its user session cookie
app.use(customMware.setFlash); // setflash from config / middleware

app.use('/',require('./routes/'))//need to put after passport.initialize
app.listen(port , function(err){
    if(err){
        console.log(`error : ${err}`);
    }
    console.log(`listeningg on port ${port} `);
})