from django.http import HttpResponse
import json
from tramite.models import (
    Tramite,
    EstadoTramite
    )

from usuario.models import (
    Usuario,
    TipoPostgrado,
    PersonalDocente,
    Estudiante,
    )

from asignatura.models import (
    Asignatura,
    TipoAsignatura,
    )

from periodo.models import (
    Periodo,
    EstadoPeriodo,
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
    IsAdminUser,
    IsAuthenticated,
    )

from .permissions import (
    IsListOrCreate,
    EsEstudianteOAdministrador,
    EsDocenteOAdministrador,
    EsAdministrativoOAdministrador,
    )

from django.views.decorators.csrf import csrf_exempt
from usuario.utils import date_handler
from django.db.models import Q

"""
PeriodoEstudiante
Esto solo debe ser tratado por el administrador
"""


class PeriodoEstudianteListCreateAPIView(ListCreateAPIView):
    queryset = PeriodoEstudiante.objects.all()
    serializer_class = PeriodoEstudianteListSerializer
    permission_classes = [EsEstudianteOAdministrador]

    def get_all_estudiantes(request):
        if(request.method == "GET"):
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
        response_data['Error'] = 'No tiene privilegios para realizar esta accion'
        return HttpResponse(json.dumps(response_data), content_type="application/json")

    def get_estudiantes_por_periodo(request, periodo_id):
        if request.method == 'GET':

            periodo_estudiante = PeriodoEstudiante.objects.filter(periodo__id=periodo_id)
            periodo_estudiante = [entry for entry in periodo_estudiante.values()]

            for x in periodo_estudiante:
                estudiante = Usuario.objects.filter(id=x['estudiante_id']).values()[0]
                estudiante['foto'] = request.build_absolute_uri('/') + "media/" + estudiante['foto']
                
                del estudiante['id']
                del estudiante['date_joined']
                del estudiante['is_superuser']
                del estudiante['is_active']
                del estudiante['password']
                # del estudiante['foto']
                del estudiante['last_login']
                del estudiante['is_staff']

                x['estudiante'] = estudiante

                estudiante_asignatura = EstudianteAsignatura.objects.filter(
                    periodo_estudiante_id=x['id'],
                    periodo_estudiante__estudiante__usuario__cedula=estudiante['cedula'])

                estudiante_asignatura = [entry for entry in estudiante_asignatura.values()]

                x['asignaturas'] = []
                for y in estudiante_asignatura:
                    asignatura = Asignatura.objects.filter(id=y['asignatura_id']).values()[0]
                    tipo_asignatura = TipoAsignatura.objects.filter(
                        id=asignatura['tipo_asignatura_id']).values()[0]

                    del asignatura['tipo_asignatura_id']
                    asignatura['tipo_asignatura'] = tipo_asignatura['nombre']
                    x['asignaturas'].append(asignatura)

            return HttpResponse(json.dumps(periodo_estudiante, default=date_handler),
                                content_type="application/json")

        response_data = {}
        response_data['Error'] = 'No tiene privilegios para realizar esta accion'
        return HttpResponse(json.dumps(response_data), content_type="application/json")


