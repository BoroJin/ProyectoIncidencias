import React from "react";
import "../App.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <div className="logo-container">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2228/2228497.png"
            alt="Logo Municipalidad"
            className="logo"
          />
          <a className="navbar-brand" href="#">
            Municipalidad X
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
