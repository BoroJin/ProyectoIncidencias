Por favor, revisa detalladamente los dos archivos adjuntos: uno es un archivo HTML y el otro un archivo CSS. Ambos están diseñados para complementarse en un proyecto web. Quiero que verifiques lo siguiente:

Estructura y semántica del HTML:

Si se están utilizando correctamente las etiquetas semánticas.
Si hay redundancias o etiquetas innecesarias.
Optimización del CSS:

Si hay estilos duplicados o reglas no utilizadas.
Si hay propiedades que puedan ser combinadas o simplificadas.
Si hay oportunidades para usar variables CSS o mejorar la modularidad del archivo.
Complemento entre ambos archivos:

Si el HTML y el CSS están bien integrados (clases, IDs, y selectores alineados).
Si el diseño o comportamiento puede ser optimizado para mejorar el rendimiento o la claridad del código.
Proporciona sugerencias detalladas y, de ser posible, ejemplos de cómo implementar las mejoras recomendadas.

html : 
{% load static %}
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Registro de Auditoría</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">

    <!-- Leaflet CSS -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

    <!-- CSS personalizado -->
    <link rel="stylesheet" href="{% static 'css/registroAuditoria.css' %}">
</head>
<body>
    <!-- Barra de navegación superior -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div class="container-fluid">
            <a class="navbar-brand d-flex align-items-center" href="#">
                <img src="https://cdn-icons-png.flaticon.com/512/2228/2228497.png" alt="Logo Municipalidad" class="logo">
                <span class="ms-2">Municipalidad</span>
            </a>
            <div class="d-flex align-items-center ms-auto">
                <span class="navbar-text">{{ user_name }}</span>
                <img src="https://cdn-icons-png.flaticon.com/512/456/456212.png" alt="Icono Usuario" class="user-icon">
            </div>
        </div>
    </nav>

    <!-- Barra lateral -->
    <div class="col-md-3 col-lg-2 sidebar p-3 fixed-top" id="barraLateral">
        <a class="nav-sel" href="#">Inicio</a>
    </div>

    <!-- Contenido principal -->
    <div class="container-fluid" id="contenidoPrincipal" style="margin-top: 80px;">
        <div class="row">
            <div class=" ms-sm-auto col-lg-10 px-md-4">

                <!-- Incidencias -->
                <div class="row">
                    <!-- Lista de incidencias -->
                    <div class="">
                        <div class="card mb-3">
                            <div class="card-header">Lista de Incidencias</div>
                            <div class="table-responsive card-body">
                                <table class="table table-hover table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Título</th>
                                            <th>Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {% for incidencia in page_obj %}
                                        <tr class="incidencia-row" data-incidencia-id="{{ incidencia.id }}">
                                            <td>{{ incidencia.id }}</td>
                                            <td>{{ incidencia.titulo_Incidencia }}</td>
                                            <td>{{ incidencia.get_estado_display }}</td>
                                        </tr>
                                        {% empty %}
                                        <tr>
                                            <td colspan="3">No hay incidencias disponibles.</td>
                                        </tr>
                                        {% endfor %}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Botón flotante -->
    <a href="#" class="btn btn-float">
        <img src="https://cdn-icons-png.freepik.com/512/2593/2593342.png" alt="Ícono" class="icono-btn"> Soporte técnico
    </a>
<!-- Modal para mostrar registros de auditoría -->
<div class="modal fade" id="registrosModal" tabindex="-1" aria-labelledby="registrosModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="registrosModalLabel">Historial de Cambios - Incidencia <span id="incidenciaIdModal"></span></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
        </div>
        <div class="modal-body">
          <!-- Línea de tiempo del historial de cambios -->
          <ul class="timeline" id="timelineContainer">
              <!-- Contenido dinámico -->
          </ul>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Leaflet JS -->
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <!-- JS personalizado -->
    <script src="{% static 'js/registroAuditoria.js' %}"></script>

</body>
</html>

css :

body {
    font-family: Serif;
    margin: 0;
    padding: 0;
    background-color: #c4def862;
}















