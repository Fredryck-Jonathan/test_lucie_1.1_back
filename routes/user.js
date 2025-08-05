const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const password = require('../middleware/password');
const rateLimit = require('../middleware/rateLimit')

router.post('/login', password, userCtrl.login, rateLimit);

module.exports = router;