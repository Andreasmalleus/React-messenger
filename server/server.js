const express = require('express');
const app = express();
const http = require('http').createServer(app);
const bodyParser = require('body-parser');

require('dotenv').config();
const port = process.env.PORT;

const Chat = require('./models/chat.js');
const Message = require('./models/message.js');

const connection = require('./connection.js');
const io = require('socket.io')(http);
const apiRouter = require('./routes/apiRouter.js');

const socketioJwt   = require('socketio-jwt');
const secretJwT = process.env.JWT_SECRET;

app.use(bodyParser.json());

app.use(apiRouter)

const users = [];

io.use(socketioJwt.authorize({
    secret : secretJwT,
    handshake : true
}));

io.on('connection', (socket) => {

    console.log(`hello! ${socket.id}`);

    socket.on('getOnlineUsers', () => {
        socket.emit('users', (users));
    })

    socket.on('chats', (id, callback) => {
        Chat.find({
            'participants' : {
                $in: [
                    id,
                ]
            }
        }).populate('participants').exec((err, chats) => {
            if(err){
                console.log(err);
                callback(err, chats)
            }
            callback(err, chats)
        })
    })

    socket.on('joinChat', (chatId, callback) => {
        try{
            socket.join(chatId);
            console.log("joined " + chatId)
            callback(null, chatId)
        }catch(e){
            console.log(e);
            callback(e, null)
        }

        socket.in(chatId).on('messages', (id, callback) => {
            Message.find({
                'chatId' : id
            }).populate('sender').exec((err, messages) => {
                if(err){
                    console.log(err)
                    callback(err, messages)
                }
                callback(err, messages)                
            })
        })

        socket.in(chatId).on('sendMessage', (data, callback) => {
            const message = Message({
                ...data,
                sender : data.sender._id
            });
            message.save((err, message) => {
                if(err){
                    console.log(err);
                    callback(err, null)
                }

                Chat.update({_id : chatId},  {
                    lastMessage : data.message,
                    lastMessageTime : data.createdAt
                }, (err, affected) => {
                    if(err){
                        console.log(err);
                    }
                    console.log(affected.nModified)
                })

                io.in(chatId).emit('addMessage', {
                    _id : message._id,
                    ...data
                });
                callback(null, "Message sent")
            })
        });
    })

    socket.on('leaveChat', (chatId, callback) => {
        try{
            socket.leave(chatId);
            socket.removeAllListeners('sendMessage');
            socket.removeAllListeners('isTyping');
            console.log('left ',chatId)
            callback(null, chatId)
        }catch(e){
            console.log(e);
            callback(e, chatId)
        }
    })

    socket.on('createChat', (data, callback) => {
        console.log("create server");
        const chat = Chat(data);
        chat.save((err, chat)=> {
            if(err){
                console.log(err);
                callback(err, chat)
            }
            console.log("chat created");
            callback(err, chat)
        })
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
        removeUser(socket.id)
        socket.removeAllListeners('send_message');
        socket.removeAllListeners('isTyping');
    })

})

const removeUser = (id) => {
    users.map((user, index)=> user.socketId == id ? users.splice(index, 1) : null);
}

connection.connectDb().then(
    console.log('Database connected'),
    http.listen(port, () => {
        console.log(`Listening at ${port}`)
    })
);