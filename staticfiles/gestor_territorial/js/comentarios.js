document.addEventListener('DOMContentLoaded', () => {
    const modal = new bootstrap.Modal(document.getElementById('modalComentario'));
    let incidenciaId;

    // Verificar si el token CSRF existe
    const csrftokenElement = document.querySelector('[name=csrfmiddlewaretoken]');
    if (!csrftokenElement) {
        console.error("No se encontró el token CSRF en el DOM.");
        return; // Detener la ejecución si no hay token CSRF
    }
    const csrftoken = csrftokenElement.value;

    const eliminarIncidenciaUrl = document.getElementById('eliminarIncidencia').getAttribute('data-url');
    const reenviarIncidenciaUrl = document.getElementById('guardarComentario').getAttribute('data-url');

    // Abrir modal al hacer clic en "Agregar comentario"
    document.querySelectorAll('.btn-comentario').forEach(button => {
        button.addEventListener('click', () => {
            // Usar el data-id del botón para obtener el ID de la incidencia
            incidenciaId = button.getAttribute('data-id');
            document.getElementById('incidenciaId').value = incidenciaId; // Poner el ID en el campo oculto
            modal.show(); // Mostrar el modal
        });
    });

    // Validación para deshabilitar botones si no hay comentario
    const comentarioTexto = document.getElementById('comentarioTexto');
    const eliminarBtn = document.getElementById('eliminarIncidencia');
    const reenviarBtn = document.getElementById('guardarComentario');

    function validarComentario() {
        if (comentarioTexto.value.trim()) {
            eliminarBtn.disabled = false;
            reenviarBtn.disabled = false;
        } else {
            eliminarBtn.disabled = true;
            reenviarBtn.disabled = true;
        }
    }

    comentarioTexto.addEventListener('input', validarComentario);

    // Restablecer el estado del modal al abrir
    document.getElementById('modalComentario').addEventListener('shown.bs.modal', () => {
        comentarioTexto.value = '';
        validarComentario();
    });

    // Eliminar incidencia al hacer clic en "Eliminar incidencia"
    eliminarBtn.addEventListener('click', () => {
        const comentario = comentarioTexto.value.trim();
        if (!comentario) {
            alert('Debes ingresar un comentario antes de eliminar la incidencia.');
            return; // Detener la ejecución si el comentario está vacío
        }
        fetch(eliminarIncidenciaUrl, {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrftoken,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                incidencia_id: incidenciaId,
                comentario: comentario,
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Respuesta del servidor:", data);
            if (data.success) {
                alert('Incidencia eliminada.');
                modal.hide();
                document.getElementById(`incidencia-${incidenciaId}`).classList.add('table-success');
                window.location.reload();
            } else {
                alert(`Error al eliminar la incidencia: ${data.error}`);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ocurrió un error al procesar la solicitud.');
        });
    });

    // Reenviar incidencia al hacer clic en "Reenviar incidencia"
    reenviarBtn.addEventListener('click', () => {
        const comentario = comentarioTexto.value.trim();
        if (!comentario) {
            alert('Debes ingresar un comentario antes de reenviar la incidencia.');
            return; // Detener la ejecución si el comentario está vacío
        }
        fetch(reenviarIncidenciaUrl, {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrftoken,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                incidencia_id: incidenciaId,
                comentario: comentario,
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Respuesta del servidor:", data);
            if (data.success) {
                alert('Incidencia reenviada correctamente.');
                modal.hide();
                document.getElementById(`incidencia-${incidenciaId}`).classList.add('table-success');
                window.location.reload();
            } else {
                alert(`Error al reenviar la incidencia: ${data.error}`);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ocurrió un error al procesar la solicitud.');
        });
    });
});
