import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { IoSend } from "react-icons/io5";

const socket = io("http://localhost:4000");

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const chatBodyRef = useRef(null);

  useEffect(() => {
    const storedMessages =
      JSON.parse(localStorage.getItem("chatMessages")) || [];
    setMessages(storedMessages);
  }, []);

  useEffect(() => {
    const handleMessage = (data) => {
      updateMessages(data);
    };

    socket.on("receive_message", handleMessage);

    return () => {
      socket.off("receive_message", handleMessage);
    };
  }, []);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const formatDateTime = (timestamp) => {
    return new Intl.DateTimeFormat("es-CL", {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: "America/Santiago",
    }).format(new Date(timestamp));
  };

  const updateMessages = (newMessage) => {
    setMessages((prevMessages) => {
      if (prevMessages.some((msg) => msg.timestamp === newMessage.timestamp)) {
        return prevMessages;
      }

      const updatedMessages = [...prevMessages, newMessage];
      localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
      return updatedMessages;
    });
  };

  const sendMessage = () => {
    if (input.trim()) {
      const timestamp = new Date().toISOString();
      const messageData = {
        author: "Soporte",
        message: input,
        timestamp,
        time: formatDateTime(timestamp),
      };

      socket.emit("send_message", messageData);
      updateMessages(messageData);
      setInput("");
    }
  };

  return (
    <div className="todoApp" id="appUsuario">
      <div className="card" id="chatUsuario">
        <div className="card-header">
          <h2>Chat Soporte</h2>
        </div>

        <div className="card-body" id="bodyChat" ref={chatBodyRef}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={
                msg.author === "Soporte" ? "msj-enviado" : "msj-recibido"
              }
            >
              <strong id="msjUsuario">{msg.author}:</strong> {msg.message}
              <small className="msg-time">{msg.time}</small>
            </div>
          ))}
        </div>
        <p className="pChat">
          Recuerda ser específico en tu problema y usar este chat de manera
          responsable.
        </p>
        <div className="inBoton">
          <input
            className="inputChat"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe un mensaje..."
          />
          <button className="botonEnvio" onClick={sendMessage}>
            <IoSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
