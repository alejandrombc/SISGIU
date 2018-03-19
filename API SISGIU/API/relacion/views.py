from django.shortcuts import render
from django.http import HttpResponse
import json
from tramite.models import (
    Tramite,
    EstadoTramite
    )

from usuario.models import (
    Usuario,
    TipoPostgrado,
    )

from asignatura.models import (
    Asignatura,
    TipoAsignatura
    )

from periodo.models import (
    Periodo,
    )

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

    def get_all_estudiantes(request):
        if(request.user.is_anonymous == False):
            member = PeriodoEstudiante.objects.filter(periodo__estado_periodo__estado="activo")
            list_result = [entry for entry in member.values()]

            lista_estudiantes = [] 

            for estudiante_periodo in list_result:
                estudiante = Usuario.objects.filter(id=estudiante_periodo['estudiante_id']).values()[0]
                periodo = Periodo.objects.filter(id=estudiante_periodo['periodo_id']).values()[0]
                tipo_postgrado = TipoPostgrado.objects.filter(id=periodo['tipo_postgrado_id']).values()[0]

                estudiante_periodo['usuario'] = {}
                estudiante_periodo['tipo_postgrado'] = tipo_postgrado['tipo']
                estudiante_periodo['usuario']['first_name'] = estudiante['first_name']
                estudiante_periodo['usuario']['last_name'] = estudiante['last_name']
                estudiante_periodo['usuario']['cedula'] = estudiante['cedula']

                del estudiante_periodo['estudiante_id']
                del estudiante_periodo['periodo_id']

                lista_estudiantes.append(estudiante_periodo)

            return HttpResponse(json.dumps(lista_estudiantes), content_type="application/json")
        response_data = {}
        response_data['error'] = 'No tiene privilegios para realizar esta accion'      
        return HttpResponse(json.dumps(response_data), content_type="application/json")



