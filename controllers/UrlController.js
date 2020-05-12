var mongoose = require("mongoose");
var passport = require("passport");
var createError = require('http-errors');

var urlController = {};

urlController.home = function(req, res) {
  if (req.user){
    res.render('index', { user : req.user, brand: "peerP" });
  } else {
    res.render('public_index', {brand : "peerP"});
  }
};

urlController.profile = function(req, res, next) {
  if(req.user){
    res.render('profile', {user : req.user, brand: "peerP"});
  } else {
    next(createError(404));
  }
}; 

urlController.login = function(req, res) {
  res.redirect("/auth/google");
};

urlController.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};


module.exports = urlController;