class PeriodoEstudianteDetailAPIView():
    def get_periodo(request, cedula, periodo):
        if(request.method == "GET"):
            periodo = periodo.replace("%20", " ")
            member = PeriodoEstudiante.objects.filter(estudiante__usuario__cedula=cedula,
                                                      periodo__estado_periodo__estado=periodo)
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
        response_data['Error'] = 'No tiene privilegios para realizar esta accion'
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

    def programacion_academica(request):
        if (request.method == 'GET'):
            docente_asignatura = DocenteAsignatura.objects.filter(Q(periodo__estado_periodo__estado='activo') | Q(periodo__estado_periodo__estado='en inscripcion')).order_by('periodo_id')

            response = []
            aux_doc_asig = {}
            programacion_academica = []
            asignaturas = {}

            for x in docente_asignatura:
                periodo = Periodo.objects.get(id=x.periodo_id)
                asignatura_codigo = Asignatura.objects.get(id=x.asignatura_id).codigo
                if str(x.periodo_id) not in aux_doc_asig:        
                    if(asignaturas):
                        aux_doc_asig[str(last_period)].append(asignaturas)

                    aux_doc_asig[str(x.periodo_id)] = []
                    last_period = x.periodo_id
                    asignaturas = {}

                if asignatura_codigo not in asignaturas:
                    asignaturas[asignatura_codigo] = []

                    
                docente = Usuario.objects.get(id=x.docente_id)
                asignatura_info = {}
                asignatura_info['first_name'] = docente.first_name
                asignatura_info['last_name'] = docente.last_name
                asignatura_info['hora'] = x.horario_hora
                asignatura_info['dia'] = x.horario_dia
                asignatura_info['aula'] = x.aula

                asignaturas[asignatura_codigo].append(asignatura_info)

            #Append del ultimo periodo
            aux_doc_asig[str(last_period)].append(asignaturas)

            # Agregar tipo de postgrado y descripcion para colocarlo en el arreglo final
            for x in aux_doc_asig:
                temp = {}
                periodo = Periodo.objects.get(id=x)
                temp['tipo_postgrado'] = TipoPostgrado.objects.get(id=periodo.tipo_postgrado_id).tipo
                temp['descripcion'] = periodo.descripcion
                temp['periodo_id'] = x
                temp[x] = []              
                for asignaturas in aux_doc_asig[x]:
                    for codigo in asignaturas:
                        asignatura = Asignatura.objects.get(codigo=codigo)
                        temp_asignatura = {}
                        temp_asignatura[codigo] = asignaturas[codigo]
                        temp_asignatura['nombre'] = asignatura.nombre
                        temp_asignatura['unidad_credito'] = asignatura.unidad_credito
                        temp_asignatura['codigo'] = codigo
                        temp[x].append(temp_asignatura)

                programacion_academica.append(temp)

            return HttpResponse(json.dumps(programacion_academica), content_type="application/json", status=200)

        response_data = {}
        response_data['Error'] = 'No tiene privilegios para realizar esta accion'
        return HttpResponse(json.dumps(response_data), content_type="application/json", status=401)


