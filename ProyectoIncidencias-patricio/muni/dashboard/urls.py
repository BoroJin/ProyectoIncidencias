from django.urls import path
from . import views  


urlpatterns = [
    path('', views.dashboard, name='dashboard'),         # La vista del dashboard
    path('incidencias/', views.incidencias, name='incidencias'),  # Vista de incidencias
    path('formulario/', views.formulario, name='formulario'), 
    path('crear_atributo/', views.crear_atributo, name='crear_atributo'),     # Vista de formulario
    path('Eliminar_columna', views.Eliminar_columna,name="Eliminar_columna"),
    path('rechazoIncidencia/<id_incidencia>',views.rechazoIncidencia),
    path('rechazarIncidencia/', views.rechazarIncidencia),
        
]