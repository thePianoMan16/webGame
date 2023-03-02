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
  const [ammo1, setAmmo1] = useState(0);
  const [ammo2, setAmmo2] = useState(0);
  const [p1Choice, setP1Choice] = useState(0);
  const [p2Choice, setP2Choice] = useState(0);
  
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
    socket.on("update_UI", (data) => { //TODO: -Set Ammo for each player and use all information from data to set everything here.
      setMessageReceived(data.message);
    });

    socket.on("start_game", (data) => {
      setPlayer(data.playerTurn);
      console.log(`I am player ${player}`);
    })
  }, [socket, player])


  return ( //* --------------------------------------------- ALL HTML HERE
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
            {/* //TODO CHANGE PLAYER TYPE TO PLAYER!!!. */}
            {playerType === 0 ? <p id="am1">{ ammo1 }</p> : <p>-</p>}
            <img src={require('./images/p1.png')} alt="Player 1" className="stickman"/>
            {playerType === 0 ? 
            <div className="button-container">
              <button className="button" onClick={() => {sendMessage(0, 0)}}>Reload</button>
              <button className="button" onClick={() => {sendMessage(1, 0)}}>Shoot</button>
              <button className="button" onClick={() => {sendMessage(2, 0)}}>Block</button>
            </div> : 
            <div className="button-container">
            <button className="button" disabled>Reload</button>
            <button className="button" disabled>Shoot</button>
            <button className="button" disabled>Block</button>
          </div>}
          </div>
          <div className="right">
            <h2>Player 2</h2>
            {playerType === 1 ? <p id="am2">{ ammo2 }</p> : <p>-</p>}
            <img src={require('./images/p21.png')} alt="Player 2" id="p2" className="stickman"/>
            {playerType === 1 ?
              <div className="button-container">
                <button className="button" onClick={() => {sendMessage(0, 1)}}>Reload</button>
                <button className="button" onClick={() => {sendMessage(1, 1)}}>Shoot</button>
                <button className="button" onClick={() => {sendMessage(2, 1)}}>Block</button>
              </div> 
            : 
              <div className="button-container">
                <button className="button" disabled>Reload</button>
                <button className="button" disabled>Shoot</button>
                <button className="button" disabled>Block</button>
              </div>
          }

  </div>

      {/* end of code insert */}
    </div>
    </div>
  );
}  //! -------------------------------------------------------------- END


export default App;

