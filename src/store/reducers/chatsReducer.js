import {CHATS_EMPTY, CHATS_SUCCESS} from "../actionTypes.js";

const chats = (state = [], action) => {
    switch(action.type){
        case CHATS_SUCCESS: 
            return action.payload
        case CHATS_EMPTY:
            return []
        default:
            return state;
    }
}

export default chats;