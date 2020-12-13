import {
    USER_UPDATE, TOKEN_UPDATE,
    CHATS_REQUEST,CHATS_FAILURE, CHATS_SUCCESS,
    JOIN_REQUEST,JOIN_FAILURE, JOIN_SUCCESS,
    LEAVE_REQUEST,LEAVE_FAILURE, LEAVE_SUCCESS,
    MESSAGES_REQUEST,MESSAGES_FAILURE, MESSAGES_SUCCESS,
    SEND_REQUEST,SEND_FAILURE, SEND_SUCCESS,
    ADD_REQUEST, ADD_FAILURE, ADD_SUCCESS,
    CONNECT_REQUEST, CONNECT_FAILURE, CONNECT_SUCCESS,
    STORE_RESET, MESSAGES_APPEND,
    CREATE_REQUEST, CREATE_FAILURE, CREATE_SUCCESS,
    MESSAGES_UPDATE, MESSAGES_EMPTY,CHATS_EMPTY
} from "./actionTypes.js";

export const connectSocket = (token) => {
    return {
        type : 'socket',
        types : [CONNECT_REQUEST, CONNECT_FAILURE ,CONNECT_SUCCESS],
        promise : (socket) => socket.connect(token)
    }
}

export const getChats = (id) =>{
    return {
        type : 'socket',
        types : [CHATS_REQUEST, CHATS_FAILURE ,CHATS_SUCCESS],
        promise : (socket) => socket.emit('chats', id),
    }
}

export const joinChat = (id) =>{
    return {
        type : 'socket',
        types : [JOIN_REQUEST, JOIN_FAILURE ,JOIN_SUCCESS],
        promise : (socket) => socket.emit('joinChat', id),
    }
}

export const leaveChat = (id) =>{
    return {
        type : 'socket',
        types : [LEAVE_REQUEST, LEAVE_FAILURE ,LEAVE_SUCCESS],
        promise : (socket) => socket.emit('leaveChat', id),
    }
}

export const getMessages = (id) =>{
    return {
        type : 'socket',
        types : [MESSAGES_REQUEST, MESSAGES_FAILURE ,MESSAGES_SUCCESS],
        promise : (socket) => socket.emit('messages', id),
    }
}

export const updateMessages = (messages) =>{
    return {
        type : MESSAGES_UPDATE,
        payload : messages
    }
}

export const emptyMessages = () =>{
    return {
        type : MESSAGES_EMPTY,
    }
}

export const emptyChats = () =>{
    return {
        type : CHATS_EMPTY,
    }
}

export const sendMessage = (message) =>{
    return {
        type : 'socket',
        types : [SEND_REQUEST, SEND_FAILURE ,SEND_SUCCESS],
        promise : (socket) => socket.emit('sendMessage', message),
    }
}

export const addMessage = (fun) =>{
    return {
        type : 'socket',
        types : [ADD_REQUEST, ADD_FAILURE , ADD_SUCCESS],
        promise : (socket) => socket.on('addMessage',fun),
    }
}

export const createChat = (chat) => {
    return {
        type : 'socket',
        types : [CREATE_REQUEST, CREATE_FAILURE , CREATE_SUCCESS],
        promise : (socket) => socket.emit('createChat', chat),
    }
}

export const appendToMessages = (message) => {
    return {
        type : MESSAGES_APPEND,
        payload : message
    }
}

export const updateUser = (user) => {
    return {
        type: USER_UPDATE,
        payload : user
    }
}

export const updateToken = (token) => {
    return {
        type : TOKEN_UPDATE,
        payload : token
    }
}

export const resetStore = () => {
    return {
        type : STORE_RESET,
    }
}