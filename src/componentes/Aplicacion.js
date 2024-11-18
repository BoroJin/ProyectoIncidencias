import React from "react";
import { PiNumberCircleOneFill } from "react-icons/pi";
import { PiNumberCircleTwoFill } from "react-icons/pi";
import { PiNumberCircleThreeFill } from "react-icons/pi";
import { PiNumberCircleFourFill } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import { MdReportProblem } from "react-icons/md";
import { FaNewspaper } from "react-icons/fa";
import { AiFillDatabase } from "react-icons/ai";

const Aplicacion = () => {
  return (
    <div className="todoApp">
      <div className="card">
        <div className="card-header">
          <h2>Información sobre la aplicación</h2>
        </div>

        <div className="card-body">
          <div className="secciones">
            <div className="seccion1">
              <h className="subtituloSec">
                {" "}
                <PiNumberCircleOneFill /> - Manejo de usuarios <FaUser /> :
              </h>
              <div className="textoUser">
                La aplicación web permite agregar, modificar y eliminar usuarios
                fácilmente. Además, puedes asignar roles y permisos específicos
                a cada usuario.
              </div>
            </div>
            <div className="seccion2">
              <h className="subtituloSec">
                {" "}
                <PiNumberCircleTwoFill /> - Control total de incidencias{" "}
                <MdReportProblem /> :
              </h>
              <div className="textoInc">
                Gracias al sistema integrado, puedes gestionar y controlar todas
                las incidencias de forma eficiente, desde su creación y estado,
                hasta su resolución.
              </div>
            </div>
            <div className="seccion3">
              <h className="subtituloSec">
                {" "}
                <PiNumberCircleThreeFill /> - Acceso a información crítica{" "}
                <FaNewspaper /> :
              </h>
              <div className="textoInf">
                Cuenta con dashboards para cada tipo de usuario, donde podrás
                visualizar información relevante y tomar decisiones con respecto
                a ellas.
              </div>
            </div>
            <div className="seccion4">
              <h className="subtituloSec">
                {" "}
                <PiNumberCircleFourFill /> - Manejo de datos <AiFillDatabase />{" "}
                :
              </h>
              <div className="textoDat">
                Existe la posibilidad de manejar y exportar rapidamente la
                información para trabajarla fuera de la aplicación para su
                posterior guardado
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aplicacion;
