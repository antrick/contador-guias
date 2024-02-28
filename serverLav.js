const express = require('express');

const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server,{
  cors: {origin:"*"}
})



io.on("connection",(socket) => {
    console.log('conectado!');

    socket.on('incrementar', () => {
      io.emit('contador');
    });

    socket.on('disconnect', (socket) => {
      console.log("desconectado!");
    })
})



server.listen(3000, () => {
  console.log('server arriba puerto 3000');
})