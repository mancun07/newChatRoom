import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import Message from "./Message";

const Chat = ({ users, updateUsers, messages, updateMessages }) => {
  const [msg, setMsg] = useState("");
  const [serverRoom, setServerRoom] = useState("");
  let username = new URLSearchParams(window.location.search).get("username");
  let room = new URLSearchParams(window.location.search).get("room");

  const socket = useRef();

  useEffect(() => {
    // Join chatroom
    socket.current = io.connect("/");
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
  }, []);

  // if (users.username === undefined) {
  //   window.location = "/";
  //   alert("A username is not unique");
  // }

  //Sending message to the server
  const onSubmit = (e) => {
    e.preventDefault();
    socket.current.emit("chatMessage", msg);
    setMsg("");
  };

  //Redirect when a user leaves a room
  const onClick = () => {
    window.location = "/";
  };

  return (
    <>
      <div class="chat-container">
        <header class="chat-header">
          <h1>
            <i class="fas fa-smile"></i> SportChat
          </h1>
          <a id="leave-btn" class="btn" onClick={onClick}>
            Leave Room
          </a>
        </header>
        <main class="chat-main">
          <div class="chat-sidebar">
            <h3>
              <i class="fas fa-comments"></i> Room Name:
            </h3>
            <h2 id="room-name">{serverRoom}</h2>
            <h3>
              <i class="fas fa-users"></i> Users
            </h3>
            <ul id="users">
              {users &&
                users.map((el) => {
                  return (
                    <li key={el.id}>
                      {el.username}
                      <span> ({el.id})</span>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div class="chat-messages">
            {messages &&
              messages.map((el, i) => {
                return <Message key={i} el={el} />;
              })}
          </div>
        </main>
        <div class="chat-form-container">
          <form id="chat-form" onSubmit={onSubmit}>
            <input
              onChange={(e) => setMsg(e.target.value.trim())}
              value={msg}
              id="msg"
              type="text"
              placeholder="Enter Message"
              required
            />
            <button class="btn">
              <i class="fas fa-paper-plane"></i> Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chat;
