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


"""
EstadoTramite
				Esto solo debe ser tratado por el administrador
"""
class EstadoTramiteListCreateAPIView(ListCreateAPIView):
    queryset = EstadoTramite.objects.all()
    serializer_class = EstadoTramiteListSerializer

class EstadoTramiteDetailAPIView(RetrieveAPIView):
    queryset = EstadoTramite.objects.all()
    serializer_class = EstadoTramiteDetailSerializer

class EstadoTramiteUpdateAPIView(RetrieveUpdateAPIView):
    queryset = EstadoTramite.objects.all()
    serializer_class = EstadoTramiteDetailSerializer

class EstadoTramiteDeleteAPIView(DestroyAPIView):
    queryset = EstadoTramite.objects.all()
    serializer_class = EstadoTramiteDetailSerializer


"""
Tramite
"""
class TramiteListCreateAPIView(ListCreateAPIView):
    queryset = Tramite.objects.all()
    serializer_class = TramiteListSerializer

class TramiteDetailAPIView(RetrieveAPIView):
    queryset = Tramite.objects.all()
    serializer_class = TramiteDetailSerializer

class TramiteUpdateAPIView(RetrieveUpdateAPIView):
    queryset = Tramite.objects.all()
    serializer_class = TramiteDetailSerializer

class TramiteDeleteAPIView(DestroyAPIView):
    queryset = Tramite.objects.all()
    serializer_class = TramiteDetailSerializer