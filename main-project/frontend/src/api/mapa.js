import L from "leaflet";
import "leaflet/dist/leaflet.css";

let map; // Variable para almacenar el mapa globalmente
let markers = []; // Almacenará los marcadores creados

export function initMap() {
  const mapContainer = document.getElementById("map");

  if (map) {
    map.remove();
    map = null;
  }

  if (!mapContainer) {
    console.error("No se encontró el contenedor del mapa.");
    return;
  }

  map = L.map("map").setView([-33.42743, -70.61147], 15);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openStreetMap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  map.invalidateSize();
  markers = []; // Reseteamos los marcadores al inicializar el mapa
  return map;
}

// Agregar marcadores al mapa
export function addMarkers(incidencias) {
  if (!map) {
    console.error("El mapa no está inicializado.");
    return;
  }

  markers = []; // Limpiar marcadores previos

  incidencias.forEach((incidencia) => {
    if (incidencia.latitud && incidencia.longitud) {
      const marker = L.marker([incidencia.latitud, incidencia.longitud]).addTo(
        map
      );
      marker.bindPopup(
        `<b>${incidencia.titulo_Incidencia}</b><br>${incidencia.descripcion}`
      );
      markers.push({ id: incidencia.id, marker }); // Guardar referencia al marcador
    }
  });
}

// Centrar el mapa en un marcador específico
export function focusMarker(incidenciaId) {
  if (!map) {
    console.error("El mapa no está inicializado.");
    return;
  }

  const markerData = markers.find((m) => m.id === incidenciaId);
  if (markerData) {
    const { marker } = markerData;
    map.setView(marker.getLatLng(), 15); // Centrar el mapa en el marcador
    marker.openPopup(); // Abrir el popup del marcador
  } else {
    console.warn(
      `No se encontró el marcador para la incidencia con ID ${incidenciaId}.`
    );
  }
}
