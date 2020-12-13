import React, {createRef} from "react";
import Chat from "../components/Chat.jsx";
import Message from "../components/Message.jsx";
import MessageList from "../components/MessageList.jsx";
import ChatList from "../components/ChatList.jsx";
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux"
import { getChats, joinChat, sendMessage, leaveChat, addMessage, connectSocket, getMessages,appendToMessages} from "../store/actions.js";
import {createPendingSelector, createErrorSelector, getChatsSelector} from "../store/selectors.js";
import {ADD, CHATS, CONNECT, CREATE, JOIN, LEAVE, MESSAGES, SEND} from "../store/actionTypes.js";
import userImage from "../../public/images/userImage.png";
import UserModal from "../components/modal/User.jsx";
import Collapsible from "../components/Collapsible.jsx";
import {getCurrentDate, formatDateToHMS} from "../../utils/utils.js";
import logo from "../../public/images/logo.png";


class Home extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            selectedChatId : "",
            message : "",
            isTyping : false, 
            redirect: false,
            isExtended : false
        }
        this.userRef = createRef();

    }

    componentDidMount(){
        this.props.connectSocket(this.props.token);

        this.getChats();

        this.props.addMessage((message) => {
            this.props.appendToMessages(message);
        });
    }

    componentWillUnmount(){
        this.props.leaveChat(this.state.selectedChatId)
    }

    getChats = () => {
        this.props.getChats(this.props.user._id)
        .then(() => {
                if(this.props.chats.length != 0){
                    this.setState({
                        selectedChatId : this.props.chats[0]._id
                    })
                    this.props.joinChat(this.state.selectedChatId)
                    this.props.getMessages(this.state.selectedChatId);
                }
            }
        )
    }

    sendMessage = () => {
        this.props.sendMessage({
            message : this.state.message,
            createdAt : getCurrentDate(),
            sender : this.props.user,
            chatId :  this.state.selectedChatId
        });
    }

    selectChat = (chat) => {
        if(this.state.selectedChatId != chat._id){
            this.setState({
                selectedChatId : chat._id
            }, () => {
                this.props.leaveChat(this.state.selectedChatId)
                this.props.joinChat(this.state.selectedChatId)
                this.props.getMessages(this.state.selectedChatId);
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
        setTimeout(() => this.setState({
            isTyping : false
        }), 1000);
    }

    openUserModal = () => {
        this.userRef.current.style.display = "block"
    }

    render(){
        const {redirect} = this.state;

        if(redirect || this.props.user == null){
            return <Redirect to='/login'/>
        }

        return (
            <div className="home">
                <div className="header">
                    <div className="logo-container">
                            <img src={logo} alt="" className="logo"/>
                            <div className="logo-title">ReactMessenger</div>
                    </div>
                </div>
                <div className="main">
                    <div className="section-one">
                        <div className="section-one-user" onClick={this.openUserModal}>
                            <img src={userImage}></img>
                            <div >{this.props.user.username}</div>
                        </div>
                        <Collapsible user={this.props.user}/>
                        <div className="divider"></div>
                        {this.props.chats.length != 0 ? 
                        <ChatList 
                            chats={this.props.chats}
                            renderChat={chat => <Chat
                                {...chat}
                                key={chat._id}
                                selectChat={this.selectChat}
                                currentUser = {this.props.user.username}
                            />}
                        />
                        :
                        null
                        }
                    </div>
                    <UserModal ref={this.userRef} data={this.props.user}/>
                    <div className="section-two">
                    {this.props.messages.length != 0 ?
                            <MessageList
                                messages = {this.props.messages}
                                renderMessage = {message => <Message 
                                    {...message} key={message._id} currentUser = {this.props.user.username}
                                />
                                }
                            /> 
                            : 
                            null
                        }
                        <div className="input-container">
                            <input type="text" name="message" placeholder="Write your message here" onChange={this.handleChange} value={this.state.message} className="message-input"/>
                            <button onClick={this.sendMessage} className="send-message-btn">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const pendingSelector = createPendingSelector([MESSAGES, CREATE, JOIN, LEAVE, CHATS, ADD, SEND, CONNECT]);
const errorSelector = createErrorSelector([MESSAGES, CREATE, JOIN, LEAVE, CHATS, ADD, SEND, CONNECT]);

const mapStateToProps = (state) => {
    return {
        error : errorSelector(state),
        pending : pendingSelector(state),
        messages : state.messages,
        user : state.userReducer.user,
        token : state.userReducer.token,
        chats : getChatsSelector(state)
    }
}

const mapDispatchToPorps = dispatch => {
    return {
        connectSocket : token => dispatch(connectSocket(token)),
        joinChat : id => dispatch(joinChat(id)),
        getChats : id => dispatch(getChats(id)),
        getMessages : id => dispatch(getMessages(id)),
        sendMessage : message => dispatch(sendMessage(message)),
        addMessage : fun => dispatch(addMessage(fun)),
        appendToMessages : (message) => dispatch(appendToMessages(message)),
        leaveChat : id => dispatch(leaveChat(id)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToPorps
)(Home);