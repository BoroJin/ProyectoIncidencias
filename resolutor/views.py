# views.py --> resolutor
from django.utils.timezone import now
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
from administrador.views import crear_registro_auditoria
from django.utils.dateformat import format
import json

def dashboard_resolutor(request):
    global user_id, user_name
    user_id = request.COOKIES.get('user_id')
    user_name = request.COOKIES.get('user_name')

    #print(user_id)
    incidencias = getIncidenciasAsigandas(request)
    incidencias_proceso=getIncidenciasProceso(request)
    return render(request, 'resolutor/dashboard_resolutor.html',
                    {'incidencias': incidencias,
                    'user_name': user_name,
                    "incidencias_en_proceso":incidencias_proceso})

def simular_creacion_incidencias(request):
    # Lista de ejemplos de datos simulados
    incidencias_simuladas = [
        {
            "titulo_Incidencia": "Simulacion de creacion 1",
            "estado": "iniciada",
            "urgencia": "alta",
            "descripcion": "Descripcion simulada 1",
            "latitud": -33.4489,
            "longitud": -70.6693,
        },
        {
            "titulo_Incidencia": "Simulacion de creacion 2",
            "estado": "iniciada",
            "urgencia": "media",
            "descripcion": "descripcion simulada 2",
            "latitud": -33.4578,
            "longitud": -70.6645,
        },
        {
            "titulo_Incidencia": "Simulacion de creacion 3",
            "estado": "iniciada",
            "urgencia": "alta",
            "descripcion": "descripcion simulada 3",
            "latitud": -33.4600,
            "longitud": -70.6620,
        },
    ]

    # Crear las incidencias simuladas
    for incidencia_data in incidencias_simuladas:
        incidencia = Incidencia(
            titulo_Incidencia=incidencia_data["titulo_Incidencia"],
            estado=incidencia_data["estado"],
            urgencia=incidencia_data["urgencia"],
            descripcion=incidencia_data["descripcion"],
            fecha_Reporte=now(),
            latitud=incidencia_data["latitud"],
            longitud=incidencia_data["longitud"],
            resolutor_Asignado=None,  # Ningún resolutor asignado inicialmente
        )
        incidencia.save()

    return JsonResponse({"resultado": "Incidencias simuladas creadas exitosamente."})

def simular_asignacion(request):
    incidencias = Incidencia.objects.all().order_by('id')  # Ordena por el campo `id`
    
    for incidencia in incidencias:
        print(f"ID: {incidencia.id}")
        print(f"Título: {incidencia.titulo_Incidencia}")
        print(f"Estado: {incidencia.estado}")
        print(f"Urgencia: {incidencia.urgencia}")
        print(f"Descripción: {incidencia.descripcion}")
        print(f"Fecha de Reporte: {incidencia.fecha_Reporte}")
        print(f"Latitud: {incidencia.latitud}")
        print(f"Longitud: {incidencia.longitud}")
        print(f"Resolutor Asignado: {incidencia.resolutor_Asignado}")
        print("-" * 50)  # Línea separadora para claridad
        incidencia = Incidencia.objects.get(id=incidencia.id)
        incidencia.resolutor_Asignado = user_id
        incidencia.titulo_Incidencia = "Titulo simulado"
        incidencia.estado = "asignada"
        incidencia.descripcion = "Descripcion simulada"
        incidencia.fecha_Reporte = now()
        incidencia.save()
    return JsonResponse({"resultados": "Asignadas"})
###
# 
# 
#     
def setIncidenciaEnProceso(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        incidencia_id = data.get('id')
        incidencia = Incidencia.objects.get(id=incidencia_id)

        # Obtener el ID del usuario desde las cookies
        user_id = request.COOKIES.get('user_id')  # Aquí obtienes el `id_usr_aplicacion`

        # Llamar a `crear_registro` con todos los argumentos necesarios
        crear_registro(
            incidencia_id,
            incidencia.estado,
            "en proceso",
            "El resolutor ha iniciado la incidencia",
            user_id
        )

        # Actualizar el estado de la incidencia
        incidencia.estado = 'en proceso'
        incidencia.save()
        return JsonResponse({'message': 'Incidencia iniciada exitosamente'})


def getIncidenciasAsigandas(request):
    user_id = request.COOKIES.get('user_id')
    incidencias = Incidencia.objects.filter(resolutor_Asignado=user_id)
    return incidencias # false si no hay asignaciones

def setIncidenciaFinalizada(request):
    if request.method == 'POST':
        try:
            # Intentar parsear el cuerpo como JSON
            if request.headers.get('Content-Type') == 'application/json':
                data = json.loads(request.body)  # Parsear JSON
            else:
                data = request.POST  # Si no es JSON, usar request.POST

            incidencia_id = data.get('id')

            # Validar que incidencia_id exista
            if not incidencia_id:
                return JsonResponse({'error': 'ID de incidencia no proporcionado'}, status=400)

            # Obtener la incidencia
            incidencia = Incidencia.objects.get(id=incidencia_id)

            # Obtener el ID del usuario desde las cookies
            id_usr_aplicacion = request.COOKIES.get('user_id')

            if not id_usr_aplicacion:
                return JsonResponse({'error': 'El ID del usuario no está disponible'}, status=400)

            # Llamar a `crear_registro` con todos los argumentos necesarios
            crear_registro(
                incidencia_id,
                incidencia.estado,
                "finalizada",
                "El resolutor ha finalizado la incidencia",
                id_usr_aplicacion
            )

            # Actualizar el estado de la incidencia
            incidencia.estado = 'finalizada'
            incidencia.save()

            return JsonResponse({'message': 'Incidencia finalizada exitosamente'})

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Datos JSON inválidos en el cuerpo de la solicitud'}, status=400)

        except Incidencia.DoesNotExist:
            return JsonResponse({'error': 'Incidencia no encontrada'}, status=404)

    return JsonResponse({'error': 'Método no permitido'}, status=405)

            
def getIncidenciasProceso(request):
    incidencias = Incidencia.objects.filter(resolutor_Asignado=user_id, estado='en proceso')
    return incidencias

def setIncidenciaInconclusa(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        comentario = data.get("comentarios")
        incidencia_id = data.get('id')
        incidencia = Incidencia.objects.get(id=incidencia_id)
        crear_registro(incidencia_id,incidencia.estado,"inconclusa",comentario,user_id )
        incidencia.estado = 'inconclusa'
        incidencia.save()
        #print (comentario,incidencia_id)
        return JsonResponse({'message': 'Incidencia marcada como inconclusa exitosamente'})
   
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
    
def crear_registro(idIncidencia,estado,new_estado,comentario,id_usr_aplicacion):
        data_para_auditoria = {
            'usuario_id': id_usr_aplicacion,
            'incidencia_id': idIncidencia,
            'estado_anterior': estado,
            'estado_actual': new_estado,
            'comentario': comentario,
        }
        # Llamar a `crear_registro_auditoria` y capturar su respuesta
        crear_registro_auditoria(data_para_auditoria)
#simular_asignacion()

