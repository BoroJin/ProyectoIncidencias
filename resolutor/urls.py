from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard_resolutor, name='dashboar_resolutor'),  # Redirige la raíz a adm_inicio_sesion
    path('get_notificaciones/', views.get_notificaciones, name='get_notificaciones'),
    path('get_notificaciones_no_leidas/', views.get_notificaciones_no_leidas, name='get_notificaciones_no_leidas'),
    path('get_notificaciones_leidas/', views.get_notificaciones_leidas, name='get_notificaciones_leidas'),
    path('mark_as_read/', views.mark_as_read, name='mark_as_read'),
    path('guardar_incidencia/', views.guardar_incidencia, name='guardar_incidencia'),
    
]
