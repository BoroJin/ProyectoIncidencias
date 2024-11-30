# Urls.py de la app resolutor
from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard_resolutor, name='dashboard_resolutor'), 
    path('guardar_incidencia/', views.guardar_incidencia, name='guardar_incidencia'),
    
]
