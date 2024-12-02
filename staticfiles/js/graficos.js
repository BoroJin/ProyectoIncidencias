// Leer los datos JSON desde el script
let incidenciaCounts = [];
try {
    const rawData = document.getElementById('incidencia-data').textContent;
    incidenciaCounts = JSON.parse(rawData);
} catch (error) {
    console.error('Error al analizar los datos de incidencias:', error);
}

// Definir etiquetas y datos
const categorias = incidenciaCounts.length > 0 
    ? incidenciaCounts.map(item => item.categoria) 
    : ['Gestor Territorial', 'Director', 'Departamento de Obras', 'Resolutor'];

const counts = incidenciaCounts.length > 0 
    ? incidenciaCounts.map(item => item.count) 
    : [0, 0, 0, 0];

// Crear el gráfico
const ctx = document.getElementById('incidenciasChart').getContext('2d');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: categorias,
        datasets: [{
            label: 'Número de Incidencias',
            data: counts,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Distribución de Incidencias Activas por Categoría'
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.dataset.label}: ${context.raw}`;
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Categorías'
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Cantidad de Incidencias'
                }
            }
        }
    }
});