class PeriodoEstudianteDetailAPIView():
    def get_periodo(request, cedula, periodo):
        if(request.user.is_anonymous == False):
            member = PeriodoEstudiante.objects.filter(estudiante__usuario__cedula=cedula , periodo__estado_periodo__estado=periodo)
            list_result = [entry for entry in member.values()]

            lista_estudiantes = [] 

            for estudiante_periodo in list_result:
                estudiante = Usuario.objects.filter(id=estudiante_periodo['estudiante_id']).values()[0]
                periodo = Periodo.objects.filter(id=estudiante_periodo['periodo_id']).values()[0]
                tipo_postgrado = TipoPostgrado.objects.filter(id=periodo['tipo_postgrado_id']).values()[0]

                estudiante_periodo['usuario'] = {}
                estudiante_periodo['tipo_postgrado'] = tipo_postgrado['tipo']
                estudiante_periodo['usuario']['first_name'] = estudiante['first_name']
                estudiante_periodo['usuario']['last_name'] = estudiante['last_name']
                estudiante_periodo['usuario']['cedula'] = estudiante['cedula']

                del estudiante_periodo['estudiante_id']
                del estudiante_periodo['periodo_id']

                lista_estudiantes.append(estudiante_periodo)

            return HttpResponse(json.dumps(lista_estudiantes), content_type="application/json")
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

            lista_docentes = [] 

            for docente_periodo in list_result:
                docente = Usuario.objects.filter(id=docente_periodo['docente_id']).values()[0]
                asignatura = Asignatura.objects.filter(id=docente_periodo['asignatura_id']).values()[0]
                tipo_asignatura = TipoAsignatura.objects.filter(id=asignatura['tipo_asignatura_id']).values()[0]
                periodo = Periodo.objects.filter(id=docente_periodo['periodo_id']).values()[0]
                tipo_postgrado = TipoPostgrado.objects.filter(id=periodo['tipo_postgrado_id']).values()[0]

                docente_periodo['usuario'] = {}
                docente_periodo['asignatura'] = {}
                docente_periodo['tipo_postgrado'] = tipo_postgrado['tipo']
                docente_periodo['usuario']['first_name'] = docente['first_name']
                docente_periodo['usuario']['last_name'] = docente['last_name']
                docente_periodo['usuario']['cedula'] = docente['cedula']
                docente_periodo['asignatura']['codigo'] = asignatura['codigo']
                docente_periodo['asignatura']['nombre'] = asignatura['nombre']
                docente_periodo['asignatura']['unidad_credito'] = asignatura['unidad_credito']
                docente_periodo['asignatura']['tipo_asignatura'] = tipo_asignatura['nombre']


                del docente_periodo['docente_id']
                del docente_periodo['periodo_id']
                del docente_periodo['asignatura_id']

                lista_docentes.append(docente_periodo)

            return HttpResponse(json.dumps(lista_docentes), content_type="application/json")
        response_data = {}
        response_data['error'] = 'No tiene privilegios para realizar esta accion'      
        return HttpResponse(json.dumps(response_data), content_type="application/json", status=401)

    def get_docente(request, asignatura, periodo):
        print(request.user.is_anonymous)
        member = DocenteAsignatura.objects.filter(asignatura__codigo=asignatura , periodo__estado_periodo__estado=periodo)
        list_result = [entry for entry in member.values()]

        lista_docentes = [] 

        for docente_periodo in list_result:
            docente = Usuario.objects.filter(id=docente_periodo['docente_id']).values()[0]
            asignatura = Asignatura.objects.filter(id=docente_periodo['asignatura_id']).values()[0]
            tipo_asignatura = TipoAsignatura.objects.filter(id=asignatura['tipo_asignatura_id']).values()[0]
            periodo = Periodo.objects.filter(id=docente_periodo['periodo_id']).values()[0]
            tipo_postgrado = TipoPostgrado.objects.filter(id=periodo['tipo_postgrado_id']).values()[0]

            docente_periodo['usuario'] = {}
            docente_periodo['asignatura'] = {}
            docente_periodo['tipo_postgrado'] = tipo_postgrado['tipo']
            docente_periodo['usuario']['first_name'] = docente['first_name']
            docente_periodo['usuario']['last_name'] = docente['last_name']
            docente_periodo['usuario']['cedula'] = docente['cedula']
            docente_periodo['asignatura']['codigo'] = asignatura['codigo']
            docente_periodo['asignatura']['nombre'] = asignatura['nombre']
            docente_periodo['asignatura']['unidad_credito'] = asignatura['unidad_credito']
            docente_periodo['asignatura']['tipo_asignatura'] = tipo_asignatura['nombre']


            del docente_periodo['docente_id']
            del docente_periodo['periodo_id']
            del docente_periodo['asignatura_id']

            lista_docentes.append(docente_periodo)

        return HttpResponse(json.dumps(lista_docentes), content_type="application/json")

    def get_all_docentes(request, periodo, tipo_postgrado):
        if(tipo_postgrado != "all"):
            member = DocenteAsignatura.objects.filter(periodo__estado_periodo__estado=periodo, periodo__tipo_postgrado__tipo=tipo_postgrado)
        else:
            member = DocenteAsignatura.objects.filter(periodo__estado_periodo__estado=periodo)
        list_result = [entry for entry in member.values()]
        
        lista_docentes = [] 

        for docente_periodo in list_result:
            docente = Usuario.objects.filter(id=docente_periodo['docente_id']).values()[0]
            asignatura = Asignatura.objects.filter(id=docente_periodo['asignatura_id']).values()[0]
            tipo_asignatura = TipoAsignatura.objects.filter(id=asignatura['tipo_asignatura_id']).values()[0]
            periodo = Periodo.objects.filter(id=docente_periodo['periodo_id']).values()[0]
            tipo_postgrado = TipoPostgrado.objects.filter(id=periodo['tipo_postgrado_id']).values()[0]
            """
            docente = Usuario.objects.get(id=docente_periodo['docente_id']).values()[0]
            asignatura = Asignatura.objects.get(id=docente_periodo['asignatura_id']).values()[0]
            tipo_asignatura = TipoAsignatura.objects.get(id=asignatura['tipo_asignatura_id']).values()[0]
            periodo = Periodo.objects.get(id=docente_periodo['periodo_id']).values()[0]
            tipo_postgrado = TipoPostgrado.objects.get(id=periodo['tipo_postgrado_id']).values()[0]
            """
            docente_periodo['usuario'] = {}
            docente_periodo['asignatura'] = {}
            docente_periodo['tipo_postgrado'] = tipo_postgrado['tipo']
            docente_periodo['usuario']['first_name'] = docente['first_name']
            docente_periodo['usuario']['id'] = docente['id']
            docente_periodo['usuario']['last_name'] = docente['last_name']
            docente_periodo['usuario']['cedula'] = docente['cedula']
            docente_periodo['asignatura']['codigo'] = asignatura['codigo']
            docente_periodo['asignatura']['nombre'] = asignatura['nombre']
            docente_periodo['asignatura']['unidad_credito'] = asignatura['unidad_credito']
            docente_periodo['asignatura']['tipo_asignatura'] = tipo_asignatura['nombre']
            docente_periodo['asignatura']['id'] = docente_periodo['asignatura_id']

            # del docente_periodo['docente_id']
            # del docente_periodo['periodo_id']
            del docente_periodo['asignatura_id']

            lista_docentes.append(docente_periodo)

        return HttpResponse(json.dumps(lista_docentes), content_type="application/json")
        response_data = {}
        response_data['error'] = 'No tiene privilegios para realizar esta accion'      
        return HttpResponse(json.dumps(response_data), content_type="application/json", status=401)



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

    def get_tramites(request):
        if (request.user.is_anonymous == False):
            tramites = EstudianteTramite.objects.all().values()

            lista_estudiante_tramite = [entry for entry in tramites]

            lista_tramites = []
            for estudiante_tramite in lista_estudiante_tramite:
                tramite = Tramite.objects.filter(id=estudiante_tramite['tramite_id']).values()[0]
                tramite['estado_valor'] = EstadoTramite.objects.filter(id=estudiante_tramite['estado_tramite_id']).values()[0]
                tramite['fecha_creacion'] = str(estudiante_tramite['fecha_creacion'])
                tramite['fecha_tope'] = str(estudiante_tramite['fecha_tope'])
                tramite['mensaje_tramite'] = estudiante_tramite['mensaje']

                del tramite['estado_valor']['id']
                lista_tramites.append(tramite)

            return HttpResponse(json.dumps(lista_tramites) , content_type="application/json")
        response_data = {}
        response_data['error'] = 'No tiene privilegios para realizar esta accion'      
        return HttpResponse(json.dumps(response_data), content_type="application/json")


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