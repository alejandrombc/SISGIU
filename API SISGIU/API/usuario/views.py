#region imports
import json
import os
import datetime
from django.http import HttpResponse
from django.template.loader import get_template
from usuario.utils import render_to_pdf
from API.settings import host_react
from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import (
	IsAdminUser,
	IsAuthenticated,
	IsAuthenticatedOrReadOnly,
	AllowAny)

from .permissions import (
	isOwnerOrReadOnly,
	IsListOrCreate,
	)

from usuario.models import (
	Usuario,
	Estudiante,
	TipoPostgrado,
	EstadoEstudiante,
	PersonalDocente,
	PersonalAdministrativo,)

from usuario.serializers import (
	AdministradorListSerializer,
	AdministradorDetailSerializer,
	EstudianteSerializer,
	EstudianteDetailSerializer,
	TipoPostgradoSerializer,
	EstadoEstudianteSerializer,
	DocenteSerializer,
	DocenteDetailSerializer,
	AdministrativoSerializer,
	AdministrativoDetailSerializer)

from relacion.models import (
	EstudianteAsignatura,
	PeriodoEstudiante,
	DocenteAsignatura,)

from asignatura.models import (
	Asignatura,)


from periodo.models import (
	Periodo,
	)

from rest_framework.generics import (
	ListCreateAPIView,
	RetrieveAPIView,
	RetrieveUpdateAPIView,
	DestroyAPIView,
	)
from rest_framework.decorators import permission_classes, api_view
from usuario.permissions import isDocenteOrAdmin, isEstudianteOrAdmin, isAdministrativoOrAdmin
from rest_framework import status
from rest_framework.response import Response
#endregion


#region Administrador
class AdministradorListCreateAPIView(ListCreateAPIView):
	queryset = Usuario.objects.all()
	serializer_class = AdministradorListSerializer
	permission_classes = [IsAdminUser]


class AdministradorDetailAPIView(RetrieveAPIView):
	queryset = Usuario.objects.all()
	serializer_class = AdministradorDetailSerializer
	lookup_field = 'cedula'
	permission_classes = [IsAdminUser]


class AdministradorUpdateAPIView(RetrieveUpdateAPIView):
	queryset = Usuario.objects.all()
	serializer_class = AdministradorDetailSerializer
	lookup_field = 'cedula'
	permission_classes = [IsAdminUser]


class AdministradorDeleteAPIView(DestroyAPIView):
	queryset = Usuario.objects.all()
	serializer_class = AdministradorDetailSerializer
	lookup_field = 'username'
	permission_classes = [IsAdminUser]
#endregion


#region Estudiante
class EstudianteListCreateAPIView(ListCreateAPIView):
	queryset = Estudiante.objects.all()
	serializer_class = EstudianteSerializer
	permission_classes = [IsAuthenticated, IsListOrCreate]


class EstudianteDetailAPIView(RetrieveAPIView):
	queryset = Estudiante.objects.all()
	serializer_class = EstudianteDetailSerializer
	lookup_field = 'usuario__cedula'
	permission_classes = [IsAuthenticated]


class EstudianteUpdateAPIView(RetrieveUpdateAPIView):
	queryset = Estudiante.objects.all()
	serializer_class = EstudianteDetailSerializer
	permission_classes = [isOwnerOrReadOnly]
	lookup_field = 'usuario__cedula'


class EstudianteDeleteAPIView(DestroyAPIView):
	queryset = Estudiante.objects.all()
	serializer_class = EstudianteDetailSerializer
	permission_classes = [IsAdminUser]
	lookup_field = 'usuario__cedula'
#endregion


#region TipoPostgrado
class TipoPostgradoListCreateAPIView(ListCreateAPIView):
	queryset = TipoPostgrado.objects.all()
	serializer_class = TipoPostgradoSerializer
	permission_classes = [IsListOrCreate, IsAuthenticated]


