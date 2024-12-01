from django.shortcuts import render
import uuid
from administrador.models import Usuario
from Dobras.models import RegistroAsignacion, Notificaciones
from gestor_territorial.models import Incidencia
from django.http import JsonResponse
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.utils import timezone

from django.utils.dateformat import format
import json

def getMiId():
    # Esta información la obtendremos del módulo login (No está listo aún)
    # Por el momento usaremos una constante
    gestor_id = 5

        # Obtener los IDs de las primeras dos incidencias sin asignar un gestor
    #ids_a_modificar = Incidencia.objects.filter(resolutor_Asignado__isnull=True).values_list('id', flat=True)[:2]
    #Incidencia.objects.filter(id__in=ids_a_modificar).update(resolutor_Asignado=gestor_id)

    return gestor_id

def getIncidenciasAsigandas():
    miId = getMiId() #Obtiene mi id
    incidencias = Incidencia.objects.filter(resolutor_Asignado=miId)
    return incidencias # false si no hay asignaciones

def guardar_incidencia(request):
    if request.method == 'POST':
        incidencia_id = request.POST.get('id')  # Obtiene el ID de la incidencia
        estado = request.POST.get('estado')  # Obtiene el estado de la incidencia
        razon = request.POST.get('razon', '') if estado == 'inconcluso' else ''  # Obtiene la razón si es "inconcluso"
        archivo = request.FILES.get('archivo') if estado == 'finalizado' else None  # Solo acepta archivo si el estado es "finalizado"
        ruta_archivo = None

        try:
            # Busca la incidencia por su ID
            incidencia = Incidencia.objects.get(id=incidencia_id)

            # Actualiza el estado de la incidencia
            incidencia.estado = estado

            # Si el estado es "finalizado" y hay un archivo, guárdalo en el servidor
            comentario = "Archivo subido al servidor" if estado == 'finalizado' else ""
            if estado == 'finalizado' and archivo:
                id_unico = str(uuid.uuid4())
                ruta_archivo = f'incidencias/adjuntos/{id_unico}_{archivo.name}'
                default_storage.save(ruta_archivo, ContentFile(archivo.read()))
                incidencia.direccion_multimedia = ruta_archivo  # Actualiza la ruta en la incidencia
            elif estado == 'inconcluso' and razon:
                # Si el estado es "inconcluso", usa la razón como comentario
                comentario = razon

            # Guarda los cambios en la incidencia
            incidencia.save()

            # Crea un nuevo registro en RegistroAsignacion
            RegistroAsignacion.objects.create(
                idUsuario=request.user,  # Usuario actual como referencia de quién hizo el cambio
                idIncidencia=incidencia,
                fechaAsignacion=timezone.now(),
                estado=estado,
                comentario=comentario
            )

            # Retorna la información del archivo y el estado en la respuesta JSON
            return JsonResponse({
                'status': 'success',
                'ruta_archivo': incidencia.direccion_multimedia,
                'id': incidencia.id,
                'estado': incidencia.estado,
                'razon': razon
            })
        except Incidencia.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Incidencia no encontrada'}, status=404)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    else:
        return JsonResponse({'status': 'error', 'message': 'Método no permitido'}, status=405)
    
def dashboard_resolutor(request):
    incidencias = getIncidenciasAsigandas()
    return render(request, 'resolutor/dashboard_resolutor.html', {'incidencias': incidencias})

def get_notificaciones(request):
    mi_id = getMiId()  # Obtiene el ID del usuario actual
    incidencias_asignadas = getIncidenciasAsigandas()
    incidencias_ids = [incidencia.id for incidencia in incidencias_asignadas]

    # Filtrar todas las notificaciones
    notificaciones = Notificaciones.objects.filter(
        idUsuario=mi_id
    ).union(
        Notificaciones.objects.filter(
            incidenciaId__in=incidencias_ids
        )
    )

    # Serializar las notificaciones para enviarlas en JSON
    data = [
        {
            'id': notificacion.idNotificacion,
            'titulo': notificacion.titulo,
            'descripcion': notificacion.descripcion,
            'incidenciaId': notificacion.incidenciaId.id if notificacion.incidenciaId else None,
            'fecha_creacion': format(notificacion.fecha_creacion, 'Y-m-d H:i:s'),
            'is_read': notificacion.estado_lectura
        }
        for notificacion in notificaciones
    ]

    return JsonResponse({'notificaciones': data})

def get_notificaciones_no_leidas(request):
    mi_id = getMiId()
    incidencias_asignadas = getIncidenciasAsigandas()
    incidencias_ids = [incidencia.id for incidencia in incidencias_asignadas]

    # Filtrar notificaciones no leídas
    notificaciones_no_leidas = Notificaciones.objects.filter(
        estado_lectura=False,
        idUsuario=mi_id
    ).union(
        Notificaciones.objects.filter(
            incidenciaId__in=incidencias_ids,
            estado_lectura=False
        )
    )

    data = [
        {
            'id': notificacion.idNotificacion,
            'titulo': notificacion.titulo,
            'descripcion': notificacion.descripcion,
            'incidenciaId': notificacion.incidenciaId.id if notificacion.incidenciaId else None,
            'fecha_creacion': format(notificacion.fecha_creacion, 'Y-m-d H:i:s'),
            'is_read': notificacion.estado_lectura
        }
        for notificacion in notificaciones_no_leidas
    ]

    return JsonResponse({'notificaciones': data})

def get_notificaciones_leidas(request):
    mi_id = getMiId()
    incidencias_asignadas = getIncidenciasAsigandas()
    incidencias_ids = [incidencia.id for incidencia in incidencias_asignadas]

    # Filtrar notificaciones leídas
    notificaciones_leidas = Notificaciones.objects.filter(
        estado_lectura=True,
        idUsuario=mi_id
    ).union(
        Notificaciones.objects.filter(
            incidenciaId__in=incidencias_ids,
            estado_lectura=True
        )
    )

    data = [
        {
            'id': notificacion.idNotificacion,
            'titulo': notificacion.titulo,
            'descripcion': notificacion.descripcion,
            'incidenciaId': notificacion.incidenciaId.id if notificacion.incidenciaId else None,
            'fecha_creacion': format(notificacion.fecha_creacion, 'Y-m-d H:i:s'),
            'is_read': notificacion.estado_lectura
        }
        for notificacion in notificaciones_leidas
    ]

    return JsonResponse({'notificaciones': data})

def mark_as_read(request):
    data = json.loads(request.body)
    notification_ids = data.get('notification_ids', [])

    # Filtra las notificaciones por ID y usuario actual y marca como leídas
    Notificaciones.objects.filter(idNotificacion__in=notification_ids, idUsuario=request.user).update(estado_lectura=True)
    
    return JsonResponse({'status': 'success'})