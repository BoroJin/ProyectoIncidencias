document.addEventListener('DOMContentLoaded', () => {
    // Obtener token CSRF
    const getCookie = (name) => {
        return document.cookie.split('; ').reduce((acc, cookie) => {
            const [key, value] = cookie.split('=');
            return key === name ? decodeURIComponent(value) : acc;
        }, null);
    };

    const csrftoken = getCookie('csrftoken');
    let currentIncidenciaData = null;
    let currentAction = null; // "Inconcluso" o "Finalizado"

    // Inicializar modales
    const modals = {
        asignada: new bootstrap.Modal(document.getElementById('incidenciaModalAsignada')),
        proceso: new bootstrap.Modal(document.getElementById('incidenciaModalProceso'))
    };

    // Elementos del DOM
    const {
        btnInconcluso,
        btnFinalizado,
        btnEnviar,
        comentariosInconcluso,
        archivoFinalizado
    } = {
        btnInconcluso: document.getElementById('btnInconcluso'),
        btnFinalizado: document.getElementById('btnFinalizado'),
        btnEnviar: document.getElementById('btnEnviar'),
        comentariosInconcluso: document.getElementById('comentariosInconcluso'),
        archivoFinalizado: document.getElementById('archivoFinalizado')
    };
    const iniciarButton = document.querySelector('#incidenciaModalAsignada .btn-proceso');
    const incidenciaForm = document.getElementById('incidenciaForm');

    // Función para llenar datos en el modal
    const fillModalData = (modalElement, incidencia) => {
        const fields = ['Id', 'Titulo', 'Descripcion', 'Urgencia', 'Estado', 'Fecha', 'Resolutor'];
        fields.forEach(field => {
            modalElement.querySelector(`#${modalElement.id}${field}`).textContent = incidencia[field.toLowerCase()];
        });
    };

    // Función para mostrar el botón "Enviar" y manejar la caja de comentarios
    const mostrarBotonEnviar = (action) => {
        currentAction = action;
        btnEnviar.classList.remove('d-none');
        btnEnviar.disabled = false;
        comentariosInconcluso.classList.toggle('d-none', action !== 'Inconcluso');
        archivoFinalizado.classList.toggle('d-none', action !== 'Finalizado');
    };

    // Manejar acciones "Inconcluso" y "Finalizado"
    [btnInconcluso, btnFinalizado].forEach(btn => {
        btn.addEventListener('click', () => {
            mostrarBotonEnviar(btn === btnInconcluso ? 'Inconcluso' : 'Finalizado');
        });
    });

    // Evento para el botón "Enviar"
    btnEnviar.addEventListener('click', async (event) => {
        event.preventDefault();
        try {
            if (currentAction === 'Inconcluso') {
                const comentarios = document.getElementById('comentarios').value.trim();
                if (!comentarios) throw 'Por favor, justifique el estado a asignar.';

                const response = await fetch('http://127.0.0.1:8000/resolutor/setIncidenciaInconclusa/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrftoken,
                    },
                    body: JSON.stringify({ id: currentIncidenciaData.id, comentarios })
                });

                if (!response.ok) throw 'Error en la solicitud';
                await response.json();
                alert('Incidencia marcada como inconclusa y datos enviados correctamente.');
                modals.proceso.hide();
                window.location.reload(); // Recargar la página

            } else if (currentAction === 'Finalizado') {
                const archivos = document.getElementById('archivos').files;
                if (archivos.length === 0) throw 'Por favor, adjunte al menos un archivo.';

                const formData = new FormData();
                formData.append('id', currentIncidenciaData.id);
                [...archivos].forEach(file => formData.append('archivos', file));

                const response = await fetch('http://127.0.0.1:8000/resolutor/setIncidenciaFinalizada/', {
                    method: 'POST',
                    headers: { 'X-CSRFToken': csrftoken },
                    body: formData,
                });

                if (!response.ok) throw 'Error en la solicitud';
                await response.json();
                alert('Incidencia finalizada y archivos enviados correctamente.');
                modals.proceso.hide();
                window.location.reload(); // Recargar la página
            }
        } catch (error) {
            console.error('Error:', error);
            alert(typeof error === 'string' ? error : 'Hubo un error al enviar los datos. Por favor, intenta nuevamente.');
        }
    });

    // Reiniciar el estado al cerrar el modal
    document.getElementById('incidenciaModalProceso').addEventListener('hidden.bs.modal', () => {
        btnEnviar.classList.add('d-none');
        btnEnviar.disabled = true;
        comentariosInconcluso.classList.add('d-none');
        archivoFinalizado.classList.add('d-none');
        currentAction = null;
        incidenciaForm.reset();
    });

    // Manejar clics en las incidencias
    document.addEventListener('click', (event) => {
        const target = event.target.closest('.btn-incidencia-asignada, .btn-incidencia-proceso');
        if (!target) return;
        event.preventDefault();

        const incidenciaData = JSON.parse(target.dataset.incidencia);
        currentIncidenciaData = incidenciaData;

        if (target.classList.contains('btn-incidencia-asignada')) {
            fillModalData(document.getElementById('incidenciaModalAsignada'), incidenciaData);
            modals.asignada.show();
        } else {
            fillModalData(document.getElementById('incidenciaModalProceso'), incidenciaData);
            modals.proceso.show();
        }
    });

    // Evento para el botón "Iniciar"
    iniciarButton.addEventListener('click', async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/resolutor/setIncidenciaEnProceso/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,
                },
                body: JSON.stringify({ id: currentIncidenciaData.id }),
            });

            if (!response.ok) throw 'Error en la solicitud';
            await response.json();
            alert('Incidencia iniciada correctamente.');
            modals.asignada.hide();
            window.location.reload(); // Recargar la página

        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al iniciar la incidencia. Por favor, intenta nuevamente.');
        }
    });
});
