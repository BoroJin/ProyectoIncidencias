document.addEventListener('DOMContentLoaded', function() {
    const incidenciaItems = document.querySelectorAll('.btn-incidencia-iniciada');
    const incidenciaModal = new bootstrap.Modal(document.getElementById('incidenciaModal'));
    
    incidenciaItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            const data = JSON.parse(this.getAttribute('data-incidencia'));
            
            // Insertar los datos en el modal
            document.getElementById('modal-id').textContent = data.id;
            document.getElementById('modal-titulo').textContent = data.titulo;
            document.getElementById('modal-urgencia').textContent = data.urgencia;
            document.getElementById('modal-estado').textContent = data.estado;
            document.getElementById('modal-fecha').textContent = data.fecha_reporte;

            document.getElementById('modal-resolutor').textContent = data.resolutor;
            
            // Mostrar el modal
            incidenciaModal.show();
        });
    });
});
document.getElementById('confirmar-asignacion-btn').addEventListener('click', function() {
    const usuarioSeleccionado = document.getElementById('usuario-select').value;

    if (usuarioSeleccionado) {
        alert(`Usuario con ID ${usuarioSeleccionado} asignado correctamente.`);
        // Agrega lógica para enviar la asignación al servidor
        const incidenciaId = document.getElementById('modal-id').innerText;
        console.log(`Asignación: Incidencia ID: ${incidenciaId}, Usuario ID: ${usuarioSeleccionado}`);
        
        // Cierra el modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('asignarUsuarioModal'));
        modal.hide();
    } else {
        alert('Por favor, seleccione un usuario.');
    }
});


