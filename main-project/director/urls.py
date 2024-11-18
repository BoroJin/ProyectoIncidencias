from django.urls import path
from . import views

app_name = 'director'  # Define el nombre de la app

urlpatterns = [

    path('', views.home, name='home'),
    path('aprobar_rechazar/<int:incidencia_id>/<str:accion>/', views.aprobar_rechazar, name='aprobar_rechazar'),
    path('crear_formulario', views.crear_formulario, name='crear_formulario'),
    path('gestionar_campos/<int:formulario_id>/', views.gestionar_campos, name='gestionar_campos'),
    path('ver_formularios/', views.ver_formularios, name='ver_formularios'),
    path('activar_formulario/<int:formulario_id>/', views.activar_formulario, name='activar_formulario'),
    path('eliminar_formulario/<int:formulario_id>/', views.eliminar_formulario, name='eliminar_formulario'),
    
    

]

