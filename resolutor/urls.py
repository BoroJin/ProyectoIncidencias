# Urls.py de la app resolutor
from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard_resolutor, name='dashboard_resolutor'), 
    path('guardar_incidencia/', views.guardar_incidencia, name='guardar_incidencia'),
    path('setIncidenciaEnProceso/', views.setIncidenciaEnProceso, name='setIncidenciaEnProceso'),
    path('setIncidenciaInconclusa/', views.setIncidenciaInconclusa, name='setIncidenciaInconclusa'),
    path('setIncidenciaFinalizada/', views.setIncidenciaFinalizada, name='setIncidenciaFinalizada'),

    path('simularAsignacion/', views.simular_asignacion, name='simularAsignacion'),
    path('simularCreacion/', views.simular_creacion_incidencias, name='simularCreacion'),
]
