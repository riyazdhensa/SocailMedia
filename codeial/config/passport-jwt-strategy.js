const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt; // to extract jwt from header

const User = require('../model/user');

let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'codial'
}

passport.use(new JWTstrategy(opts,function(jwtPayLoad,done){

    User.findById(jwtPayLoad._id,function(err,user){
        if(err){console.log("error in find user from JWT");return}

        if(user){return done(null,user);
        }else{
            return done(null,false);
        }
    })
}))

module.exports=passport;