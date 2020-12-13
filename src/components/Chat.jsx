import React from "react";
const _ = require('lodash');
import {formatDateToHMS} from "../../utils/utils.js";
import userImage from "../../public/images/userImage.png"

const Chat = (props) => {

    const getSender = () => {
        return _.get(_.find(props.participants, (participant) => participant.username != props.currentUser),  "username")
    }

    return (
        <div className="chat" onClick={() => props.selectChat(props)}>
            <div className="chat-content">
                <img src={userImage} alt="" className="chat-image"/>
                <div className="main-content">
                    <div className="chat-sender">{getSender()}</div>
                    <div className="chat-lastMessage">{props.lastMessage}</div>
                    <div className="hover-content">
                        <div className="chat-lastMessageTime">{formatDateToHMS(props.lastMessageTime)}</div>
                    </div>
                </div>
            </div>
            <div className="divid"></div>
        </div>
    )
}

export default Chat;