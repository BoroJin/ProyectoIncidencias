import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CgDanger } from "react-icons/cg";

const Tickets = () => {
  const [titulo, setTitulo] = useState("");
  const [usuario, setCorreo] = useState("");
  const [fecha, setFecha] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [mensaje, setMensaje] = useState(""); // Estado para mostrar el mensaje de éxito o error

  const limpiar = () => {
    setTitulo("");
    setCorreo("");
    setFecha("");
    setDescripcion("");
  };

  const enviarTicket = async () => {
    const ticketData = {
      titulo,
      usuario,
      fecha,
      descripcion,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/cuenta/api/tickets/",
        ticketData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Ticket enviado:", response.data);
      setMensaje({ tipo: "success", texto: "¡Ticket enviado con éxito!" }); // Mostrar mensaje de éxito
      limpiar(); // Limpiar los campos después de enviar
      setTimeout(() => setMensaje(""), 5000); // Limpiar el mensaje después de 5 segundos
    } catch (error) {
      console.error("Error al enviar el ticket:", error);
      setMensaje({
        tipo: "error",
        texto: "Error al enviar el ticket. Intenta de nuevo.",
      }); // Mostrar mensaje de error
      setTimeout(() => setMensaje(""), 5000); // Limpiar el mensaje después de 5 segundos
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
                <label className="textoTit" htmlFor="Asunto">
                  Ingresa el asunto (Error de diseño, funciones erróneas, error
                  de carga, etc):
                </label>

                <div className="inputAsunto">
                  <input
                    type="text"
                    id="Asunto"
                    placeholder="Asunto en cuestión"
                    required
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                  />
                </div>
                <label className="textoTit" htmlFor="Correo">
                  Ingresa tu correo electrónico:
                </label>

                <div className="inputAsunto">
                  <input
                    type="email"
                    id="Correo"
                    placeholder="ejemplo: ejemplo@gmail.com"
                    required
                    value={usuario}
                    onChange={(e) => setCorreo(e.target.value)}
                  />
                </div>
                <label className="textoTit" htmlFor="Fecha">
                  Fecha:
                </label>

                <div className="inputAsunto">
                  <input
                    type="date"
                    id="Fecha"
                    required
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
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
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <button
                  className="btn btn-primary"
                  id="boton1"
                  onClick={enviarTicket}
                >
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
                <button className="btn btn-secondary" id="boton2">
                  <Link to="/chatSoporte"> Chat de soporte </Link>
                </button>

                {/* Mostrar el mensaje de éxito o error */}
                {mensaje && (
                  <div
                    className={`mensaje ${
                      mensaje.tipo === "success" ? "success" : "error"
                    }`}
                  >
                    {mensaje.texto}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
