import json
from django.core.serializers import serialize
from django.http import JsonResponse
from django.shortcuts import render, redirect
from .models import Incidencia, Respuesta
from director.models import Formulario

def home(request):
    estados_filtrados = ['iniciada', 'rechazada', 'aprobada', 'asignada', 'inconclusa', 'finalizada']
    incidencias = Incidencia.objects.filter(estado__in=estados_filtrados).order_by('-fecha_Reporte')
    incidencias_json = serialize('json', incidencias)
    return render(request, 'home.html', {'incidencias_json': incidencias_json})

# Vista para mostrar el formulario con las coordenadas
def mostrar_formulario(request):
    # Cargar formulario activo
    try:
        formulario = Formulario.objects.get(activo=True)
        campos = formulario.campos.all()
    except Formulario.DoesNotExist:
        formulario = None
        campos = []

    # Obtener coordenadas desde parámetros GET
    latitud = request.GET.get('lat')
    longitud = request.GET.get('lng')

    return render(request, 'mostrar_formulario.html', {
        'formulario': formulario,
        'campos': campos,
        'latitud': latitud,
        'longitud': longitud
    })

# Vista para procesar el formulario y crear la incidencia
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

    # Crea la incidencia con el estado "iniciada"
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

    # Redirigir al inicio
    return redirect('home')

