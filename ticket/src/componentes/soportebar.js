import React, { useState, useEffect } from "react";
import { IoHomeSharp } from "react-icons/io5";
import { BsQuestionSquareFill } from "react-icons/bs";
import { RiNewspaperFill } from "react-icons/ri";
import { IoIosChatboxes } from "react-icons/io";
import { FaTicketSimple } from "react-icons/fa6";
import { Link } from "react-router-dom";

//import logoMuni from "C:\Users\maxim\Desktop\ticket\src\imagenes\Logo_provi.png";



const Sidebar = () => {
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
    <div className="soportebar">
      <div className="logo-container">
      <img
            src={`http://localhost:8000${config.imagen}`}
            alt="MuniLogo"
            className="logo"
          />
      </div>
      <div className="textoDiv">
        <p className="logo-text">{config.nombre_municipalidad}</p>
      </div>
      <ul className="sidebar-menu">
        <li className="sidebar-item">
          <Link className="textItem" to="/">
            <IoHomeSharp /> <p className="textoS">Introducción</p>
          </Link>{" "}
        </li>
        <li className="sidebar-item">
          <Link className="textItem" to="/Aplicacion">
            <IoHomeSharp />
            <p className="textoS">Sobre la aplicacion</p>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link className="textItem" to="/preguntasFr">
            <BsQuestionSquareFill />
            <p className="textoS">Preguntas frecuentes</p>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link className="textItem" to="/manuales">
            <RiNewspaperFill /> <p className="textoS">Manual de usuario</p>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link className="textItem" to="/chatUsuario">
            <IoIosChatboxes /> <p className="textoS">Chat de soporte</p>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link className="textItem" to="/tickets">
            <FaTicketSimple />
            <p className="textoS">Tickets</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
