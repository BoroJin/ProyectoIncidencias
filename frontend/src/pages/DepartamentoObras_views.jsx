import React, { useEffect, useState } from "react";
import { initMap } from "../api/mapa";
import "leaflet/dist/leaflet.css";
import Card from "../components/Card";
import "../App.css";
import BigCard from "../components/BigCard";
import { getAllIncidencias } from "../api/incidencias.api";

const DepartamentoObrasView = () => {
  const [incidencias, setIncidencias] = useState([]);
  useEffect(() => {
    initMap("map");
    async function loadIncidencias() {
      try {
        const res = await getAllIncidencias();
        console.log(res);
        setIncidencias(res.data);
      } catch (error) {
        console.error("Error al cargar incidencias:", error);
      }
    }
    loadIncidencias();
  }, []);

  return (
    <div className="card-container">
      <Card title="Mapa">
        <div id="map"></div>
        <div id="buttons" style={{ display: "none" }}>
          <button id="removeMarker" className="custom-button1">
            Remover marcador
          </button>
          <button id="openPopup" className="custom-button2">
            Rellenar formulario
          </button>
        </div>
      </Card>
      <Card title="Últimas Notificaciones">
        <p>Notificaciones relacionadas a progreso de las incidencias.</p>
        <p>Incidencia #ID01 RECHAZADA.</p>
        <p>Incidencia #ID02 COMPLETADA. Esperando Verificación.</p>
      </Card>

      <BigCard title="Incidencias">
        {incidencias.map((incidencia) => (
          <div key={incidencia.id}>
            <h2>{incidencia.titulo_Incidencia}</h2>
          </div>
        ))}
      </BigCard>
    </div>
  );
};

export default DepartamentoObrasView;
