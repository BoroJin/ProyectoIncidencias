// Inicializa el mapa en una ubicación por defecto
var map = L.map('map').setView([-33.427656074857076, -70.61159044504167], 17);

// Agrega la capa de mapa de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var marker;
var button = document.getElementById('crearIncidencia');
var lat, lng;

// Evento para agregar el marcador y mostrar el botón en el mapa
map.on('click', function(e) {
    if (marker) {
        map.removeLayer(marker);
    }
    marker = L.marker(e.latlng).addTo(map);
    document.getElementById('position').innerHTML = "Latitud: " + e.latlng.lat + ", Longitud: " + e.latlng.lng;
    
    // Guarda las coordenadas para enviarlas al hacer clic en el botón
    lat = e.latlng.lat;
    lng = e.latlng.lng;
    
    // Muestra el botón "Crear Incidencia"
    button.style.display = 'block';
});

// Evento para enviar las coordenadas al presionar el botón "Crear Incidencia"
button.addEventListener('click', function() {
    // Redirige a la vista mostrar_formulario con las coordenadas en los parámetros
    window.location.href = `/gestor_territorial/mostrar_formulario/?lat=${lat}&lng=${lng}`;
});

