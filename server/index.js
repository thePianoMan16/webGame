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
        if (playerTurn == 0) {
            console.log(data);
            if (data === "Reload") {
                
            }
            playerTurn++;
        } else {//TODO -send back ammo(both peeps) -if alive -what button both peeps had
            playerTurn = 0;
            socket.to(data.room).emit("update_UI", data); //?  change "receive_message" to turn over and update UI (on both sides)
        }
    });

});


server.listen(3001, () => {
    console.log("SERVER IS RUNNING");
})
