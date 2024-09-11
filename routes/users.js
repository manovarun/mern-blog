var express = require('express');
const { register, login } = require('../controllers/AuthController');
var router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);

module.exports = router;
