import React from 'react';
import { IoHomeSharp } from "react-icons/io5";
import { BsQuestionSquareFill } from "react-icons/bs";
import { GiWrappingStar } from "react-icons/gi";
import { RiNewspaperFill } from "react-icons/ri";
import { IoIosChatboxes } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { FaTicketSimple } from "react-icons/fa6";
import { Link } from 'react-router-dom';







import logoMuni from 'C:/Users/sepul/Desktop/React2/reactweb/src/imagenes/Logo_provi.png'


const Sidebar = () => {
  
  return (
    <div className="soportebar">
      <div className="logo-container">
        <img src={logoMuni} alt="MuniLogo" className="logo"   />
        <h2>UrbanSensor</h2>
      </div>
      <ul className="sidebar-menu">
        <li className="sidebar-item">
          <Link to="/"><IoHomeSharp/>Introducción</Link> </li>
        <li className="sidebar-item">
          <Link to="/Aplicacion"><IoHomeSharp/>Sobre la aplicación</Link></li>
        <li className="sidebar-item"><BsQuestionSquareFill/>Preguntas frecuentes</li>
        <li className="sidebar-item"><RiNewspaperFill/>Manual de usuario</li>
        <li className="sidebar-item"><IoIosChatboxes/>Chat de soporte</li>
        <li className="sidebar-item"><IoDocuments/>Documentación</li>
        <li className="sidebar-item"><FaTicketSimple/>Tickets</li>

      </ul>
    </div>
  );
};

export default Sidebar;