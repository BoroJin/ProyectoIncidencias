from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.utils import timezone
from .models import Campo, Opcion, Formulario
from gestor_territorial.models import Incidencia
from gestor_territorial.views import crear_registro
from cuenta.models import Usuario
#from administrador.models import registroAuditoria
import folium
from django.http import JsonResponse, Http404
from administrador.models import RegistroAuditoria
import json


def asignarUsuario(request):
    if request.method == 'POST':
        try:
            # Obtener los datos del cuerpo de la solicitud
            data = json.loads(request.body)  # Cargar los datos JSON enviados
            id_asignar = data.get('ID_asignar')
            usuario_id = data.get('usuario_id')

            # Verificar que los datos no sean None o vacíos
            if not id_asignar or not usuario_id:
                return JsonResponse({'error': 'Faltan datos'}, status=400)

            # Intentar convertir los datos a enteros
            try:
                id_asignar = int(id_asignar)
                usuario_id = int(usuario_id)
            except ValueError:
                return JsonResponse({'error': 'ID_asignar y usuario_id deben ser números enteros'}, status=400)

            # Buscar la incidencia
            try:
                incidencia = Incidencia.objects.get(id=id_asignar)
            except Incidencia.DoesNotExist:
                return JsonResponse({'error': 'Incidencia no encontrada'}, status=404)

            # Actualizar la incidencia
            crear_registro(id_asignar,incidencia.estado,'asignada',"La incidencia se ha asignado",user_id)
            incidencia.id_usuario_departamento = usuario_id
            incidencia.estado = 'asignada'
            incidencia.save()

            return JsonResponse({'message': 'Usuario asignado correctamente'})

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Error al procesar JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    
    return JsonResponse({'error': 'Método no permitido'}, status=405)


def deshacerAsignacion(request,id):
    user_id = request.COOKIES.get('user_id')

    incidencia = Incidencia.objects.get(id=id)

    crear_registro(id,incidencia.estado,'iniciada',"Se deshizo la asignacion",user_id)

    incidencia.id_usuario_departamento = None
    incidencia.estado = 'iniciada'
    incidencia.save()

    return redirect('director:dashboard')


def rechazarIncidencia(request):

    id_incidencia = request.POST.get('ID_rechazo')
    justificacion = request.POST.get('justificacion')

    incidencia = Incidencia.objects.get(id=id_incidencia)
    crear_registro(id_incidencia,incidencia.estado,'rechazada',justificacion,user_id)
    incidencia.estado = 'rechazada'
    incidencia.resolutor_Asignado = None
    incidencia.save()
    return redirect('director:dashboard')


def eliminar_formulario(request, formulario_id):
    formulario = Formulario.objects.get(id=formulario_id)
    formulario.delete()
    return redirect('director:ver_formularios')

def crear_formulario(request):
    if request.method == 'POST':
        nombre = request.POST.get('nombre')
        descripcion = request.POST.get('descripcion', '')
        formulario = Formulario(nombre=nombre, descripcion=descripcion)
        formulario.save()
        return redirect('director:gestionar_campos', formulario_id=formulario.id)  # Redirige a la vista de gestión de campos
    return render(request, 'director/crear_formulario.html')

def gestionar_campos(request, formulario_id):
    formulario = Formulario.objects.get(id=formulario_id)
    campos = formulario.campos.all()
    if request.method == 'POST':
        if 'agregar' in request.POST:
            nombre = request.POST.get('nombre_campo')
            tipo = request.POST.get('tipo_campo')
            nuevo_campo = Campo.objects.create(formulario=formulario, nombre=nombre, tipo=tipo)
            
            # Procesar opciones solo si el campo es de tipo 'select' o 'checkbox'
            if tipo in ['select', 'checkbox']:
                opciones_nombres = request.POST.getlist('opcion_nombre[]')
                opciones_valores = request.POST.getlist('opcion_valor[]')
                for nombre_opcion, valor_opcion in zip(opciones_nombres, opciones_valores):
                    if nombre_opcion and valor_opcion:
                        Opcion.objects.create(campo=nuevo_campo, nombre=nombre_opcion, valor=valor_opcion)

        elif 'eliminar' in request.POST:
            campo_id = request.POST.get('campo_id')
            Campo.objects.get(id=campo_id).delete()
    
    return render(request, 'director/gestionar_campos.html', {'formulario': formulario, 'campos': campos})

def ver_formularios(request):
    formularios = Formulario.objects.all()
    return render(request, 'director/ver_formularios.html', {'formularios': formularios})

def activar_formulario(request, formulario_id):
    if request.method == 'POST':
        formulario = Formulario.objects.get(id=formulario_id)
        formulario.activo = True
        formulario.save()
        return redirect('director:ver_formularios')

from django.shortcuts import render
import folium

def dashboard(request):
    global user_id, user_name
    user_id = request.COOKIES.get('user_id')
    user_name = request.COOKIES.get('user_name')
    
    # Filtrar incidencias con estado 'iniciada' y optimizar consultas
    incidencias = Incidencia.objects.exclude(estado='rechazada')\
        .select_related()\
        .prefetch_related('registros_auditoria__idUsuario')
    
    usuarios_departamento = Usuario.objects.filter(rol='Departamento de obras')
    
    # Crear el mapa inicial centrado en una ubicación predeterminada
    initial_map = folium.Map(location=[-33.427656074857076, -70.61159044504167], zoom_start=9)

    # Añadir marcadores para cada incidencia y asignar el último comentario
    for incidencia in incidencias:
        if incidencia.latitud and incidencia.longitud:
            coordinates = (incidencia.latitud, incidencia.longitud)
            
            # Obtener el último registro de auditoría
            ultimo_registro = incidencia.registros_auditoria.order_by('-fecha_cambio').first()
            incidencia.ultimo_comentario = ultimo_registro.comentario if ultimo_registro else "Sin comentarios"
            
            # Agregar comentario al popup del mapa
            popup_content = f'''
                <b>Nombre:</b> {incidencia.titulo_Incidencia}<br>
                <b>Urgencia:</b> {incidencia.get_urgencia_display()}<br>
                <b>Estado:</b> {incidencia.get_estado_display()}<br>
                <b>Último comentario:</b> {incidencia.ultimo_comentario}
            '''
            folium.Marker(
                location=coordinates,
                popup=folium.Popup(popup_content, max_width=300),
                tooltip="Haz clic para más información"
            ).add_to(initial_map)

    # Renderizar la plantilla con el QuerySet de incidencias y el HTML del mapa
    context = {
        'user_name': user_name,
        'usuarios_departamento': usuarios_departamento,
        'incidencias': incidencias,  # Pasa las incidencias al template
        'map': initial_map._repr_html_(),  # Mapa convertido a HTML para insertar en el template
    }
    return render(request, 'director/dashboard.html', context)


def comentario_ultimo_registro(request, incidencia_id):
    incidencia = get_object_or_404(Incidencia, pk=incidencia_id)
    
    # Obtener el último registro de auditoría
    ultimo_registro = incidencia.registros_auditoria.select_related('idUsuario')\
                                                   .order_by('-fecha_cambio')\
                                                   .first()
    
    if ultimo_registro:
        # Solo enviar el comentario del último registro
        data = {
            'comentario': ultimo_registro.comentario,
        }
    else:
        # Si no hay registros
        data = {
            'comentario': None,
        }
    
    return JsonResponse(data)