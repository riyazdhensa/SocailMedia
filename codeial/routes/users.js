const express=require('express');
const router=express.Router();
const passport=require('passport');

const userController = require('../controller/user_controller');
//onsole.log('calling routes mmmmm');
router.get('/profile/:id', passport.checkAuthentication ,userController.profile);
router.get('/signup', userController.signUp);
router.get('/signin', userController.userIn);
router.post('/update/:id', passport.checkAuthentication ,userController.update);

router.post('/create', userController.create);
//router.post('/create-session', userController.createSession);
router.post('/create-session',passport.authenticate(
    
    'local',
    {failureRedirect:'/users/signin'},
),userController.createSession);


router.get('/signout', userController.destroySession);

router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    failureRedirect: '/users/signin',
    callbackURL: 'http://localhost:8000/users/auth/google/callback',
    redirect_uri: '/users/signin'
  }));
  
  router.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/users/signin'
  }), userController.createSession);

// router.get('/auth/google',passport.authenticate('google',{ scope : ['profile','email']}));
// router.get('/auth/google/callback',passport.authenticate('google',
// {failureRedirect:'/users/signin'}),userController.createSession);

//console.log('calling routes mmmmm22222');
// router.get('/profile/:id', function(req, res){
//     console.log('calling profile of usersss');
// });

module.exports = router;