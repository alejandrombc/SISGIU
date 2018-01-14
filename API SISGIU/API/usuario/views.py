from django.shortcuts import render

from rest_framework.permissions import (
    AllowAny,
    IsAdminUser,
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
    )

from .permissions import (
    isOwnerOrReadOnly, 
    IsListOrCreate,
    )

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
    permission_classes = [IsAdminUser]

class AdministradorDetailAPIView(RetrieveAPIView):
    queryset = Usuario.objects.all()
    serializer_class = AdministradorDetailSerializer
    lookup_field = 'cedula'
    permission_classes = [IsAdminUser]

class AdministradorUpdateAPIView(RetrieveUpdateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = AdministradorDetailSerializer
    lookup_field = 'cedula'
    permission_classes = [IsAdminUser]

class AdministradorDeleteAPIView(DestroyAPIView):
    queryset = Usuario.objects.all()
    serializer_class = AdministradorDetailSerializer
    lookup_field = 'cedula'
    permission_classes = [IsAdminUser]


"""
Estudiante
"""
class EstudianteListCreateAPIView(ListCreateAPIView):
    queryset = Estudiante.objects.all()
    serializer_class = EstudianteSerializer
    permission_classes = [IsAuthenticated, IsListOrCreate]

class EstudianteDetailAPIView(RetrieveAPIView):
    queryset = Estudiante.objects.all()
    serializer_class = EstudianteDetailSerializer
    lookup_field = 'usuario__cedula'
    permission_classes = [IsAuthenticated]

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
    permission_classes = [IsListOrCreate, IsAuthenticated]


class TipoPostgradoDeleteAPIView(DestroyAPIView):
    queryset = TipoPostgrado.objects.all()
    serializer_class = TipoPostgradoSerializer
    permission_classes = [IsAdminUser]


"""
EstadoEstudiante
"""
class EstadoEstudianteListCreateAPIView(ListCreateAPIView):
    queryset = EstadoEstudiante.objects.all()
    serializer_class = EstadoEstudianteSerializer
    permission_classes = [IsListOrCreate, IsAuthenticated]


class EstadoEstudianteDeleteAPIView(DestroyAPIView):
    queryset = EstadoEstudiante.objects.all()
    serializer_class = EstadoEstudianteSerializer
    permission_classes = [IsAdminUser]





"""
Docente
"""
class DocenteListCreateAPIView(ListCreateAPIView):
    queryset = PersonalDocente.objects.all()
    serializer_class = DocenteSerializer
    permission_classes = [IsAuthenticated, IsListOrCreate]

class DocenteDetailAPIView(RetrieveAPIView):
    queryset = PersonalDocente.objects.all()
    serializer_class = DocenteDetailSerializer
    permission_classes = [IsAuthenticated]
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
    permission_classes = [IsAuthenticated, IsListOrCreate]

class AdministrativoDetailAPIView(RetrieveAPIView):
    queryset = PersonalAdministrativo.objects.all()
    serializer_class = AdministrativoDetailSerializer
    permission_classes = [IsAuthenticated]
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