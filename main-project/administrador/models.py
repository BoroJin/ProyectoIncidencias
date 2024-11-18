#maxi
from django.db import models
from django.utils import timezone
from gestor_territorial.models import Incidencia
from cuenta.models import Usuario

#para almacenar las imagenes
class Logo(models.Model):
    nombre_municipalidad = models.CharField(max_length=255, default="Municipalidad X", null=True)  # Campo para el nombre
    imagen = models.ImageField(upload_to='logos/', null=True)  # carpeta donde se subira el logo
    actualizado_en = models.DateTimeField(auto_now=True)  # fecha de la última actualización

    def __str__(self):
        return self.nombre_municipalidad
