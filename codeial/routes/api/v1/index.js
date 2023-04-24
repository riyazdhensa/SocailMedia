const express = require('express');

const router = express.Router();

router.use('/posts', require('./posts'));
router.use('/users', require('./users'));

module.exports = router;

//v1 is version 1 of API. if we made any change to database 
//then we can create version 2 and so on to carry old and new user