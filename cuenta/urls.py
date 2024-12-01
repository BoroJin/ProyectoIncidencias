from django.urls import path,include
from . import views
from .views import LoginView
from rest_framework.routers import DefaultRouter
from cuenta.views import TicketsViewSet  # Asegúrate de que el nombre del import sea correcto
from cuenta.views import MensajeViewSet

# Configura tu router de DRF para incluir las vistas de la API de Tickets
router = DefaultRouter()
router.register(r'tickets', TicketsViewSet)  # Cambié 'incidencias' por 'tickets'
router.register(r'mensajes', MensajeViewSet)

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('recuperacion/', views.adm_recuperacion, name='adm_recuperacion'), 
    path('recuperar/', views.restablecer_contra, name='recuperar'),
    path('restablecer/<int:user_id>/', views.restablecer, name='restablecer'),
    path('api/', include(router.urls)),  

]