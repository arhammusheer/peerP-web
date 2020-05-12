var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate')

var Schema = mongoose.Schema;

var chatRoomSchema = new Schema({
    roomName: String,
    roomParticipant: String
});

chatRoomSchema.plugin(findOrCreate);

global.chatRoomSchema = global.chatRoomSchema || mongoose.model('chatRoom', chatRoomSchema);
module.exports = global.chatRoomSchema;