.navbar { /* Solo barra superior*/
    background: linear-gradient(90deg, #1f3449, #315579); 
    color: white;
    padding: 10px 20px;
}

.navbar-brand { /*Logo y nombre*/
    font-size: 1.5rem;
    font-weight: bold;
    color: #c1c8cfdc;
    text-decoration: none;
}

.navbar-text {
    color: #c1c8cfdc;
    text-decoration: none;
}

.logo-container {
    display: flex;
    align-items: center;
}

.logo {
    width: 40px;
    height: 40px;
    margin-right: 10px;
}

.user-container {
    display: flex;
    align-items: center;
}

.user-container p {
    margin-right: 10px;
}

.user-icon {
    height: 30px;
    width: 30px;
}

.btn-float {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease;
    background-color: #315579dc;
    position: fixed;
    color: #fffafa;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
}
.btn-float:hover {
    transform: scale(1.1);
}

.icono-btn {
    width: 30px;
    height: 30px;
    margin-right: 8px;
    vertical-align: middle;
}

.sidebar {
    background-color: #b0ceeca4;
    height: 100vh;
    position: fixed;
    
}

.sidebar .nav-link {
    font-size: 1.1rem;
    font-weight: bold;
    color: #202d3a;

    display: block;
    border-bottom: 1px solid #2c3e50;
    transition: background-color 0.3s ease;
}

.sidebar .nav-sel {
    background-color: #b0ceec;
    font-size: 1.1rem;
    font-weight: bold;
    text-decoration: none;
    color: #202d3a;
    padding: 10px 20px;
    display: block;
    border-bottom: 1px solid #2c3e50;
    transition: background-color 0.3s ease;
}

.sidebar .nav-link:hover {
    background-color: #b0ceec;
}

/*#mapa {
    height: 500px;
    position: relative;
    z-index: 1;
    width: 100%;
    height: 300px;
}*/

#buttons { 
    color: white;
    border: none;
    margin-top: 10px; 
    display: none;
    justify-content: flex-end;
    gap: 10px;
}

.custom-button1 {
    background-color: #315579dc;
    color: white;
    border: none;
    border-radius: 6px;
    text-align: center;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease;
}

.custom-button1:hover {
    background-color: #3a5368;
}

.custom-button2 {
    background-color:#b0ceec;
    color: #315579;
    border: none;
    border-radius: 6px;
    text-align: center;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease;
}

.custom-button2:hover {
    background-color: #b0ceec7e;
}

.card-header {
    background-color: #c4def86e;
    font-weight: bold;
    color: #202d3a;
}

.card-body img {
    border-radius: 10px;
}

.card-body ul {
    list-style-type: none;
    padding-left: 0;
}

.card-body ul li {
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
}

.card-body ul li:last-child {
    border-bottom: none;
}

.card {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    

}

.popup {
    display: none;
    position: fixed;
    z-index: 2;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.popup-contenido {
    background-color: #fff;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 400px;
    text-align: center;
}

.cerrar {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}

.cerrar:hover,
.cerrar:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
}

.btn-custom {
    background-color: #315579dc;
    color: white;
}

.btn-custom:hover {
    background-color: #315579;
}
#contenidoPrincipal{
    margin-top: 90px;
}
#barraLateral{
    margin-top: 70px;
}
.timeline {
    position: relative;
    margin: 20px 0;
    padding: 0;
    list-style: none;
}
.timeline li {
    margin-bottom: 15px;
}

.timeline::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 4px;
    background: #e9ecef;
    left: 20px;
    margin: 0;
    border-radius: 2px;
}

.timeline-item {
    position: relative;
    margin-bottom: 20px;
    padding-left: 50px;
}

.timeline-item::before {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #fff;
    border: 4px solid #0d6efd;
    left: 14px;
    top: 0;
}

.timeline-item .timeline-date {
    font-size: 0.9em;
    color: #6c757d;
}

.timeline-item .timeline-content {
    padding: 0.5em 1em;
    background: #f8f9fa;
    border-radius: 0.25rem;
}
.list-group-item {
    cursor: pointer;
    transition: background-color 0.2s;
}
.list-group-item:hover {
    background-color: #f1f1f1;
}
.pagination {
    justify-content: center;
}
.table {
    border: 1px solid #ddd;
    border-radius: 5px;
}

.table-hover tbody tr:hover {
    background-color: #f1f1f1;
}