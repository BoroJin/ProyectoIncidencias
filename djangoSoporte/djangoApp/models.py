from django.db import models

class Tickets(models.Model):
    titulo = models.CharField(max_length=100)
    correo = models.EmailField(max_length=100)
    fecha = models.DateField()
    descripcion = models.TextField()

    def __str__(self):
        return self.titulo
    
class Mensaje(models.Model):
    mensaje_usuario = models.TextField(null=True, blank=True)
    mensaje_soporte = models.TextField(null=True, blank=True)
    
    def __str__(self):
        return f"Mensaje {self.id}"
