#region imports
from django.http import HttpResponse
import json
import requests
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
	AsignaturaTipoPostgrado,
	)

from relacion.serializers import (
	PeriodoEstudianteListSerializer,
	DocenteAsignaturaListSerializer,
	EstudianteAsignaturaListSerializer,
	AsignaturaTipoPostgradoListSerializer,

	)
from rest_framework.generics import (
	ListCreateAPIView,
	RetrieveAPIView,
	RetrieveUpdateAPIView,
	DestroyAPIView,
	)

from rest_framework.permissions import IsAdminUser

from .permissions import (
	IsListOrCreate,
	EsEstudianteOAdministrador,
	EsDocenteOAdministrador,
	EsAdministrativoOAdministrador,
	)

from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q, Count
from rest_framework.decorators import permission_classes, api_view
from usuario.permissions import isAdministrativoOrEstudianteOrAdmin, isAdministrativoOrDocenteOrAdmin, isDocenteOrAdmin, isEstudianteOrAdmin, isAdministrativoOrAdmin
from rest_framework import status
from rest_framework.response import Response
from usuario.utils import render_to_pdf
#endregion


#region PeriodoEstudiante
class PeriodoEstudianteListCreateAPIView(ListCreateAPIView):
	queryset = PeriodoEstudiante.objects.all()
	serializer_class = PeriodoEstudianteListSerializer
	permission_classes = [isEstudianteOrAdmin]


class PeriodoEstudianteUpdateAPIView(RetrieveUpdateAPIView):
	queryset = PeriodoEstudiante.objects.all()
	serializer_class = PeriodoEstudianteListSerializer
	permission_classes = [isAdministrativoOrAdmin]


class PeriodoEstudianteDeleteAPIView(DestroyAPIView):
	queryset = PeriodoEstudiante.objects.all()
	serializer_class = PeriodoEstudianteListSerializer
	permission_classes = [IsAdminUser]
#endregion


#region DocenteAsignatura
class DocenteAsignaturaListCreateAPIView(ListCreateAPIView):
	queryset = DocenteAsignatura.objects.all()
	serializer_class = DocenteAsignaturaListSerializer
	permission_classes = [IsAdminUser]


class DocenteAsignaturaUpdateAPIView(RetrieveUpdateAPIView):
	queryset = DocenteAsignatura.objects.all()
	serializer_class = DocenteAsignaturaListSerializer
	permission_classes = [IsAdminUser]


class DocenteAsignaturaDeleteAPIView(DestroyAPIView):
	queryset = DocenteAsignatura.objects.all()
	serializer_class = DocenteAsignaturaListSerializer
	permission_classes = [IsAdminUser]
#endregion


#region EstudianteAsignatura
class EstudianteAsignaturaListCreateAPIView(ListCreateAPIView):
	queryset = EstudianteAsignatura.objects.all()
	serializer_class = EstudianteAsignaturaListSerializer
	permission_classes = [EsEstudianteOAdministrador]


class EstudianteAsignaturaDetailAPIView(RetrieveAPIView):
	queryset = EstudianteAsignatura.objects.all()
	serializer_class = EstudianteAsignaturaListSerializer
	lookup_field = 'estudiante__usuario__cedula'


class EstudianteAsignaturaUpdateAPIView(RetrieveUpdateAPIView):
	queryset = EstudianteAsignatura.objects.all()
	serializer_class = EstudianteAsignaturaListSerializer
	permission_classes = [EsDocenteOAdministrador]


class EstudianteAsignaturaDeleteAPIView(DestroyAPIView):
	queryset = EstudianteAsignatura.objects.all()
	serializer_class = EstudianteAsignaturaListSerializer
	permission_classes = [IsAdminUser]
#endregion


#region AsignaturaTipoPostgrado
class AsignaturaTipoPostgradoListCreateAPIView(ListCreateAPIView):
	queryset = AsignaturaTipoPostgrado.objects.all()
	serializer_class = AsignaturaTipoPostgradoListSerializer
	permission_classes = [IsListOrCreate]


class AsignaturaTipoPostgradoDetailAPIView(RetrieveAPIView):
	queryset = AsignaturaTipoPostgrado.objects.all()
	serializer_class = AsignaturaTipoPostgradoListSerializer
	lookup_field = 'estudiante__usuario__cedula'
	permission_classes = []


class AsignaturaTipoPostgradoUpdateAPIView(RetrieveUpdateAPIView):
	queryset = AsignaturaTipoPostgrado.objects.all()
	serializer_class = AsignaturaTipoPostgradoListSerializer
	permission_classes = [IsAdminUser]


