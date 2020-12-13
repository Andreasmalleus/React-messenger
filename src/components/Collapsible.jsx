import React, { useState } from "react";
import { RiAddLine,  RiCloseLine} from 'react-icons/ri';
import {connect} from 'react-redux';
import {createChat} from "../store/actions.js";

const Collapsible = (props) => {

    const [isExtended, setExtended] = useState(false);
    const [id, setId] = useState("");

    const openCollapsible = () => {
        if(isExtended == false){
            setExtended(true)
        }
    }

    const closeCollapsible = () => {
        setExtended(false)
    }

    const handleChange = (e) => {
        setId(e.target.value)
    }

    const handleClick = () => {
        props.createChat({
            lastMessage : "",
            lastMessageTime : "",
            participants : [
                props.user._id,
                id
            ]
        })
        setExtended(false)
    }

    const style = isExtended ? {height : "50px"} : {height : "15px"};

    return (
        <div className="create-chat" onClick={openCollapsible} style={style}>
            {
                isExtended
                ?
                <div className="content">
                    <div className="close-btn">
                        <RiCloseLine color="white" size="20px" onClick={closeCollapsible}/>
                    </div>
                    <input type="text" placeholder="ID" onChange={handleChange} value={id}/>
                    <div className="content-btn" onClick={handleClick}>
                        <div>Add</div>
                        <RiAddLine color="white" size="15px"/>
                    </div>
                </div>
                :
                <RiAddLine color="white" size="15px"/>
            }
        </div>
    )
}

const mapDispatchToProps = dispatch =>{
    return {
        createChat : (chat) => dispatch(createChat(chat))
    }
}

export default connect(null, mapDispatchToProps)(Collapsible);