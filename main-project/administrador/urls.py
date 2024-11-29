#maxi

from django.urls import path
from . import views  # Importa las vistas de tu aplicación

urlpatterns = [
    path('', views.adm_principal, name='home'),
    path('adm_principal/', views.adm_principal, name='adm_principal'),
    path('adm_ticket/', views.adm_ticket, name='adm_ticket'),
    path('adm_actualizar_logo/', views.adm_actualizar_logo, name='adm_actualizar_logo'),
    path('adm_cargar_masiva/', views.adm_cargar_masiva, name='adm_cargar_masiva'),
    path('adm_gestion_usuarios/', views.adm_gestion_usuarios, name='adm_gestion_usuarios'),
    path('eliminar_usuario/<int:usuario_id>/', views.eliminar_usuario, name='eliminar_usuario'),  # Nueva URL para eliminar
    path('adm_auditoria/', views.registro_auditoria, name='adm_auditoria'), 
    path('editar_usuario/<int:usuario_id>/', views.editar_usuario, name='editar_usuario'),
    path('api/configuracion/', views.ConfiguracionMunicipalidadView.as_view(), name='configuracion'),
    path('exportar_csv/', views.exportar_csv, name='exportar_csv'),
    path('exportar_usr_vista/', views.exportar_usr_vista, name='exportar_usr_vista'),
    path('importar_usr_vista/', views.importar_usr_vista, name='importar_usr_vista'),
    path('recibir_y_validar/', views.recibir_y_validar_csv, name='recibir_y_validar'),
    path('agregar_usuarios_desde_csv/', views.agregar_usuarios_desde_csv, name='agregar_usuarios_desde_csv'),
]