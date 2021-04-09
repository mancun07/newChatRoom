import React, { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
import { Link } from "react-router-dom";

const Home = ({ users, updateUsers }) => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("Funs of Zenit");
  console.log(users);

  const socket = useRef();
  // useEffect(() => {
  //   socket.current = io.connect("http://localhost:5000");

  //   //   // Listen room and users info from the server
  //   socket.current.on("roomUsers", ({ room, users }) => {
  //     // updateUsers(users);
  //     // setServerRoom(room);
  //   });
  // }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    window.location = `/chat?username=${username}&room=${room}`;
  };

  // const socket = io();
  // action={"/chat"}
  return (
    <div class="join-container">
      <header class="join-header">
        <h1>
          <i class="fas fa-smile"></i>SportChat
        </h1>
      </header>
      <main class="join-main">
        <form onSubmit={onSubmit}>
          <div class="form-control">
            <label for="username">Username</label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              name="username"
              id="username"
              placeholder="Enter username..."
              required
            />
          </div>
          <div class="form-control">
            <label for="room">Room</label>
            <select
              name="room"
              id="room"
              onChange={(e) => setRoom(e.target.value)}
              value={room}
            >
              <option value="Funs of Zenit">Funs of Zenit</option>
              <option value="Funs of Spartak">Funs of Spartak</option>
              <option value="Funs of CSKA">Funs of CSKA</option>
              <option value="Funs of Sochi">Funs of Sochi</option>
            </select>
          </div>
          {/* <Link to={"./chat"}> */}
          <button type="submit" class="btn">
            Join Chat
          </button>
          {/* </Link> */}
        </form>
      </main>
    </div>
  );
};

export default Home;
