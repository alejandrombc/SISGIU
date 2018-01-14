from django.shortcuts import render
from tramite.models import (
	EstadoTramite,
	Tramite,
	)
from tramite.serializers import (
	EstadoTramiteListSerializer,
	EstadoTramiteDetailSerializer,
	TramiteListSerializer,
	TramiteDetailSerializer,

	
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
EstadoTramite
				Esto solo debe ser tratado por el administrador
"""
class EstadoTramiteListCreateAPIView(ListCreateAPIView):
    queryset = EstadoTramite.objects.all()
    serializer_class = EstadoTramiteListSerializer
    permission_classes = [IsAuthenticated, IsListOrCreate]

class EstadoTramiteDetailAPIView(RetrieveAPIView):
    queryset = EstadoTramite.objects.all()
    serializer_class = EstadoTramiteDetailSerializer
    permission_classes = [IsAuthenticated]

class EstadoTramiteUpdateAPIView(RetrieveUpdateAPIView):
    queryset = EstadoTramite.objects.all()
    serializer_class = EstadoTramiteDetailSerializer
    permission_classes = [IsAdminUser]

class EstadoTramiteDeleteAPIView(DestroyAPIView):
    queryset = EstadoTramite.objects.all()
    serializer_class = EstadoTramiteDetailSerializer
    permission_classes = [IsAdminUser]


"""
Tramite
"""
class TramiteListCreateAPIView(ListCreateAPIView):
    queryset = Tramite.objects.all()
    serializer_class = TramiteListSerializer
    permission_classes = [IsAuthenticated, IsListOrCreate]

class TramiteDetailAPIView(RetrieveAPIView):
    queryset = Tramite.objects.all()
    serializer_class = TramiteDetailSerializer
    permission_classes = [IsAuthenticated]

class TramiteUpdateAPIView(RetrieveUpdateAPIView):
    queryset = Tramite.objects.all()
    serializer_class = TramiteDetailSerializer
    permission_classes = [IsAdminUser]

class TramiteDeleteAPIView(DestroyAPIView):
    queryset = Tramite.objects.all()
    serializer_class = TramiteDetailSerializer
    permission_classes = [IsAdminUser]