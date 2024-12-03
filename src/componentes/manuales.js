import React from "react";

const ManualUsuario = () => {
  const descargarPDFadmin = () => {
    const rutaPDF = "/manuales/manualadministrador.pdf"; // Ruta desde public
    const enlace = document.createElement("a");
    enlace.href = rutaPDF;
    enlace.download = "ManualAdministrador.pdf";
    enlace.click();
  };
  const descargarPDFdepa = () => {
    const rutaPDF = "/manuales/manualdepartamento.pdf"; // Ruta desde public
    const enlace = document.createElement("a");
    enlace.href = rutaPDF;
    enlace.download = "ManualDepartamento.pdf";
    enlace.click();
  };

  const descargarPDFgestor = () => {
    const rutaPDF = "/manuales/manualgestor.pdf"; // Ruta desde public
    const enlace = document.createElement("a");
    enlace.href = rutaPDF;
    enlace.download = "ManualGestor.pdf";
    enlace.click();
  };

  const descargarPDFdirector = () => {
    const rutaPDF = "/manuales/manualdirector.pdf"; // Ruta desde public
    const enlace = document.createElement("a");
    enlace.href = rutaPDF;
    enlace.download = "ManualDirector.pdf";
    enlace.click();
  };

  const descargarPDFresolutor = () => {
    const rutaPDF = "/manuales/manualresolutor.pdf"; // Ruta desde public
    const enlace = document.createElement("a");
    enlace.href = rutaPDF;
    enlace.download = "ManualResolutor.pdf";
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
                  Departamento de obras: El departamento es el encargado de
                  gestionar los equipos de trabajo de la aplicación. El será el
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
                <li className="listaItem">
                  Director: Director es aquel que crea los formularios
                  dinámicos, para su posterior uso por los gestores. Tambien
                  puede visualizar las incidencias y rechazarlas.
                </li>
              </ul>
            </div>
          </div>
          <div className="listaButtons">
            <button className="btn" onClick={descargarPDFadmin}>
              Descargar Manual de Administrador
            </button>
            <button className="btn" onClick={descargarPDFdepa}>
              Descargar Manual de Departamento de obras
            </button>
            <button className="btn" onClick={descargarPDFgestor}>
              Descargar Manual de Gestor Territorial
            </button>
            <button className="btn" onClick={descargarPDFresolutor}>
              Descargar Manual de Resolutor
            </button>
            <button className="btn" onClick={descargarPDFdirector}>
              Descargar Manual de Director
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualUsuario;
