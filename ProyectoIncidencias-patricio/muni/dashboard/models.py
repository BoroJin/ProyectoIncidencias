from django.db import models

class Usuario(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nombre
    
class Incidencia(models.Model):
    nombreIndicencia = models.CharField(max_length=100) #charfield es texto maximo 255
    fkUsuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)  # relación con la tabla uategoria
    fecha = models.DateField(auto_now_add=True)
    hora = models.TimeField(auto_now_add=True)
    estado=models.BooleanField()
    latitud = models.FloatField()  
    longitud = models.FloatField()
    

    def __str__(self):
        return self.nombre    

