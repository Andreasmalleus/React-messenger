import React from "react";

const ChatList = ({chats, renderChat}) => {
    return (
        <div className="chats">
            {chats.map(chat => renderChat(chat))}
        </div>
    )
}

export default ChatList;