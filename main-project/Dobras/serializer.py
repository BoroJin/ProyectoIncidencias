from rest_framework import serializers
from.models import Usuario, Incidencia, RegistroAsignacion

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'
        read_only_fields = ['id']

class IncidenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Incidencia
        fields = '__all__'
        read_only_fields = ['id']

class RegistroAsignacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegistroAsignacion
        fields = '__all__'
        read_only_fields = ['id']

