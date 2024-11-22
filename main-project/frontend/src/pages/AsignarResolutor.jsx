import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { getAllIncidencias, assignResolutor } from "../api/incidencias.api";

const AsignarResolutor = () => {
  const [incidencias, setIncidencias] = useState([]);
  const [resolutores, setResolutores] = useState([]);
  const [selectedIncidencia, setSelectedIncidencia] = useState(null);
  const [selectedResolutor, setSelectedResolutor] = useState(null);
  const [comentario, setComentario] = useState("");
  const navigate = useNavigate();
  console.log("Resolutores cargados:", resolutores);

  useEffect(() => {
    // Cargar incidencias con estado "aprobada"

    async function fetchIncidencias() {
      const res = await getAllIncidencias();
      setIncidencias(res.data.filter((i) => i.estado === "aprobada"));
    }
    fetchIncidencias();

    // Cargar lista de resolutores
    async function fetchResolutores() {
      try {
        const res = await fetch("http://127.0.0.1:8000/urls/resolutores/");
        if (!res.ok) {
          throw new Error(`Error en la solicitud: ${res.statusText}`);
        }
        const data = await res.json();
        console.log("Resolutores cargados:", data);
        setResolutores(data);
      } catch (error) {
        console.error("Error al cargar resolutores:", error);
      }
    }
    fetchResolutores();
  }, []);

  const handleAssign = async () => {
    if (selectedIncidencia && selectedResolutor) {
      await assignResolutor({
        incidenciaId: selectedIncidencia.id,
        resolutorId: selectedResolutor.id,
        comentario,
      });
      alert("Resolutor asignado correctamente.");
      navigate("/depto-obras");
    } else {
      alert("Por favor selecciona una incidencia y un resolutor.");
    }
  };

  return (
    <div>
      <h2>Asignar Resolutor a Incidencia</h2>
      <div className="flex-container">
        <div className="column">
          <h3>Incidencias Aprobadas</h3>
          <ul>
            {incidencias.map((incidencia) => (
              <li
                key={incidencia.id}
                onClick={() => setSelectedIncidencia(incidencia)}
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    selectedIncidencia?.id === incidencia.id ? "#ddd" : "#fff",
                }}
              >
                {incidencia.titulo_Incidencia}
              </li>
            ))}
          </ul>
        </div>
        <div className="column">
          <h3>Resolutores Disponibles</h3>
          <ul>
            {resolutores.map((resolutor) => (
              <li
                key={resolutor.id}
                onClick={() => setSelectedResolutor(resolutor)}
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    selectedResolutor?.id === resolutor.id ? "#ddd" : "#fff",
                }}
              >
                {resolutor.nombre}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <h3>Comentario</h3>
        <textarea
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          rows="4"
          cols="50"
        />
      </div>
      <button onClick={handleAssign}>Confirmar Asignación</button>
      <button onClick={() => navigate("/depto-obras")}>Cancelar</button>
    </div>
  );
};

export default AsignarResolutor;
