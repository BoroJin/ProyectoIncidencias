from django.contrib import admin
from .models import Usuario, Incidencia, RegistroAsignacion
# Register your models here.

admin.site.register(Usuario)
admin.site.register(Incidencia)
admin.site.register(RegistroAsignacion)