from django.urls import path
from . import views
from .views import LoginView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('recuperacion/', views.adm_recuperacion, name='adm_recuperacion'), 
    path('recuperar/', views.restablecer_contra, name='recuperar'),
    path('restablecer/<int:user_id>/', views.restablecer, name='restablecer'),
    path("crear-ticket/", views.crear_ticket, name="crear_ticket"),
]