import React, { useEffect, useState } from "react";
import { initMap, addMarkers, focusMarker } from "../api/mapa";
import "leaflet/dist/leaflet.css";
import Card from "../components/Card";
import "../App.css";
import BigCard from "../components/BigCard";
import { getAllIncidencias } from "../api/incidencias.api";

const DepartamentoObrasView = () => {
  const [incidencias, setIncidencias] = useState([]);

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

    loadIncidencias();
  }, []);

  const handleIncidenciaClick = (id) => {
    focusMarker(id); // Llama a la función para centrar el mapa en el marcador
  };

  return (
    <div className="card-container">
      <Card title="Mapa">
        <div id="map"></div>
      </Card>
      <Card title="Últimas Notificaciones">
        <p>Notificaciones relacionadas a progreso de las incidencias.</p>
        <p>Incidencia #ID01 RECHAZADA.</p>
        <p>Incidencia #ID02 COMPLETADA. Esperando Verificación.</p>
      </Card>

      <BigCard title="Incidencias">
        <div className="incidencias-header">
          <span>ID</span>
          <span>Título</span>
          <span>Descripción</span>
          <span>Estado</span>
          <span>Encargado</span>
        </div>
        {incidencias.map((incidencia) => (
          <div
            key={incidencia.id}
            className="incidencia-row"
            onClick={() => handleIncidenciaClick(incidencia.id)} // Evento para manejar clic
            style={{ cursor: "pointer" }} // Agregar estilo de puntero
          >
            <span>{incidencia.id}</span>
            <span>{incidencia.titulo_Incidencia}</span>
            <span>{incidencia.descripcion}</span>
            <span>{incidencia.estado}</span>
            <span>{incidencia.usuario_Asignado || "No asignado"}</span>
          </div>
        ))}
      </BigCard>
    </div>
  );
};

export default DepartamentoObrasView;
