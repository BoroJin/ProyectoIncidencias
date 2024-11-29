# serializers.py
from rest_framework import serializers
from .models import Logo

class ConfiguracionMunicipalidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Logo
        fields = ['nombre_municipalidad', 'imagen']