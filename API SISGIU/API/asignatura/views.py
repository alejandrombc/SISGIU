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

"""
TipoAsignatura
				Esto solo debe ser tratado por el administrador
"""
class TipoAsignaturaListCreateAPIView(ListCreateAPIView):
    queryset = TipoAsignatura.objects.all()
    serializer_class = TipoAsignaturaListSerializer
    permission_classes = [IsAuthenticated, IsListOrCreate]

class TipoAsignaturaDetailAPIView(RetrieveAPIView):
    queryset = TipoAsignatura.objects.all()
    serializer_class = TipoAsignaturaDetailSerializer
    permission_classes = [IsAuthenticated]

class TipoAsignaturaUpdateAPIView(RetrieveUpdateAPIView):
    queryset = TipoAsignatura.objects.all()
    serializer_class = TipoAsignaturaDetailSerializer
    permission_classes = [IsAdminUser]

class TipoAsignaturaDeleteAPIView(DestroyAPIView):
    queryset = TipoAsignatura.objects.all()
    serializer_class = TipoAsignaturaDetailSerializer
    permission_classes = [IsAdminUser]


"""
Asignatura
				Esto solo debe ser tratado por el administrador
"""
class AsignaturaListCreateAPIView(ListCreateAPIView):
    queryset = Asignatura.objects.all()
    serializer_class = AsignaturaListSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsListOrCreate]

class AsignaturaDetailAPIView(RetrieveAPIView):
    queryset = Asignatura.objects.all()
    serializer_class = AsignaturaDetailSerializer
    permission_classes = [IsAuthenticated]

class AsignaturaUpdateAPIView(RetrieveUpdateAPIView):
    queryset = Asignatura.objects.all()
    serializer_class = AsignaturaDetailSerializer
    permission_classes = [IsAdminUser]

class AsignaturaDeleteAPIView(DestroyAPIView):
    queryset = Asignatura.objects.all()
    serializer_class = AsignaturaDetailSerializer
    permission_classes = [IsAdminUser]