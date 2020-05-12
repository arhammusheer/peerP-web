var express = require('express');
var router = express.Router();
var roomController = require("../controllers/RoomController.js");
var passport = require("passport");

// room root
router.get('/', roomController.allrooms);

//new room
router.get('/new', roomController.createRoom);

module.exports = router;