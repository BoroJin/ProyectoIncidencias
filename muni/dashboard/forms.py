from django import forms
from .models import Incidencia

class incidencia(forms.Form):
    nombre = forms.CharField(label='Nombre', max_length=100, required=True)


