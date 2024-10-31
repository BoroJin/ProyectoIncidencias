
import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route,Routes, BrowserRouter} from 'react-router-dom'
import Sidebar from'./componentes/soportebar.js'
import Introduccion from './componentes/Introduccion.js';
import Aplicacion from './componentes/Aplicacion.js';
import './css/soportebar.css'
import './css/introduccion.css'
import './css/aplicacion.css'

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
            </Routes>
          </div>
        </div>
    </Router>
  );
}

export default App;
