Por que obtengo Not Found: /gestor_territorial/lista_incidencias/eliminarIncidencia/
solucionalo : 
# js
document.addEventListener('DOMContentLoaded', () => {
    const modal = new bootstrap.Modal(document.getElementById('modalComentario'));
    let incidenciaId;

    // Verificar si el token CSRF existe
    const csrftokenElement = document.querySelector('[name=csrfmiddlewaretoken]');
    if (!csrftokenElement) {
        console.error("No se encontró el token CSRF en el DOM.");
        return; // Detener la ejecución si no hay token CSRF
    }
    const csrftoken = csrftokenElement.value;

    // Abrir modal al hacer clic en "Agregar comentario"
    document.querySelectorAll('.btn-comentario').forEach(button => {
        button.addEventListener('click', () => {
            // Usar el data-id del botón para obtener el ID de la incidencia
            incidenciaId = button.getAttribute('data-id');
            document.getElementById('incidenciaId').value = incidenciaId; // Poner el ID en el campo oculto
            modal.show(); // Mostrar el modal
        });
    });

    // Guardar el comentario al hacer clic en "Guardar"
    document.getElementById('eliminarIncidencia').addEventListener('click', () => {
        const comentario = document.getElementById('comentarioTexto').value;

        fetch('/gestor_territorial/lista_incidencias/eliminarIncidencia/', {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrftoken,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                incidencia_id: incidenciaId,
                comentario: comentario,
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Respuesta del servidor:", data);
            if (data.success) {
                alert('Comentario agregado correctamente.');
                modal.hide();
                document.getElementById(`incidencia-${incidenciaId}`).classList.add('table-success');
            } else {
                alert(`Error al agregar el comentario: ${data.error}`);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ocurrió un error al procesar la solicitud.');
        });
    });
});

# html
{% load static %}
<!DOCTYPE html>
<html lang="es"></html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token }}">
    <title>Lista de Incidencias</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="{% static 'gestor_territorial/css/style_lista_incidencias_gt.css' %}">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"></script>
</head>
<body>

    <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container-fluid">
            <div class="logo-container">
                <img src="https://cdn-icons-png.flaticon.com/512/2228/2228497.png" alt="Logo Municipalidad" class="logo">
                <a class="navbar-brand" href="#">Municipalidad X</a>
            </div>
            <div class="ms-auto d-flex align-items-center">
                <a class="navbar-text" href="#">User name</a>
                <div class="user-container">
                    <img src="https://cdn-icons-png.flaticon.com/512/456/456212.png" alt="Icono Usuario" class="user-icon">
                </div>
            </div>
        </div>
    </nav>

    <div class="container-fluid">
        <div class="row">
            <!-- Sidebar -->
            <div class="col-md-3 col-lg-2 sidebar p-3">
                <a class="nav-link" href="{% url 'ver_gestor' %}">Inicio</a>
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="nav-sel" href="{% url 'lista_incidencias' %}">Lista de Incidencias rechazadas</a>
                    </li>
                </ul>
            </div>
    
            <div class="col-md-9 col-lg-10 p-4">
                <!-- Espacio de búsqueda (solo como vista) -->
                <div class="row mb-3">
                    <div class="col-md-6">
                        <input type="text" class="form-control" id="buscarIncidencia" placeholder="Buscar incidencia...">
                    </div>
                </div>
    
                <!-- Tabla de incidencias -->
                <div class="row">
                    <div class="col-12">
                        <div class="card mb-4">
                            <div class="card-header d-flex justify-content-between align-items-center">
                                <span>Lista de Incidencias rechazadas</span>
                            </div>
    
                            <div class="card-body">
                                <div id="tableView">
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">ID</th>
                                                <th scope="col">Nombre de Incidencia</th>
                                                <th scope="col">Estado</th>
                                                <th scope="col">Tipo</th>
                                                <th scope="col">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {% for incidencia in incidencias %}
                                            <tr id="incidencia-{{ incidencia.id }}">
                                                <td>{{ incidencia.id }}</td>
                                                <td>{{ incidencia.titulo_Incidencia }}</td>
                                                <td>{{ incidencia.estado }}</td>
                                                <td>{{ incidencia.tipo }}</td>
                                                <td>
                                                    <button class="btn btn-sm btn-detalle" data-id="{{ incidencia.id }}">Ver detalles</button>
                                                    <script type="text/javascript">
                                                        console.log("ID de incidencia: {{ incidencia.id }}"); //  verificar que se está imprimiendo el valor correcto
                                                    </script>
                                                    <button class="btn btn-sm btn-comentario"data-id="{{ incidencia.id }}">Agregar comentario</button>
                                                </td>
                                            </tr>
                                            {% endfor %}
                                        </tbody>
                                    </table>
                                </div>
                                <!-- Modal para agregar comentarios -->
                                <div class="modal" id="modalComentario" tabindex="-1" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title">Agregar Comentario</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <form id="formComentario" method="POST">
                                                    {% csrf_token %}
                                                    <input type="hidden" id="incidenciaId">
                                                    <div class="mb-3">
                                                        <textarea id="comentarioTexto" class="form-control" rows="4" placeholder="Escribe tu comentario aquí"></textarea>
                                                    </div>
                                                </form>
                                            </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                            <button type="button" class="btn btn-primary" id="eliminarIncidencia">Eliminar incidencia</button>
                                            <button type="button" class="btn btn-primary" id="guardarComentario">Reenviar incidencia</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                <!-- Modal de Detalles -->
                                <div class="modal fade" id="modalDetalles" tabindex="-1" aria-labelledby="modalDetallesLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                        <h5 class="modal-title" id="modalDetallesLabel">Detalles de la Incidencia</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                        <p><strong>ID:</strong> <span id="detallesId"></span></p>
                                        <p><strong>Título:</strong> <span id="detallesTitulo"></span></p>
                                        <p><strong>Estado:</strong> <span id="detallesEstado"></span></p>
                                        <p><strong>Tipo:</strong> <span id="detallesTipo"></span></p>
                                        <p><strong>Urgencia:</strong> <span id="detallesUrgencia"></span></p>
                                        <p><strong>Fecha de Reporte:</strong> <span id="detallesFechaReporte"></span></p>
                                        <p><strong>Descripción:</strong> <span id="detallesDescripcion"></span></p>
                                        <p><strong>Comentarios:</strong> <span id="detallesComentarios"></span></p>
                                        </div>
                                        <div class="modal-footer">
                                        <button type="button" class="btn custom-button1" data-bs-dismiss="modal">Cerrar</button>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <!-- Contenedor de tarjetas -->
                                <div id="cardView" style="display: none;">
                                    <div id="incidenciasContainer" class="row">
                                        <!-- Aquí se cargarán las tarjetas -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <a href="#" class="btn btn-float">
        <img src="https://cdn-icons-png.freepik.com/512/2593/2593342.png" alt="Ícono" class="icono-btn"> Soporte técnico
    </a>
     
    <!-- Pasar las incidencias a JavaScript -->
    <script type="text/javascript">
        const incidenciasData = JSON.parse('{{ incidencias|escapejs }}');
        console.log(incidenciasData);  // Verifica si los datos son correctos
    </script>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    <script src="{% static 'gestor_territorial/js/comentarios.js' %}"></script>
    <script src="{% static 'gestor_territorial/js/incidencias.js' %}"></script>
