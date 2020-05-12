var mongoose = require("mongoose");
var passport = require("passport");
var createError = require('http-errors');
var User = require('../models/User');

var urlController = {};

urlController.home = function(req, res) {
  if (req.user){
    User.findById(req.user._id, function(err, userdata){
      res.render('index', { user : userdata, brand: "peerP" });
    });
  } else {
    res.render('public_index', {brand : "peerP"});
  }
};

urlController.profile = function(req, res, next) {
  if(req.user){
    console.log(notedata);
    res.render('profile', {user : req.user, brand: "peerP"});
  } else {
    next(createError(404));
  }
}; 

urlController.savenote = function(req, res, next) {
  if(req.user){
    User.findById(req.user._id, function(err, user) {
      if(err){
        console.log(err);
      }
      user.notepad= req.body.notes;
      user.save();
      res.status(201).redirect('/');
    });
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