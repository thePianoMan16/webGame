const express = require('express');
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");


app.use(cors());


const server = http.createServer(app);


const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    },
});

var playerTurn = 0;
var ammo1 = 0;
var ammo2 = 0;
var p1Choice = 0;
var p2Choice = 0;

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    
    socket.on("join_room", (data) => {
        socket.join(data);
        socket.to(socket.id).emit("start_game", { playerTurn });
        if (playerTurn == 0)
            playerTurn++;
        else
            playerTurn = 0;
    });

    socket.on("take_turn", (data) => { //? Maybe change "send message" to be like take turn (do on  both sides)
        console.log(data);
        if (playerTurn == 0) {
            p1Choice = data.btnId;

            if (data.btnId == 0) {
                console.log("Player 1 Reloaded!!");
                ammo1++;
            } else if (data.btnId == 1) {

            } else if (data.btnId == 2) {

            } else {
                console.log("INVALID button ID. (not 0, 1, or 2). See line 49, or wherever this is.");
            }
            playerTurn++;
        } else {
            p2Choice = data.btnId;
            if (data.btnId == 0) {
                console.log("Player 2 Reloaded!!  (Player 2)");
                ammo2++;
            } else if (data.btnId == 1) {

            } else if (data.btnId == 2) {

            } else {
                console.log("INVALID button ID. (not 0, 1, or 2). See line 49, or wherever this is.");
            }
            playerTurn = 0;

            if (p1Choice == 0 && p2Choice == 1) {
                //Game ends, p2 wins
            } else if (p1Choice == 1 && p2Choice == 0) {
                //game ends, p1 wins
            } else if (p1Choice == 0 && p2Choice == 0) {
                // ammo increases
            } else if (p1Choice == 1 && p2Choice == 1) {
                // ammo decreases. game continues.
            } else if (p1Choice == 2 && p2Choice == 2) {
                // do nothing
            } else if (p1Choice == 1 && p2Choice == 2) {
                //p1 ammo decrease
            } else if (p1Choice == 2 && p2Choice == 1) {
                //p2 ammo decrease
            }
            
            //TODO analyze state here: send back ammo(both peeps) -if alive -what button both peeps had pressed
            socket.to(data.room).emit("update_UI", data); //?  change "receive_message" to turn over and update UI (on both sides)
        }
    });

});


server.listen(3001, () => {
    console.log("SERVER IS RUNNING");
})