</body>
</html>

# views
import json
from django.core.serializers import serialize
from django.http import JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.template.loader import render_to_string
from .models import Incidencia, Respuesta
from director.models import Formulario
from django.views.decorators.csrf import csrf_exempt
from administrador.models import RegistroAuditoria
from resolutor.views import crear_registro

def ver_gestor(request):
    estados_filtrados = ['finalizada']
    incidencias = Incidencia.objects.filter(estado__in=estados_filtrados).order_by('-fecha_Reporte')
    global user_id, user_name
    user_id = request.COOKIES.get('user_id')
    user_name = request.COOKIES.get('user_name')


    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':  # Verificar si es una solicitud AJAX
        data = serialize('json', incidencias)  # Serializar los datos
        return JsonResponse({'status': 'success', 'incidencias': data})

    return render(request, 'gestor_territorial/gestor_territorial.html', {'incidencias': incidencias, 'user_name': user_name,})

def ver_listaIncidencias(request):
    estados_filtrados = ['rechazada']
    incidencias = Incidencia.objects.filter(estado__in=estados_filtrados).order_by('-fecha_Reporte')

    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':  # Verificar si es una solicitud AJAX
        data = serialize('json', incidencias)  # Serializar los datos
        return JsonResponse({'status': 'success', 'incidencias': data})

    return render(request, 'gestor_territorial/lista_incidencias.html', {'incidencias': incidencias})

def mostrar_formulario(request):
    try:
        formulario = Formulario.objects.get(activo=True)
        campos = formulario.campos.all()

    except Formulario.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'Formulario no encontrado'}, status=404)

    # Renderizar los campos del formulario como HTML
    formulario_html = render_to_string('gestor_territorial/partials/formulario.html', {
        'formulario': formulario,
        'campos': campos,
        'latitud': request.GET.get('lat'),
        'longitud': request.GET.get('lng')
    })

    return JsonResponse({'status': 'success', 'formulario_html': formulario_html})

