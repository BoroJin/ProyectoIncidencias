document.addEventListener('DOMContentLoaded', function () {
    var rows = document.querySelectorAll('.incidencia-row');
    rows.forEach(function (row) {
        row.addEventListener('click', function () {
            var incidenciaId = this.getAttribute('data-incidencia-id');
            fetch(`/administrador/incidencias/${incidenciaId}/registros/`)
                .then(response => response.json())
                .then(data => {
                    var incidenciaIdModal = document.getElementById('incidenciaIdModal');
                    var fechaReporteModal = document.getElementById('fechaReporteModal');
                    incidenciaIdModal.textContent = incidenciaId;
                    fechaReporteModal.textContent = data.fecha_reporte;

                    construirTimeline(data.registros);

                    var registrosModal = new bootstrap.Modal(document.getElementById('registrosModal'));
                    registrosModal.show();
                });
        });
    });

    function construirTimeline(registros) {
        var timelineContainer = document.getElementById('timelineContainer');
        timelineContainer.innerHTML = '';

        registros.forEach(function (registro) {
            var li = document.createElement('li');
            li.className = 'timeline-item';

            var date = document.createElement('span');
            date.className = 'timeline-date';
            date.textContent = registro.fecha_cambio;

            var content = document.createElement('div');
            content.className = 'timeline-content';

            content.innerHTML = `
                <p><strong>Estado:</strong> ${registro.estado_anterior} ➔ ${registro.estado_actual}</p>
                <p><strong>Usuario:</strong> ${registro.idUsuario}</p>
                <p><strong>Comentario:</strong> ${registro.comentario || 'N/A'}</p>
            `;

            li.appendChild(date);
            li.appendChild(content);
            timelineContainer.appendChild(li);
        });
    }
});
