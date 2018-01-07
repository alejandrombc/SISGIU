from django.shortcuts import render

from usuario.models import (
    Usuario,
    Estudiante,
    TipoPostgrado,
    EstadoEstudiante,
    PersonalDocente,
    )
from usuario.serializers import (
    UsuarioListSerializer,
    UsuarioDetailSerializer,
    EstudianteSerializer,
    EstudianteDetailSerializer,
    TipoPostgradoSerializer,
    EstadoEstudianteSerializer,
    DocenteSerializer,
    DocenteDetailSerializer,
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
    lookup_field = 'cedula'

class UsuarioUpdateAPIView(RetrieveUpdateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioDetailSerializer
    lookup_field = 'cedula'

class UsuarioDeleteAPIView(DestroyAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioDetailSerializer
    # lookup_field = 'cedula'


"""
Estudiante
"""
class EstudianteListCreateAPIView(ListCreateAPIView):
    queryset = Estudiante.objects.all()
    serializer_class = EstudianteSerializer

class EstudianteDetailAPIView(RetrieveAPIView):
    queryset = Estudiante.objects.all()
    serializer_class = EstudianteDetailSerializer
    lookup_field = 'usuario__cedula'

class EstudianteUpdateAPIView(RetrieveUpdateAPIView):
    queryset = Estudiante.objects.all()
    serializer_class = EstudianteDetailSerializer
    lookup_field = 'usuario__cedula'


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


"""
Docente
"""
class DocenteListCreateAPIView(ListCreateAPIView):
    queryset = PersonalDocente.objects.all()
    serializer_class = DocenteSerializer

class DocenteDetailAPIView(RetrieveAPIView):
    queryset = PersonalDocente.objects.all()
    serializer_class = DocenteDetailSerializer
    lookup_field = 'usuario__cedula'

class DocenteUpdateAPIView(RetrieveUpdateAPIView):
    queryset = PersonalDocente.objects.all()
    serializer_class = DocenteDetailSerializer
    lookup_field = 'usuario__cedula'
