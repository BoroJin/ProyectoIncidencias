import { useEffect, useState } from "react";
import { getAllIncidencias } from "../api/incidencias.api";

export function IncidenciasList() {
  const [incidencias, setIncidencias] = useState([]);

  useEffect(() => {
    async function loadIncidencias() {
      try {
        const res = await getAllIncidencias();
        setIncidencias(res.data);
      } catch (error) {
        console.error("Error al cargar incidencias:", error);
      }
    }
    loadIncidencias();
  }, []);

  return (
    <div>
      {incidencias.map((incidencia) => (
        <div key={incidencia.pk}>
          <h3>{incidencia.fields.titulo_Incidencia}</h3>
          <p>ID: {incidencia.pk}</p>
          <p>Estado: {incidencia.fields.estado}</p>
        </div>
      ))}
    </div>
  );
}
