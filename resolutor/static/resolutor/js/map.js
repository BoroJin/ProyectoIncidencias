// map.js
function loadGoogleMapsScript() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${config.apiKey}&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}

function initMap() {
    const map = new google.maps.Map(document.getElementById('mapa'), {
        center: {lat: -33.4489, lng: -70.6693},
        zoom: 11
    });
}

loadGoogleMapsScript();
