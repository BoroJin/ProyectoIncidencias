document.getElementById('btnSubir').addEventListener('click', function () {
    const form = document.getElementById('contenedor-form');

    if (form.checkValidity()) {
        const formData = new FormData(form);
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRFToken': csrftoken
            },
        })
        .then(response => response.json())
        .then(data => {
            const modalContent = document.getElementById('modal-body-content');
            modalContent.innerHTML = '';

            if (data.detalles && Array.isArray(data.detalles)) {
                let errorList = '<ul>';
                data.detalles.forEach(error => {
                    errorList += `<li>${error}</li>`;
                });
                errorList += '</ul>';
                modalContent.innerHTML = `<p><strong>Errores en el archivo CSV:</strong></p>${errorList}`;
                document.getElementById('btnContinuar').style.display = 'none';
            } else {
                modalContent.innerHTML = `<p>${data.mensaje}</p>`;
                document.getElementById('btnContinuar').style.display = 'inline-block';
            }

            const myModal = new bootstrap.Modal(document.getElementById('miModal'));
            myModal.show();
        })
        .catch(error => {
            console.error('Error al enviar el formulario:', error);
            document.getElementById('modal-body-content').innerHTML = '<p>Ocurrió un error al procesar la solicitud.</p>';
            const myModal = new bootstrap.Modal(document.getElementById('miModal'));
            myModal.show();
        });
    } else {
        form.reportValidity();
    }
});
// Función para llamar a la vista que agrega usuarios desde el CSV
document.getElementById('btnContinuar').addEventListener('click', function () {
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    fetch('/administrador/agregar_usuarios_desde_csv/', {

        method: 'POST',
        headers: {
            'X-CSRFToken': csrftoken,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        const modalContent = document.getElementById('modal-body-content');
        modalContent.innerHTML = `<p>${data.mensaje}</p>`;
        document.getElementById('btnContinuar').style.display = 'none'; // Oculta el botón después de agregar
    })
    .catch(error => {
        console.error('Error al agregar usuarios:', error);
        const modalContent = document.getElementById('modal-body-content');
        modalContent.innerHTML = '<p>Error al agregar usuarios.</p>';
    });
});