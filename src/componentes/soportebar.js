import React from "react";
import { IoHomeSharp } from "react-icons/io5";
import { BsQuestionSquareFill } from "react-icons/bs";
import { RiNewspaperFill } from "react-icons/ri";
import { IoIosChatboxes } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { FaTicketSimple } from "react-icons/fa6";
import { Link } from "react-router-dom";

import logoMuni from "C:/Users/sepul/OneDrive/Escritorio/proyectoWeb/Web/src/imagenes/Logo_provi.png";

const Sidebar = () => {
  return (
    <div className="soportebar">
      <div className="logo-container">
        <img src={logoMuni} alt="MuniLogo" className="logo" />
      </div>
      <div className="textoDiv">
        <p className="logo-text">UrbanSensor</p>
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
          <Link className="textItem" to="/manualUsuario">
            <RiNewspaperFill /> <p className="textoS">Manual de usuario</p>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link className="textItem" to="/chatUsuario">
            <IoIosChatboxes /> <p className="textoS">Chat de soporte</p>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link className="textItem" to="/documentacion">
            <IoDocuments /> <p className="textoS">Documentacion</p>
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
