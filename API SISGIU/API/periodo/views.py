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
EstadoPeriodo
	Esto solo debe ser tratado por el administrador
"""
class EstadoPeriodoListCreateAPIView(ListCreateAPIView):
    queryset = EstadoPeriodo.objects.all()
    serializer_class = EstadoPeriodoListSerializer
    permission_classes = [IsAuthenticated, IsListOrCreate]

class EstadoPeriodoDetailAPIView(RetrieveAPIView):
    queryset = EstadoPeriodo.objects.all()
    serializer_class = EstadoPeriodoDetailSerializer
    permission_classes = [IsAuthenticated]

class EstadoPeriodoUpdateAPIView(RetrieveUpdateAPIView):
    queryset = EstadoPeriodo.objects.all()
    serializer_class = EstadoPeriodoDetailSerializer
    permission_classes = [IsAdminUser]

class EstadoPeriodoDeleteAPIView(DestroyAPIView):
    queryset = EstadoPeriodo.objects.all()
    serializer_class = EstadoPeriodoDetailSerializer
    permission_classes = [IsAdminUser]


"""
Periodo
		Esto solo debe ser tratado por el administrador
"""
class PeriodoListCreateAPIView(ListCreateAPIView):
    queryset = Periodo.objects.all()
    serializer_class = PeriodoListSerializer
    permission_classes = [IsAuthenticated, IsListOrCreate]

class PeriodoDetailAPIView(RetrieveAPIView):
    queryset = Periodo.objects.all()
    serializer_class = PeriodoDetailSerializer
    permission_classes = [IsAuthenticated]

class PeriodoUpdateAPIView(RetrieveUpdateAPIView):
    queryset = Periodo.objects.all()
    serializer_class = PeriodoDetailSerializer
    permission_classes = [IsAdminUser]

class PeriodoDeleteAPIView(DestroyAPIView):
    queryset = Periodo.objects.all()
    serializer_class = PeriodoDetailSerializer
    permission_classes = [IsAdminUser]


