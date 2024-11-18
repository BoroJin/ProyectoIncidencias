import React from "react";
import { Link } from "react-router-dom";
import { CgDanger } from "react-icons/cg";

const limpiar = () => {
  document.getElementById("Asunto").value = "";
  document.getElementById("Descripcion").value = "";
};
const Tickets = () => {
  return (
    <div className="todoApp">
      <div className="card">
        <div className="card-header">
          <h2>Formulario de tickets de soporte</h2>
        </div>

        <div className="card-body">
          <div className="secciones">
            <div className="seccionLabel">
              <h className="textoTit">
                {" "}
                Utiliza este modulo cuando tengas algún problema que estimes,
                necesita la asistencia de personal técnico con respecto a tu
                usuario o a la aplicación:
              </h>
              <ul className="listaErrores">
                <li className="listaItem">
                  Error en la carga de archivos <CgDanger />
                </li>
                <li className="listaItem">
                  Problemas de visualización <CgDanger />
                </li>
                <li className="listaItem">
                  Falta de permisos <CgDanger />
                </li>
                <li className="listaItem">
                  Información desactualizada <CgDanger />
                </li>
                <li className="listaItem">
                  Retraso en los procesos <CgDanger />
                </li>
                <li className="listaItem">
                  Otros <CgDanger />
                </li>
              </ul>

              <div className="labelGeneral">
                <label className="textoTit" for="Asunto">
                  Ingresa el asunto (Error de diseño, funciones erróneas, error
                  de carga, etc):
                </label>

                <div className="inputAsunto">
                  <input
                    type="text"
                    id="Asunto"
                    placeholder="Asunto en cuestión"
                    required
                  />
                </div>
                <div className="areaDesc">
                  <div className="textoTit">
                    {" "}
                    Ingresa la descripción e tu problema. Te pedimos que seas lo
                    más explicito posible para que la resolución de este sea más
                    sencilla:
                  </div>
                  <div className="textArea">
                    <textarea
                      id="Descripcion"
                      placeholder="Descripción"
                      required
                    ></textarea>
                  </div>
                </div>
                <button className="btn btn-primary" id="boton1 ">
                  {" "}
                  Enviar Ticket{" "}
                </button>
                <button
                  className="btn btn-secondary"
                  id="boton2"
                  onClick={limpiar}
                >
                  {" "}
                  Limpiar campos{" "}
                </button>
                <button className="btn btn-secondary" id="boton2 ">
                  <Link to="/chatSoporte"> Chat de soporte </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
