import React, { useState, useEffect } from "react";
import "../App.css";

const Navbar = () => {
  const [config, setConfig] = useState({ nombre_municipalidad: '', imagen: '' });

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch('http://localhost:8000/administrador/api/configuracion/');
        if (response.ok) {
          const data = await response.json();
          setConfig(data);
        } else {
          console.error('Error al obtener la configuración.');
        }
      } catch (error) {
        console.error('Error de conexión:', error);
      }
    };

    fetchConfig();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <div className="logo-container">
          <img
            src={`http://localhost:8000${config.imagen}`}
            alt="Logo Municipalidad"
            className="logo"
          />
          <a className="navbar-brand" href="#">
            {config.nombre_municipalidad}
          </a>
        </div>
        <div className="ms-auto d-flex align-items-center">
          <a className="navbar-text" href="#">
            User name
          </a>
          <div className="user-container">
            <img
              src="https://cdn-icons-png.flaticon.com/512/456/456212.png"
              alt="Icono Usuario"
              className="user-icon"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
