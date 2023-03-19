const express = require('express');
const router = express.Router();
const homeController = require('../controller/home_controller');

console.log('calling routes');
router.get('/', homeController.home);

console.log('calling routes  FFFF');
router.get('/profile', require('./users'));


module.exports = router;