@csrf_exempt
def crear_incidencia(request):
    if request.method != 'POST':
        return JsonResponse({'status': 'error', 'message': 'Método no permitido'}, status=405)

    # Capturar coordenadas
    latitud = request.POST.get('lat')
    longitud = request.POST.get('lng')

    # Capturar los campos fijos del formulario
    titulo = request.POST.get('titulo')
    descripcion = request.POST.get('descripcion')
    urgencia = request.POST.get('urgencia', 'media')  # Default a 'media' si no se proporciona

    # Validar coordenadas
    try:
        lat = float(latitud)
        lng = float(longitud)
    except (ValueError, TypeError):
        return JsonResponse({'status': 'error', 'message': 'Coordenadas inválidas'}, status=400)
    
    # Crear la incidencia
    incidencia = Incidencia.objects.create(
        titulo_Incidencia=titulo or 'Sin título',
        descripcion=descripcion or 'Sin descripción',
        urgencia=urgencia,
        latitud=lat,
        longitud=lng,
        estado='iniciada'
    )
    user_id = request.COOKIES.get('user_id')
    crear_registro(incidencia.id,"inexistente","iniciada","Incidencia iniciada y creada",user_id)
    # Procesar las respuestas dinámicas del formulario
    formulario = Formulario.objects.filter(activo=True).first()
    if formulario:
        for campo in formulario.campos.all():
            valor_campo = request.POST.get(str(campo.id), '')
            if campo.tipo in ['checkbox', 'select']:
                opciones_seleccionadas = [opcion.valor for opcion in campo.opciones.all() if request.POST.get(f"{campo.id}_{opcion.valor}")]
                valor_campo = ', '.join(opciones_seleccionadas)
            Respuesta.objects.create(incidencia=incidencia, campo=campo, valor=valor_campo)

    return redirect('ver_gestor')
    

def agregar_comentario(request):
    if request.method == 'POST':
        incidencia_id = request.POST.get('incidencia_id')
        comentario = request.POST.get('comentario')

        if not incidencia_id or not comentario:
            return JsonResponse({'success': False, 'error': 'Datos incompletos'})

        try:
            incidencia = Incidencia.objects.get(id=incidencia_id)
            if incidencia.comentarios:
                incidencia.comentarios += f"\n{comentario}"
            else:
                incidencia.comentarios = comentario
            incidencia.save()

            return JsonResponse({'success': True})
        except Incidencia.DoesNotExist:
            return JsonResponse({'success': False, 'error': 'Incidencia no encontrada'})
    else:
        return JsonResponse({'success': False, 'error': 'Método no permitido'})   

def eliminarIncidencia(request):
    user_id = request.COOKIES.get('user_id')
    if request.method == 'POST':
        incidencia_id = request.POST.get('incidencia_id')
        comentario = request.POST.get('comentario', '')
        crear_registro(incidencia_id,"rechazada","eliminada",comentario,user_id)
        try:
            incidencia = Incidencia.objects.get(id=incidencia_id)
            incidencia.estado = "eliminada"


            incidencia.save()
            return JsonResponse({'success': True})
        except Incidencia.DoesNotExist:
            return JsonResponse({'success': False, 'error': 'Incidencia no encontrada'})

    return JsonResponse({'success': False, 'error': 'Método no permitido'})

def obtener_incidencia(request, incidencia_id):
    ultimo_registro = RegistroAuditoria.objects.filter(
    idIncidencia=incidencia_id,  # Filtrar por ID de incidencia
    estado_anterior='iniciada',   # Estado anterior "iniciada"
    estado_actual='rechazada'    # Estado actual "rechazada"
).order_by('-fecha_cambio').first()
    try:
        incidencia = Incidencia.objects.get(id=incidencia_id)
        data = {
            'id': incidencia.id,
            'titulo_Incidencia': incidencia.titulo_Incidencia,
            'estado': incidencia.estado,
            'tipo': incidencia.tipo,
            'urgencia': incidencia.urgencia,
            'fecha_Reporte': incidencia.fecha_Reporte.isoformat(),
            'descripcion': incidencia.descripcion,
            'comentarios': ultimo_registro.comentario,
        }
        return JsonResponse(data)
    except Incidencia.DoesNotExist:
        return JsonResponse({'error': 'Incidencia no encontrada'}, status=404)
# urls
ur
from django.urls import path
from . import views  # Importa las vistas de tu aplicación

urlpatterns = [
    path('', views.ver_gestor, name='ver_gestor'),
    path('lista_incidencias/', views.ver_listaIncidencias, name='lista_incidencias'),
    path('mostrar_formulario/', views.mostrar_formulario, name='mostrar_formulario'),
    path('crear_incidencia/', views.crear_incidencia, name='crear_incidencia'),
    path('lista_incidencias/agregar_comentario/', views.agregar_comentario, name='agregar_comentario'),
    path('eliminarIncidencia/', views.eliminarIncidencia, name='eliminarIncidencia'),
    path('lista_incidencias/obtener_incidencia/<int:incidencia_id>/', views.obtener_incidencia, name='obtener_incidencia'),
    path('obtener_incidencia/<int:incidencia_id>/', views.obtener_incidencia, name='obtener_incidencia'),
]