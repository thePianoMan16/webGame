import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from "react";
import "./App.css";
const socket = io.connect("http://localhost:3001");

const playerType = 0;


function App() {
  const [room, setRoom] = useState("");

  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [player, setPlayer] = useState(0);
  const [started, setStarted] = useState(false);
  
  const joinRoom = () => {
    if (room !== "") {
      console.log(`Emitting Room number: ${room}`);
      socket.emit("join_room", room);
    }
  }

  //* duplicated in lower function
  const sendMessage = (btnId, pId) => {
    socket.emit("take_turn", { btnId, pId, room });
  }; //*

  useEffect(() => {
    socket.on("update_UI", (data) => {
      setMessageReceived(data.message);
    });

    socket.on("start_game", (data) => {
      setPlayer(data.playerTurn);
      console.log(`I am player ${player}`);
    })
  }, [socket])

  var ammo1 = 0;
  var ammo2 = 0;


  return ( //TODO --------------------------------------------- ALL HTML HERE
    <div className="App">
      <br></br>
      <input
      placeholder='Room Code...'
      onChange={(event) => {
        console.log(`Set Room ${event.target.value}`);
        setRoom(event.target.value);
      }}
      />
      <button onClick={joinRoom}> Join Room</button>

    <div className="container">
      {/* insert code here  (this <buttons/> )*/}
    <div className="left">
            <h2>Player 1</h2>  
            {/* //! Change to say what their userid is */}
            <p id="am1">0</p>
            <img src={require('./images/p1.png')} alt="Player 1" className="stickman"/>
            <div className="button-container">
              <button className="button" onClick={() => {sendMessage(0, 0)}}>Reload</button>
              <button className="button" onClick={() => {sendMessage(1, 0)}}>Shoot</button>
              <button className="button" onClick={() => {sendMessage(2, 0)}}>Block</button>
            </div>
          </div>
          <div className="right">
            <h2>Player 2</h2>
            <p id="am2">0</p>
            <img src={require('./images/p21.png')} alt="Player 2" id="p2" className="stickman"/>
            {/*//TODO pretend we are user 0 and try to make the if code. Use google */}
            <div className="button-container">
              <button className="button" onClick={() => {sendMessage(0, 1)}}>Reload</button>
              <button className="button" onClick={() => {sendMessage(1, 1)}}>Shoot</button>
              <button className="button" onClick={() => {sendMessage(2, 1)}}>Block</button>
            </div>

  </div>

      {/* end of code insert */}
    </div>
    </div>
  );
}  //! -------------------------------------------------------------- END

const buttons = () => {
  // const sendMessage = (btnId, pId) => {
  //   socket.emit("take_turn", { btnId, pId, room });
  // };

  if (playerType = 0) {
  //   return(
  //     <div>
  //     <div className="left">
  //       <h2>Player 1</h2>
  //       {/* //! Change to say what their userid is */}
  //       <p id="am1">0</p>
  //       <img src={require('./images/p1.png')} alt="Player 1" className="stickman"/>
  //       <div className="button-container">
  //         <button className="button" onClick={() => {sendMessage(0, 0)}}>Reload</button>
  //         <button className="button" onClick={() => {sendMessage(1, 0)}}>Shoot</button>
  //         <button className="button" onClick={() => {sendMessage(2, 0)}}>Block</button>
  //       </div>
  //     </div>
  //     <div className="right">
  //       <h2>Player 2</h2>
  //       <p id="am2">0</p>
  //       <img src={require('./images/p21.png')} alt="Player 2" id="p2" className="stickman"/>

  //     </div>
  //     </div>
  //   )
  // } else {
  //   <div>
  //     <div className="left">
  //       <h2>Player 1</h2>  
  //       {/* //! Change to say what their userid is */}
  //       <p id="am1">0</p>
  //       <img src={require('./images/p1.png')} alt="Player 1" className="stickman"/>
  //     </div>
  //     <div className="right">
  //       <h2>Player 2</h2>
  //       <p id="am2">0</p>
  //       <img src={require('./images/p21.png')} alt="Player 2" id="p2" className="stickman"/>
  //       {/*//TODO pretend we are user 0 and try to make the if code. Use google */}
  //       <div className="button-container">
  //         <button className="button" onClick={() => {sendMessage(0, 1)}}>Reload</button>
  //         <button className="button" onClick={() => {sendMessage(1, 1)}}>Shoot</button>
  //         <button className="button" onClick={() => {sendMessage(2, 1)}}>Block</button>
  //       </div>

  //     </div>
  //     </div>
  }
}

export default App;

