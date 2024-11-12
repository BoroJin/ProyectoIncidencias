from django.contrib import admin
from .models import Usuario, Incidencia, RegistroAsignacion, Notificaciones
# Register your models here.

admin.site.register(Usuario)
admin.site.register(Incidencia)
admin.site.register(RegistroAsignacion)
admin.site.register(Notificaciones)