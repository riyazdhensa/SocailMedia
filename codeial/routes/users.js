const express=require('express');
const router=express.Router();


const userController = require('../controller/user_controller');
//onsole.log('calling routes mmmmm');
router.get('/profile', userController.profile);
router.get('/signup', userController.signUp);
router.get('/signin', userController.userIn);

router.post('/create', userController.create);
router.post('/create-session', userController.createSession);
router.get('/signout', userController.signout);

//console.log('calling routes mmmmm22222');

module.exports = router;