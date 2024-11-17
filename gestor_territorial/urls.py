from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('mostrar_formulario/', views.mostrar_formulario, name='mostrar_formulario'),
    path('crear_incidencia/', views.crear_incidencia, name='crear_incidencia'),
]