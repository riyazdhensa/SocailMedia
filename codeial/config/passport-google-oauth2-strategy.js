const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User  = require('../model/user');

// tell passport to use new strategies for google login
passport.use(new googleStrategy({
    clientID : "",
    clientSecret : "",
    callbackURL : "http://localhost:8000/users/auth/google/callback",
},

function (accessToken, refreshToken,profile,done) {
    User.findOne({email : profile.emails[0].value}).exec(function (err,user) {
        if (err) {console.error("error in google stategy passport",err); return;}

        console.log(profile);

        if(user){
            // if user found set as req.user
            return done(null,user);
        }else{
            //if not found , create a new one and set as req.user
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password : crypto.randomBytes(20).toString('hex')

            },function(err,user){
                if (err) {console.error("error in google stategy passport",err); return;}

                return done(null,user);
            })
        }

    })

}

));

module.exports = passport;
