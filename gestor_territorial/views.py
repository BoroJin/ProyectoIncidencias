import json
from django.core.serializers import serialize
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.template.loader import render_to_string
from .models import Incidencia, Respuesta
from director.models import Formulario
from django.views.decorators.csrf import csrf_exempt

def ver_gestor(request):
    return render(request, 'gestor_territorial/gestor_territorial.html')

def ver_listaIncidencias(request):
    estados_filtrados = ['iniciada', 'rechazada', 'aprobada', 'asignada', 'inconclusa', 'finalizada']
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

    latitud = request.POST.get('lat')
    longitud = request.POST.get('lng')

    try:
        formulario = Formulario.objects.get(activo=True)
    except Formulario.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'Formulario no encontrado'}, status=404)

    try:
        lat = float(latitud)
        lng = float(longitud)
    except ValueError:
        return JsonResponse({'status': 'error', 'message': 'Coordenadas inválidas'}, status=400)

    incidencia = Incidencia.objects.create(
        latitud=lat, 
        longitud=lng, 
        estado='iniciada'
    )
    
    # Procesar las respuestas del formulario
    for campo in formulario.campos.all():
        valor_campo = request.POST.get(str(campo.id), '')
        if campo.tipo in ['checkbox', 'select']:
            opciones_seleccionadas = [opcion.valor for opcion in campo.opciones.all() if request.POST.get(f"{campo.id}_{opcion.valor}")]
            valor_campo = ', '.join(opciones_seleccionadas)
        Respuesta.objects.create(incidencia=incidencia, campo=campo, valor=valor_campo)

    return redirect('ver_gestor')
