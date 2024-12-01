// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    // Función para obtener el token CSRF
    function getCSRFToken() {
        return document.querySelector('meta[name="csrf-token"]').content;
    }
    
    // Función para crear una incidencia
    function crearIncidencia(incidenciaData) {
        const csrfToken = getCSRFToken();
    
        fetch('crear_incidencia/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': csrfToken,
            },
            body: new URLSearchParams({
                lat: incidenciaData.lat,
                lng: incidenciaData.lng,
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Respuesta del servidor:', data);
                if (data.status === 'success') {
                    alert('Incidencia creada con éxito: ID ' + data.id);
                    location.reload();
                } else {
                    alert('Error al crear la incidencia: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error al crear la incidencia:', error);
            });
    }

    // Manejar el clic en "Ver detalles"
    document.querySelectorAll('.btn-detalle').forEach(button => {
        button.addEventListener('click', function () {
            const incidenciaId = this.getAttribute('data-id');

            // Hacer una solicitud para obtener los detalles
            fetch(`obtener_incidencia/${incidenciaId}/`)
                .then(response => response.json())
                .then(data => {
                    // Cargar los detalles en el modal
                    document.getElementById('detallesId').textContent = data.id || 'N/A';
                    document.getElementById('detallesTitulo').textContent = data.titulo_Incidencia || 'N/A';
                    document.getElementById('detallesEstado').textContent = data.estado || 'N/A';
                    document.getElementById('detallesTipo').textContent = data.tipo || 'N/A';
                    document.getElementById('detallesUrgencia').textContent = data.urgencia || 'N/A';
                    document.getElementById('detallesFechaReporte').textContent = new Date(data.fecha_Reporte).toLocaleString() || 'N/A';
                    document.getElementById('detallesDescripcion').textContent = data.descripcion || 'No disponible';
                    document.getElementById('detallesComentarios').textContent = data.comentarios || 'Sin comentarios';

                    // Mostrar el modal
                    const modal = new bootstrap.Modal(document.getElementById('modalDetalles'));
                    modal.show();
                })
                .catch(error => {
                    console.error('Error al cargar los detalles:', error);
                    alert('No se pudieron cargar los detalles de la incidencia.');
                });
        });
        });

    // Manejar el clic en "Crear incidencia"
    const btnCrearIncidencia = document.getElementById('btnCrearIncidencia');
    if (btnCrearIncidencia) {
        btnCrearIncidencia.addEventListener('click', function () {
            const latitud = document.getElementById('latitudInput').value; 
            const longitud = document.getElementById('longitudInput').value; 

            const incidenciaData = {
                lat: latitud,
                lng: longitud,
            
            };

            console.log('Datos para crear incidencia:', incidenciaData);

            crearIncidencia(incidenciaData);
        });
    }
});

