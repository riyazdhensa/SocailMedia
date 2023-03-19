const express=require('express');
const router=express.Router();


const userController = require('../controller/user_controller');
console.log('calling routes mmmmm');
router.get('/profile', userController.profile);
console.log('calling routes mmmmm22222');

module.exports = router;