class TipoPostgradoDetailAPIView(RetrieveAPIView):
	queryset = TipoPostgrado.objects.all()
	serializer_class = TipoPostgradoSerializer
	permission_classes = [IsListOrCreate, IsAuthenticated]


class TipoPostgradoUpdateAPIView(RetrieveUpdateAPIView):
	queryset = TipoPostgrado.objects.all()
	serializer_class = TipoPostgradoSerializer
	permission_classes = [IsAdminUser, IsAuthenticated]


class TipoPostgradoDeleteAPIView(DestroyAPIView):
	queryset = TipoPostgrado.objects.all()
	serializer_class = TipoPostgradoSerializer
	permission_classes = [IsAdminUser]
#endregion


#region EstadoEstudiante
class EstadoEstudianteListCreateAPIView(ListCreateAPIView):
	queryset = EstadoEstudiante.objects.all()
	serializer_class = EstadoEstudianteSerializer
	permission_classes = [IsListOrCreate, IsAuthenticated]


class EstadoEstudianteDetailAPIView(RetrieveAPIView):
	queryset = EstadoEstudiante.objects.all()
	serializer_class = EstadoEstudianteSerializer
	permission_classes = [IsAuthenticated]


class EstadoEstudianteDeleteAPIView(DestroyAPIView):
	queryset = EstadoEstudiante.objects.all()
	serializer_class = EstadoEstudianteSerializer
	permission_classes = [IsAdminUser]
#endregion


#region Docente
class DocenteListCreateAPIView(ListCreateAPIView):
	queryset = PersonalDocente.objects.all()
	serializer_class = DocenteSerializer
	permission_classes = [IsAuthenticated, IsListOrCreate]


class DocenteDetailAPIView(RetrieveAPIView):
	queryset = PersonalDocente.objects.all()
	serializer_class = DocenteDetailSerializer
	permission_classes = [IsAuthenticated]
	lookup_field = 'usuario__cedula'


class DocenteUpdateAPIView(RetrieveUpdateAPIView):
	queryset = PersonalDocente.objects.all()
	serializer_class = DocenteDetailSerializer
	permission_classes = [IsAuthenticatedOrReadOnly, isOwnerOrReadOnly]
	lookup_field = 'usuario__cedula'


class DocenteDeleteAPIView(DestroyAPIView):
	queryset = PersonalDocente.objects.all()
	serializer_class = DocenteDetailSerializer
	permission_classes = [IsAdminUser]
	lookup_field = 'usuario__cedula'
#endregion


#region Administrativo
class AdministrativoListCreateAPIView(ListCreateAPIView):
	queryset = PersonalAdministrativo.objects.all()
	serializer_class = AdministrativoSerializer
	permission_classes = [IsAuthenticated, IsListOrCreate]


class AdministrativoDetailAPIView(RetrieveAPIView):
	queryset = PersonalAdministrativo.objects.all()
	serializer_class = AdministrativoDetailSerializer
	permission_classes = [IsAuthenticated]
	lookup_field = 'usuario__cedula'


class AdministrativoUpdateAPIView(RetrieveUpdateAPIView):
	queryset = PersonalAdministrativo.objects.all()
	serializer_class = AdministrativoDetailSerializer
	permission_classes = [IsAuthenticatedOrReadOnly, isOwnerOrReadOnly]
	lookup_field = 'usuario__cedula'


class AdministrativoDeleteAPIView(DestroyAPIView):
	queryset = PersonalAdministrativo.objects.all()
	serializer_class = AdministrativoDetailSerializer
	permission_classes = [IsAdminUser]
	lookup_field = 'usuario__cedula'
#endregion


#region Otros


@api_view(['GET'])
@permission_classes((AllowAny, ))
def get_admin(request, cedula):
	member = Usuario.objects.filter(username=cedula, is_superuser=True)

	if member:
		user = member.values()[0]
		user['foto'] = request.build_absolute_uri('/')+"media/"+user['foto']
		list_result = {"usuario": user}
		return Response(list_result, status=status.HTTP_200_OK)

	return Response(status=status.HTTP_404_NOT_FOUND)


