from django.db import models

# Create your models here.

#se crea la tabla en la base de datos para almacenar usuarios
class Usuario(models.Model):
    rol = models.CharField(max_length=1000, choices=[('admin', 'Administrador'), ('g.t', 'Gestor Territorial'), ('d', 'Director'), ('dep', 'Departamento de obras'), ('r', 'Resolutor')])
    nombre = models.CharField(max_length=100)
    correo_electronico = models.EmailField()
    contraseña = models.CharField(max_length=100, default='12345')
    
    def __str__(self):
        return self.nombre

class Incidencia(models.Model):
    id = models.AutoField(primary_key=True)  # ID autoincremental
    direccion_multimedia = models.FileField(upload_to='incidencias/adjuntos/', blank=True, null=True)  # Archivos adjuntos, falta revisar como se debe almacenar los datos multimedia
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
    estado = models.CharField(max_length=15, choices=ESTADO_CHOICES, default='pendiente')  # Estado de la incidencia, por defecto podria ser algo como por_asignar
    descripcion = models.TextField(null=True, blank=True)  # Descripción detallada
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
    usuario_Asignado = models.ForeignKey(Usuario, on_delete=models.CASCADE, null=True, blank=True)  # Usuario asignado, esta tambien deberia ser una id de usuario un
     # Resolutor asignado, esta tambien deberia ser una id de usuario unica.
    
class RegistroAsignacion(models.Model):
    idUsuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    idIncidencia = models.ForeignKey(Incidencia, on_delete=models.CASCADE)
    fechaAsignacion = models.DateTimeField(auto_now_add=True)
    ESTADO_CHOICES = [ #Los estados, no los considero pertienente
            ('iniciada', 'Iniciada'),
            ('rechazada', 'Rechazada'),
            ('aprobada', 'Aprobada'),
            ('asignada', 'Asignada'),
            ('inconclusa', 'Inconclusa'),
            ('finalizada', 'Finalizada'),
            ('validada', 'Validada'),
        ]
    estado = models.CharField(max_length=15, choices=ESTADO_CHOICES, default='pendiente')
    comentario = models.TextField()     # Comentarios adicionales, los comentarios deberian decir por quien fueron realizados, es una marca temporal del proceso que sufre la incidencia

class Notificaciones(models.Model):
    titulo = models.CharField(max_length=100)
    descripcion = models.TextField()
    idincidencia = models.ForeignKey(Incidencia, on_delete=models.CASCADE)
    idusuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
