from django.db import models
from director.models import Campo
class Incidencia(models.Model):
    id = models.AutoField(primary_key=True)  # ID autoincremental
    direccion_multimedia = models.FileField(upload_to='incidencias/adjuntos/', blank=True, null=True)  # Archivos adjuntos, falta revisar como se debe almacenar los datos multimedia
    id_usuario_gestorTerritorial = models.IntegerField(null=True, blank=True)
    titulo_Incidencia = models.CharField(max_length=200)  # Título breve
    ESTADO_CHOICES = [ #Los estados, no los considero pertienente
            ('iniciada', 'Iniciada'),
            ('rechazada', 'Rechazada'),
            ('aprobada', 'Aprobada'),
            ('asignada', 'Asignada'),
            ('inconclusa', 'Inconclusa'),
            ('finalizada', 'Finalizada'),
            ('validada', 'Validada'),
        ]
    estado = models.CharField(max_length=15, choices=ESTADO_CHOICES, default='iniciada')  # Estado de la incidencia, por defecto podria ser algo como por_asignar
    descripcion = models.TextField()  # Descripción detallada
    fecha_Reporte = models.DateTimeField(auto_now_add=True)  # Fecha y hora del reporte
    latitud = models.FloatField(null=True, blank=True)  # Permite valores nulos y campos en blanco
    longitud = models.FloatField(null=True, blank=True)
    URGENCIA_CHOICES = [
        ('baja', 'Baja'),
        ('media', 'Media'),
        ('alta', 'Alta'),
        ('critica', 'Crítica'),
    ]
    urgencia = models.CharField(max_length=10, choices=URGENCIA_CHOICES, default='media')  # Nivel de urgencia, cambiar la por defecto a sin asignar
    #comentarios = models.TextField(blank=True, null=True)  # Comentarios adicionales, los comentarios deberian decir por quien fueron realizados, es una marca temporal del proceso que sufre la incidencia
    historial_Cambios_estados = models.JSONField(default=dict)  # Historial de cambios de estado
    resolutor_Asignado = models.CharField(max_length=100, blank=True, null=True)  # Resolutor asignado, esta tambien deberia ser una id de usuario unica.
    id_usuario_departamento = models.IntegerField(null=True, blank=True)
class Respuesta(models.Model):
    incidencia = models.ForeignKey(Incidencia, related_name='respuestas', on_delete=models.CASCADE)
    campo = models.ForeignKey(Campo, on_delete=models.CASCADE)
    valor = models.TextField()  # Almacena la respuesta del usuario a este campo

#--> Desde la vista
    # Titulo
    # Descripcion
    # Urgencia
#--> Desde el backend
    # Direccion multimedia
    # Estado --> Iniciada
    # Fecha reporte
    # Ubicacion
    