@csrf_exempt
@api_view(['PUT'])
@permission_classes((IsAdminUser, ))
def edit_admin(request, cedula):
	body_unicode = request.body.decode('utf-8')
	body = json.loads(body_unicode)

	user = Usuario.objects.get(username=cedula)
	if(user):
		user.first_name = body['usuario']['first_name']
		user.last_name = body['usuario']['last_name']
		user.estado_civil = body['usuario']['estado_civil']
		user.email = body['usuario']['email']
		user.celular = body['usuario']['celular']
		user.telefono_trabajo = body['usuario']['telefono_trabajo']
		user.telefono_casa = body['usuario']['telefono_casa']
		if(user.password != body['usuario']['password']):
			user.set_password(body['usuario']['password'])
		user.save()
		return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@permission_classes((IsAdminUser, ))
def get_usuarios(request, modulo):

	try:
		response_data = []
		if (modulo == 'estudiantes'):
			member = Estudiante.objects.all().values()
			lista_estudiantes = [entry for entry in member]

			for estudiante in lista_estudiantes:
				usuario = Usuario.objects.filter(id=estudiante['usuario_id']).values()[0]
				tipo_postgrado = TipoPostgrado.objects.filter(
					id=estudiante['id_tipo_postgrado_id']).values()[0]
				estado_estudiante = EstadoEstudiante.objects.filter(
					id=estudiante['id_estado_estudiante_id']).values()[0]

				usuario['tipo_postgrado'] = tipo_postgrado['tipo']
				usuario['estado_estudiante'] = estado_estudiante['estado']
				usuario['id_tipo_postgrado'] = tipo_postgrado['id']
				usuario['id_estado_estudiante'] = estado_estudiante['id']
				usuario['direccion'] = estudiante['direccion']
				usuario['foto'] = request.build_absolute_uri('/')+"media/"+usuario['foto']

				response_data.append(usuario)

		elif modulo == 'docentes':
			member = PersonalDocente.objects.all().values()
			lista_docentes = [entry for entry in member]

			for docente in lista_docentes:
				usuario = Usuario.objects.filter(id=docente['usuario_id']).values()[0]

				usuario['direccion'] = docente['direccion']
				usuario['rif'] = request.build_absolute_uri('/')+"media/"+docente['rif']
				usuario['curriculum'] = request.build_absolute_uri('/')+"media/"+docente['curriculum']
				usuario['permiso_ingresos'] = (
					request.build_absolute_uri('/')+"media/"+docente['permiso_ingresos']
				)
				usuario['coordinador'] = docente['coordinador']
				usuario['id_tipo_postgrado'] = docente['id_tipo_postgrado_id']
				usuario['foto'] = request.build_absolute_uri('/')+"media/"+usuario['foto']

				response_data.append(usuario)

		elif modulo == 'administradores':
			member = Usuario.objects.filter(is_superuser=True).values()
			lista_usuarios = [entry for entry in member]

			for usuario in lista_usuarios:
				usuario['foto'] = request.build_absolute_uri('/')+"media/"+usuario['foto']
				response_data.append(usuario)

		elif modulo == 'administrativo':
			member = PersonalAdministrativo.objects.all().values()
			lista_estudiantes = [entry for entry in member]

			for administrativo in lista_estudiantes:
				usuario = Usuario.objects.filter(id=administrativo['usuario_id']).values()[0]
				usuario['foto'] = request.build_absolute_uri('/')+"media/"+usuario['foto']

				response_data.append(usuario)

		else:
			response_data = {}
			response_data['Error'] = "No existe el modulo especificado."
			return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

		for usuario in response_data:
			del usuario['is_staff']
			del usuario['is_superuser']
			del usuario['date_joined']
			del usuario['id']
			del usuario['is_active']

		return Response(response_data, status=status.HTTP_200_OK)

	except:
		response_data = {}
		response_data['Error'] = "Ha ocurrido un error obteniendo la lista de usuarios."
		return Response(response_data, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes((AllowAny, ))
def send_mail_forgot(request, cedula):

	member = Usuario.objects.filter(username=cedula)
	if member:
		member = member.values()[0]
		correo = member['email']
		password = member['password']

		url = host_react + "recuperarContrasena/"+cedula+"/"+password

		template = get_template("email_template_lost.html")
		html = template.render(
			{
				"url": url,
				"nombre": member['first_name']
			}
		)

		body = "Haga click en el siguiente enlace " + url + " para restablecer su contraseña"
		send_mail('Recuperación de contraseña', body, 'sisgiu.fau@gmail.com', [correo], html_message=html)

		return Response(status=status.HTTP_200_OK)

	return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['POST', 'GET'])
