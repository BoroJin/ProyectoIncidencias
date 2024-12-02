import React, { useEffect, useState } from "react";
import { initMap, addMarkers, focusMarker } from "../api/mapa";
import "leaflet/dist/leaflet.css";
import Card from "../components/Card";
import "../App.css";
import BigCard from "../components/BigCard";
import { getAllIncidencias, getAllRegistros } from "../api/incidencias.api";

const DepartamentoObrasView = () => {
  const [incidencias, setIncidencias] = useState([]);
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    initMap();

    async function loadIncidencias() {
      try {
        const res = await getAllIncidencias();
        setIncidencias(res.data);

        // Agregar marcadores al mapa
        if (res.data && res.data.length > 0) {
          addMarkers(res.data);
        }
      } catch (error) {
        console.error("Error al cargar incidencias:", error);
      }
    }

    async function loadRegistros() {
      try {
        const reg = await getAllRegistros();
        setRegistros(reg.data);
      } catch (error) {
        console.error("Error al cargar Registros:", error);
      }
    }

    loadIncidencias();
    loadRegistros();
  }, []);

  const handleIncidenciaClick = (id) => {
    focusMarker(id); // Llama a la función para centrar el mapa en el marcador
  };

  return (
    <div className="flex-container">
      <div className="card-wrapper">
        <Card title="Mapa">
          <div id="map"></div>
        </Card>
        <BigCard title="Incidencias" customClass="bigcard-wide">
          <div className="bigcard-content">
            <table className="resolutor-table separaciones-verticales">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Título</th>
                  <th>Descripción</th>
                  <th>Estado</th>
                  <th>Encargado</th>
                  <th>Comentario</th>
                </tr>
              </thead>
              <tbody>
                {incidencias.map((incidencia) => {
                  // Filtrar el registro correspondiente a esta incidencia
                  const registro = registros.find(
                    (reg) => reg.idIncidencia === incidencia.id
                  );

                  return (
                    <tr
                      key={incidencia.id}
                      onClick={() => handleIncidenciaClick(incidencia.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <td>{incidencia.id}</td>
                      <td>{incidencia.titulo_Incidencia}</td>
                      <td>{incidencia.descripcion}</td>
                      <td>{incidencia.estado}</td>
                      <td>{incidencia.resolutor_Asignado || "No asignado"}</td>
                      <td>{registro?.comentario || "Sin comentarios"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </BigCard>
      </div>
    </div>
  );
};

export default DepartamentoObrasView;
