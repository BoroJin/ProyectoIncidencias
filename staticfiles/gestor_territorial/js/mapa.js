
var map = L.map('map').setView([-33.42743, -70.61147], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


var marker;
var lat, lng;

var positionInfo = document.getElementById('position');
var buttons = document.getElementById('buttons');
var removeMarkerButton = document.getElementById('removeMarker');
var openPopupButton = document.getElementById('openPopup');

buttons.style.display = 'none';

marker = L.marker([-33.42743, -70.61147]).addTo(map);
marker.bindPopup("<b>Ubicación Inicial</b><br>Universidad Autónoma").openPopup();

map.on('click', function(e) {
    if (marker) {
        map.removeLayer(marker);
    }
    marker = L.marker(e.latlng).addTo(map);
    document.getElementById("buttons").style.display = "flex";
    marker.bindPopup("<b>Ubicación de la Incidencia</b>").openPopup();

    // Guarda las coordenadas para enviarlas al hacer clic en el botón
    lat = e.latlng.lat;
    lng = e.latlng.lng;

    // Muestra las coordenadas y los botones
    positionInfo.innerHTML = "Latitud: " + lat + ", Longitud: " + lng;
    buttons.style.display = 'flex';
});

document.getElementById("removeMarker").addEventListener("click", function() {
    if (marker) {
        map.removeLayer(marker);
        marker = null;
        document.getElementById("buttons").style.display = "none";
    }
});


openPopupButton.addEventListener('click', function() {
    if (marker) {
        openFormPopup(lat, lng);
    }
});


function openFormPopup(lat, lng) {

    const modal = document.createElement('div');
    modal.id = 'formPopup';
    modal.className = 'popup';
    modal.innerHTML = `
        <div class="popup-contenido">
            <span class="cerrar" onclick="closeFormPopup()">&times;</span>
            <div id="formContent">
                <p>Cargando formulario...</p>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Hacer la solicitud al servidor para obtener el formulario renderizado
    fetch(`/gestor_territorial/mostrar_formulario/?lat=${lat}&lng=${lng}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                // Insertar el formulario en el modal
                document.getElementById('formContent').innerHTML = data.formulario_html;
            } else {
                document.getElementById('formContent').innerHTML = `<p>Error: ${data.message}</p>`;
            }
        })
        .catch(error => {
            console.error('Error al cargar el formulario:', error);
            document.getElementById('formContent').innerHTML = `<p>Ocurrió un error al cargar el formulario.</p>`;
        });
}

// Función para cerrar el modal
function closeFormPopup() {
    const modal = document.getElementById('formPopup');
    if (modal) {
        document.body.removeChild(modal);
    }
}