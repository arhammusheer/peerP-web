var mongoose = require("mongoose");
var passport = require("passport");
var createError = require('http-errors');

var urlController = {};

urlController.allrooms = function(req, res, next) {
  if (req.user){
    res.send("Not Implemented");
  } else {
      next(createError(404));
  }
};

urlController.createRoom = function(req, res, next) {
    if (req.user){
      res.send("Not Implemented");
    } else {
        next(createError(404));
    }
  };

module.exports = urlController;