if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        const latitud = position.coords.latitude;
        const longitud = position.coords.longitude;

        // Aquí puedes hacer una llamada fetch para enviar la ubicación al backend
        fetch('/crear_producto/', {
            method: 'POST',
            body: JSON.stringify({ 
                codigo: 'ABC123',
                nombre: 'Producto Ejemplo',
                latitud: latitud,
                longitud: longitud
            }),
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken') 
            }
        });
    });
}
