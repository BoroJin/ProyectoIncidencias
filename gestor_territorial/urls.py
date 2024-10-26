#maxi

from django.urls import path
from . import views  # Importa las vistas de tu aplicación

urlpatterns = [
    path('', views.ver_gestor, name='ver_gestor'),
    path('lista-incidencias/', views.ver_listaIncidencias, name='lista_incidencias'),
]