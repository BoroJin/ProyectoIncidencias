from django import forms
from .models import Incidencia

class incidenciaForm(forms.ModelForm):
    class Meta:
        model = Incidencia
       
        exclude = ['id_Formulario', 'fkUsuario']
