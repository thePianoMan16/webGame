import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from "react";
import "./App.css";
const socket = io.connect("http://localhost:3001");

function App() {
  const [room, setRoom] = useState("");

  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [player, setPlayer] = useState("");
  
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  }
  
  const sendMessage = () => {
    socket.emit("take_turn", { message, room });
  };

  useEffect(() => {
    socket.on("update_UI", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket])

  return ( //! --------------------------------------------- ALL HTML HERE
    <div className="App">
      <input
      placeholder='Room Code...'
      onChange={(event) => {
        setRoom(event.target.value);
      }}
      />
      <button onClick={joinRoom}> Join Room</button>
      <input
      placeholder='Message...'
      onChange={(event) => {
        setMessage(event.target.value);
      }}
      />
      <button onClick={sendMessage}> Send Message</button>
    <h1>Message:</h1>
    {messageReceived}

    <div class="container">
      <div class="left">
        <h2>User 1</h2>  
        {/* //! Change to say what their userid is */}
        <p id="am1">0</p>
        <img src={require('./images/p1.png')} alt="Player 1" class="stickman"/>
        <div class="button-container">
          <button class="button" onclick="updateGame(1)">Reload</button>
          <button class="button" onclick="updateGame(2)">Shoot</button>
          <button class="button" onclick="updateGame(3)">Block</button>
        </div>
      </div>
      <div class="right">
        <h2>User 2</h2>
        <p id="am2">0</p>
        <img src={require('./images/p21.png')} alt="Player 2" id="p2" class="stickman"/>
        <div class="button-container">
          <button class="button" onclick="updateGame(4)">Reload</button>
          <button class="button" onclick="updateGame(5)">Shoot</button>
          <button class="button" onclick="updateGame(6)">Block</button>
        </div>
      </div>
    </div>
    </div>
  );
}  //! -------------------------------------------------------------- END


export default App;
