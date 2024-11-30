// modal.js
document.addEventListener('DOMContentLoaded', function () {
    // Inicializa los modales
    const incidenciaModalAsignada = new bootstrap.Modal(document.getElementById('incidenciaModalAsignada'));
    const incidenciaModalProceso = new bootstrap.Modal(document.getElementById('incidenciaModalProceso'));

    // Función para rellenar los datos en el modal
    function fillModalData(modalElement, incidencia) {
        modalElement.querySelector('.modalIncidenciaId').textContent = incidencia.id;
        modalElement.querySelector('.modalTitulo').textContent = incidencia.titulo;
        modalElement.querySelector('.modalDescripcion').textContent = incidencia.descripcion;
        modalElement.querySelector('.modalUrgencia').textContent = incidencia.urgencia;
        modalElement.querySelector('.modalEstado').textContent = incidencia.estado;
        modalElement.querySelector('.modalFecha').textContent = incidencia.fecha_reporte;
        modalElement.querySelector('.modalResolutor').textContent = incidencia.resolutor;
    }

    // Delegación de eventos para manejar clics en incidencias asignadas y en proceso
    document.addEventListener('click', function (event) {
        const target = event.target.closest('.btn-incidencia-asignada, .btn-incidencia-proceso');
        if (!target) return; // Si no se hizo clic en una incidencia, salir

        event.preventDefault(); // Evitar el comportamiento por defecto del enlace

        const incidenciaData = JSON.parse(target.getAttribute('data-incidencia'));

        if (target.classList.contains('btn-incidencia-asignada')) {
            // Abrir el modal de incidencia asignada
            fillModalData(document.getElementById('incidenciaModalAsignada'), incidenciaData);
            incidenciaModalAsignada.show();
        } else if (target.classList.contains('btn-incidencia-proceso')) {
            // Abrir el modal de incidencia en proceso
            fillModalData(document.getElementById('incidenciaModalProceso'), incidenciaData);
            incidenciaModalProceso.show();
        }
    });
});
