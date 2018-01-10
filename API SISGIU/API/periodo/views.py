from django.shortcuts import render
from periodo.models import (
    EstadoPeriodo,
    Periodo,
    )
from periodo.serializers import (
	EstadoPeriodoListSerializer,
	EstadoPeriodoDetailSerializer,
	PeriodoListSerializer,
	PeriodoDetailSerializer
	)
from rest_framework.generics import (
	ListCreateAPIView,
	RetrieveAPIView,
    RetrieveUpdateAPIView,
    DestroyAPIView,
	)

"""
EstadoPeriodo
	Esto solo debe ser tratado por el administrador
"""
class EstadoPeriodoListCreateAPIView(ListCreateAPIView):
    queryset = EstadoPeriodo.objects.all()
    serializer_class = EstadoPeriodoListSerializer

class EstadoPeriodoDetailAPIView(RetrieveAPIView):
    queryset = EstadoPeriodo.objects.all()
    serializer_class = EstadoPeriodoDetailSerializer

class EstadoPeriodoUpdateAPIView(RetrieveUpdateAPIView):
    queryset = EstadoPeriodo.objects.all()
    serializer_class = EstadoPeriodoDetailSerializer

class EstadoPeriodoDeleteAPIView(DestroyAPIView):
    queryset = EstadoPeriodo.objects.all()
    serializer_class = EstadoPeriodoDetailSerializer


"""
Periodo
		Esto solo debe ser tratado por el administrador
"""
class PeriodoListCreateAPIView(ListCreateAPIView):
    queryset = Periodo.objects.all()
    serializer_class = PeriodoListSerializer

class PeriodoDetailAPIView(RetrieveAPIView):
    queryset = Periodo.objects.all()
    serializer_class = PeriodoDetailSerializer

class PeriodoUpdateAPIView(RetrieveUpdateAPIView):
    queryset = Periodo.objects.all()
    serializer_class = PeriodoDetailSerializer

class PeriodoDeleteAPIView(DestroyAPIView):
    queryset = Periodo.objects.all()
    serializer_class = PeriodoDetailSerializer


