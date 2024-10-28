function ejecutarMigraciones() {
    fetch('/ejecutar_migraciones/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken'), // Asegúrate de tener el token CSRF
        },
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error al ejecutar migraciones');
        }
    })
    .then(data => {
        console.log(data.mensaje);
    })
    .catch(error => console.error('Error:', error));
}