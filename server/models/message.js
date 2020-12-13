const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    message : String,
    createdAt : String,
    chatId: String,
    sender : {type : mongoose.Types.ObjectId, ref : 'User'}
})

module.exports = mongoose.model('Message', messageSchema);