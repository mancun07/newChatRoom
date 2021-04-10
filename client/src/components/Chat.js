import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import io from "socket.io-client";
import Message from "./Message";

const Chat = ({ users, updateUsers, messages, updateMessages }) => {
  const [msg, setMsg] = useState("");
  const [serverRoom, setServerRoom] = useState("");
  const username = new URLSearchParams(window.location.search).get("username");
  const room = new URLSearchParams(window.location.search).get("room");

  const socket = useRef();

  useEffect(() => {
    //connection with the server
    socket.current = io.connect("/");
    // Join chatroom
    socket.current.emit("joinRoom", { username, room });

    //Listen Messages from the server
    socket.current.on("message", (message) => {
      updateMessages(message);
    });

    // Listen room and users info from the server
    socket.current.on("roomUsers", ({ room, users }) => {
      updateUsers(users);
      setServerRoom(room);
    });
    return () => {
      socket.current.disconnect();
    };
    // eslint-disable-next-line
  }, []);

  //Sending message to the server
  const onSubmit = (e) => {
    e.preventDefault();
    socket.current.emit("chatMessage", msg);
    setMsg("");
  };

  return (
    <>
      {/* <div className="chat-container"> */}
      <header className="chat-header">
        <h1>
          <i className="fas fa-smile"></i> SportChat
        </h1>
        <Link to={"/"} id="leave-btn" className="btn">
          Leave Room
        </Link>
      </header>
      <main className="chat-main">
        <div className="chat-sidebar">
          <h3>
            <i className="fas fa-comments"></i> Room Name:
          </h3>
          <h2 id="room-name">{serverRoom}</h2>
          <h3>
            <i className="fas fa-users"></i> Users
          </h3>
          <ul id="users">
            {users &&
              users.map((el) => {
                return <li key={el.id}>{el.username}</li>;
              })}
          </ul>
        </div>
        <div className="chat-messages">
          {messages &&
            messages.map((el, i) => {
              return <Message key={i} el={el} />;
            })}
        </div>
      </main>
      <div className="chat-form-container">
        <form id="chat-form" onSubmit={onSubmit}>
          <input
            onChange={(e) => setMsg(e.target.value.trim())}
            value={msg}
            id="msg"
            type="text"
            placeholder="Enter Message"
            required
          />
          <button className="btn">
            <i className="fas fa-paper-plane"></i> Send
          </button>
        </form>
      </div>
      {/* </div> */}
    </>
  );
};

Message.propTypes = {
  users: PropTypes.array,
  messages: PropTypes.array,
  updateUsers: PropTypes.func,
  updateMessages: PropTypes.func,
};

export default Chat;
