
var map = L.map('map').setView([-33.42743, -70.61147], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var marker;
var marker = L.marker([-33.42743, -70.61147]).addTo(map);
marker.bindPopup("<b>Ubicación Inicial</b><br>Universidad Autónoma").openPopup();

map.on('click', function(e) {
    if (marker) {
        map.removeLayer(marker);
    }

    marker = L.marker(e.latlng).addTo(map);

    document.getElementById("buttons").style.display = "flex";

    marker.bindPopup("<b>Ubicación seleccionada</b>").openPopup();
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

map.invalidateSize();