class AsignaturaTipoPostgradoDeleteAPIView(DestroyAPIView):
	queryset = AsignaturaTipoPostgrado.objects.all()
	serializer_class = AsignaturaTipoPostgradoListSerializer
	permission_classes = [IsAdminUser]
#endregion


#region Otros
@api_view(['GET'])
@permission_classes((isAdministrativoOrAdmin, ))
def get_estudiantes_por_periodo(request, periodo_id):

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

	return Response(periodo_estudiante, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes((isEstudianteOrAdmin, ))
def get_periodo(request, cedula, periodo):
	periodo = periodo.replace("%20", " ")
	member = PeriodoEstudiante.objects.filter(estudiante__usuario__cedula=cedula, periodo__estado_periodo__estado=periodo)
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

	return Response(lista_estudiantes, status=status.HTTP_200_OK)


@api_view(['GET'])
def programacion_academica(request):
	docente_asignatura = DocenteAsignatura.objects.filter(Q(periodo__estado_periodo__estado='activo') | Q(periodo__estado_periodo__estado='en inscripcion')).order_by('periodo_id')

	response = []
	aux_doc_asig = {}
	programacion_academica = []
	asignaturas = {}
	if(docente_asignatura):
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
			asignatura_info['piso'] = x.piso

			asignaturas[asignatura_codigo].append(asignatura_info)

		#Append del ultimo periodo
		aux_doc_asig[str(last_period)].append(asignaturas)

		# Agregar tipo de postgrado y descripcion para colocarlo en el arreglo final
		for x in aux_doc_asig:
			temp = {}
			periodo = Periodo.objects.get(id=x)
			temp['tipo_postgrado'] = TipoPostgrado.objects.get(id=periodo.tipo_postgrado_id).tipo
			temp['descripcion'] = periodo.descripcion
			temp['anio_inicio'] = periodo.anio_inicio
			temp['anio_fin'] = periodo.anio_fin
			temp['mes_inicio'] = periodo.mes_inicio
			temp['mes_fin'] = periodo.mes_fin
			temp['numero_periodo'] = periodo.numero_periodo

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

		return Response(programacion_academica, status=status.HTTP_200_OK)
	else:
		return Response(["empty"], status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes((IsAdminUser, ))
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

	return Response(lista_docentes, status=status.HTTP_200_OK)


@csrf_exempt
@api_view(['POST'])
@permission_classes((IsAdminUser, ))
def crearDocenteAsignatura(request, periodo_id):
	body_unicode = request.body.decode('utf-8')
	body = json.loads(body_unicode)
	array_docente_asignatura = []

	for x in body:
		try:
			aux = DocenteAsignatura.objects.filter(docente__usuario__cedula=x['usuario']['cedula'], asignatura__codigo=x['asignatura']['codigo'], periodo__id=x['periodo'], piso=x['piso'], horario_dia=x['horario_dia'], horario_hora=x['horario_hora'])
		except:
			response_data = {}
			response_data['Error'] = 'Petición Incorrecta.'
			return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

		if (len(aux) == 0):  # Creo el nuevo registro en docente_asignatura
			docente = PersonalDocente.objects.get(usuario__cedula=x['usuario']['cedula'])  # obtengo al docente
			asignatura = Asignatura.objects.get(codigo=x['asignatura']['codigo'])  # obtengo asignatura
			periodo = Periodo.objects.get(id=x['periodo'])  # obtengo periodo
			# Creo el nuevo objeto
			obj = DocenteAsignatura.objects.create(docente=docente, asignatura=asignatura, periodo=periodo, piso=x['piso'], horario_dia=x['horario_dia'], horario_hora=x['horario_hora'])
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

	return Response(status=status.HTTP_201_CREATED)


@csrf_exempt
@api_view(['POST'])
@permission_classes((isEstudianteOrAdmin, ))
def crear_estudiante_asignatura(request, cedula):

	body_unicode = request.body.decode('utf-8')
	body = json.loads(body_unicode)

	# En el list 'value' se encuentran los IDs de las asignaturas a agregar
	asignaturas_id = body['value']
	estudiante = Estudiante.objects.get(usuario__cedula=cedula)
	periodo = Periodo.objects.get(estado_periodo_id__estado='en inscripcion', tipo_postgrado_id__tipo=estudiante.id_tipo_postgrado)

	periodo_estudiante = PeriodoEstudiante(periodo=periodo, estudiante=estudiante, pagado=False)
	periodo_estudiante.save()

	for x in asignaturas_id:
		asignatura = Asignatura.objects.get(id=x)
		estudiante_asignatura = EstudianteAsignatura(
													periodo_estudiante=periodo_estudiante,
													asignatura=asignatura,
													nota_definitiva=0)
		estudiante_asignatura.save()

	return Response(status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes((isAdministrativoOrAdmin, ))
@csrf_exempt
def modificar_estudiante_asignatura(request, cedula):
	body_unicode = request.body.decode('utf-8')
	body = json.loads(body_unicode)

	# En el list 'value' se encuentran los IDs de las asignaturas a agregar
	asignaturas_id = body['value']

	estudiante = Estudiante.objects.get(usuario__cedula=cedula)

	periodo = Periodo.objects.get(
									estado_periodo_id__estado='en inscripcion',
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
		estudiante_asignatura = EstudianteAsignatura(
														periodo_estudiante=periodo_estudiante,
														asignatura=asignatura,
														nota_definitiva=0)
		estudiante_asignatura.save()

	return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@permission_classes((isAdministrativoOrEstudianteOrAdmin, ))
def obtener_informacion_historial(request, cedula):

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
		periodo_info['anio_inicio'] = periodo.anio_inicio
		periodo_info['anio_fin'] = periodo.anio_fin
		periodo_info['mes_inicio'] = periodo.mes_inicio
		periodo_info['mes_fin'] = periodo.mes_fin
		periodo_info['numero_periodo'] = periodo.numero_periodo
		periodo_info['asignatura_nombre'] = asignatura.nombre
		periodo_info['asignatura_codigo'] = asignatura.codigo
		periodo_info['unidad_credito'] = asignatura.unidad_credito
		periodo_info['nota_definitiva'] = x['nota_definitiva']
		if(x['retirado']):
			periodo_info['nota_definitiva'] = "RET"
			cantidad_materias_retiradas += 1

		periodo_info['tipo_asignatura'] = tipo_asignatura.nombre

		if(estado_periodo.estado == "finalizado"):
			if(not x['retirado']):
				promedio_general += periodo_info['nota_definitiva']
				promedio_ponderado += periodo_info['nota_definitiva'] * periodo_info['unidad_credito']
				cantidad_materias_ponderadas += periodo_info['unidad_credito']
				cantidad_materias += 1
				if(periodo_info['nota_definitiva'] < 10):
					cantidad_materias_reprobadas += 1

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

	return Response(historial_estudiante, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes((isAdministrativoOrAdmin, ))
def informacion_usuarios_administrativo(request, cedula):

	obj_usuario = {}
	if Estudiante.objects.filter(usuario__cedula=cedula).exists():
		usuario = Estudiante.objects.get(usuario__cedula=cedula)

		obj_usuario = {}
		obj_usuario['tipo_postgrado'] = usuario.id_tipo_postgrado.tipo
		obj_usuario['id_tipo_postgrado'] = usuario.id_tipo_postgrado.id
		obj_usuario['direccion'] = usuario.direccion
		obj_usuario['estado_estudiante'] = usuario.id_estado_estudiante.estado
		obj_usuario['id_estado_estudiante'] = usuario.id_estado_estudiante.id
		obj_usuario['tipo_usuario'] = 'estudiantes'
		try:
			obj_usuario['id_periodo_actual'] = Periodo.objects.get(tipo_postgrado__id=usuario.id_tipo_postgrado.id, estado_periodo__estado='activo').id
		except Exception as ex:
			pass

	elif PersonalDocente.objects.filter(usuario__cedula=cedula).exists():
		usuario = PersonalDocente.objects.get(usuario__cedula=cedula)
		obj_usuario['tipo_usuario'] = 'docentes'
		obj_usuario['coordinador'] = usuario.coordinador
		obj_usuario['direccion'] = usuario.direccion
		obj_usuario['rif'] = request.build_absolute_uri('/')+"media/"+str(usuario.rif)
		obj_usuario['curriculum'] = request.build_absolute_uri('/')+"media/"+str(usuario.curriculum)
		obj_usuario['permiso_ingresos'] = (
			request.build_absolute_uri('/')+"media/"+str(usuario.permiso_ingresos)
		)

	else:
		obj_usuario['tipo_usuario'] = 'otro'
		return Response(obj_usuario, status=status.HTTP_400_BAD_REQUEST)

	obj_usuario['first_name'] = usuario.usuario.first_name
	obj_usuario['tipo_documento'] = usuario.usuario.tipo_documento
	obj_usuario['last_name'] = usuario.usuario.last_name
	obj_usuario['segundo_nombre'] = usuario.usuario.segundo_nombre
	obj_usuario['segundo_apellido'] = usuario.usuario.segundo_apellido
	obj_usuario['cedula'] = usuario.usuario.cedula
	obj_usuario['email'] = usuario.usuario.email
	obj_usuario['celular'] = usuario.usuario.celular
	obj_usuario['telefono_casa'] = usuario.usuario.telefono_casa
	obj_usuario['telefono_trabajo'] = usuario.usuario.telefono_trabajo
	obj_usuario['sexo'] = usuario.usuario.sexo
	obj_usuario['nacionalidad'] = usuario.usuario.nacionalidad
	obj_usuario['fecha_nacimiento'] = str(usuario.usuario.fecha_nacimiento)
	obj_usuario['estado_civil'] = usuario.usuario.estado_civil
	obj_usuario['foto'] = request.build_absolute_uri('/') + "media/" + str(usuario.usuario.foto)

	return Response(obj_usuario, status=status.HTTP_200_OK)


@csrf_exempt
@api_view(['POST'])
@permission_classes((isDocenteOrAdmin, ))
def cargar_notas(request):

	body_unicode = request.body.decode('utf-8')
	body = json.loads(body_unicode)
	"""Body contiene un array con todos los estudiantes y su respectiva nota y la cedula del docente """
	for estudiante in body['estudiantes']:
		periodo_estudiante = PeriodoEstudiante.objects.get(periodo__tipo_postgrado__tipo=body['tipo_postgrado'], periodo__estado_periodo__estado='activo', estudiante__usuario__cedula=estudiante['cedula'])
		estudiante_asignatura = EstudianteAsignatura.objects.filter(periodo_estudiante=periodo_estudiante, asignatura__codigo=body['asignatura'])

		estudiante_asignatura.update(nota_definitiva=estudiante['nota_definitiva'])

	return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes((isAdministrativoOrAdmin, ))
def estado_retiro_estudiante(request, cedula):
	response_data = {}
	try:
		periodo_estudiante = PeriodoEstudiante.objects.get(periodo__estado_periodo__estado='activo', estudiante=Estudiante.objects.get(usuario__cedula=cedula))
		estudiante_asignatura = EstudianteAsignatura.objects.filter(periodo_estudiante=periodo_estudiante).first()

		if estudiante_asignatura.retirado:
			response_data['retirado'] = True
		else:
			response_data['retirado'] = False
	except Exception as ex:
		pass
	return Response(response_data, status=status.HTTP_200_OK)


@csrf_exempt
@api_view(['POST'])
@permission_classes((isAdministrativoOrAdmin, ))
def get_reporte_periodo(request):

	body_unicode = request.body.decode('utf-8')
	body = json.loads(body_unicode)
	periodo = Periodo.objects.get(id=body['periodo'])

	data_pdf = {}

	data_pdf['periodo'] = periodo.descripcion
	data_pdf['anio_inicio'] = periodo.anio_inicio
	data_pdf['anio_fin'] = periodo.anio_fin
	data_pdf['mes_inicio'] = periodo.mes_inicio
	data_pdf['mes_fin'] = periodo.mes_fin
	data_pdf['numero_periodo'] = periodo.numero_periodo
	data_pdf['tipo_postgrado'] = periodo.tipo_postgrado.tipo
	data_pdf['es_docente'] = False

	if body['asignaturas_dictadas']:
		docente_asignatura = DocenteAsignatura.objects.filter(periodo=periodo)
		asignaturas = []
		for x in docente_asignatura:
			if not any(d['codigo'] == x.asignatura.codigo for d in asignaturas):
				asignatura = {}
				asignatura['codigo'] = x.asignatura.codigo
				asignatura['nombre'] = x.asignatura.nombre
				asignatura['unidad_credito'] = x.asignatura.unidad_credito
				asignaturas.append(asignatura)

		data_pdf['asignaturas'] = asignaturas

	if body['estudiantes_inscritos']:
		periodo_estudiante = PeriodoEstudiante.objects.filter(periodo=periodo)
		estudiantes = []
		cant_estudiantes_inscritos = 0

		for x in periodo_estudiante:
			cant_estudiantes_inscritos += 1
			estudiante = {}
			estudiante['cedula'] = x.estudiante.usuario.cedula
			estudiante['first_name'] = x.estudiante.usuario.first_name
			estudiante['last_name'] = x.estudiante.usuario.last_name
			estudiante['segundo_nombre'] = x.estudiante.usuario.segundo_nombre
			estudiante['segundo_apellido'] = x.estudiante.usuario.segundo_apellido
			estudiantes.append(estudiante)

		data_pdf['estudiantes_inscritos'] = estudiantes
		data_pdf['cant_estudiantes_inscritos'] = cant_estudiantes_inscritos

	if body['docentes']:
		docente_asignatura = DocenteAsignatura.objects.filter(periodo=periodo)
		docentes = []
		cant_docentes = 0

		for x in docente_asignatura:
			if not any(d['cedula'] == x.docente.usuario.cedula for d in docentes):
				cant_docentes += 1
				docente = {}
				docente['cedula'] = x.docente.usuario.cedula
				docente['first_name'] = x.docente.usuario.first_name
				docente['last_name'] = x.docente.usuario.last_name
				docente['segundo_nombre'] = x.docente.usuario.segundo_nombre
				docente['segundo_apellido'] = x.docente.usuario.segundo_apellido
				docentes.append(docente)

		data_pdf['docentes'] = docentes
		data_pdf['cant_docentes'] = cant_docentes

	if body['estudiantes_aprobados']:
		estudiante_asignatura = EstudianteAsignatura.objects.filter(periodo_estudiante__periodo_id=periodo, nota_definitiva__gte=10, retirado=False).order_by('asignatura')
		cant_estudiantes_aprobados = 0
		asignatura = {}
		asignatura['nombre'] = ''
		asignatura['codigo'] = ''
		asignatura['unidad_credito'] = ''
		asignatura['estudiantes'] = []
		asignaturas = list()
		for x in estudiante_asignatura:
			if(asignatura['codigo'] != '' and x.asignatura.codigo != asignatura['codigo']):
				asignatura['cant_estudiantes_aprobados'] = cant_estudiantes_aprobados
				asignaturas.append(asignatura.copy())

				asignatura['estudiantes'] = []
				cant_estudiantes_aprobados = 0

			asignatura['nombre'] = x.asignatura.nombre
			asignatura['codigo'] = x.asignatura.codigo
			asignatura['unidad_credito'] = x.asignatura.unidad_credito

			cant_estudiantes_aprobados += 1
			estudiante = {}
			estudiante['cedula'] = x.periodo_estudiante.estudiante.usuario.cedula
			estudiante['first_name'] = x.periodo_estudiante.estudiante.usuario.first_name
			estudiante['last_name'] = x.periodo_estudiante.estudiante.usuario.last_name
			estudiante['segundo_nombre'] = x.periodo_estudiante.estudiante.usuario.segundo_nombre
			estudiante['segundo_apellido'] = x.periodo_estudiante.estudiante.usuario.segundo_apellido
			estudiante['nota_definitiva'] = x.nota_definitiva
			asignatura['estudiantes'].append(estudiante)

		asignatura['cant_estudiantes_aprobados'] = cant_estudiantes_aprobados
		asignaturas.append(asignatura.copy())
		data_pdf['estudiantes_aprobados'] = asignaturas

	if body['estudiantes_reprobados']:
		estudiante_asignatura = EstudianteAsignatura.objects.filter(periodo_estudiante__periodo_id=periodo, nota_definitiva__lt=10, retirado=False).order_by('asignatura')
		cant_estudiantes_reprobados = 0
		asignatura = {}
		asignatura['nombre'] = ''
		asignatura['codigo'] = ''
		asignatura['unidad_credito'] = ''
		asignatura['estudiantes'] = []
		asignaturas = list()
		for x in estudiante_asignatura:
			if(asignatura['codigo'] != '' and x.asignatura.codigo != asignatura['codigo']):
				asignatura['cant_estudiantes_reprobados'] = cant_estudiantes_reprobados
				asignaturas.append(asignatura.copy())

				asignatura['estudiantes'] = []
				cant_estudiantes_reprobados = 0

			asignatura['nombre'] = x.asignatura.nombre
			asignatura['codigo'] = x.asignatura.codigo
			asignatura['unidad_credito'] = x.asignatura.unidad_credito

			cant_estudiantes_reprobados += 1
			estudiante = {}
			estudiante['cedula'] = x.periodo_estudiante.estudiante.usuario.cedula
			estudiante['first_name'] = x.periodo_estudiante.estudiante.usuario.first_name
			estudiante['last_name'] = x.periodo_estudiante.estudiante.usuario.last_name
			estudiante['segundo_nombre'] = x.periodo_estudiante.estudiante.usuario.segundo_nombre
			estudiante['segundo_apellido'] = x.periodo_estudiante.estudiante.usuario.segundo_apellido
			estudiante['nota_definitiva'] = x.nota_definitiva
			asignatura['estudiantes'].append(estudiante)

		asignatura['cant_estudiantes_reprobados'] = cant_estudiantes_reprobados
		asignaturas.append(asignatura.copy())
		data_pdf['estudiantes_reprobados'] = asignaturas

	if body['estudiantes_retirados']:
		estudiante_asignatura = EstudianteAsignatura.objects.filter(periodo_estudiante__periodo_id=periodo, retirado=True).order_by('asignatura')
		cant_estudiantes_retirados = 0
		asignatura = {}
		asignatura['nombre'] = ''
		asignatura['codigo'] = ''
		asignatura['unidad_credito'] = ''
		asignatura['estudiantes'] = []
		asignaturas = list()
		for x in estudiante_asignatura:
			if(asignatura['codigo'] != '' and x.asignatura.codigo != asignatura['codigo']):
				asignatura['cant_estudiantes_retirados'] = cant_estudiantes_retirados
				asignaturas.append(asignatura.copy())

				asignatura['estudiantes'] = []
				cant_estudiantes_retirados = 0

			asignatura['nombre'] = x.asignatura.nombre
			asignatura['codigo'] = x.asignatura.codigo
			asignatura['unidad_credito'] = x.asignatura.unidad_credito

			cant_estudiantes_retirados += 1
			estudiante = {}
			estudiante['cedula'] = x.periodo_estudiante.estudiante.usuario.cedula
			estudiante['first_name'] = x.periodo_estudiante.estudiante.usuario.first_name
			estudiante['last_name'] = x.periodo_estudiante.estudiante.usuario.last_name
			estudiante['segundo_nombre'] = x.periodo_estudiante.estudiante.usuario.segundo_nombre
			estudiante['segundo_apellido'] = x.periodo_estudiante.estudiante.usuario.segundo_apellido
			asignatura['estudiantes'].append(estudiante)

		asignatura['cant_estudiantes_retirados'] = cant_estudiantes_retirados
		asignaturas.append(asignatura.copy())
		data_pdf['estudiantes_retirados'] = asignaturas

	if body['informacion_detallada']:
		periodo_info = {}
		periodo_completo = periodo
		periodo_info['docentes'] = []

		#if(periodo_completo.estado_periodo.estado != "activo"):
		#	return Response(status=status.HTTP_400_BAD_REQUEST)

		try:
			coordinador = PersonalDocente.objects.get(id_tipo_postgrado__tipo=periodo_completo.tipo_postgrado.tipo, coordinador=True)
			periodo_info['coordinador_nombre'] = coordinador.usuario.first_name
			periodo_info['coordinador_apellido'] = coordinador.usuario.last_name
		except:
			periodo_info['coordinador_nombre'] = ""
			periodo_info['coordinador_apellido'] = ""

		cedulas_agregadas = {}

		cantidad_asignaturas = 0
		cantidad_docentes = 0
		docente_asignatura = DocenteAsignatura.objects.filter(periodo=periodo_completo)

		for docentes in docente_asignatura:
			user = PersonalDocente.objects.get(usuario__cedula=docentes.docente.usuario.cedula)
			if(user.usuario.cedula not in cedulas_agregadas):
				cedulas_agregadas[user.usuario.cedula] = []
				cantidad_docentes += 1

			asignatura = Asignatura.objects.get(id=docentes.asignatura.id)
			if(asignatura.id not in cedulas_agregadas[user.usuario.cedula]):
				cedulas_agregadas[user.usuario.cedula].append(asignatura.id)
				cantidad_asignaturas += 1

				docente = {}
				docente['cedula'] = user.usuario.cedula
				docente['nombre'] = user.usuario.first_name
				docente['apellido'] = user.usuario.last_name
				docente['estudiantes'] = []
				asignatura = Asignatura.objects.get(id=docentes.asignatura.id)

				docente['asignatura'] = asignatura.nombre
				docente['unidad_credito'] = asignatura.unidad_credito
				estudiantes = EstudianteAsignatura.objects.filter(asignatura__codigo=asignatura.codigo, periodo_estudiante__periodo_id=periodo)

				for estudiante in estudiantes:
					estudiante_info = {}
					estudiante_info['nombre'] = estudiante.periodo_estudiante.estudiante.usuario.first_name
					estudiante_info['apellido'] = estudiante.periodo_estudiante.estudiante.usuario.last_name
					estudiante_info['cedula'] = estudiante.periodo_estudiante.estudiante.usuario.cedula
					if(estudiante.retirado):
						estudiante_info['nota'] = "RET"
					else:
						estudiante_info['nota'] = estudiante.nota_definitiva

					docente['estudiantes'].append(estudiante_info)

				periodo_info['docentes'].append(docente)

		cantidad_estudiantes = PeriodoEstudiante.objects.filter(periodo=periodo).count()
		periodo_info['cantidad_estudiantes'] = cantidad_estudiantes
		periodo_info['cantidad_asignaturas'] = cantidad_asignaturas
		periodo_info['cantidad_docentes'] = cantidad_docentes

		data_pdf['informacion_detallada'] = periodo_info

	content = 'attachment; filename="reporte_'+data_pdf['periodo']+'.pdf"'
	pdf = render_to_pdf('reportes.html', data_pdf)
	pdf['Content-Disposition'] = content

	return HttpResponse(pdf, content_type='application/pdf')


@csrf_exempt
@api_view(['POST'])
@permission_classes((isDocenteOrAdmin, ))
def get_reporte_periodo_docente(request, cedula):

	body_unicode = request.body.decode('utf-8')
	body = json.loads(body_unicode)
	periodo = Periodo.objects.get(id=body['periodo'])

	data_pdf = {}

	data_pdf['periodo'] = periodo.descripcion
	data_pdf['anio_inicio'] = periodo.anio_inicio
	data_pdf['anio_fin'] = periodo.anio_fin
	data_pdf['mes_inicio'] = periodo.mes_inicio
	data_pdf['mes_fin'] = periodo.mes_fin
	data_pdf['numero_periodo'] = periodo.numero_periodo
	data_pdf['tipo_postgrado'] = periodo.tipo_postgrado.tipo
	data_pdf['es_docente'] = True

	docente_asignatura = DocenteAsignatura.objects.filter(periodo=periodo, docente__usuario__cedula=cedula)

	if body['asignaturas_dictadas']:
		asignaturas = []
		for x in docente_asignatura:
			if not any(d['codigo'] == x.asignatura.codigo for d in asignaturas):
				asignatura = {}
				asignatura['codigo'] = x.asignatura.codigo
				asignatura['nombre'] = x.asignatura.nombre
				asignatura['unidad_credito'] = x.asignatura.unidad_credito
				asignaturas.append(asignatura)

		data_pdf['asignaturas'] = asignaturas

	if body['estudiantes_aprobados']:
		estudiante_asignatura = EstudianteAsignatura.objects.filter(periodo_estudiante__periodo_id=periodo, nota_definitiva__gte=10, retirado=False).order_by('asignatura')
		cant_estudiantes_aprobados = 0
		asignatura = {}
		asignatura['nombre'] = ''
		asignatura['codigo'] = ''
		asignatura['unidad_credito'] = ''
		asignatura['estudiantes'] = []
		asignaturas = list()
		codigos_usados = []
		for x in estudiante_asignatura:
			for item in docente_asignatura:
				if not any(d == item.asignatura.codigo for d in codigos_usados):
					if item.asignatura.codigo == x.asignatura.codigo :
						if(asignatura['codigo'] != '' and x.asignatura.codigo != asignatura['codigo']):
							asignatura['cant_estudiantes_aprobados'] = cant_estudiantes_aprobados
							asignaturas.append(asignatura.copy())

							asignatura['estudiantes'] = []
							cant_estudiantes_aprobados = 0

						codigos_usados.append(item.asignatura.codigo)
						asignatura['nombre'] = x.asignatura.nombre
						asignatura['codigo'] = x.asignatura.codigo
						asignatura['unidad_credito'] = x.asignatura.unidad_credito

						cant_estudiantes_aprobados += 1
						estudiante = {}
						estudiante['cedula'] = x.periodo_estudiante.estudiante.usuario.cedula
						estudiante['first_name'] = x.periodo_estudiante.estudiante.usuario.first_name
						estudiante['last_name'] = x.periodo_estudiante.estudiante.usuario.last_name
						estudiante['segundo_nombre'] = x.periodo_estudiante.estudiante.usuario.segundo_nombre
						estudiante['segundo_apellido'] = x.periodo_estudiante.estudiante.usuario.segundo_apellido
						estudiante['nota_definitiva'] = x.nota_definitiva
						asignatura['estudiantes'].append(estudiante)

			codigos_usados = []
		asignatura['cant_estudiantes_aprobados'] = cant_estudiantes_aprobados
		asignaturas.append(asignatura.copy())
		data_pdf['estudiantes_aprobados'] = asignaturas

	if body['estudiantes_reprobados']:
		estudiante_asignatura = EstudianteAsignatura.objects.filter(periodo_estudiante__periodo_id=periodo, nota_definitiva__lt=10, retirado=False).order_by('asignatura')
		cant_estudiantes_reprobados = 0
		asignatura = {}
		asignatura['nombre'] = ''
		asignatura['codigo'] = ''
		asignatura['unidad_credito'] = ''
		asignatura['estudiantes'] = []
		asignaturas = list()
		codigos_usados = []
		for x in estudiante_asignatura:
			for item in docente_asignatura: 
				if not any(d == item.asignatura.codigo for d in codigos_usados):
					if item.asignatura.codigo == x.asignatura.codigo :
						if(asignatura['codigo'] != '' and x.asignatura.codigo != asignatura['codigo']):
							asignatura['cant_estudiantes_reprobados'] = cant_estudiantes_reprobados
							asignaturas.append(asignatura.copy())

							asignatura['estudiantes'] = []
							cant_estudiantes_reprobados = 0

						codigos_usados.append(item.asignatura.codigo)
						asignatura['nombre'] = x.asignatura.nombre
						asignatura['codigo'] = x.asignatura.codigo
						asignatura['unidad_credito'] = x.asignatura.unidad_credito

						cant_estudiantes_reprobados += 1
						estudiante = {}
						estudiante['cedula'] = x.periodo_estudiante.estudiante.usuario.cedula
						estudiante['first_name'] = x.periodo_estudiante.estudiante.usuario.first_name
						estudiante['last_name'] = x.periodo_estudiante.estudiante.usuario.last_name
						estudiante['segundo_nombre'] = x.periodo_estudiante.estudiante.usuario.segundo_nombre
						estudiante['segundo_apellido'] = x.periodo_estudiante.estudiante.usuario.segundo_apellido
						estudiante['nota_definitiva'] = x.nota_definitiva
						asignatura['estudiantes'].append(estudiante)

			codigos_usados = []
		asignatura['cant_estudiantes_reprobados'] = cant_estudiantes_reprobados
		asignaturas.append(asignatura.copy())
		data_pdf['estudiantes_reprobados'] = asignaturas

	if body['estudiantes_retirados']:
		estudiante_asignatura = EstudianteAsignatura.objects.filter(periodo_estudiante__periodo_id=periodo, retirado=True).order_by('asignatura')
		cant_estudiantes_retirados = 0
		asignatura = {}
		asignatura['nombre'] = ''
		asignatura['codigo'] = ''
		asignatura['unidad_credito'] = ''
		asignatura['estudiantes'] = []
		asignaturas = list()
		codigos_usados = []
		for x in estudiante_asignatura:
			for item in docente_asignatura: 
				if not any(d == item.asignatura.codigo for d in codigos_usados):
					if item.asignatura.codigo == x.asignatura.codigo :
						if(asignatura['codigo'] != '' and x.asignatura.codigo != asignatura['codigo']):
							asignatura['cant_estudiantes_retirados'] = cant_estudiantes_retirados
							asignaturas.append(asignatura.copy())

							asignatura['estudiantes'] = []
							cant_estudiantes_retirados = 0

						codigos_usados.append(item.asignatura.codigo)
						asignatura['nombre'] = x.asignatura.nombre
						asignatura['codigo'] = x.asignatura.codigo
						asignatura['unidad_credito'] = x.asignatura.unidad_credito

						cant_estudiantes_retirados += 1
						estudiante = {}
						estudiante['cedula'] = x.periodo_estudiante.estudiante.usuario.cedula
						estudiante['first_name'] = x.periodo_estudiante.estudiante.usuario.first_name
						estudiante['last_name'] = x.periodo_estudiante.estudiante.usuario.last_name
						estudiante['segundo_nombre'] = x.periodo_estudiante.estudiante.usuario.segundo_nombre
						estudiante['segundo_apellido'] = x.periodo_estudiante.estudiante.usuario.segundo_apellido
						asignatura['estudiantes'].append(estudiante)

			codigos_usados = []
		asignatura['cant_estudiantes_retirados'] = cant_estudiantes_retirados
		asignaturas.append(asignatura.copy())
		data_pdf['estudiantes_retirados'] = asignaturas


	content = 'attachment; filename="reporte_'+data_pdf['periodo']+'.pdf"'
	pdf = render_to_pdf('reportes.html', data_pdf)
	pdf['Content-Disposition'] = content

	return HttpResponse(pdf, content_type='application/pdf')


@api_view(['GET'])
def get_diagrama_flujo(request, modulo):
	url = request.build_absolute_uri('/')+"media/sisgiu/diagrama_"+modulo+".png"
	r = requests.get(url)
	return HttpResponse(r.content, content_type="image/png")

#endregion
