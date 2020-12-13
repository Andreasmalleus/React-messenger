import React from "react";
import userImage from "../../../public/images/userImage.png"
import { RiCloseLine} from 'react-icons/ri';
import {connect} from "react-redux";
import {updateToken, updateUser, emptyMessages, emptyChats} from "../../store/actions.js";

const UserModal = React.forwardRef((props, ref) => {

    const closeModal = () => {
        ref.current.style.display = "none"
    }

    const handleClick = () => {
        props.emptyChats();
        props.emptyMessages();
        props.updateToken("");
        props.updateUser(null)
    }

    return (
        <div className="modal" ref={ref}>
            <div className="modal-content">
                <div className="first-section">
                    <div className="close-btn" onClick={closeModal}>
                        <RiCloseLine color="white" size="20px"/>
                    </div>
                </div>
                <div className="second-section">
                    <img className="modal-image" src={userImage}></img>
                    <div className="modal-username">{props.data.username}</div>
                    <div className="modal-email">{props.data.email}</div>
                    <div className="modal-id">ID: {props.data._id}</div>
                    <div className="log-out-btn" onClick={handleClick}>Log out</div>
                </div>
            </div>
        </div>
    );
});

const mapDispatchToPorps = dispatch => {
    return {
        updateUser : (user) => dispatch(updateUser(user)),
        updateToken : (token) => dispatch(updateToken(token)),
        emptyChats : () => dispatch(emptyChats()),
        emptyMessages: () => dispatch(emptyMessages()),
    }
}

export default connect(
    null,
    mapDispatchToPorps,
    null,
    {forwardRef  : true}
)(UserModal);