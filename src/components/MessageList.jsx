import React, {useEffect, useRef} from "react";

const MessageList = ({messages, renderMessage}) => {

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior : "smooth" })
    }

    useEffect(scrollToBottom, [messages])

    return (
        <div className="messages">
            {messages.map(message => renderMessage(message))}
            <div ref={messagesEndRef}></div>
        </div>
    )
}

export default MessageList;