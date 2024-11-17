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
""" Los models RegistrosAsignacion y Notificaciones los agregue aqui solo por que no se aun donde deberian ir
    Att Benjamin Morales """
class RegistroAsignacion(models.Model):
    idRegistro = models.AutoField(primary_key=True)  # ID autoincremental
    idUsuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)  # Relación con usuario, FK
    idIncidencia = models.ForeignKey(Incidencia, on_delete=models.CASCADE)  # Relación con incidencia, FK
    fechaAsignacion = models.DateField()  # Fecha de asignación
    estado = models.CharField(max_length=12)  # Estado, máximo 12 caracteres
    comentario = models.CharField(max_length=500, blank=True, null=True)  # Comentario, máximo 500 caracteres


class Notificacion(models.Model):
    idNotificacion = models.AutoField(primary_key=True)  # ID autoincremental
    titulo = models.CharField(max_length=100)  # Título de la notificación, máximo 100 caracteres
    descripcion = models.CharField(max_length=250)  # Descripción de la notificación, máximo 250 caracteres
    incidenciaId = models.ForeignKey(Incidencia, on_delete=models.CASCADE)  # Relación con Incidencia (FK)
    idUsuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)  # Relación con Usuario (FK)
    estado_lectura = models.BooleanField(default=False)  # Estado de lectura: False = no leído, True = leído
    fecha_creacion = models.DateTimeField(default=timezone.now)  # Fecha y hora de creación de la notificación