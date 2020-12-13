const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    lastMessage : String,
    lastMessageTime: String,
    participants : [
        {
            ref: 'User',
            type : Schema.Types.ObjectId,
        }
    ],
})


module.exports = mongoose.model('Chat', chatSchema);