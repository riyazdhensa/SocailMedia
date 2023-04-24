const express = require('express');

const router = express.Router();

const userAPI = require('../../../controller/api/v1/users_api')

router.post('/createSession', userAPI.createSession);

module.exports = router;