from django.shortcuts import render

from usuario.models import (
    Usuario,
    Estudiante,
    TipoPostgrado,
    EstadoEstudiante,
    )
from usuario.serializers import (
    UsuarioListSerializer,
    UsuarioDetailSerializer,
    EstudianteSerializer,
    TipoPostgradoSerializer,
    EstadoEstudianteSerializer,
    EstudianteDetailSerializer,
    )
from rest_framework.generics import (
	ListCreateAPIView,
	RetrieveAPIView,
    RetrieveUpdateAPIView,
    DestroyAPIView,
	)

"""
Usuario
"""
class UsuarioListCreateAPIView(ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioListSerializer

class UsuarioDetailAPIView(RetrieveAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioDetailSerializer

class UsuarioUpdateAPIView(RetrieveUpdateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioDetailSerializer

class UsuarioDeleteAPIView(DestroyAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioDetailSerializer


"""
Estudiante
"""
class EstudianteListCreateAPIView(ListCreateAPIView):
    queryset = Estudiante.objects.all()
    serializer_class = EstudianteSerializer

class EstudianteDetailAPIView(RetrieveAPIView):
    queryset = Estudiante.objects.all()
    serializer_class = EstudianteDetailSerializer

class EstudianteUpdateAPIView(RetrieveUpdateAPIView):
    queryset = Estudiante.objects.all()
    serializer_class = EstudianteDetailSerializer


"""
TipoPostgrado
"""
class TipoPostgradoListCreateAPIView(ListCreateAPIView):
    queryset = TipoPostgrado.objects.all()
    serializer_class = TipoPostgradoSerializer


"""
EstadoEstudiante
"""
class EstadoEstudianteListCreateAPIView(ListCreateAPIView):
    queryset = EstadoEstudiante.objects.all()
    serializer_class = EstadoEstudianteSerializer

# class EstadoEstudianteDetailAPIView(RetrieveAPIView):
#     queryset = EstadoEstudiante.objects.all()
#     serializer_class = EstudianteSerializer