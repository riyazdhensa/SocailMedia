const express = require('express');
const router = express.Router();
const homeController = require('../controller/home_controller');

//console.log('calling routes');
router.get('/', homeController.home);

//console.log('calling routes  FFFF');
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));    
router.use('/comment',require('./comment'));
// router.get('/profile', require('./users'));
// router.get('/signin', require('./users'));
// router.get('/signup', require('./users'));
// router.post('/create', require('./users'));

//API
router.use('/api',require('./api'));


module.exports = router;