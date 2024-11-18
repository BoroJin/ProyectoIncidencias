const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let messages = [];

io.on("connection", (socket) => {
  console.log("Usuario conectado:", socket.id);

  socket.emit("load_messages", messages);

  socket.on("send_message", (data) => {
    messages.push(data);
    io.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado:", socket.id);
  });
});

server.listen(4000, () => {
  console.log("Servidor corriendo en http://localhost:4000");
});