class DocenteAsignaturaDetailAPIView():
    def get_periodo(request, cedula, periodo):
        if(request.method == "GET"):
            member = DocenteAsignatura.objects.filter(docente__usuario__cedula=cedula,
                                                      periodo__estado_periodo__estado=periodo)
            list_result = [entry for entry in member.values()]

            lista_docentes = []

            for docente_periodo in list_result:
                docente = Usuario.objects.filter(id=docente_periodo['docente_id']).values()[0]
                asignatura = Asignatura.objects.filter(id=docente_periodo['asignatura_id']).values()[0]
                periodo = Periodo.objects.filter(id=docente_periodo['periodo_id']).values()[0]
                tipo_postgrado = TipoPostgrado.objects.filter(id=periodo['tipo_postgrado_id']).values()[0]
                tipo_asignatura = TipoAsignatura.objects.filter(
                    id=asignatura["tipo_asignatura_id"]).values()[0]

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
        response_data['Error'] = 'No tiene privilegios para realizar esta accion'
        return HttpResponse(json.dumps(response_data), content_type="application/json", status=401)

    def get_docente(request, asignatura, periodo):
        periodo = periodo.replace("%20"," ")
        member = DocenteAsignatura.objects.filter(asignatura__codigo=asignatura , periodo__estado_periodo__estado=periodo)
        list_result = [entry for entry in member.values()]

        lista_docentes = [] 

        for docente_periodo in list_result:
            docente = Usuario.objects.filter(id=docente_periodo['docente_id']).values()[0]
            asignatura = Asignatura.objects.filter(id=docente_periodo['asignatura_id']).values()[0]
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
        periodo = periodo.replace("%20", " ")
        tipo_postgrado = tipo_postgrado.replace("%20", " ")
        if(tipo_postgrado != "all"):
            member = DocenteAsignatura.objects.filter(periodo__estado_periodo__estado=periodo, periodo__tipo_postgrado__tipo=tipo_postgrado)
        else:
            member = DocenteAsignatura.objects.filter(periodo__estado_periodo__estado=periodo)
        list_result = [entry for entry in member.values()]
        
        lista_docentes = [] 

        for docente_periodo in list_result:
            docente = Usuario.objects.filter(id=docente_periodo['docente_id']).values()[0]
            asignatura = Asignatura.objects.filter(id=docente_periodo['asignatura_id']).values()[0]
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
            docente_periodo['asignatura']['id'] = docente_periodo['asignatura_id']
            docente_periodo['docente'] = docente_periodo['docente_id']
            docente_periodo['periodo'] = docente_periodo['periodo_id']
            
            del docente_periodo['docente_id']
            del docente_periodo['periodo_id']
            del docente_periodo['asignatura_id']

            lista_docentes.append(docente_periodo)

        return HttpResponse(json.dumps(lista_docentes), content_type="application/json")
        response_data = {}
        response_data['Error'] = 'No tiene privilegios para realizar esta accion'      
        return HttpResponse(json.dumps(response_data), content_type="application/json", status=401)

    @csrf_exempt
    def crearDocenteAsignatura(request, periodo_id):
        response_data = {}

        if(request.method == "POST"):

            body_unicode = request.body.decode('utf-8')
            body = json.loads(body_unicode)
            
            """
            Body contiene un array con todos los docentes_asignaturas. Como hay algunos que ya 
            se deben encontrar en la BD se debe primero evaluar si dicho registro ya existe.
            """
            
            """
            En este arreglo se almacenaran todos los docente_asignatura que SI se deben guardar, 
            cualquiera que no se encuentre aqui hay que eliminarlo dela BD
            """
            array_docente_asignatura = []

            for x in body:
                try:
                    aux = DocenteAsignatura.objects.filter(docente__usuario__cedula=x['usuario']['cedula'], asignatura__codigo=x['asignatura']['codigo'], periodo__id=x['periodo'], aula=x['aula'], horario_dia=x['horario_dia'], horario_hora=x['horario_hora'])
                except:
                    response_data['Error'] = 'Petición Incorrecta.'      
                    return HttpResponse(json.dumps(response_data), content_type="application/json", status=400)

                if ( len(aux) == 0): # Creo el nuevo registro en docente_asignatura
                    docente = PersonalDocente.objects.get(usuario__cedula=x['usuario']['cedula']) # obtengo al docente
                    asignatura = Asignatura.objects.get(codigo=x['asignatura']['codigo']) # obtengo asignatura
                    periodo = Periodo.objects.get(id=x['periodo']) # obtengo periodo
                    # Creo el nuevo objeto
                    obj = DocenteAsignatura.objects.create(docente=docente, asignatura=asignatura, periodo=periodo, aula=x['aula'], horario_dia=x['horario_dia'], horario_hora=x['horario_hora'])
                    array_docente_asignatura.append(obj)
                else:
                    array_docente_asignatura.append(aux.first())

            """
            Aqui se eliminan los docente_asignatura que antes se encontraban 
            en la tabla pero fueron eliminados desde el front
            """
            lista_docentes_asignaturas = DocenteAsignatura.objects.filter(periodo__id=periodo_id)
            
            for x in lista_docentes_asignaturas:
                if (x not in array_docente_asignatura):
                    x.delete()

           
            return HttpResponse(json.dumps({"status":"OK"}), content_type="application/json", status=200)
        
        
        response_data['Error'] = 'No tiene privilegios para realizar esta accion'      
        return HttpResponse(json.dumps(response_data), content_type="application/json", status=405)


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

    @csrf_exempt
    def crear_estudiante_asignatura(request, cedula):
        response_data = {}
        if (request.method == 'POST'):

            body_unicode = request.body.decode('utf-8')
            body = json.loads(body_unicode)

            # En el list 'value' se encuentran los IDs de las asignaturas a agregar
            asignaturas_id = body['value']
            # print(asignaturas_id)

            estudiante = Estudiante.objects.get(usuario__cedula=cedula)
            # print(estudiante.id_tipo_postgrado)

            periodo = Periodo.objects.get(estado_periodo_id__estado='en inscripcion',
                                          tipo_postgrado_id__tipo=estudiante.id_tipo_postgrado)
            # print(periodo)

            periodo_estudiante = PeriodoEstudiante(periodo=periodo, estudiante=estudiante, pagado=False)
            periodo_estudiante.save()

            for x in asignaturas_id:
                asignatura = Asignatura.objects.get(id=x)
                # print(asignatura)
                estudiante_asignatura = EstudianteAsignatura(periodo_estudiante=periodo_estudiante,
                                                             asignatura=asignatura,
                                                             nota_definitiva=0)
                # print(estudiante_asignatura)
                estudiante_asignatura.save()

            response_data['mensaje'] = 'Inscripción realizada exitosamente.'
            return HttpResponse(json.dumps(response_data), content_type="application/json", status=200)

        response_data['Error'] = 'No tiene privilegios para realizar esta acción'
        return HttpResponse(json.dumps(response_data), content_type="application/json", status=401)

    @csrf_exempt
    def modificar_estudiante_asignatura(request, cedula):
        response_data = {}
        if (request.method == 'POST'):

            body_unicode = request.body.decode('utf-8')
            body = json.loads(body_unicode)

            # En el list 'value' se encuentran los IDs de las asignaturas a agregar
            asignaturas_id = body['value']

            estudiante = Estudiante.objects.get(usuario__cedula=cedula)

            periodo = Periodo.objects.get(estado_periodo_id__estado='en inscripcion',
                                          tipo_postgrado_id__tipo=estudiante.id_tipo_postgrado)

            # Si ya existe no hago nada, sino lo creo.
            if not PeriodoEstudiante.objects.filter(periodo=periodo, estudiante=estudiante).exists():
                periodo_estudiante = PeriodoEstudiante(periodo=periodo, estudiante=estudiante, pagado=False)
                periodo_estudiante.save()
            else:
                periodo_estudiante = PeriodoEstudiante.objects.get(periodo=periodo, estudiante=estudiante)

            EstudianteAsignatura.objects.filter(periodo_estudiante=periodo_estudiante).delete()

            for x in asignaturas_id:
                asignatura = Asignatura.objects.get(id=x)
                estudiante_asignatura = EstudianteAsignatura(periodo_estudiante=periodo_estudiante,
                                                             asignatura=asignatura,
                                                             nota_definitiva=0)
                estudiante_asignatura.save()

            response_data['mensaje'] = 'Inscripción realizada exitosamente.'
            return HttpResponse(json.dumps(response_data), content_type="application/json", status=200)

        response_data['Error'] = 'No tiene privilegios para realizar esta acción'
        return HttpResponse(json.dumps(response_data), content_type="application/json", status=401)


