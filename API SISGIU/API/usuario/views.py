from django.shortcuts import render

from rest_framework.permissions import (
    AllowAny,
    IsAdminUser,
    IsAuthenticated,
    IsAuthenticatedOrReadOnly
    )

from .permissions import isOwnerOrReadOnly

from usuario.models import (
    Usuario,
    Estudiante,
    TipoPostgrado,
    EstadoEstudiante,
    PersonalDocente,
    PersonalAdministrativo,
    )
from usuario.serializers import (
    AdministradorListSerializer,
    AdministradorDetailSerializer,
    EstudianteSerializer,
    EstudianteDetailSerializer,
    TipoPostgradoSerializer,
    EstadoEstudianteSerializer,
    DocenteSerializer,
    DocenteDetailSerializer,
    AdministrativoSerializer,
    AdministrativoDetailSerializer
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
class AdministradorListCreateAPIView(ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = AdministradorListSerializer

class AdministradorDetailAPIView(RetrieveAPIView):
    queryset = Usuario.objects.all()
    serializer_class = AdministradorDetailSerializer
    lookup_field = 'cedula'

class AdministradorUpdateAPIView(RetrieveUpdateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = AdministradorDetailSerializer
    lookup_field = 'cedula'

class AdministradorDeleteAPIView(DestroyAPIView):
    queryset = Usuario.objects.all()
    serializer_class = AdministradorDetailSerializer
    lookup_field = 'cedula'


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
    permission_classes = [IsAuthenticatedOrReadOnly, isOwnerOrReadOnly]
    lookup_field = 'usuario__cedula'

class EstudianteDeleteAPIView(DestroyAPIView):
    queryset = Estudiante.objects.all()
    serializer_class = EstudianteDetailSerializer
    permission_classes = [IsAdminUser]
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
    permission_classes = [IsAuthenticatedOrReadOnly, isOwnerOrReadOnly]
    lookup_field = 'usuario__cedula'

class DocenteDeleteAPIView(DestroyAPIView):
    queryset = PersonalDocente.objects.all()
    serializer_class = DocenteDetailSerializer
    permission_classes = [IsAdminUser]
    lookup_field = 'usuario__cedula'



"""
Personal Administrativo
"""
class AdministrativoListCreateAPIView(ListCreateAPIView):
    queryset = PersonalAdministrativo.objects.all()
    serializer_class = AdministrativoSerializer

class AdministrativoDetailAPIView(RetrieveAPIView):
    queryset = PersonalAdministrativo.objects.all()
    serializer_class = AdministrativoDetailSerializer
    lookup_field = 'usuario__cedula'

class AdministrativoUpdateAPIView(RetrieveUpdateAPIView):
    queryset = PersonalAdministrativo.objects.all()
    serializer_class = AdministrativoDetailSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, isOwnerOrReadOnly]
    lookup_field = 'usuario__cedula'

class AdministrativoDeleteAPIView(DestroyAPIView):
    queryset = PersonalAdministrativo.objects.all()
    serializer_class = AdministrativoDetailSerializer
    permission_classes = [IsAdminUser]
    lookup_field = 'usuario__cedula'