from django.db import models

class Usuario(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nombre
    
class Incidencia(models.Model):
    id_Formulario = models.AutoField(primary_key=True)
    fkUsuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)  # relación con la tabla uategoria
    nombre = models.CharField(max_length=100)
    fecha_hora = models.DateTimeField(auto_now_add=True, null=True)
    estado=models.CharField( max_length=10 ,default='Inactivo')
    latitud = models.FloatField()  
    longitud = models.FloatField()
    descripcion = models.TextField()
    

    def __str__(self):
        texto="{0}({1})"
        return texto.format(self.nombre, self.latitud)    

