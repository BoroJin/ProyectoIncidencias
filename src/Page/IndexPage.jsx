import React, { useEffect } from "react";
import { initMap } from "../services/mapa";
import "leaflet/dist/leaflet.css";
import Card from "../components/Card";
import "../App.css";
import BigCard from "../components/BigCard";

const DepartamentoObras_View = () => {
  useEffect(() => {
    initMap("map");
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

      <BigCard title="Prueba">
        <p>card de prueba</p>
        <p>para configurar</p>
        <p>la bigcard</p>
      </BigCard>
    </div>
  );
};

export default DepartamentoObras_View;
