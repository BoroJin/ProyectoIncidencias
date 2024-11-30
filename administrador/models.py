#maxi
from django.db import models
from django.utils import timezone
from gestor_territorial.models import Incidencia
from cuenta.models import Usuario
import datetime

#para almacenar las imagenes
class Logo(models.Model):
    nombre_municipalidad = models.CharField(max_length=255, default="Municipalidad X", null=True)  # Campo para el nombre
    imagen = models.ImageField(upload_to='logos/', null=True)  # carpeta donde se subira el logo
    actualizado_en = models.DateTimeField(auto_now=True)  # fecha de la última actualización

    def __str__(self):
        return self.nombre_municipalidad
    
class RegistroAuditoria(models.Model):
    idRegistro = models.AutoField(primary_key=True)
    idUsuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)  # Usuario que realiza el cambio
    idIncidencia = models.ForeignKey(
        Incidencia,
        on_delete=models.CASCADE,
        related_name='registros_auditoria' 
    )

    # Estados anteriores y actuales con los mismos choices del modelo Incidencia
    estado_anterior = models.CharField(
        max_length=15, 
        choices=Incidencia.ESTADO_CHOICES, 
        null=True, 
        blank=True
    )  # Estado previo al cambio
    estado_actual = models.CharField(
        max_length=15, 
        choices=Incidencia.ESTADO_CHOICES,
        default='iniciada'
    )  # Estado después del cambio

    comentario = models.TextField(null=True, blank=True)  # Comentario sobre el cambio
    fecha_cambio = models.DateTimeField(auto_now_add=True, null=True)  # Fecha y hora del cambio
