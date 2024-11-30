from django.db import models
from cuenta.models import Usuario
from gestor_territorial.models import Incidencia
# Create your models here.

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
    def __str__(self):
        return self.idIncidencia.titulo_Incidencia
    
