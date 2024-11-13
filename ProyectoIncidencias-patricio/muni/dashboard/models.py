from django.db import models

from django.db import models

class Usuario(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    contrasena = models.CharField(max_length=25)
    correo = models.CharField(max_length=50)

    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'

    def __str__(self):
        return self.nombre

class Incidencia(models.Model):
    id_incidencia = models.AutoField(primary_key=True)
    direccion_multimedia = models.CharField(max_length=250)
    titulo = models.CharField(max_length=50)
    estado_incidencia = models.CharField(max_length=12)
    descripcion = models.CharField(max_length=500)
    fecha_creacion = models.DateField()
    ubicacion = models.CharField(max_length=100)
    nivel_urgencia = models.CharField(max_length=8)
    usuario_asignado = models.ForeignKey(Usuario, on_delete=models.CASCADE, null=True)

    class Meta:
        verbose_name = 'Incidencia'
        verbose_name_plural = 'Incidencias'

    def __str__(self):
        return self.titulo

class RegistroAuditoriaAsignacion(models.Model):
    id_registro = models.AutoField(primary_key=True)
    id_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    id_incidencia = models.ForeignKey(Incidencia, on_delete=models.CASCADE)
    fecha_asignacion = models.DateField()
    estado = models.CharField(max_length=12)
    comentario = models.CharField(max_length=500)

    class Meta:
        verbose_name = 'Registro de Auditoría/Asignación'
        verbose_name_plural = 'Registros de Auditoría/Asignación'

    def __str__(self):
        return f'Registro {self.id_registro}'

