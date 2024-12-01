from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from . import views

app_name = 'director'  # Define el nombre de la app

urlpatterns = [

    path('', views.dashboard, name='dashboard'),
    path('incidencias/', views.incidencias, name='incidencias'),
    path('asignarUsuario/', views.asignarUsuario, name='asignarUsuario'),
    path('deshacerAsignacion/<int:id>',views.deshacerAsignacion, name='deshacerAsignacion'),
    path('rechazarIncidencia/', views.rechazarIncidencia,name='rechazarIncidencia'),
    path('crear_formulario', views.crear_formulario, name='crear_formulario'),
    path('gestionar_campos/<int:formulario_id>/', views.gestionar_campos, name='gestionar_campos'),
    path('ver_formularios/', views.ver_formularios, name='ver_formularios'),
    path('activar_formulario/<int:formulario_id>/', views.activar_formulario, name='activar_formulario'),
    path('eliminar_formulario/<int:formulario_id>/', views.eliminar_formulario, name='eliminar_formulario'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)