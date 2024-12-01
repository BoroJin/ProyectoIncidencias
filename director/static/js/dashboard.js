document.addEventListener('DOMContentLoaded', function() {
    const incidenciaItems = document.querySelectorAll('.btn-incidencia-iniciada');
    const incidenciaModal = new bootstrap.Modal(document.getElementById('incidenciaModal'));

    incidenciaItems.forEach(item => {
        item.addEventListener('click', function() {
            const data = JSON.parse(this.getAttribute('data-incidencia'));

            // Insertar los datos en el modal
            document.getElementById('modal-id').textContent = data.id;
            document.getElementById('modal-titulo').textContent = data.titulo;
            document.getElementById('modal-urgencia').textContent = data.urgencia;
            document.getElementById('modal-estado').textContent = data.estado;
            document.getElementById('modal-fecha').textContent = data.fecha_reporte;
            document.getElementById('modal-resolutor').textContent = data.resolutor;

            const imagenElement = document.getElementById('modal-imagen');
            const sinImagenTexto = document.getElementById('sin-imagen-texto');

            if (data.ruta) {
                imagenElement.src = data.ruta;
                imagenElement.style.display = 'block';
                sinImagenTexto.style.display = 'none';
            } else {
                imagenElement.style.display = 'none';
                sinImagenTexto.style.display = 'block';
            }

            // Mostrar el modal
            incidenciaModal.show();
        });
    });

    document.getElementById('confirmar-asignacion-btn').addEventListener('click', function() {
        const usuarioSeleccionado = document.getElementById('usuario-select').value;

        const incidenciaId = document.getElementById('modal-id').innerText;
        console.log(`Asignación: Incidencia ID: ${incidenciaId}, Usuario ID: ${usuarioSeleccionado}`);

        // Cerrar el modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('asignarUsuarioModal'));
        modal.hide();
    });
});
