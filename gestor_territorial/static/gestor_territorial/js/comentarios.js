
document.addEventListener('DOMContentLoaded', () => {
    console.log("El archivo comentarios.js está cargado correctamente.");

    const modal = new bootstrap.Modal(document.getElementById('modalComentario'));
    let incidenciaId;

    // Verificar si el token CSRF existe
    const csrftokenElement = document.querySelector('[name=csrfmiddlewaretoken]');
    if (!csrftokenElement) {
        console.error("No se encontró el token CSRF en el DOM.");
        return; // Detener la ejecución si no hay token CSRF
    }
    const csrftoken = csrftokenElement.value;
    console.log("Token CSRF obtenido:", csrftoken);

    // Abrir modal al hacer clic en "Agregar comentario"
    document.querySelectorAll('.btn-comentario').forEach(button => {
        button.addEventListener('click', () => {
            incidenciaId = button.closest('tr').id.split('-')[1];
            document.getElementById('incidenciaId').value = incidenciaId;
            modal.show();
        });
    });

    // Guardar el comentario al hacer clic en "Guardar"
    document.getElementById('guardarComentario').addEventListener('click', () => {
        const comentario = document.getElementById('comentarioTexto').value;

        fetch('agregar_comentario/', {
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
                alert('Comentario agregado correctamente.');
                modal.hide();
                document.getElementById(`incidencia-${incidenciaId}`).classList.add('table-success');
            } else {
                alert(`Error al agregar el comentario: ${data.error}`);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ocurrió un error al procesar la solicitud.');
        });
    });
});

