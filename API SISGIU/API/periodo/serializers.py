from rest_framework import serializers
from periodo.models import (
    EstadoPeriodo,
    Periodo,
    )

"""
Serializer de EstadoPeriodo
"""
class EstadoPeriodoListSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoPeriodo
        fields = ('__all__')


class EstadoPeriodoDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoPeriodo
        fields = ('estado', )


"""
Serializer de Periodo
"""
class PeriodoListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Periodo
        fields = ('__all__')


class PeriodoDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Periodo
        fields = ('estado_periodo', 'tipo_postgrado', 'anio_inicio', 'anio_fin', 'mes_inicio', 'mes_fin', 'numero_periodo')