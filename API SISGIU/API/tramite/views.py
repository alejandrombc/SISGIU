from django.shortcuts import render
from django.http import HttpResponse
import json
from tramite.models import (
	EstadoTramite,
	Tramite,
	)
from relacion.models import (
    EstudianteTramite,
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
    def get_tramites_por_estudiante(request, cedula):
        if (request.user.is_anonymous == False):
            member = EstudianteTramite.objects.filter(estudiante__usuario__cedula=cedula).values()

            lista_estudiante_tramite = [entry for entry in member]

            lista_tramites = []
            for estudiante_tramite in lista_estudiante_tramite:
                tramite = Tramite.objects.filter(id=estudiante_tramite['tramite_id']).values()[0]
                tramite['estado_valor'] = EstadoTramite.objects.filter(id=estudiante_tramite['estado_tramite_id']).values()[0]
                tramite['fecha_creacion'] = str(estudiante_tramite['fecha_creacion'])
                tramite['fecha_tope'] = str(estudiante_tramite['fecha_tope'])
                tramite['mensaje_tramite'] = estudiante_tramite['mensaje']

                del tramite['id'] 
                del tramite['estado_valor']['id']
                lista_tramites.append(tramite)

            return HttpResponse(json.dumps(lista_tramites) , content_type="application/json")
        response_data = {}
        response_data['error'] = 'No tiene privilegios para realizar esta accion'      
        return HttpResponse(json.dumps(response_data), content_type="application/json")


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