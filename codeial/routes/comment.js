const express=require('express');
const router=express.Router();
const passport = require('passport');

const commentsController = require('../controller/comments_controller')
// router.post('/create' , function(req, res) {
//     console.log(req.body);
// })
router.post('/create',passport.checkAuthentication,commentsController.create)
router.get('/destroy/:id', passport.checkAuthentication,commentsController.destroy)
// router.get('/destroy/:id', function(req, res) {
//     console.log(req.params.id);
// })
//add passport.checkAuthentication to check if the user is authenticated
// or not checkauthentication is method created in config passport_cocal ust
module.exports = router;