var express = require('express');
const { signup, signin, google } = require('../controllers/AuthController');
var router = express.Router();

router.route('/signup').post(signup);
router.route('/signin').post(signin);
router.route('/google').post(google);

module.exports = router;
