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
             # Aquí rediriges a la URL de la vista que deseas
            return JsonResponse({'success': True})
        except Incidencia.DoesNotExist:
            return JsonResponse({'success': False, 'error': 'Incidencia no encontrada'})

    return JsonResponse({'success': False, 'error': 'Método no permitido'})

def reenviarIncidencia(request):
    user_id = request.COOKIES.get('user_id')
    if request.method == 'POST':
        incidencia_id = request.POST.get('incidencia_id')
        comentario = request.POST.get('comentario', '')
        crear_registro(incidencia_id,"rechazada","iniciada",comentario,user_id)
        try:
            incidencia = Incidencia.objects.get(id=incidencia_id)
            incidencia.estado = "iniciada"
            incidencia.save()
             # Aquí rediriges a la URL de la vista que deseas
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