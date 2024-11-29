
from django.urls import path
from . import views  # Importa las vistas de tu aplicación

urlpatterns = [
    path('', views.ver_gestor, name='ver_gestor'),
    path('lista-incidencias/', views.ver_listaIncidencias, name='lista_incidencias'),
    path('mostrar_formulario/', views.mostrar_formulario, name='mostrar_formulario'),
    path('crear_incidencia/', views.crear_incidencia, name='crear_incidencia'),
]