var express = require('express');
var router = express.Router();
var urlController = require("../controllers/UrlController.js");
var passport = require("passport");

// restrict index for logged in user only
router.get('/', urlController.home);

// route for logout action
router.get('/logout', urlController.logout);

// google Auth
router.get('/auth/google',passport.authenticate('google', { scope: ['profile','email'] }));

// google Auth Callback
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),function(req, res) {
    res.redirect('/');
  });

module.exports = router;