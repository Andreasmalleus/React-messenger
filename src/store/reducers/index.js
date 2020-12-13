import {combineReducers} from "redux";
import chats from "./chatsReducer.js";
import userReducer from "./userReducer.js";
import messages from "./messagesReducer.js";
import pending from "./pendingReducer.js";
import error from "./errorReducer.js";

export default combineReducers(
    {
        chats,
        userReducer,
        messages,
        pending,
        error
    }
);