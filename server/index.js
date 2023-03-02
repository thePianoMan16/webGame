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
var p1HP = 1;
var p2HP = 1;

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

            //TODO analyze state here: send back ammo(both peeps) -if alive -what button both peeps had pressed
            if (p1Choice > -1 && p2Choice > -1) {
                if (p1Choice == 0 && p2Choice == 1) { // game ends, p2 wins
                    p1HP = 0;
                } else if (p1Choice == 1 && p2Choice == 0) {
                    //game ends, p1 wins
                    p2HP = 0;
                } else if (p1Choice == 0 && p2Choice == 0) {
                    // ammo increases
                    ammo1++;
                    ammo2++;
                } else if (p1Choice == 1 && p2Choice == 1) {
                    // ammo decreases. game continues.
                    ammo1--;
                    ammo2--;
                } else if (p1Choice == 2 && p2Choice == 2) {
                    // do nothing
                } else if (p1Choice == 1 && p2Choice == 2) {
                    //p1 ammo decrease
                    ammo1--;
                } else if (p1Choice == 2 && p2Choice == 1) {
                    //p2 ammo decrease
                    ammo2--;
                } else if (p1Choice == 0 && p2Choice == 2) {
                    //p1 ammo increase
                    ammo1++;
                } else if (p1Choice == 2 && p1Choice == 0) {
                    //p2 ammo increase
                    ammo2++;
                }
                data = { p1Choice, p2Choice, ammo1, ammo2, p1HP, p2HP };
                
                socket.to(data.room).emit("update_UI", data);
                p1Choice = -1;
                p2Choice = -1;
            }
            
        }
    });

});


server.listen(3001, () => {
    console.log("SERVER IS RUNNING");
})
