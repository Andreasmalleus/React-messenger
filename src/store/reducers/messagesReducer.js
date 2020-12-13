import {MESSAGES_SUCCESS, MESSAGES_APPEND, MESSAGES_UPDATE, MESSAGES_EMPTY} from "../actionTypes.js";

const messages = (state = [], action) => {
    switch(action.type){
        case MESSAGES_SUCCESS: 
            return action.payload;
        case MESSAGES_APPEND:
            return [
                ...state,
                action.payload
            ]
        case MESSAGES_UPDATE:
            return [
                ...action.payload
            ]
        case MESSAGES_EMPTY:
            return []
        default:
            return state;
    }
}

export default messages;