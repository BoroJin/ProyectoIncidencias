//boris
async function fetchSimulatedData() {
    try {
        // Verificar si los datos ya están en localStorage
        const storedData = localStorage.getItem('incidentData');
        let combinedData = storedData ? JSON.parse(storedData) : [];

        // Obtener usuarios simulados
        const userResponse = await fetch('https://randomuser.me/api/?results=1');  // Solo un usuario por actualización
        const users = await userResponse.json();

        // Obtener una incidencia simulada
        const postResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
        const incidents = await postResponse.json();

        // Crear un nuevo registro de incidencia
        const randomIncidentNumber = Math.floor(Math.random() * 501); // Número aleatorio entre 0 y 500
        const newIncident = {
            ID: users.results[0].login.uuid,  // Usamos el UUID como el ID del usuario
            Usuario: `${users.results[0].name.first} ${users.results[0].name.last}`,
            Incidencia: `P${randomIncidentNumber}`,  // Número aleatorio
            Nombre: incidents[randomIncidentNumber % incidents.length].title,
            Tipo: 'General',
            Descripcion: incidents[randomIncidentNumber % incidents.length].body,
            Fecha: new Date().toLocaleDateString()
        };

        // Agregar el nuevo registro al principio del array de datos
        combinedData.unshift(newIncident);

        // Si ya tenemos 50 registros, eliminamos el más antiguo (el último en el array)
        if (combinedData.length > 50) {
            combinedData.pop(); // Elimina el último elemento, que es el más antiguo
        }

        // Almacenar los datos actualizados en localStorage
        localStorage.setItem('incidentData', JSON.stringify(combinedData));

        // Mostrar los datos en la tabla
        displayDataInTable(combinedData);
    } catch (error) {
        console.error('Error simulando los datos:', error);
    }

    // Usar setTimeout para volver a llamar la función después de 5 segundos
    setTimeout(fetchSimulatedData, 5000);  // Retrasar 5 segundos antes de ejecutar de nuevo
}

function displayDataInTable(data) {
    const tableBody = document.getElementById('incidentsTableBody');
    tableBody.innerHTML = ''; // Limpiar cualquier contenido anterior

    data.forEach(item => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${item.ID}</td>
            <td>${item.Usuario}</td>
            <td>${item.Incidencia}</td>
            <td>${item.Nombre}</td>
            <td>${item.Tipo}</td>
            <td>${item.Descripcion}</td>
            <td>${item.Fecha}</td>
        `;

        tableBody.appendChild(row);
    });
}

// Función para borrar los datos del localStorage
function clearLocalStorage() {
    localStorage.removeItem('incidentData');
    document.getElementById('incidentsTableBody').innerHTML = '';  // Limpiar la tabla
    console.log('Datos borrados de localStorage');
}

// Agregar el evento al botón "Actualizar Registros"
document.getElementById('fetchDataBtn').addEventListener('click', fetchSimulatedData);

// Agregar el evento al botón "Borrar LocalStorage"
document.getElementById('clearStorageBtn').addEventListener('click', clearLocalStorage);



