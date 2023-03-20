import React, { useState } from "react";
import "./Join.css";
import logo from "../images/logo.png"
import {Link} from "react-router-dom";

let user; 

function Join () {
    
    const [name , setName] = useState("");

    function handleChange (event) {
        setName(event.target.value);
    }
    
    //Here user and name both containes the same value!
    const sendUser = function () {
        user = document.getElementById('joinInput').value;
        document.getElementById('joinInput').value = "";
    }

    return (
        <div className="JoinPage">
            <div className="JoinContainer">
                <img src={logo} alt="" />
                <h1>CHAT APP</h1>
                <input type="text" id="joinInput" placeholder="Enter Your Name" onChange={handleChange}/>
                <Link to = "/chat" onClick={(event) => !name ? event.preventDefault() : null}><button className="joinbtn" onClick={sendUser}>Login</button></Link>
            </div>
        </div>
    )
}

export default Join;
export { user };