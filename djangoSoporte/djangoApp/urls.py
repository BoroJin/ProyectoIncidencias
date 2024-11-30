from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from djangoApp.views import TicketsViewSet  # Asegúrate de que el nombre del import sea correcto
from djangoApp.views import MensajeViewSet

# Configura tu router de DRF para incluir las vistas de la API de Tickets
router = DefaultRouter()
router.register(r'tickets', TicketsViewSet)  # Cambié 'incidencias' por 'tickets'
router.register(r'mensajes', MensajeViewSet)

urlpatterns = [
    # Redirige la raíz directamente a la URL de la API de DRF
    path('', include(router.urls)),  # La raíz ahora está mapeada a la API, sin necesidad de '/api/'
    
    
]

