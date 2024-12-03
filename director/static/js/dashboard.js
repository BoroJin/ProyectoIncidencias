// dashboard.js

document.addEventListener('DOMContentLoaded', function () {

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    // Inicialización de modales
    const incidenciaModalElement = document.getElementById('incidenciaModal');
    const incidenciaModal = new bootstrap.Modal(incidenciaModalElement);

    const asignarUsuarioModalElement = document.getElementById('asignarUsuarioModal');
    const asignarUsuarioModal = new bootstrap.Modal(asignarUsuarioModalElement);

    const rechazarConfirmacionModalElement = document.getElementById('rechazarConfirmacionModal');
    const rechazarConfirmacionModal = new bootstrap.Modal(rechazarConfirmacionModalElement);

    // Función para obtener el CSRF token desde las cookies
    function getCSRFToken() {
        let cookieValue = null;
        const name = 'csrftoken';
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let cookie of cookies) {
                cookie = cookie.trim();
                if (cookie.startsWith(name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
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

    const confirmarAsignacionBtn = document.getElementById('confirmar-asignacion-btn');
    if (confirmarAsignacionBtn) {
        confirmarAsignacionBtn.addEventListener('click', function () {
            const usuarioSeleccionado = document.getElementById('usuario-select').value;
            const incidenciaId = modalElements.id.textContent;

            if (!usuarioSeleccionado) {
                alert('Por favor, selecciona un usuario para asignar.');
                return;
            }


            console.log(`Asignación: Incidencia ID: ${incidenciaId}, Usuario ID: ${usuarioSeleccionado}`);

            fetch('/director/asignarUsuario/', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: JSON.stringify({
                    ID_asignar: incidenciaId,
                    usuario_id: usuarioSeleccionado
                })
            })
            .then(response => response.json())
            .then(data => {
                asignarUsuarioModal.hide();
                window.location.reload();
            })
            .catch(error => {
                alert(`Error en la solicitud: ${error.message}`);
            });
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