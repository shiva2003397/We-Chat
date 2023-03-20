import React from "react";
import "./Message.css";

function Message(props) {
    // console.log(props);
    if (props.user) {
        return (
            <div className={`messageBox ${props.classs}`}  >
                {`${props.user}: ${props.message}`}
            </div>
        )
    }
    else {
        return (
            <div className={`messageBox ${props.classs}`}>
                {`You: ${props.message}`}
            </div>
        )
    }
}

export default Message;