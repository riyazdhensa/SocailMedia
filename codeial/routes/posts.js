const express=require('express');
const router=express.Router();
const passport = require('passport');

const postController = require('../controller/post_controller')
router.post('/create',passport.checkAuthentication,postController.create)
router.get('/destroy/:id',passport.checkAuthentication,postController.destroy)
// router.get('/destroy/:id',function(req,res){
//     console.log('destroy post is called');
// })
//add passport.checkAuthentication to check if the user is authenticated
// or not.  checkauthentication is method created in config passport_cocal ust
module.exports = router;