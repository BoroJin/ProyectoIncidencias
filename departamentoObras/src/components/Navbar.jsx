import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";

const Navbar = () => {
  const [config, setConfig] = useState({ nombre_municipalidad: "", imagen: "" });
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Obtener la configuración de la municipalidad
    const fetchConfig = async () => {
      try {
        const response = await fetch("http://localhost:8000/administrador/api/configuracion/");
        if (response.ok) {
          const data = await response.json();
          setConfig(data);
        } else {
          console.error("Error al obtener la configuración.");
        }
      } catch (error) {
        console.error("Error de conexión:", error);
      }
    };
    // Obtener el nombre del usuario desde localStorage
    const storedUserName = localStorage.getItem("user_name");
    if (storedUserName) {
      setUserName(storedUserName);
    }
    fetchConfig();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        {/* Logo y nombre de la municipalidad */}
        <div className="logo-container d-flex align-items-center">
          <img
            src={`http://localhost:8000${config.imagen}`}
            alt="Logo Municipalidad"
            className="logo"
          />
          <a className="navbar-brand ms-2" href="#">
            {config.nombre_municipalidad}
          </a>
        </div>
        {/* Nombre del usuario e ícono */}
        <div className="ms-auto d-flex align-items-center">
          <span className="navbar-text me-3">{userName}</span>
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
