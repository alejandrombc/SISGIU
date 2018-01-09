from django.shortcuts import render
from asignatura.models import (
	TipoAsignatura,
	Asignatura,
	)
from asignatura.serializers import (
	TipoAsignaturaListSerializer,
	TipoAsignaturaDetailSerializer,
	AsignaturaListSerializer,
	AsignaturaDetailSerializer,

	)
from rest_framework.generics import (
	ListCreateAPIView,
	RetrieveAPIView,
    RetrieveUpdateAPIView,
    DestroyAPIView,
	)

"""
TipoAsignatura
				Esto solo debe ser tratado por el administrador
"""
class TipoAsignaturaListCreateAPIView(ListCreateAPIView):
    queryset = TipoAsignatura.objects.all()
    serializer_class = TipoAsignaturaListSerializer

class TipoAsignaturaDetailAPIView(RetrieveAPIView):
    queryset = TipoAsignatura.objects.all()
    serializer_class = TipoAsignaturaDetailSerializer

class TipoAsignaturaUpdateAPIView(RetrieveUpdateAPIView):
    queryset = TipoAsignatura.objects.all()
    serializer_class = TipoAsignaturaDetailSerializer

class TipoAsignaturaDeleteAPIView(DestroyAPIView):
    queryset = TipoAsignatura.objects.all()
    serializer_class = TipoAsignaturaDetailSerializer


"""
Asignatura
				Esto solo debe ser tratado por el administrador
"""
class AsignaturaListCreateAPIView(ListCreateAPIView):
    queryset = Asignatura.objects.all()
    serializer_class = AsignaturaListSerializer

class AsignaturaDetailAPIView(RetrieveAPIView):
    queryset = Asignatura.objects.all()
    serializer_class = AsignaturaDetailSerializer

class AsignaturaUpdateAPIView(RetrieveUpdateAPIView):
    queryset = Asignatura.objects.all()
    serializer_class = AsignaturaDetailSerializer

class AsignaturaDeleteAPIView(DestroyAPIView):
    queryset = Asignatura.objects.all()
    serializer_class = AsignaturaDetailSerializer