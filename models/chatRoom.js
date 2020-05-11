var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate')

var Schema = mongoose.Schema;

var chatRoomSchema = new Schema({
    roomName
});

UserSchema.plugin(findOrCreate);

global.UserSchema = global.UserSchema || mongoose.model('User', UserSchema);
module.exports = global.UserSchema;