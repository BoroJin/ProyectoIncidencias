from django import forms
from .models import Formulario, Campo, Opcion

class FormularioForm(forms.ModelForm):
    class Meta:
        model = Formulario
        fields = ['nombre', 'descripcion']

class CampoForm(forms.ModelForm):
    class Meta:
        model = Campo
        fields = ['nombre', 'tipo', 'es_obligatorio']

class OpcionForm(forms.ModelForm):
    class Meta:
        model = Opcion
        fields = ['nombre', 'valor']