from rest_framework import serializers
from gestor_territorial.models import Incidencia
from cuenta.models import Usuario
from administrador.models import RegistroAuditoria

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
        model = RegistroAuditoria
        fields = '__all__'
        read_only_fields = ['id']