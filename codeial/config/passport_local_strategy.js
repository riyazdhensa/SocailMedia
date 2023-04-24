const passport = require('passport');
const LocalStretegy = require('passport-local').Strategy;
const User = require('../model/user')

passport.use(new LocalStretegy({  

        usernameField   : 'email',
        passReqToCallback: true  //adding for flash messages
  },

        function(req, email,password,done) {   //add res for flash messages
            //find the user and establish identity
            User.findOne({ email:email},function(err,user){
                if(err){
                    req.flash('error',err);
                    return done(err);
                }
                if(!user || user.password !=password){
                    req.flash('error','Invalid username or password')
                    return done(null,false)
                }
                console.log('checking')
                return done(null,user)
            })

        }

  ))

  //serialize the user to decide which key is to keep in cookies
// use when user login to save info set cookie to session
  passport.serializeUser(function(user,done) {
            done(null,user.id)
  }) 

  //deserialize the user from key in cookies
  // use to check if user still log in when user send request for other pagge or similer
passport.deserializeUser(function(id,done) {
    User.findById(id,function(err,user) {
        if(err){
            console.log('error in findUser -- passport');
            return done(err);
        }
        return done(null,user);
    })
})

//check if user is authenticated
passport.checkAuthentication=function(req,res,next){
    //if user is authenticated then pass the request to next function(controller action)
    if(req.isAuthenticated()){
        return next();
    }
    //if user is not authenticated
    return res.redirect('/users/signin');
}

passport.setAuthenicatedUser = function(req, res,next) {
    if(req.isAuthenticated()){
        // req.user contain signed in user from cookie we are just passing to locals for view
        res.locals.user= req.user
        console.log('calling froom passport')
    }
    next();
}

module.exports = passport;