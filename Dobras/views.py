from django.shortcuts import render
from rest_framework import viewsets
from .models import Usuario, Incidencia, RegistroAsignacion, Notificaciones
from .serializer import UsuarioSerializer, IncidenciaSerializer, RegistroAsignacionSerializer, NotificacionesSerializer

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