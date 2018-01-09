from rest_framework import serializers
from tramite.models import (
	EstadoTramite,
	Tramite,
	)

"""
Serializer de EstadoTramite
"""
class EstadoTramiteListSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoTramite
        fields = ('__all__')


class EstadoTramiteDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoTramite
        fields = ('estado', )

"""
Serializer de Tramite
"""
class TramiteListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tramite
        fields = ('__all__')


class TramiteDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tramite
        fields = ('nombre','descripcion','max_numero_dias', )