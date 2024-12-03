from django.shortcuts import render
from rest_framework import viewsets
from gestor_territorial.models import Incidencia
from cuenta.models import Usuario
from administrador.models import RegistroAuditoria
from .serializer import UsuarioSerializer, IncidenciaSerializer, RegistroAsignacionSerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json

class UsuarioView(viewsets.ModelViewSet):
    serializer_class = UsuarioSerializer
    queryset = Usuario.objects.all()

class IncidenciaView(viewsets.ModelViewSet):
    serializer_class = IncidenciaSerializer
    queryset = Incidencia.objects.filter(estado="asignada")

class RegistroAuditoriaView(viewsets.ModelViewSet):
    serializer_class = RegistroAsignacionSerializer
    queryset = RegistroAuditoria.objects.all()

def obtener_resolutores(request):
    if request.method == "GET":
        resolutores = Usuario.objects.filter(rol="r").values("id", "nombre")
        return JsonResponse(list(resolutores), safe=False)
    return JsonResponse({"error": "Método no permitido."}, status=405)

@csrf_exempt
def asignar_resolutor(request):
    if request.method == "POST":
        try:
            print("Cuerpo de la solicitud:", request.body.decode('utf-8'))
            
            data = json.loads(request.body)
            print("Datos recibidos:", data)
            
            incidencia_id = data.get("incidenciaId")
            resolutor_id = data.get("resolutorId")
            comentario = data.get("comentario", "")
            
            print(f"ID Incidencia: {incidencia_id}, ID Resolutor: {resolutor_id}")
            
            try:
                incidencia = Incidencia.objects.get(id=incidencia_id)
                print(f"Incidencia encontrada: {incidencia.id}")
            except Incidencia.DoesNotExist as e:
                print(f"Error: Incidencia {incidencia_id} no encontrada")
                return JsonResponse({"error": f"Incidencia {incidencia_id} no encontrada"}, status=404)
            
            try:
                resolutor = Usuario.objects.get(id=resolutor_id)
                print(f"Resolutor encontrado: {resolutor.id}")
            except Usuario.DoesNotExist as e:
                print(f"Error: Resolutor {resolutor_id} no encontrado")
                return JsonResponse({"error": f"Resolutor {resolutor_id} no encontrado"}, status=404)
            
            try:
                # Guardar el estado anterior antes de actualizarlo
                estado_anterior = incidencia.estado
                
                # Actualizar incidencia
                incidencia.estado = "asignada"
                incidencia.resolutor_Asignado = resolutor
                incidencia.save()
                print("Incidencia actualizada correctamente")
                
                # Crear registro de asignación con estado anterior y actual
                registro = RegistroAuditoria.objects.create(
                    idUsuario=resolutor,
                    idIncidencia=incidencia,
                    estado_anterior=estado_anterior,
                    estado_actual="asignada",
                    comentario=comentario
                )
                print("Registro de asignación creado correctamente")
                
                return JsonResponse({
                    "message": "Resolutor asignado correctamente",
                    "incidencia_id": incidencia_id,
                    "resolutor_id": resolutor_id
                })
                
            except Exception as e:
                print(f"Error al guardar los cambios: {str(e)}")
                return JsonResponse({
                    "error": f"Error al guardar los cambios: {str(e)}"
                }, status=500)
                
        except json.JSONDecodeError as e:
            print(f"Error al decodificar JSON: {str(e)}")
            return JsonResponse({
                "error": f"Error en el formato de los datos: {str(e)}"
            }, status=400)
            
        except Exception as e:
            print(f"Error inesperado: {str(e)}")
            return JsonResponse({
                "error": f"Error inesperado: {str(e)}"
            }, status=500)
    
    return JsonResponse({"error": "Método no permitido"}, status=405)
