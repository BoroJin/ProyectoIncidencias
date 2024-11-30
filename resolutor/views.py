# views.py --> resolutor
from django.shortcuts import render, redirect
import uuid
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from administrador.models import Usuario #, RegistroAsignacion, Notificacion
from gestor_territorial.models import Incidencia
from django.http import JsonResponse
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.utils import timezone

from django.utils.dateformat import format
import json


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
    user_id = request.COOKIES.get('user_id')
    user_name = request.COOKIES.get('user_name')

    print(user_id)
    incidencias = getIncidenciasAsigandas()
    return render(request, 'resolutor/dashboard_resolutor.html', {'incidencias': incidencias, 'user_name': user_name})


def crear_registro_y_responder(request):
    if request.method == 'POST':
        # Datos que deben enviarse a la vista `crear_registro_auditoria`
        data_para_auditoria = {
            'usuario_id': request.COOKIES.get('user_id'),
            
            'incidencia_id': request.POST.get('incidencia_id'),
            'estado_anterior': request.POST.get('estado_anterior'),
            'estado_actual': request.POST.get('estado_actual'),
            'comentario': request.POST.get('comentario', ''),
        }
        
        # Construir un objeto simulado `request` para pasar a la vista original
        class MockRequest:
            def __init__(self, data):
                self.method = 'POST'
                self.POST = data
        
        mock_request = MockRequest(data_para_auditoria)

        # Llamar a `crear_registro_auditoria` y capturar su respuesta
        response = crear_registro_auditoria(mock_request)

        # Devolver la respuesta original o personalizarla
        if response.status_code == 201:
            return JsonResponse({
                'message': 'Registro y respuesta procesados correctamente',
                'registro': response.json()
            })
        else:
            return JsonResponse({
                'error': 'Ocurrió un problema al crear el registro',
                'detalle': response.json()
            }, status=response.status_code)

    return JsonResponse({'error': 'Método no permitido'}, status=405)
