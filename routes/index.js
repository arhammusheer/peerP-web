var express = require('express');
var router = express.Router();
var urlController = require("../controllers/UrlController.js");
var passport = require("passport");

// restrict index for logged in user only
router.get('/', urlController.home);

// route for logout action
router.get('/logout', urlController.logout);

// login handler
router.get('/login', urlController.login);

//profile page
router.get('/profile', urlController.profile);

//notepad saveData
router.post('/notepad-save', urlController.savenote);

// google Auth
router.get('/auth/google',passport.authenticate('google', { scope: ['profile','email'] }));

// google Auth Callback
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),function(req, res) {
    res.redirect('/');
  });

module.exports = router;