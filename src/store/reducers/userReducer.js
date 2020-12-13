import { combineReducers } from "redux";
import {USER_UPDATE, TOKEN_UPDATE} from "../actionTypes.js";

const onUserUpdate = (state = null, action) => {
    switch(action.type){
        case USER_UPDATE: 
            return action.payload;
        default:
            return state;
    }
}

const onTokenUpdate = (state = "" ,action) => {
    switch(action.type){
        case TOKEN_UPDATE: 
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    user : onUserUpdate,
    token : onTokenUpdate,
})