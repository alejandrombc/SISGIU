from rest_framework import serializers
from relacion.models import (
    PeriodoEstudiante,
    DocenteAsignatura,
    EstudianteAsignatura,
    AsignaturaTipoPostgrado,
    )


"""
Serializer de Periodo Estudiante
"""


class PeriodoEstudianteListSerializer(serializers.ModelSerializer):

    class Meta:
        model = PeriodoEstudiante
        fields = ('__all__')


class PeriodoEstudianteDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = PeriodoEstudiante
        fields = ('__all__')


"""
Serializer de Docente Asignatura
"""


class DocenteAsignaturaListSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocenteAsignatura
        fields = ('__all__')


class DocenteAsignaturaDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocenteAsignatura
        fields = ('__all__')

"""
Serializer de Estudiante Asignatura
"""


class EstudianteAsignaturaListSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstudianteAsignatura
        fields = ('__all__')


class EstudianteAsignaturaDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstudianteAsignatura
        fields = ('__all__')


"""
Serializer de Asignatura TipoPostgrado
"""


class AsignaturaTipoPostgradoListSerializer(serializers.ModelSerializer):
    class Meta:
        model = AsignaturaTipoPostgrado
        fields = ('__all__')


class AsignaturaTipoPostgradoDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = AsignaturaTipoPostgrado
        fields = ('__all__')
