import React from "react";
import {formatDateToHMS} from "../../utils/utils.js";
import UserImage from "../../public/images/userImageM.png";

const Message = (props) => {

    return(
        props.sender.username == props.currentUser
        ?
        <div className="message" style={{alignItems: "flex-start"}}>
            <div className="message-content">
                <div className="main-content">
                    <img src={UserImage} className="message-image"/>
                    <div className="message-text" style={{backgroundColor : "#222222", flexDirection: "flex-end"}}>{props.message}</div>
                </div>
                <div className="message-time" style={{textAlign : "right"}}>{formatDateToHMS(props.createdAt)}</div>
            </div>
        </div>
        :
        <div className="message" style={{alignItems: "flex-end"}}>
            <div className="message-content">
                <div className="main-content">
                    <div className="message-text" style={{backgroundColor : "#3b5998"}}>{props.message}</div>
                    <img src={UserImage} className="message-image"/>
                </div>
                <div className="message-time" style={{textAlign : "left"}}>{formatDateToHMS(props.createdAt)}</div>
            </div>
        </div>
    )
}

export default Message;