@permission_classes((AllowAny, ))
@csrf_exempt
def get_usr_cedula(request, cedula):

	if(request.method == "POST"):
		body_unicode = request.body.decode('utf-8')
		body = json.loads(body_unicode)
		cedula = body['cedula']
		password = body['password']
		nueva_contrasena = body['nueva_contrasena']

		user = Usuario.objects.get(cedula=cedula)
		if(user):
			if(password == user.password):
				user.set_password(nueva_contrasena)
				user.save()
				status_msg = status.HTTP_200_OK
			else:
				status_msg = status.HTTP_404_NOT_FOUND
		else:
			status_msg = status.HTTP_404_NOT_FOUND

		return Response(status=status_msg)

	member = Usuario.objects.filter(username=cedula)
	list_result = {"password": member.values()[0]['password']}

	return Response(list_result, status=status.HTTP_200_OK)


@api_view(['POST'])
@csrf_exempt
def update_photo(request, cedula):
	username = request.POST.get("username")
	user = Usuario.objects.get(username=username)
	foto = request.FILES['foto']
	# Replace old photo with new one,
	if "sisgiu" not in user.foto.path and "no_avatar" not in user.foto.path:
		os.remove(user.foto.path)
	user.foto = foto
	user.save()
	return Response(status=status.HTTP_200_OK)


@csrf_exempt
@api_view(['POST'])
@permission_classes((isAdministrativoOrAdmin, ))
def estudiante_pago_inscripcion(request, periodo_id):

	body_unicode = request.body.decode('utf-8')
	body = json.loads(body_unicode)

	# Almaceno las cedulas en un array
	cedulas = []
	for x in body:
		cedulas.append(x)

	# Itero en el json de pagado y hago el update en la BD
	for x in cedulas:
		periodo_id = int(periodo_id)
		PeriodoEstudiante.objects.filter(
										periodo__id=periodo_id,
										estudiante__usuario__cedula=x).update(pagado=body[x])

	return Response(status=status.HTTP_204_NO_CONTENT)


@csrf_exempt
@api_view(['POST'])
@permission_classes((IsAdminUser, ))
def update_file(request, cedula, tipo_documento):

	username = request.POST.get("username")
	user = PersonalDocente.objects.get(usuario__username=username)

	if(username == cedula):
		documento = request.FILES[tipo_documento]
		if(user):
			if (tipo_documento == 'rif'):
				try:
					os.remove(user.rif.path)
					user.rif = documento
				except:
					user.rif = documento
			elif (tipo_documento == 'curriculum'):
				try:
					os.remove(user.curriculum.path)
					user.curriculum = documento
				except:
					user.curriculum = documento
			elif (tipo_documento == 'permiso_ingresos'):
				try:
					os.remove(user.permiso_ingresos.path)
					user.permiso_ingresos = documento
				except:
					user.permiso_ingresos = documento

			user.save()
			return Response(status=status.HTTP_204_NO_CONTENT)

	response = {"Error": "No tiene privilegios para realizar esta acción."}
	return Response(response, status=status.HTTP_403_FORBIDDEN)


