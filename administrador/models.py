from django.db import models

#se crea la tabla en la base de datos para almacenar usuarios
class Usuario(models.Model):
    rol = models.CharField(max_length=1000, choices=[('admin', 'Administrador'), ('g.t', 'Gestor Territorial'), ('d', 'Director'), ('dep', 'Departamento de obras'), ('r', 'Resolutor')])
    nombre = models.CharField(max_length=100)
    correo_electronico = models.EmailField()
    
    def __str__(self):
        return self.nombre

#para almacenar las imagenes
class Logo(models.Model):
    nombre_municipalidad = models.CharField(max_length=255, default="Municipalidad X", null=True)  # Campo para el nombre
    imagen = models.ImageField(upload_to='logos/')  # carpeta donde se subira el logo
    actualizado_en = models.DateTimeField(auto_now=True)  # fecha de la última actualización

    def __str__(self):
        return self.nombre