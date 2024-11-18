// Escucha el evento de carga completa del documento para inicializar los elementos y eventos del modal
document.addEventListener('DOMContentLoaded', function () {
    // Selecciona elementos del DOM para manejarlos dentro del script
    const incidenciaModal = document.getElementById('incidenciaModal'); // Modal de incidencia
    const btnInconcluso = document.getElementById('btnInconcluso'); // Botón para marcar como "Inconcluso"
    const btnFinalizado = document.getElementById('btnFinalizado'); // Botón para marcar como "Finalizado"
    const btnEnviar = document.getElementById('btnEnviar'); // Botón para enviar el formulario
    const inconclusoSection = document.getElementById('inconclusoSection'); // Sección para ingresar razón de "Inconcluso"
    const finalizadoSection = document.getElementById('finalizadoSection'); // Sección para subir archivo al marcar "Finalizado"
    const incidenciaForm = document.getElementById('incidenciaForm'); // Formulario del modal
    const finalizadoArchivo = document.getElementById('finalizadoArchivo'); // Campo de archivo en la sección "Finalizado"
    const inconclusoRazon = document.getElementById('inconclusoRazon'); // Campo de texto en la sección "Inconcluso"
    const errorMessage = document.getElementById('errorMessage'); // Mensaje de error
    const successMessage = document.getElementById('successMessage'); // Mensaje de éxito
    let actionType = ''; // Almacena la acción actual (inconcluso o finalizado)

    // Manejador de evento que se activa al abrir el modal de incidencia
    incidenciaModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget; // Botón que abrió el modal
        const incidenciaData = button.getAttribute('data-incidencia'); // Obtiene datos de la incidencia en formato JSON
        const incidencia = JSON.parse(incidenciaData); // Convierte los datos a un objeto JavaScript

        // Rellena los datos de la incidencia en los elementos del modal
        document.getElementById('modalIncidenciaId').textContent = incidencia.id;
        document.getElementById('modalTitulo').textContent = incidencia.titulo;
        document.getElementById('modalDescripcion').textContent = incidencia.descripcion;
        document.getElementById('modalUrgencia').textContent = incidencia.urgencia;
        document.getElementById('modalEstado').textContent = incidencia.estado;
        document.getElementById('modalFecha').textContent = incidencia.fecha_reporte;
        document.getElementById('modalResolutor').textContent = incidencia.resolutor;

        // Restablece el modal a su estado inicial
        inconclusoSection.classList.add('d-none');
        finalizadoSection.classList.add('d-none');
        btnEnviar.disabled = true;
        errorMessage.textContent = '';
        errorMessage.classList.add('d-none');
        successMessage.classList.add('d-none');
        actionType = '';
        incidenciaForm.reset();
    });

// Evento para mostrar la sección "Inconcluso" cuando el usuario selecciona esta opción
    btnInconcluso.addEventListener('click', function () {
        actionType = 'inconcluso';
        inconclusoSection.classList.remove('d-none'); // Muestra la sección "Inconcluso"
        finalizadoSection.classList.add('d-none'); // Oculta la sección "Finalizado"
        btnEnviar.disabled = true; // Deshabilita el botón "Enviar"
        errorMessage.textContent = '';
        errorMessage.classList.add('d-none');
        successMessage.classList.add('d-none');
    });

    // Evento para mostrar la sección "Finalizado" cuando el usuario selecciona esta opción
    btnFinalizado.addEventListener('click', function () {
        actionType = 'finalizado';
        finalizadoSection.classList.remove('d-none'); // Muestra la sección "Finalizado"
        inconclusoSection.classList.add('d-none'); // Oculta la sección "Inconcluso"
        btnEnviar.disabled = true; // Deshabilita el botón "Enviar"
        errorMessage.textContent = '';
        errorMessage.classList.add('d-none');
        successMessage.classList.add('d-none');
    });

    // Evento que habilita el botón "Enviar" si el campo de razón de "Inconcluso" tiene texto
    inconclusoRazon.addEventListener('input', function () {
        btnEnviar.disabled = inconclusoRazon.value.trim().length === 0;
    });

    // Evento que habilita el botón "Enviar" si se ha seleccionado un archivo en la sección "Finalizado"
    finalizadoArchivo.addEventListener('change', function () {
        btnEnviar.disabled = finalizadoArchivo.files.length === 0;
    });

    // Evento para manejar el envío del formulario cuando el usuario hace clic en "Enviar"
    incidenciaForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Previene el envío del formulario por defecto

        // Validación: verifica que haya un archivo seleccionado en "Finalizado"
        if (actionType === 'finalizado' && finalizadoArchivo.files.length === 0) {
            errorMessage.textContent = 'Por favor, sube un archivo para finalizar la incidencia.';
            errorMessage.classList.remove('d-none');
            return;
        }

        // Validación: verifica que se haya ingresado una razón en "Inconcluso"
        if (actionType === 'inconcluso' && inconclusoRazon.value.trim().length === 0) {
            errorMessage.textContent = 'Por favor, ingresa una razón para marcar como inconcluso.';
            errorMessage.classList.remove('d-none');
            return;
        }

        // Crear un objeto FormData con el archivo y otros datos necesarios
        const formData = new FormData();
        formData.append('id', document.getElementById('modalIncidenciaId').textContent);
        formData.append('estado', actionType); // Agregar el estado de la incidencia como 'inconcluso' o 'finalizado'

        if (actionType === 'finalizado') {
            const file = finalizadoArchivo.files[0];
            if (file) {
                formData.append('archivo', file); // Agregar el archivo al FormData
            }
        } else if (actionType === 'inconcluso') {
            formData.append('razon', inconclusoRazon.value.trim());
        }

        // Enviar los datos al servidor Django usando fetch
        fetch('{% url "guardar_incidencia" %}', { // Cambia la URL a la vista de almacenamiento
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                // Si la respuesta es exitosa, muestra un mensaje de éxito y actualiza las notificaciones
                successMessage.textContent = 'El estado de la incidencia y el archivo se han guardado correctamente.';
                successMessage.classList.remove('d-none');
                fetchNotifications(); // Llama a la función para actualizar las notificaciones
                // Procesar la respuesta y actualizar la vista si es necesario

                setTimeout(() => {
                    successMessage.classList.add('d-none');
                    const modal = bootstrap.Modal.getInstance(incidenciaModal);
                    modal.hide();
                }, 2000);
            } else {
                errorMessage.textContent = 'Ocurrió un error al guardar la incidencia.';
                errorMessage.classList.remove('d-none');
            }
        })
        .catch(error => {
            console.error('Error al enviar los datos:', error);
            errorMessage.textContent = 'Ocurrió un error al guardar la incidencia.';
            errorMessage.classList.remove('d-none');
        });
    });
});
