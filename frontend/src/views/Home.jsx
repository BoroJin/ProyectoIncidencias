import React from 'react';
//import { Link } from 'react-router-dom';
import '../App.css';

const HomeView = () => {
  return (
    <div className="home-container">
      <img
        src="https://www.uautonoma.cl/content/uploads/2024/02/Nuestra-vision-scaled.jpg"
        alt="Inicio"
        className="home-image"
      />
        <h1 className="home-title">Página de Inicio</h1>
      <div>
        <p>aquí debería haber una pequeña descripción y un par de botones pero aun no está configurado,,,</p>
      </div>
    </div>
  );
};
  
  export default HomeView;