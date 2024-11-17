from django.db import models

class Formulario(models.Model):
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField(blank=True)
    activo = models.BooleanField(default=False)  # Añadir campo activo
    
    def save(self, *args, **kwargs):
        if self.activo:  # Si se está marcando este formulario como activo
            # Asegurarse de que todos los otros formularios estén inactivos
            Formulario.objects.filter(activo=True).update(activo=False)
        super(Formulario, self).save(*args, **kwargs)
        
class Campo(models.Model):
    TIPO_CAMPO = [
        ('texto', 'Texto'),
        ('checkbox', 'Casilla de verificación'),
        ('select', 'Desplegable'),
        # Agrega más tipos de campo según sea necesario
    ]
    formulario = models.ForeignKey(Formulario, related_name="campos", on_delete=models.CASCADE)
    nombre = models.CharField(max_length=255)
    tipo = models.CharField(choices=TIPO_CAMPO, max_length=50)
    es_obligatorio = models.BooleanField(default=False)

class Opcion(models.Model):
    campo = models.ForeignKey(Campo, related_name="opciones", on_delete=models.CASCADE)
    nombre = models.CharField(max_length=255)
    valor = models.CharField(max_length=255) # Esto es lo que se alacena en la bd