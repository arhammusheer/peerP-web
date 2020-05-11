var mongoose = require("mongoose");
var passport = require("passport");

var urlController = {};

urlController.home = function(req, res) {
  if (req.user){
    res.render('index', { user : req.user });
  } else {
    res.render('public_index');
  }
};

urlController.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};


module.exports = urlController;