import React, { useState } from "react";
import { user } from "../Join/Join";
import { useEffect} from "react";
import socketIo from "socket.io-client";
import "./Chat.css";
import sendLogo from "../images/send.png";
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../images/closeIcon.png";

const ENDPOINT = "http://localhost:4500/";
let socket;

function Chat() {


    let [id , setId] = useState("");
    let [messages , setMessages] = useState([]);


    const send = function () {
        let message = document.getElementById("chatInput").value;
        socket.emit('message' , {message , id});
        document.getElementById("chatInput").value = "";
    }

    console.log(messages);
    
    useEffect(() => {
        socket = socketIo(ENDPOINT, { transports: ['websocket'] });

        socket.on('connect', () => {
            setId(socket.id);
        })

        // console.log(socket);
        socket.emit('joined', { user })

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        socket.on('sendMessage', (data) => {
            setMessages([...messages, data]);
            console.log(socket.id);
            console.log(data.user, data.message, data.id);
        })

        socket.on('welcome', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message);
        })

        socket.on('userJoined', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message);
        })

        socket.on('leave', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message);
        })

        return () => {
            socket.off();
        }
    }, [messages])


    // console.log(messages);

    return (
        <div className="chatPage">
            <div className="chatContainer">
                <div className="header">
                    <h2>CHAT</h2>
                    <a href="/"> <img src={closeIcon} alt="Close" /></a>
                </div>

                <ReactScrollToBottom className="chatBox">
                    {
                        messages.map(function (item , index) {
                            return (
                                <Message user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />
                            )
                        })
                    }
                </ReactScrollToBottom>

                <div className="inputBox">
                    <input type="text" id="chatInput" />
                    <button onClick={send} className="sendBtn"><img src={sendLogo} alt="Send" /></button>
                </div>
            </div>
        </div>
    )
}

export default Chat;