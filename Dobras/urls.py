from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView
from rest_framework.routers import DefaultRouter
from Dobras import views
from rest_framework.documentation import include_docs_urls
from .views import *



router = DefaultRouter()
router.register(r'incidencias', views.IncidenciaView, 'incidencias')
router.register(r'usuarios', views.UsuarioView, 'usuarios')
router.register(r'registroasignaciones', views.RegistroAsignacionView, 'RegistroAsignaciones')


urlpatterns = [
    path('api/v1/', include(router.urls)),
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
    path("resolutores/", obtener_resolutores, name="obtener_resolutores"),
    path("api/asignar-resolutor", asignar_resolutor, name="asignar_resolutor"),
]