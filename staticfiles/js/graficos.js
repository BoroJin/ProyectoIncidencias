// Leer los datos JSON desde el script para incidencias
let incidenciaCounts = [];
try {
    const rawData = document.getElementById('incidencia-data').textContent;
    incidenciaCounts = JSON.parse(rawData);
} catch (error) {
    console.error('Error al analizar los datos de incidencias:', error);
}

// Definir etiquetas y datos para el gráfico de incidencias
const categorias = incidenciaCounts.length > 0 
    ? incidenciaCounts.map(item => item.categoria) 
    : ['Gestor Territorial', 'Director', 'Departamento de Obras', 'Resolutor'];

const counts = incidenciaCounts.length > 0 
    ? incidenciaCounts.map(item => item.count) 
    : [0, 0, 0, 0];

// Crear el gráfico de incidencias
const ctxIncidencias = document.getElementById('incidenciasChart').getContext('2d');
new Chart(ctxIncidencias, {
    type: 'bar',
    data: {
        labels: categorias,
        datasets: [{
            label: 'Cantidad de Incidencias',
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
                text: 'Distribución de Incidencias Activas por Área'
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
                    text: 'Áreas'
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

// Leer los datos de incidencias inconclusas (tiempo en manos del Departamento de Obras)
let incidenciasConTiempo = [];
try {
    const rawDataTiempo = document.getElementById('incidencias-con-tiempo').textContent;
    incidenciasConTiempo = JSON.parse(rawDataTiempo);
} catch (error) {
    console.error('Error al analizar los datos de tiempos de incidencias:', error);
}

// Si la lista de tiempos está vacía, manejarlo apropiadamente


// Filtrar solo las incidencias que están "en manos del Departamento de Obras" (estado inconcluso)
let tiemposDepartamentoObras = incidenciasConTiempo.filter(item => item.estado === 'inconclusa')
                                                 .map(item => item.tiempo_en_manos_departamento_obras); 



// Crear el gráfico de histogramas para tiempos de incidencias en manos del Departamento de Obras
const ctxTiempos = document.getElementById('histogramaTiempos').getContext('2d');
new Chart(ctxTiempos, {
    type: 'bar',
    data: {
        labels: tiemposDepartamentoObras.length > 0 
            ? tiemposDepartamentoObras.map((_, index) => `Incidencia ${index + 1}`)
            : ['Incidencia 1'],
        datasets: [{
            label: 'Tiempo en Manos del Departamento de Obras (horas)',
            data: tiemposDepartamentoObras,  // Datos de tiempo de incidencias inconclusas
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Tiempo en Manos del Departamento de Obras para Incidencias Inconclusas'
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return `Tiempo: ${tooltipItem.raw} horas`;
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Incidencias'
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Tiempo en horas'
                }
            }
        }
    }
});