class EstudianteAsignaturaDetailAPIView(RetrieveAPIView):
    queryset = EstudianteAsignatura.objects.all()
    serializer_class = EstudianteAsignaturaDetailSerializer
    lookup_field = 'estudiante__usuario__cedula'

    def obtener_informacion_historial(request, cedula):
        if(request.method == "GET"):

            estudiante_asignatura = EstudianteAsignatura.objects.filter(periodo_estudiante__estudiante__usuario__cedula=cedula)

            lista_estudiante_asignatura = [entry for entry in estudiante_asignatura.values()]

            historial_estudiante = {}
            periodos = []
            subPeriodo = []
            periodo_info = {}
            promedio_general = 0
            promedio_ponderado = 0
            cantidad_materias = 0
            cantidad_materias_ponderadas = 0
            cantidad_materias_reprobadas = 0
            cantidad_materias_retiradas = 0

            for x in lista_estudiante_asignatura:
                if subPeriodo == []:
                    id_periodo_estudiante = x['periodo_estudiante_id']

                if id_periodo_estudiante != x['periodo_estudiante_id']:
                    periodos.append(subPeriodo)
                    subPeriodo = []
                    id_periodo_estudiante = x['periodo_estudiante_id']


                periodo_estudiante = PeriodoEstudiante.objects.get(id=id_periodo_estudiante)
                periodo = Periodo.objects.get(id=periodo_estudiante.periodo_id)
                estado_periodo = EstadoPeriodo.objects.get(id=periodo.estado_periodo_id)
                asignatura = Asignatura.objects.get(id=x['asignatura_id'])
                tipo_asignatura = TipoAsignatura.objects.get(id=asignatura.tipo_asignatura_id)

                periodo_info['periodo'] = periodo.descripcion
                periodo_info['asignatura_nombre'] = asignatura.nombre
                periodo_info['asignatura_codigo'] = asignatura.codigo
                periodo_info['unidad_credito'] = asignatura.unidad_credito
                periodo_info['nota_definitiva'] = x['nota_definitiva']
                if(x['retirado']):
                    periodo_info['nota_definitiva'] = "RET"
                    cantidad_materias_retiradas+=1

                periodo_info['tipo_asignatura'] = tipo_asignatura.nombre

                if(estado_periodo.estado == "finalizado"):
                    if(not x['retirado']):
                        promedio_general += periodo_info['nota_definitiva']
                        promedio_ponderado += periodo_info['nota_definitiva'] * periodo_info['unidad_credito']
                        cantidad_materias_ponderadas+=periodo_info['unidad_credito']
                        cantidad_materias+=1
                        if(periodo_info['nota_definitiva'] < 10):
                            cantidad_materias_reprobadas+=1
                
                if estado_periodo.estado == "activo" or estado_periodo.estado == "en inscripcion":
                    if not x['retirado']:
                        periodo_info['nota_definitiva'] = 'SC'

                subPeriodo.append(periodo_info)  
                periodo_info = {}

            periodos.append(subPeriodo)

            historial_estudiante['periodos'] = periodos
            historial_estudiante['total_asignaturas'] = cantidad_materias+cantidad_materias_retiradas
            historial_estudiante['asignaturas_reprobadas'] = cantidad_materias_reprobadas
            historial_estudiante['asignaturas_retiradas'] = cantidad_materias_retiradas
            historial_estudiante['asignaturas_aprobadas'] = cantidad_materias-cantidad_materias_reprobadas
            if cantidad_materias == 0:
                historial_estudiante['promedio_general'] = 0
                historial_estudiante['promedio_ponderado'] = 0
            else:
                historial_estudiante['promedio_general'] = '{0:.2f}'.format(promedio_general/cantidad_materias)
                historial_estudiante['promedio_ponderado'] = '{0:.2f}'.format(promedio_ponderado/cantidad_materias_ponderadas)

            return HttpResponse(json.dumps(historial_estudiante), content_type="application/json")

        response_data = {}
        response_data['Error'] = 'No tiene privilegios para realizar esta acción.'      
        return HttpResponse(json.dumps(response_data), content_type="application/json", status=401)

