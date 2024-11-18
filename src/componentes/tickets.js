import React from "react";

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
              <h className="subtituloTicket">
                {" "}
                Utiliza este modulo cuando tengas algún problema que estimes,
                necesita la asistencia de personal técnico con respecto a tu
                usuario o a la aplicación.
              </h>
              <div className="labelGeneral">
                <label className="labelAsunto" for="Asunto">
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
                  {" "}
                  Ingresa la descripción e tu problema. Te pedimos que seas lo
                  más explicito posible para que la resolución de este sea más
                  sencilla:
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
                <button className="btn btn-secondary" id="boton2 ">
                  {" "}
                  Limpiar campos{" "}
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
