from django.shortcuts import render
from relacion.models import (
	PeriodoEstudiante,
	DocenteAsignatura,
	EstudianteAsignatura,
	EstudianteTramite,
	AsignaturaTipoPostgrado,
	)

from relacion.serializers import (
	PeriodoEstudianteListSerializer,
	PeriodoEstudianteDetailSerializer,
	DocenteAsignaturaListSerializer,
	DocenteAsignaturaDetailSerializer,
	EstudianteAsignaturaListSerializer,
	EstudianteAsignaturaDetailSerializer,
	EstudianteTramiteListSerializer,
	EstudianteTramiteDetailSerializer,
	AsignaturaTipoPostgradoListSerializer,
	AsignaturaTipoPostgradoDetailSerializer,

	)
from rest_framework.generics import (
	ListCreateAPIView,
	RetrieveAPIView,
    RetrieveUpdateAPIView,
    DestroyAPIView,
	)


"""
PeriodoEstudiante
				Esto solo debe ser tratado por el administrador
"""
class PeriodoEstudianteListCreateAPIView(ListCreateAPIView):
    queryset = PeriodoEstudiante.objects.all()
    serializer_class = PeriodoEstudianteListSerializer

class PeriodoEstudianteDetailAPIView(RetrieveAPIView):
    queryset = PeriodoEstudiante.objects.all()
    serializer_class = PeriodoEstudianteDetailSerializer

class PeriodoEstudianteUpdateAPIView(RetrieveUpdateAPIView):
    queryset = PeriodoEstudiante.objects.all()
    serializer_class = PeriodoEstudianteDetailSerializer

class PeriodoEstudianteDeleteAPIView(DestroyAPIView):
    queryset = PeriodoEstudiante.objects.all()
    serializer_class = PeriodoEstudianteDetailSerializer


"""
DocenteAsignatura
				Esto solo debe ser tratado por el administrador
"""
class DocenteAsignaturaListCreateAPIView(ListCreateAPIView):
    queryset = DocenteAsignatura.objects.all()
    serializer_class = DocenteAsignaturaListSerializer

class DocenteAsignaturaDetailAPIView(RetrieveAPIView):
    queryset = DocenteAsignatura.objects.all()
    serializer_class = DocenteAsignaturaDetailSerializer

class DocenteAsignaturaUpdateAPIView(RetrieveUpdateAPIView):
    queryset = DocenteAsignatura.objects.all()
    serializer_class = DocenteAsignaturaDetailSerializer

class DocenteAsignaturaDeleteAPIView(DestroyAPIView):
    queryset = DocenteAsignatura.objects.all()
    serializer_class = DocenteAsignaturaDetailSerializer


"""
EstudianteAsignatura
				Esto solo debe ser tratado por el administrador
"""
class EstudianteAsignaturaListCreateAPIView(ListCreateAPIView):
    queryset = EstudianteAsignatura.objects.all()
    serializer_class = EstudianteAsignaturaListSerializer

class EstudianteAsignaturaDetailAPIView(RetrieveAPIView):
    queryset = EstudianteAsignatura.objects.all()
    serializer_class = EstudianteAsignaturaDetailSerializer

class EstudianteAsignaturaUpdateAPIView(RetrieveUpdateAPIView):
    queryset = EstudianteAsignatura.objects.all()
    serializer_class = EstudianteAsignaturaDetailSerializer

class EstudianteAsignaturaDeleteAPIView(DestroyAPIView):
    queryset = EstudianteAsignatura.objects.all()
    serializer_class = EstudianteAsignaturaDetailSerializer


"""
EstudianteTramite
				Esto solo debe ser tratado por el administrador
"""
class EstudianteTramiteListCreateAPIView(ListCreateAPIView):
    queryset = EstudianteTramite.objects.all()
    serializer_class = EstudianteTramiteListSerializer

class EstudianteTramiteDetailAPIView(RetrieveAPIView):
    queryset = EstudianteTramite.objects.all()
    serializer_class = EstudianteTramiteDetailSerializer

class EstudianteTramiteUpdateAPIView(RetrieveUpdateAPIView):
    queryset = EstudianteTramite.objects.all()
    serializer_class = EstudianteTramiteDetailSerializer

class EstudianteTramiteDeleteAPIView(DestroyAPIView):
    queryset = EstudianteTramite.objects.all()
    serializer_class = EstudianteTramiteDetailSerializer


"""
AsignaturaTipoPostgrado
				Esto solo debe ser tratado por el administrador
"""
class AsignaturaTipoPostgradoListCreateAPIView(ListCreateAPIView):
    queryset = AsignaturaTipoPostgrado.objects.all()
    serializer_class = AsignaturaTipoPostgradoListSerializer

class AsignaturaTipoPostgradoDetailAPIView(RetrieveAPIView):
    queryset = AsignaturaTipoPostgrado.objects.all()
    serializer_class = AsignaturaTipoPostgradoDetailSerializer

class AsignaturaTipoPostgradoUpdateAPIView(RetrieveUpdateAPIView):
    queryset = AsignaturaTipoPostgrado.objects.all()
    serializer_class = AsignaturaTipoPostgradoDetailSerializer

class AsignaturaTipoPostgradoDeleteAPIView(DestroyAPIView):
    queryset = AsignaturaTipoPostgrado.objects.all()
    serializer_class = AsignaturaTipoPostgradoDetailSerializer