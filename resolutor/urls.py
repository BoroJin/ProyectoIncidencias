from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard_resolutor, name='dashboar_resolutor'),  # Redirige la raíz a adm_inicio_sesion
    
]
