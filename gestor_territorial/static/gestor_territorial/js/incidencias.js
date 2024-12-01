
// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('incidenciasContainer');
    const cardView = document.getElementById('cardView');

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
                'X-CSRFToken': getCSRFToken(),
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
            console.log("Botón de detalles presionado"); // Verifica que se ha hecho clic

            const incidenciaId = this.getAttribute('data-id');
            const incidencia = incidenciasData.find(i => i.pk == incidenciaId);

            console.log(incidencia);

            if (incidencia) {
                const fields = incidencia.fields;

                const card = document.createElement('div');
                card.className = 'incidenciaCard ' + fields.estado.toLowerCase();
                card.innerHTML = `
                    <h4>${fields.titulo_Incidencia} (ID: ${incidencia.pk})</h4>
                    <p><strong>Estado:</strong> ${fields.estado}</p>
                    <p><strong>Tipo:</strong> ${fields.tipo}</p>
                    <p><strong>Fecha de reporte:</strong> ${new Date(fields.fecha_Reporte).toLocaleDateString('es-ES')}</p>
                    <p><strong>Descripción:</strong> ${fields.descripcion || 'No hay descripción disponible.'}</p>
                `;

                // Mostrar la tarjeta y ocultar la tabla
                container.innerHTML = ''; // Limpiar el contenedor de tarjetas
                container.appendChild(card);
                cardView.style.display = 'block'; // Mostrar la vista de tarjeta
                document.getElementById('tableView').style.display = 'none'; // Ocultar la vista de tabla
            }
        });
    });

    // Manejar el clic en "Crear incidencia"
    const btnCrearIncidencia = document.getElementById('btnCrearIncidencia'); // Ajusta el ID según tu botón
    if (btnCrearIncidencia) {
        btnCrearIncidencia.addEventListener('click', function () {
            const latitud = document.getElementById('latitudInput').value; // Reemplaza con el ID de tu input
            const longitud = document.getElementById('longitudInput').value; // Reemplaza con el ID de tu input

            const incidenciaData = {
                lat: latitud,
                lng: longitud,
                // Agrega aquí otros campos del formulario si es necesario
            };

            console.log('Datos para crear incidencia:', incidenciaData);

            crearIncidencia(incidenciaData);
        });
    }
});

