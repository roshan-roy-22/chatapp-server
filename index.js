const express = require('express');
const app=express();
const http=  require('http');
const cors=require('cors');
const { Server } = require('socket.io');

app.use(cors());

const server=http.createServer(app)

const io= new Server(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
})

io.on('connection', (socket) => {
    console.log(`user connected  ${socket.id}`);

    // Listen for the "connection" event
    socket.on('connection', (username) => {
        console.log(`User connected: ${socket.id} - Username: ${username}`);
        io.emit('user-joined', {  username });
    });

    socket.on("send-message", (message) => {
        io.emit('recieved-msg', message);
    });

    socket.on("ended", () => {
        console.log(`user disconnected ${socket.id}`);
    });
});

server.listen(5000,()=>{
    console.log(`Server running at port 5000`);
});