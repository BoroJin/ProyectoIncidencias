from django.db import models

class Incidencia(models.Model):
    id = models.AutoField(primary_key=True)  # ID autoincremental
    id_usuario_gestorTerritorial = models.IntegerField()  # ID del gestor territorial
    titulo_Incidencia = models.CharField(max_length=200)  # Título breve
    descripcion = models.TextField()  # Descripción detallada
    fecha_Hora_Reporte = models.DateTimeField(auto_now_add=True)  # Fecha y hora del reporte
    ubicacion = models.CharField(max_length=255)  # Ubicación del incidente
    URGENCIA_CHOICES = [
        ('baja', 'Baja'),
        ('media', 'Media'),
        ('alta', 'Alta'),
        ('critica', 'Crítica'),
    ]
    urgencia = models.CharField(max_length=10, choices=URGENCIA_CHOICES, default='media')  # Nivel de urgencia, cambiar la por defecto a sin asignar
    ESTADO_CHOICES = [ #Los estados, no los considero pertienente
        ('pendiente', 'Pendiente'),
        ('en_proceso', 'En Proceso'),
        ('resuelta', 'Resuelta'),
        ('cancelada', 'Cancelada'),
    ]
    estado = models.CharField(max_length=15, choices=ESTADO_CHOICES, default='pendiente')  # Estado de la incidencia, por defecto podria ser algo como por_asignar
    tipo_Incidencia = models.CharField(max_length=100)  # Tipo de incidencia, Esta tambien debe ser con choice, es para mas adelante lograr el filtro por tipo de incidencias
    medios_Adjuntos = models.FileField(upload_to='incidencias/adjuntos/', blank=True, null=True)  # Archivos adjuntos, falta revisar como se debe almacenar los datos multimedia
    fecha_estimada_fin = models.DateField(blank=True, null=True)  # Fecha estimada de finalización
    comentarios_anexos = models.TextField(blank=True, null=True)  # Comentarios adicionales, los comentarios deberian decir por quien fueron realizados, es una marca temporal del proceso que sufre la incidencia
    historial_Cambios_estados = models.JSONField(default=dict)  # Historial de cambios de estado, aun me falta entender como realizaremos esto.
    resolutor_Asignado = models.CharField(max_length=100, blank=True, null=True)  # Resolutor asignado, esta tambien deberia ser una id de usuario unica.
    informe_Final = models.TextField(blank=True, null=True)  # Informe final del caso, falta ver como almacenaremos este informe

    def __str__(self):
        return f"{self.titulo_Incidencia} - {self.estado}"
