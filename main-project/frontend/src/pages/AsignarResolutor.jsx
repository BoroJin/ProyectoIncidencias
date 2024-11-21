import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { getAllIncidencias, assignResolutor } from "../api/incidencias.api";

const AsignarResolutor = () => {
  const [incidencias, setIncidencias] = useState([]);
  const [resolutores, setResolutores] = useState([]);
  const [selectedResolutores, setSelectedResolutores] = useState({});
  const [comentarios, setComentarios] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchIncidencias() {
      const res = await getAllIncidencias();
      setIncidencias(res.data.filter((i) => i.estado === "aprobada"));
    }
    fetchIncidencias();

    async function fetchResolutores() {
      try {
        const res = await fetch("http://127.0.0.1:8000/urls/resolutores/");
        if (!res.ok) {
          throw new Error(`Error en la solicitud: ${res.statusText}`);
        }
        const data = await res.json();
        setResolutores(data);
      } catch (error) {
        console.error("Error al cargar resolutores:", error);
      }
    }
    fetchResolutores();
  }, []);

  const handleAssign = async (incidenciaId) => {
    const resolutorId = selectedResolutores[incidenciaId];
    const comentario = comentarios[incidenciaId] || "";

    if (resolutorId) {
      await assignResolutor({
        incidenciaId,
        resolutorId,
        comentario,
      });
      alert("Resolutor asignado correctamente.");
      navigate("/depto-obras");
    } else {
      alert("Por favor selecciona un resolutor.");
    }
  };

  const handleResolutorChange = (incidenciaId, resolutorId) => {
    setSelectedResolutores({
      ...selectedResolutores,
      [incidenciaId]: resolutorId,
    });
  };

  const handleComentarioChange = (incidenciaId, comentario) => {
    setComentarios({
      ...comentarios,
      [incidenciaId]: comentario,
    });
  };

  return (
    <div>
      <h2>Asignar Resolutor a Incidencias</h2>
      <table>
        <thead>
          <tr>
            <th>Título de Incidencia</th>
            <th>Resolutores Disponibles</th>
            <th>Comentario</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {incidencias.map((incidencia) => (
            <tr key={incidencia.id}>
              <td>{incidencia.titulo_Incidencia}</td>
              <td>
                <select
                  value={selectedResolutores[incidencia.id] || ""}
                  onChange={(e) =>
                    handleResolutorChange(incidencia.id, e.target.value)
                  }
                >
                  <option value="" disabled>
                    Selecciona un resolutor
                  </option>
                  {resolutores.map((resolutor) => (
                    <option key={resolutor.id} value={resolutor.id}>
                      {resolutor.nombre}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <textarea
                  value={comentarios[incidencia.id] || ""}
                  onChange={(e) =>
                    handleComentarioChange(incidencia.id, e.target.value)
                  }
                  rows="2"
                  cols="30"
                />
              </td>
              <td>
                <button onClick={() => handleAssign(incidencia.id)}>
                  Asignar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate("/depto-obras")}>Cancelar</button>
    </div>
  );
};

export default AsignarResolutor;
