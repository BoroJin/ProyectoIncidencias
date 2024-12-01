console.log("Archivo gestor_territorial.js cargado correctamente.");

document.addEventListener('DOMContentLoaded', function () {
    const modalVerificacion = new bootstrap.Modal(document.getElementById('modalVerificacion')); // Modal de Bootstrap
    const formRechazo = document.getElementById('formRechazo');
    const razonRechazo = document.getElementById('razonRechazo');

    let incidenciaId = null;

    // Guardar el ID de la incidencia cuando se haga clic en "Verificar"
    document.querySelectorAll('.btn-verificar').forEach(button => {
        button.addEventListener('click', () => {
            incidenciaId = button.getAttribute('data-id'); // Capturar el ID de la incidencia
            console.log('ID de la incidencia seleccionada:', incidenciaId);
            modalVerificacion.show(); // Mostrar el modal
        });
    });

    // Cambiar estado a "validada" al hacer clic en "Verificar"
    document.getElementById('btnVerificar').addEventListener('click', () => {
        if (!incidenciaId) {
            alert('Error: No se seleccionó ninguna incidencia.');
            return;
        }

        console.log('Enviando solicitud para verificar incidencia con ID:', incidenciaId);

        fetch('cambiar_estado/', {
            method: 'POST',
            headers: {
                'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                incidencia_id: incidenciaId,
                nuevo_estado: 'validada',
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor.');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                console.log('Incidencia verificada correctamente.');
                alert('Incidencia verificada correctamente.');
                modalVerificacion.hide();
                document.getElementById(`incidencia-${incidenciaId}`).querySelector('td:nth-child(3)').textContent = 'validada';
            } else {
                console.error('Error en el servidor:', data.error);
                alert('Error al verificar la incidencia.');
            }
        })
        .catch(error => console.error('Error:', error));
    });

    // Mostrar formulario de rechazo al hacer clic en "Rechazar"
    document.getElementById('btnRechazar').addEventListener('click', () => {
        formRechazo.style.display = "block";
    });

    // Cambiar estado a "no verificada" al hacer clic en "Enviar"
    document.getElementById('btnEnviarRechazo').addEventListener('click', () => {
        const comentario = razonRechazo.value;

        if (!comentario.trim()) {
            alert('Debe escribir una razón para rechazar.');
            return;
        }

        if (!incidenciaId) {
            alert('Error: No se seleccionó ninguna incidencia.');
            return;
        }

        console.log('Enviando rechazo para incidencia con ID:', incidenciaId);

        fetch('cambiar_estado/', {
            method: 'POST',
            headers: {
                'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                incidencia_id: incidenciaId,
                nuevo_estado: 'no verificada',
                comentario: comentario,
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor.');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                console.log('Incidencia rechazada correctamente.');
                alert('Incidencia rechazada correctamente.');
                modalVerificacion.hide();
                document.getElementById(`incidencia-${incidenciaId}`).querySelector('td:nth-child(3)').textContent = 'no verificada';
            } else {
                console.error('Error en el servidor:', data.error);
                alert('Error al rechazar la incidencia.');
            }
        })
        .catch(error => console.error('Error:', error));
    });
});