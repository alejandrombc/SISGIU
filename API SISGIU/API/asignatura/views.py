from django.shortcuts import render
from django.http import HttpResponse
import json
from asignatura.models import (
	TipoAsignatura,
	Asignatura,
	)
from relacion.models import (
    DocenteAsignatura,
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

    def get_asignaturas_por_docente(request, cedula):
        if (request.user.is_anonymous == False):
            member = DocenteAsignatura.objects.filter(docente__usuario__cedula=cedula , periodo__estado_periodo__estado="activo")
            # member = DocenteAsignatura.objects.filter(docente__usuario__cedula=cedula)

            member = member.values()
            lista_docente_asignatura = [entry for entry in member]  # converts ValuesQuerySet into Python list
            
            print('\n\n###############')
        
            # print(lista_docente_asignatura)
            # print('\n')
            lista_asignaturas = []

            for docente_asignatura in lista_docente_asignatura:
                asignatura = Asignatura.objects.filter(id=docente_asignatura['asignatura_id']).values()[0]
                lista_asignaturas.append(asignatura)

            print('la lista de asignaturas es = ' + str(lista_asignaturas))

            print('##############\n\n')
            return HttpResponse(json.dumps(lista_asignaturas), content_type="application/json")
        response_data = {}
        response_data['error'] = 'No tiene privilegios para realizar esta accion'      
        return HttpResponse(json.dumps(response_data), content_type="application/json")


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