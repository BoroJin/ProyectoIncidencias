import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

let map; // Variable para almacenar el mapa globalmente

export function initMap() {
  // Solo inicializamos el mapa si aún no ha sido creado
  if (map) {
    return map; // Si el mapa ya está inicializado, lo retornamos
  }

  // Inicializamos el mapa
  map = L.map('map').setView([-33.42743, -70.61147], 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openStreetMap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  var marker = L.marker([-33.42743, -70.61147]).addTo(map);
  marker.bindPopup("<b>Ubicación Inicial</b><br>Universidad Autónoma").openPopup();

  map.on('click', function(e) {
    if (marker) {
      map.removeLayer(marker);
    }

    marker = L.marker(e.latlng).addTo(map);
    document.getElementById("buttons").style.display = "flex";
    marker.bindPopup("<b>Ubicación de la Incidencia</b>").openPopup();
  });

  document.getElementById("removeMarker").addEventListener("click", function() {
    if (marker) {
      map.removeLayer(marker);
      marker = null;
      document.getElementById("buttons").style.display = "none";
    }
  });

  document.getElementById("openPopup").addEventListener("click", function() {
    if (marker) {
      marker.openPopup();
    }
  });

  map.invalidateSize(); // Asegura que el mapa se ajuste al tamaño del contenedor
  return map;
}