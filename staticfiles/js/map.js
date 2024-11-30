document.addEventListener('DOMContentLoaded', function() {
    const map = L.map('mapa').setView([-33.4489, -70.6693], 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    L.marker([-33.4489, -70.6693]).addTo(map)
        .bindPopup('Ubicación inicial: Santiago, Chile')
        .openPopup();
});