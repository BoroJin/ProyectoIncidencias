import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CgDanger } from "react-icons/cg";

const Tickets = () => {
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [asunto, setAsunto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [mensaje, setMensaje] = useState("");

  const limpiar = () => {
    setCorreoElectronico("");
    setAsunto("");
    setDescripcion("");
    setMensaje("");
  };

  const enviarTicket = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/cuenta/crear-ticket/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo_electronico: correoElectronico,
          asunto: asunto,
          descripcion: descripcion,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMensaje(data.success || "Ticket creado con éxito");
        limpiar();
      } else {
        const errorData = await response.json();
        setMensaje(errorData.error || "Error al crear el ticket");
      }
    } catch (error) {
      setMensaje("Hubo un error al procesar tu solicitud");
    }
  };

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
                  Ingrse correo electronico con el cual comunicarse:
                </label>

                <div className="inputAsunto">
                  <input
                    id="Asunto"
                    type="email"
                    value={correoElectronico}
                    onChange={(e) => setCorreoElectronico(e.target.value)}
                    placeholder="Correo electrónico"
                    required
                  />
                </div>


                <label className="textoTit" for="Asunto">
                  Ingresa el asunto (Error de diseño, funciones erróneas, error
                  de carga, etc):
                </label>

                <div className="inputAsunto">
                  <input
                    id="Asunto"
                    type="text"
                    value={asunto}
                    onChange={(e) => setAsunto(e.target.value)}
                    placeholder="Asunto del problema"
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
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                      placeholder="Descripción detallada"
                      id="Descripcion"
                      required
                    ></textarea>
                  </div>
                </div>
                <button className="btn btn-primary" onClick={enviarTicket}>
                  Enviar Ticket
                </button>
                <button className="btn btn-secondary" onClick={limpiar}>
                  Limpiar Campos
                </button>
                <div>{mensaje && <p>{mensaje}</p>}</div>
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
