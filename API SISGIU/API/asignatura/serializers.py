from rest_framework import serializers
from asignatura.models import (
	TipoAsignatura,
	Asignatura,
	)

"""
Serializer de TipoAsignatura
"""
class TipoAsignaturaListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoAsignatura
        fields = ('__all__')


class TipoAsignaturaDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoAsignatura
        fields = ('nombre', )

"""
Serializer de Asignatura
"""
class AsignaturaListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asignatura
        fields = ('__all__')
        

class AsignaturaDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asignatura
        fields = ('codigo', 'nombre', 'tipo_asignatura', 'tipo_postgrado', 'unidad_credito' )