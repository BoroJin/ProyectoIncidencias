// dashboard.js

document.addEventListener('DOMContentLoaded', function () {
    // Inicialización de modales
    const incidenciaModalElement = document.getElementById('incidenciaModal');
    const incidenciaModal = new bootstrap.Modal(incidenciaModalElement);

    const asignarUsuarioModalElement = document.getElementById('asignarUsuarioModal');
    const asignarUsuarioModal = new bootstrap.Modal(asignarUsuarioModalElement);

    const rechazarConfirmacionModalElement = document.getElementById('rechazarConfirmacionModal');
    const rechazarConfirmacionModal = new bootstrap.Modal(rechazarConfirmacionModalElement);

    // Referencias a elementos del modal de incidencia
    const modalElements = {
        id: incidenciaModalElement.querySelector('#modal-id'),
        titulo: incidenciaModalElement.querySelector('#modal-titulo'),
        urgencia: incidenciaModalElement.querySelector('#modal-urgencia'),
        estado: incidenciaModalElement.querySelector('#modal-estado'),
        fecha: incidenciaModalElement.querySelector('#modal-fecha'),
        resolutor: incidenciaModalElement.querySelector('#modal-resolutor'),
        comentario: incidenciaModalElement.querySelector('#modal-comentario'), // Añadido
        imagen: incidenciaModalElement.querySelector('#modal-imagen'),
        sinImagenTexto: incidenciaModalElement.querySelector('#sin-imagen-texto'),
        rechazarIdDisplay: rechazarConfirmacionModalElement.querySelector('#rechazar-modal-id-display'),
        rechazarId: rechazarConfirmacionModalElement.querySelector('#rechazar-modal-id'),
    };

    // Delegación de eventos para botones de incidencia
    const incidenciaListGroup = document.querySelector('.list-group');
    if (incidenciaListGroup) {
        incidenciaListGroup.addEventListener('click', function (e) {
            const target = e.target.closest('.btn-incidencia-iniciada');
            if (target) {
                try {
                    const data = JSON.parse(target.getAttribute('data-incidencia'));

                    // Insertar los datos en el modal
                    modalElements.id.textContent = data.id;
                    modalElements.titulo.textContent = data.titulo;
                    modalElements.urgencia.textContent = data.urgencia;
                    modalElements.estado.textContent = data.estado;
                    modalElements.fecha.textContent = data.fecha_reporte;
                    modalElements.resolutor.textContent = data.resolutor;
                    modalElements.comentario.textContent = data.comentario; // Añadido

                    // Manejo de la imagen
                    const modalImagen = modalElements.imagen;
                    if (data.ruta) {
                        modalImagen.src = data.ruta;
                        modalImagen.style.display = 'block';
                        modalElements.sinImagenTexto.style.display = 'none';
                    } else {
                        modalImagen.style.display = 'none';
                        modalElements.sinImagenTexto.style.display = 'block';
                    }

                    // Mostrar el modal
                    incidenciaModal.show();
                } catch (error) {
                    console.error('Error al parsear data-incidencia:', error);
                }
            }
        });
    }

    // Manejo del botón "Confirmar Asignación"
    const confirmarAsignacionBtn = document.getElementById('confirmar-asignacion-btn');
    if (confirmarAsignacionBtn) {
        confirmarAsignacionBtn.addEventListener('click', function () {
            const usuarioSeleccionado = document.getElementById('usuario-select').value;
            const incidenciaId = modalElements.id.textContent;

            if (!usuarioSeleccionado) {
                alert('Por favor, selecciona un usuario para asignar.');
                return;
            }

            // Aquí puedes realizar una solicitud AJAX para asignar el usuario al backend
            // Por ahora, solo se muestra en la consola
            console.log(`Asignación: Incidencia ID: ${incidenciaId}, Usuario ID: ${usuarioSeleccionado}`);

            // Opcional: Mostrar una notificación al usuario
            alert(`Usuario asignado correctamente a la incidencia ${incidenciaId}.`);

            // Cerrar el modal
            asignarUsuarioModal.hide();
        });
    }

    // Manejo del botón "Rechazar"
    const rechazarBtn = document.getElementById('rechazar-btn');
    if (rechazarBtn) {
        rechazarBtn.addEventListener('click', function () {
            const modalId = modalElements.id.textContent;

            modalElements.rechazarIdDisplay.textContent = modalId;
            modalElements.rechazarId.value = modalId;
        });
    }

    // Opcional: Manejo del formulario de rechazo para validaciones adicionales
    const rechazarForm = document.getElementById('rechazarForm');
    if (rechazarForm) {
        rechazarForm.addEventListener('submit', function (e) {
            const justificacion = document.getElementById('rechazar-comentario').value.trim();
            const incidenciaId = document.getElementById('rechazar-modal-id').value;

            if (!incidenciaId) {
                e.preventDefault();
                alert('ID de incidencia no encontrado.');
                return;
            }

            
             if (justificacion.length < 10) {
                 e.preventDefault();
                 alert('La justificación debe tener al menos 10 caracteres.');
             }


        });
    }
});