@api_view(['GET'])
@permission_classes((isEstudianteOrAdmin, ))
def constancia_estudio(request, cedula):

	user_information = {}
	user = Usuario.objects.get(cedula=cedula).__dict__
	try:
		estudiante = Estudiante.objects.get(usuario__cedula=cedula, id_estado_estudiante__estado='activo').__dict__
	except Exception as ex:
		response = {}
		response['mensaje'] = str(ex)
		return Response(response, status=status.HTTP_404_NOT_FOUND)

	user_information['cedula'] = user['cedula']
	user_information['first_name'] = user['first_name']
	user_information['last_name'] = user['last_name']

	tipo_postgrado = TipoPostgrado.objects.get(id=estudiante['id_tipo_postgrado_id']).__dict__

	user_information['tipo_postgrado'] = tipo_postgrado['tipo']

	try:
		periodo = Periodo.objects.get(
			estado_periodo__estado="activo",
			tipo_postgrado__id=tipo_postgrado['id']).__dict__
	except Exception as ex:
		response = {}
		response['mensaje'] = str(ex)
		return Response(response, status=status.HTTP_404_NOT_FOUND)

	user_information['periodo'] = periodo['descripcion']
	user_information['anio_inicio'] = periodo['anio_inicio']
	user_information['anio_fin'] = periodo['anio_fin']
	user_information['mes_inicio'] = periodo['mes_inicio']
	user_information['mes_fin'] = periodo['mes_fin']
	user_information['numero_periodo'] = periodo['numero_periodo']

	asignaturas = EstudianteAsignatura.objects.filter(
		periodo_estudiante__periodo_id=periodo['id'],
		periodo_estudiante__estudiante__usuario__cedula=cedula).values()

	user_information['asignaturas'] = []
	user_information['unidad_creditos'] = 0
	for entry in asignaturas:
		asignatura = Asignatura.objects.get(id=entry['asignatura_id']).__dict__
		user_information['asignaturas'].append(asignatura)
		user_information['unidad_creditos'] += asignatura['unidad_credito']

	now = datetime.datetime.now()
	meses = [
			'Enero', 'Febrero', 'Marzo', 'Abril',
			'Mayo', 'Junio', 'Julio', 'Agosto',
			'Septiembre', 'Octubre', 'Noviembre',
			'Diciembre'
	]
	user_information['dia'] = now.day
	user_information['mes'] = meses[now.month - 1]
	user_information['anio'] = now.year

	content = 'attachment; filename="constancia_'+str(cedula)+'.pdf"'
	pdf = render_to_pdf('constancia_estudio.html', user_information)
	pdf['Content-Disposition'] = content
	return HttpResponse(pdf, content_type='application/pdf')