class EstudianteAsignaturaUpdateAPIView(RetrieveUpdateAPIView):
    queryset = EstudianteAsignatura.objects.all()
    serializer_class = EstudianteAsignaturaDetailSerializer
    permission_classes = [EsDocenteOAdministrador]

    @csrf_exempt
    def cargar_notas(request):
        response_data = {}

        if(request.method == "POST"):

            body_unicode = request.body.decode('utf-8')
            body = json.loads(body_unicode)
            
            """Body contiene un array con todos los estudiantes y su respectiva nota y la cedula del docente """

            for estudiante in body['estudiantes']:
                periodo_estudiante = PeriodoEstudiante.objects.get(periodo__tipo_postgrado__tipo=body['tipo_postgrado'], periodo__estado_periodo__estado='activo', estudiante__usuario__cedula=estudiante['cedula'])
                estudiante_asignatura = EstudianteAsignatura.objects.filter(periodo_estudiante=periodo_estudiante, asignatura__codigo=body['asignatura'])

                estudiante_asignatura.update(nota_definitiva=estudiante['nota_definitiva'])
           
            return HttpResponse(json.dumps({"status":"OK"}), content_type="application/json", status=200)
        
        response_data['Error'] = 'No tiene privilegios para realizar esta accion'      
        return HttpResponse(json.dumps(response_data), content_type="application/json", status=405)

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
        response_data['Error'] = 'No tiene privilegios para realizar esta accion'      
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