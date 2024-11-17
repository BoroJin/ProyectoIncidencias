from django.shortcuts import render
from rest_framework import viewsets
from .models import Usuario, Incidencia, RegistroAsignacion, Notificaciones
from .serializer import UsuarioSerializer, IncidenciaSerializer, RegistroAsignacionSerializer, NotificacionesSerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json


# Create your views here.

class UsuarioView(viewsets.ModelViewSet):
    serializer_class = UsuarioSerializer
    queryset = Usuario.objects.all()

class IncidenciaView(viewsets.ModelViewSet):
    serializer_class = IncidenciaSerializer
    queryset = Incidencia.objects.all()

class RegistroAsignacionView(viewsets.ModelViewSet):
    serializer_class = RegistroAsignacionSerializer
    queryset = RegistroAsignacion.objects.all()

class NotificacionesView(viewsets.ModelViewSet):
    serializer_class = NotificacionesSerializer
    queryset = Notificaciones.objects.all()

def obtener_resolutores(request):
    if request.method == "GET":
        # Filtrar usuarios que sean resolutores (rol "r")
        resolutores = Usuario.objects.filter(rol="r").values("id", "nombre")
        return JsonResponse(list(resolutores), safe=False)
    return JsonResponse({"error": "Método no permitido."}, status=405)

@csrf_exempt
def asignar_resolutor(request):
    from .models import Incidencia, Usuario, RegistroAsignacion
    if request.method == "POST":
        data = json.loads(request.body)
        incidencia_id = data.get("incidenciaId")
        resolutor_id = data.get("resolutorId")
        comentario = data.get("comentario")

        try:
            incidencia = Incidencia.objects.get(id=incidencia_id, estado="aprobada")
            resolutor = Usuario.objects.get(id=resolutor_id, rol="r")

            # Actualizar estado de la incidencia
            incidencia.estado = "asignada"
            incidencia.usuario_Asignado = resolutor
            incidencia.save()

            # Registrar asignación
            RegistroAsignacion.objects.create(
                idUsuario=resolutor,
                idIncidencia=incidencia,
                estado="asignada",
                comentario=comentario,
            )

            return JsonResponse({"message": "Resolutor asignado correctamente."}, status=200)
        except Incidencia.DoesNotExist:
            return JsonResponse({"error": "Incidencia no encontrada o no aprobada."}, status=404)
        except Usuario.DoesNotExist:
            return JsonResponse({"error": "Resolutor no encontrado."}, status=404)
    return JsonResponse({"error": "Método no permitido."}, status=405)

