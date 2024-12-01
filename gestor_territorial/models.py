from django.db import models
from director.models import Campo

class Incidencia(models.Model):
    id = models.AutoField(primary_key=True)  # ID autoincremental
    multimedia_resolutor = models.FileField(upload_to='incidencias/adjuntos/resolutor', blank=True, null=True)  # Archivos adjuntos
    multimedia_gestor= models.FileField(upload_to='incidencias/adjuntos/gestor', blank=True, null=True)  # Archivos adjuntos
    id_usuario_gestorTerritorial = models.IntegerField(null=True, blank=True)
    titulo_Incidencia = models.CharField(max_length=200)
    
    # Actualización de ESTADO_CHOICES con las nuevas opciones
    ESTADO_CHOICES = [
        ('eliminada', 'eliminada'),
        ('inexistente', 'inexistente'),
        ('iniciada', 'Iniciada'),
        ('verificada', 'Verificada'),
        ('no verificada', 'No Verificada'),
        ('validada', 'Validada'),
        ('rechazada', 'Rechazada'),
        ('asignada', 'Asignada'),
        ('en proceso', 'En Proceso'),
        ('inconclusa', 'Inconclusa'),
        ('finalizada', 'Finalizada'),
    ]
    estado = models.CharField(max_length=15, choices=ESTADO_CHOICES, default='iniciada')  # Estado de la incidencia
    
    tipo = models.CharField(max_length=200, null=True, blank=True)
    descripcion = models.TextField()  # Descripción detallada
    fecha_Reporte = models.DateTimeField(auto_now_add=True)  # Fecha y hora del reporte
    latitud = models.FloatField(null=False, blank=False)  # Coordenadas de latitud
    longitud = models.FloatField(null=False, blank=False)  # Coordenadas de longitud
    
    URGENCIA_CHOICES = [
        ('baja', 'Baja'),
        ('media', 'Media'),
        ('alta', 'Alta'),
        ('critica', 'Crítica'),  
    ]
    urgencia = models.CharField(max_length=10, choices=URGENCIA_CHOICES, default='media')  # Nivel de urgencia
    
    resolutor_Asignado = models.CharField(max_length=100, blank=True, null=True)  # Resolutor asignado
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
    