var express = require('express');
const { signup, signin } = require('../controllers/AuthController');
var router = express.Router();

router.route('/signup').post(signup);
router.route('/signin').post(signin);

module.exports = router;
