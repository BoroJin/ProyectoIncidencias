from django.urls import path, include
from rest_framework.routers import DefaultRouter
from Dobras import views
from rest_framework.documentation import include_docs_urls
from .views import *



router = DefaultRouter()
router.register(r'incidencias', views.IncidenciaView, 'incidencias')
router.register(r'usuarios', views.UsuarioView, 'usuarios')
router.register(r'registroasignaciones', views.RegistroAsignacionView, 'RegistroAsignaciones')
router.register(r'notificaciones', views.NotificacionesView, 'notificaciones')

urlpatterns = [
    path('api/v1/', include(router.urls) ),
    path('docs/', include_docs_urls(title='DOB API')),
    path("resolutores/", obtener_resolutores, name="obtener_resolutores"),
    path("api/asignar-resolutor", asignar_resolutor, name="asignar_resolutor"),
]
