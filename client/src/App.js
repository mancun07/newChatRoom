import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Chat from "./components/Chat";
import Home from "./components/Home";
import NoMatch from "./components/NoMatch";

const App = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  // List of users
  const updateUsers = (users) => {
    setUsers(users);
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
            <Home />
          </Route>
          <Route path="/chat">
            <Chat
              users={users}
              updateUsers={updateUsers}
              messages={messages}
              updateMessages={updateMessages}
            />
          </Route>
          <Route path={"*"}>
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
