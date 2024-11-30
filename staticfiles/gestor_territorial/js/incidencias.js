
document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('incidenciasContainer');
    const cardView = document.getElementById('cardView');

    // Manejar el clic en "Ver detalles"
    document.querySelectorAll('.btn-detalle').forEach(button => {
        button.addEventListener('click', function() {
            console.log("Botón de detalles presionado");  // Verifica que se ha hecho clic

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
                    <!-- Puedes agregar más detalles según sea necesario -->
                `;

                // Mostrar la tarjeta y ocultar la tabla
                container.innerHTML = ''; // Limpiar el contenedor de tarjetas
                container.appendChild(card);
                cardView.style.display = 'block';  // Mostrar la vista de tarjeta
                document.getElementById('tableView').style.display = 'none';  // Ocultar la vista de tabla
            }
        });
    });
});