const express = require("express");
const router = express.Router();
const emailCheck = require('../controllers/emailCheck');
const usernameCheck = require('../controllers/usernameCheck');

router.route('/check-email').get(emailCheck);
router.route('/check-username').get(usernameCheck);

module.exports = router;