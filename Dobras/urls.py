from django.urls import path, include
from rest_framework.routers import DefaultRouter  # Corrige el nombre del import
from Dobras import views
from rest_framework.documentation import include_docs_urls

router = DefaultRouter()
router.register('incidencias', views.IncidenciaView)
router.register('usuarios', views.UsuarioView)
router.register('registroasignaciones', views.RegistroAsignacionView)
router.register('notificaciones', views.NotificacionesView)

urlpatterns = [
    path('', include(router.urls)),  # Aquí incluimos las rutas registradas en el router
    path('docs/', include_docs_urls(title='Documentación API')),
]