@api_view(['GET'])
@permission_classes((isDocenteOrAdmin, ))
def planilla_docente(request, cedula, codigo):

	user_information = {}
	user = PersonalDocente.objects.get(usuario__cedula=cedula)

	user_information['cedula'] = user.usuario.cedula
	user_information['nombre'] = user.usuario.first_name
	user_information['apellido'] = user.usuario.last_name
	user_information['estudiantes'] = []

	try:
		docente_asignatura = DocenteAsignatura.objects.filter(docente=user, asignatura__codigo=codigo, periodo__estado_periodo__estado="activo").values()[0]
	except Exception as ex:
		response = {}
		response['mensaje'] = str(ex)
		return Response(response, status=status.HTTP_404_NOT_FOUND)

	periodo = Periodo.objects.get(id=docente_asignatura['periodo_id'])
	asignatura = Asignatura.objects.get(id=docente_asignatura['asignatura_id'])
	user_information['periodo'] = periodo.descripcion
	user_information['anio_inicio'] = periodo.anio_inicio
	user_information['anio_fin'] = periodo.anio_fin
	user_information['mes_inicio'] = periodo.mes_inicio
	user_information['mes_fin'] = periodo.mes_fin
	user_information['numero_periodo'] = periodo.numero_periodo
	user_information['asignatura'] = asignatura.nombre

	estudiantes = EstudianteAsignatura.objects.filter(asignatura__codigo=codigo, periodo_estudiante__periodo_id=docente_asignatura['periodo_id'])
	for estudiante in estudiantes:
		estudiante_info = {}
		estudiante_info['nombre'] = estudiante.periodo_estudiante.estudiante.usuario.first_name
		estudiante_info['apellido'] = estudiante.periodo_estudiante.estudiante.usuario.last_name
		estudiante_info['cedula'] = estudiante.periodo_estudiante.estudiante.usuario.cedula
		estudiante_info['nota'] = estudiante.nota_definitiva
		user_information['estudiantes'].append(estudiante_info)

	content = 'attachment; filename="planilla'+str(cedula)+'.pdf"'
	pdf = render_to_pdf('planilla_docente.html', user_information)
	pdf['Content-Disposition'] = content
	return HttpResponse(pdf, content_type='application/pdf')


@api_view(['GET'])
@permission_classes((isAdministrativoOrAdmin, ))
def planilla_periodo(request, periodo):

	periodo_info = {}
	periodo_completo = Periodo.objects.get(id=periodo)
	periodo_info['periodo'] = periodo_completo.descripcion
	periodo_info['anio_inicio'] = periodo_completo.anio_inicio
	periodo_info['anio_fin'] = periodo_completo.anio_fin
	periodo_info['mes_inicio'] = periodo_completo.mes_inicio
	periodo_info['mes_fin'] = periodo_completo.mes_fin
	periodo_info['numero_periodo'] = periodo_completo.numero_periodo

	periodo_info['tipo_postgrado'] = periodo_completo.tipo_postgrado.tipo
	periodo_info['docentes'] = []

	cedulas_agregadas = {}

	docente_asignatura = DocenteAsignatura.objects.filter(periodo=periodo_completo)

	for docentes in docente_asignatura:
		user = PersonalDocente.objects.get(usuario__cedula=docentes.docente.usuario.cedula)
		if(user.usuario.cedula not in cedulas_agregadas):
			cedulas_agregadas[user.usuario.cedula] = []

		asignatura = Asignatura.objects.get(id=docentes.asignatura.id)
		if(asignatura.id not in cedulas_agregadas[user.usuario.cedula]):
			cedulas_agregadas[user.usuario.cedula].append(asignatura.id)

			docente = {}
			docente['cedula'] = user.usuario.cedula
			docente['nombre'] = user.usuario.first_name
			docente['apellido'] = user.usuario.last_name
			docente['estudiantes'] = []
			asignatura = Asignatura.objects.get(id=docentes.asignatura.id)

			docente['asignatura'] = asignatura.nombre
			estudiantes = EstudianteAsignatura.objects.filter(asignatura__codigo=asignatura.codigo, periodo_estudiante__periodo_id=periodo)

			for estudiante in estudiantes:
				estudiante_info = {}
				estudiante_info['nombre'] = estudiante.periodo_estudiante.estudiante.usuario.first_name
				estudiante_info['apellido'] = estudiante.periodo_estudiante.estudiante.usuario.last_name
				estudiante_info['cedula'] = estudiante.periodo_estudiante.estudiante.usuario.cedula
				estudiante_info['nota'] = estudiante.nota_definitiva
				docente['estudiantes'].append(estudiante_info)

			periodo_info['docentes'].append(docente)

	content = 'attachment; filename="planilla'+str(periodo_completo.descripcion)+'.pdf"'
	pdf = render_to_pdf('planilla_periodo.html', periodo_info)
	pdf['Content-Disposition'] = content
	return HttpResponse(pdf, content_type='application/pdf')
#endregion
