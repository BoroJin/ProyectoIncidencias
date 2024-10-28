from django.urls import path
from .views import dashboard  
from .views import incidencias  
from .views import formulario  
from .views import crear_atributo

urlpatterns = [
    path('', dashboard, name='dashboard'),         # La vista del dashboard
    path('incidencias/', incidencias, name='incidencias'),  # Vista de incidencias
    path('formulario/', formulario, name='formulario'), 
    path('crear_atributo/', crear_atributo, name='crear_atributo'),     # Vista de formulario
]