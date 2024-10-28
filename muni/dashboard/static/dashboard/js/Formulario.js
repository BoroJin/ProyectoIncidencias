document.addEventListener('DOMContentLoaded', function () {
    let contador = 0;

    document.getElementById('btnAgregar').addEventListener('click', function () {
        const nombreCampo = document.getElementById('campo_nombre').value;
        const tituloCampo = document.getElementById('campo_titulo').value;

        const errorNombre = document.getElementById('error_nombre');
        const errorTitulo = document.getElementById('error_titulo');
        let isValid = true;

        if (!nombreCampo) {
            errorNombre.textContent = "El nombre del campo es obligatorio.";
            isValid = false;
        } else {
            errorNombre.textContent = "";
        }

        if (!tituloCampo) {
            errorTitulo.textContent = "El título del campo es obligatorio.";
            isValid = false;
        } else {
            errorTitulo.textContent = "";
        }

        if (!isValid) {
            return; // Si hay errores, no crear el campo
        }

        contador++;

        // Crear un nuevo div para el campo
        const nuevoDiv = document.createElement('div');
        nuevoDiv.className = 'campo';

        // Crear la etiqueta para el nuevo campo
        const nuevoLabel = document.createElement('label');
        nuevoLabel.setAttribute('for', `campo_dinamico_${contador}`);
        nuevoLabel.textContent = tituloCampo;

        // Crear el nuevo input
        const nuevoInput = document.createElement('input');
        nuevoInput.type = 'text';
        nuevoInput.name = nombreCampo;  // El nombre será dinámico basado en lo que el usuario ingrese
        nuevoInput.id = `campo_dinamico_${contador}`;
        nuevoInput.placeholder = tituloCampo;

        // Agregar el label y el input al nuevo div
        nuevoDiv.appendChild(nuevoLabel);
        nuevoDiv.appendChild(nuevoInput);

        // Agregar el div con el nuevo campo al formulario
        document.getElementById('campos').appendChild(nuevoDiv);

        // Limpiar los inputs de nombre y título
        document.getElementById('campo_nombre').value = '';
        document.getElementById('campo_titulo').value = '';
    });
});