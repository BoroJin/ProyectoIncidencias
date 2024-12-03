import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./componentes/soportebar.js";
import Introduccion from "./componentes/Introduccion.js";
import Aplicacion from "./componentes/Aplicacion.js";
import PreguntasFr from "./componentes/preguntasFr.js";
import Tickets from "./componentes/tickets.js";
import ChatUser from "./componentes/chatUsuario.js";
import ChatWindow from "./componentes/chatSoporte.js";
import ManualUsuario from "./componentes/manuales.js";
import "./css/soportebar.css";
import "./css/introduccion.css";
import "./css/aplicacion.css";
import "./css/preguntasFr.css";
import "./css/ticket.css";
import "./css/chats.css";
import "./css/manuales.css";
function App() {
  return (
    <Router>
      <div className="App">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="content">
          <Routes>
            <Route path="/" element={<Introduccion />} />
            <Route path="/Aplicacion" element={<Aplicacion />} />
            <Route path="/preguntasFr" element={<PreguntasFr />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/chatUsuario" element={<ChatUser />} />
            <Route path="/chatSoporte" element={<ChatWindow />} />
            <Route path="/manuales" element={<ManualUsuario />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
