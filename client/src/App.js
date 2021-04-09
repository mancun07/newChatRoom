import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import io from "socket.io-client";

import Chat from "./components/Chat";
import Home from "./components/Home";

const socket = io.connect("/");

const App = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  // const socket = useRef();

  // List of users
  const updateUsers = (users) => {
    setUsers((oldUsers) => [...users]);
  };

  // List of messages
  const updateMessages = (message) => {
    setMessages((oldMsges) => [...oldMsges, message]);
  };

  return (
    <Router>
      <div className="chat-container">
        <Switch>
          <Route exact path="/">
            <Home users={users} updateUsers={updateUsers} />
          </Route>
          <Route path="/chat">
            <Chat
              users={users}
              updateUsers={updateUsers}
              messages={messages}
              updateMessages={updateMessages}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
