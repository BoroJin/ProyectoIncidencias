// Función para cargar los datos desde localStorage o la API simulada
async function fetchData() {
    try {
        // Verificar si los datos ya están en localStorage
        const storedData = localStorage.getItem('apiData');
        
        if (storedData) {
            // Si hay datos en localStorage, los parseamos y los mostramos
            console.log('Datos cargados desde localStorage');
            displayData(JSON.parse(storedData));
        } else {
            // Si no hay datos en localStorage, hacemos la llamada simulada a la API
            console.log('Obteniendo datos desde la API simulada...');
            const response = await new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        data: [
                            { id: 1, Usuario: 'Juan', Incidencia: 'P01', Nombre: 'Caída de árbol', Tipo: 'Arbol', Descripcion: 'nada', Fecha: '07/04/2024' },
                            { id: 2, Usuario: 'Carolina', Incidencia: 'P02', Nombre: 'Robo de cables', Tipo: 'Cableado', Descripcion: 'sin datos', Fecha: '08/04/2024' },
                            { id: 3, Usuario: 'Ximena', Incidencia: 'P03', Nombre: 'Corte de agua', Tipo: 'Agua', Descripcion: 'sin datos', Fecha: '09/04/2024' },
                            { id: 4, Usuario: 'Antonia', Incidencia: 'P04', Nombre: 'Bache en la calle', Tipo: 'Bache', Descripcion: 'sin datos', Fecha: '10/04/2024' },
                            { id: 5, Usuario: 'Diego', Incidencia: 'P05', Nombre: 'Farol caído', Tipo: 'Iluminación', Descripcion: 'sin datos', Fecha: '11/04/2024' },
                            { id: 6, Usuario: 'Benjamin', Incidencia: 'P06', Nombre: 'Quema de árbol', Tipo: 'Árbol', Descripcion: 'sin datos', Fecha: '12/04/2024' },
                            { id: 7, Usuario: 'Homero', Incidencia: 'P07', Nombre: 'Basura acumulada', Tipo: 'Basura', Descripcion: 'sin datos', Fecha: '13/04/2024' }
                        ]
                    });
                }, 2000); // Simulando un retraso de 2 segundos
            });

            // Almacenar los datos en localStorage
            localStorage.setItem('apiData', JSON.stringify(response.data));

            // Mostrar los datos obtenidos
            displayData(response.data);
        }
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

function displayData(data) {
    const tableBody = document.querySelector('table tbody');
    tableBody.innerHTML = ''; // Limpiar el contenido anterior del cuerpo de la tabla

    data.forEach(item => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${item.id}</td>
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

// Asignar el evento al botón
document.getElementById('fetchDataBtn').addEventListener('click', fetchData);

// Cargar datos automáticamente al cargar la página (si existen en localStorage)
//document.addEventListener('DOMContentLoaded', fetchData);

document.getElementById('clearStorageBtn').addEventListener('click', () => {
    localStorage.removeItem('apiData');
    console.log('Datos eliminados de localStorage');
});

