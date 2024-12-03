import React from "react";
import { Link } from "react-router-dom";

const ManualUsuario = () => {
  const descargarPDFadmin = () => {
    const rutaPDF = "/manuales/manualadministrador.pdf"; // Ruta desde public
    const enlace = document.createElement("a");
    enlace.href = rutaPDF;
    enlace.download = "ManualAdministrador.pdf";
    enlace.click();
  };
  const descargarPDFdirector = () => {
    const rutaPDF = "/manuales/manualdirector.pdf"; // Ruta desde public
    const enlace = document.createElement("a");
    enlace.href = rutaPDF;
    enlace.download = "ManualDirector.pdf";
    enlace.click();
  };
  return (
    <div className="todoApp">
      <div className="card">
        <div className="card-header">
          <h2>Manuales de usuario</h2>
        </div>

        <div className="card-body">
          <div className="secciones">
            <div className="seccionIntro">
              <div className="textoGen">
                En este lugar, puedes acceder a los distintos manuales de
                usuario que se encuentran disponibles en la aplicación, en caso
                de que necesites guiarte a través de ellos. Los usuarios son:
              </div>
              <ul className="listaErrores" id="listaManuales">
                <li className="listaItem">
                  Administrador: El superusuario de la aplicación, es aquel que
                  cuenta con todas las facultades de los demás y propias, tales
                  como la creación de usuarios, gestión de roles y permisos,
                  etc.
                </li>
                <li className="listaItem">
                  Director de obras: El director es el encargado de gestionar
                  los equipos de trabajo de la aplicación. El será el
                  responsable de designar al respectivo equipo resolutor
                  capacitado para cada incidencia.
                </li>
                <li className="listaItem">
                  Gestor territorial: Persona en terreno, es responsable de
                  generar las incidencias dentro de la aplicación de que estas
                  sean resueltas lo antes posible.
                </li>
                <li className="listaItem">
                  Resolutor: El responsable de la solución y finalización de las
                  incidencias. El será el encargado de darle solución y cierre a
                  la misma, para finalmente ser revisada por el departamento y
                  definir si es que el cierre corresponde o si aún falta para
                  darla por finalizada.
                </li>
              </ul>
            </div>
          </div>
          <div className="listaButtons">
            <button className="btn" onClick={descargarPDFadmin}>
              Descargar Manual de Administrador
            </button>
            <button className="btn" onClick={descargarPDFdirector}>
              Descargar Manual de Director de Obras
            </button>
            <button className="btn" onClick={descargarPDFadmin}>
              Descargar Manual de Gestor Territorial
            </button>
            <button className="btn" onClick={descargarPDFadmin}>
              Descargar Manual de Resolutor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualUsuario;
