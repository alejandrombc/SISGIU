from django.shortcuts import render
from django.http import HttpResponse
import json
from relacion.models import (
	PeriodoEstudiante,
	DocenteAsignatura,
	EstudianteAsignatura,
	EstudianteTramite,
	AsignaturaTipoPostgrado,
	)

from relacion.serializers import (
	PeriodoEstudianteListSerializer,
	PeriodoEstudianteDetailSerializer,
	DocenteAsignaturaListSerializer,
	DocenteAsignaturaDetailSerializer,
	EstudianteAsignaturaListSerializer,
	EstudianteAsignaturaDetailSerializer,
	EstudianteTramiteListSerializer,
	EstudianteTramiteDetailSerializer,
	AsignaturaTipoPostgradoListSerializer,
	AsignaturaTipoPostgradoDetailSerializer,

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
    EsEstudianteOAdministrador,
    EsDocenteOAdministrador,
    EsAdministrativoOAdministrador,
    )

"""
PeriodoEstudiante
				Esto solo debe ser tratado por el administrador
"""
class PeriodoEstudianteListCreateAPIView(ListCreateAPIView):
    queryset = PeriodoEstudiante.objects.all()
    serializer_class = PeriodoEstudianteListSerializer
    permission_classes = [EsEstudianteOAdministrador]


class PeriodoEstudianteDetailAPIView():
    def get_periodo(request, cedula, periodo):
        if(request.user.is_anonymous == False):
            member = PeriodoEstudiante.objects.filter(estudiante__usuario__cedula=cedula , periodo__estado_periodo__estado=periodo)
            list_result = [entry for entry in member.values()]
            return HttpResponse(json.dumps(list_result), content_type="application/json")
        response_data = {}
        response_data['error'] = 'No tiene privilegios para realizar esta accion'      
        return HttpResponse(json.dumps(response_data), content_type="application/json")

class PeriodoEstudianteUpdateAPIView(RetrieveUpdateAPIView):
    queryset = PeriodoEstudiante.objects.all()
    serializer_class = PeriodoEstudianteDetailSerializer
    permission_classes = [EsAdministrativoOAdministrador]

class PeriodoEstudianteDeleteAPIView(DestroyAPIView):
    queryset = PeriodoEstudiante.objects.all()
    serializer_class = PeriodoEstudianteDetailSerializer
    permission_classes = [IsAdminUser]


"""
DocenteAsignatura
				Esto solo debe ser tratado por el administrador
"""
class DocenteAsignaturaListCreateAPIView(ListCreateAPIView):
    queryset = DocenteAsignatura.objects.all()
    serializer_class = DocenteAsignaturaListSerializer
    permission_classes = [EsAdministrativoOAdministrador]

class DocenteAsignaturaDetailAPIView():
    def get_periodo(request, cedula, periodo):
        if(request.user.is_anonymous == False):
            member = DocenteAsignatura.objects.filter(docente__usuario__cedula=cedula , periodo__estado_periodo__estado=periodo)
            list_result = [entry for entry in member.values()]
            return HttpResponse(json.dumps(list_result), content_type="application/json")
        response_data = {}
        response_data['error'] = 'No tiene privilegios para realizar esta accion'      
        return HttpResponse(json.dumps(response_data), content_type="application/json")

    def get_docente(request, asignatura, periodo):
        if(request.user.is_anonymous == False):
            member = DocenteAsignatura.objects.filter(asignatura__codigo=asignatura , periodo__estado_periodo__estado=periodo)
            list_result = [entry for entry in member.values()]
            return HttpResponse(json.dumps(list_result), content_type="application/json")
        response_data = {}
        response_data['error'] = 'No tiene privilegios para realizar esta accion'      
        return HttpResponse(json.dumps(response_data), content_type="application/json")

class DocenteAsignaturaUpdateAPIView(RetrieveUpdateAPIView):
    queryset = DocenteAsignatura.objects.all()
    serializer_class = DocenteAsignaturaDetailSerializer
    permission_classes = [EsAdministrativoOAdministrador]

class DocenteAsignaturaDeleteAPIView(DestroyAPIView):
    queryset = DocenteAsignatura.objects.all()
    serializer_class = DocenteAsignaturaDetailSerializer
    permission_classes = [IsAdminUser]


"""
EstudianteAsignatura
				Esto solo debe ser tratado por el administrador
"""
class EstudianteAsignaturaListCreateAPIView(ListCreateAPIView):
    queryset = EstudianteAsignatura.objects.all()
    serializer_class = EstudianteAsignaturaListSerializer
    permission_classes = [EsEstudianteOAdministrador]

class EstudianteAsignaturaDetailAPIView(RetrieveAPIView):
    queryset = EstudianteAsignatura.objects.all()
    serializer_class = EstudianteAsignaturaDetailSerializer
    lookup_field = 'estudiante__usuario__cedula'

class EstudianteAsignaturaUpdateAPIView(RetrieveUpdateAPIView):
    queryset = EstudianteAsignatura.objects.all()
    serializer_class = EstudianteAsignaturaDetailSerializer
    permission_classes = [EsDocenteOAdministrador]

class EstudianteAsignaturaDeleteAPIView(DestroyAPIView):
    queryset = EstudianteAsignatura.objects.all()
    serializer_class = EstudianteAsignaturaDetailSerializer
    permission_classes = [IsAdminUser]


"""
EstudianteTramite
				Esto solo debe ser tratado por el administrador
"""
class EstudianteTramiteListCreateAPIView(ListCreateAPIView):
    queryset = EstudianteTramite.objects.all()
    serializer_class = EstudianteTramiteListSerializer
    permission_classes = [EsEstudianteOAdministrador]

class EstudianteTramiteDetailAPIView(RetrieveAPIView):
    queryset = EstudianteTramite.objects.all()
    serializer_class = EstudianteTramiteDetailSerializer
    lookup_field = 'estudiante__usuario__cedula'
    permission_classes = [IsAuthenticated]

class EstudianteTramiteUpdateAPIView(RetrieveUpdateAPIView):
    queryset = EstudianteTramite.objects.all()
    serializer_class = EstudianteTramiteDetailSerializer
    permission_classes = [EsAdministrativoOAdministrador]

class EstudianteTramiteDeleteAPIView(DestroyAPIView):
    queryset = EstudianteTramite.objects.all()
    serializer_class = EstudianteTramiteDetailSerializer
    permission_classes = [EsAdministrativoOAdministrador]


"""
AsignaturaTipoPostgrado
				Esto solo debe ser tratado por el administrador
"""
class AsignaturaTipoPostgradoListCreateAPIView(ListCreateAPIView):
    queryset = AsignaturaTipoPostgrado.objects.all()
    serializer_class = AsignaturaTipoPostgradoListSerializer
    permission_classes = [IsListOrCreate]

class AsignaturaTipoPostgradoDetailAPIView(RetrieveAPIView):
    queryset = AsignaturaTipoPostgrado.objects.all()
    serializer_class = AsignaturaTipoPostgradoDetailSerializer
    lookup_field = 'estudiante__usuario__cedula'
    permission_classes = [IsAuthenticated]

class AsignaturaTipoPostgradoUpdateAPIView(RetrieveUpdateAPIView):
    queryset = AsignaturaTipoPostgrado.objects.all()
    serializer_class = AsignaturaTipoPostgradoDetailSerializer
    permission_classes = [IsAdminUser]


class AsignaturaTipoPostgradoDeleteAPIView(DestroyAPIView):
    queryset = AsignaturaTipoPostgrado.objects.all()
    serializer_class = AsignaturaTipoPostgradoDetailSerializer
    permission_classes = [IsAdminUser]