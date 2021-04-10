import { useState } from "react";

const Home = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("Funs of Zenit");

  const onSubmit = (e) => {
    e.preventDefault();
    window.location = `/chat?username=${username}&room=${room}`;
    setUsername("");
    setRoom("Funs of Zenit");
  };

  return (
    <div className="join-container">
      <header className="join-header">
        <h1>
          <i className="fas fa-smile"></i>SportChat
        </h1>
      </header>
      <main className="join-main">
        <form onSubmit={onSubmit}>
          <div className="form-control">
            <label htmlFor="username">Username</label>
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
          <div className="form-control">
            <label htmlFor="room">Room</label>
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
          <button type="submit" className="btn">
            Join Chat
          </button>
        </form>
      </main>
    </div>
  );
};

export default Home;
