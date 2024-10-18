#maxi

from django.urls import path
from . import views  # Importa las vistas de tu aplicación

urlpatterns = [
    path('', views.adm_inicio_sesion, name='home'),  # Redirige la raíz a adm_inicio_sesion
    path('adm_principal/', views.adm_principal, name='adm_principal'),
    path('adm_ticket/', views.adm_ticket, name='adm_ticket'),
    path('adm_actualizar_logo/', views.adm_actualizar_logo, name='adm_actualizar_logo'),
    path('adm_cargar_masiva/', views.adm_cargar_masiva, name='adm_cargar_masiva'),
    path('adm_gestion_usuarios/', views.adm_gestion_usuarios, name='adm_gestion_usuarios'),
    path('adm_inicio_session/', views.adm_inicio_sesion, name='adm_inicio_session'), 
    path('eliminar_usuario/<int:usuario_id>/', views.eliminar_usuario, name='eliminar_usuario'),  # Nueva URL para eliminar
    path('adm_recuperacion/', views.adm_recuperacion, name='adm_recuperacion'), 
    path('adm_auditoria/', views.registro_auditoria, name='adm_auditoria'), 

    
]
