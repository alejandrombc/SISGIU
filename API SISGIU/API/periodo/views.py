#region imports
from django.shortcuts import render
from usuario.utils import date_handler
import json
from periodo.models import (
	EstadoPeriodo,
	Periodo,
	)
from relacion.models import (
	PeriodoEstudiante,
	EstudianteAsignatura,
	)
from usuario.models import (
	TipoPostgrado,
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
	CreateAPIView,
	)

from rest_framework.permissions import (
	AllowAny,
	IsAdminUser,
	IsAuthenticated,
	IsAuthenticatedOrReadOnly,
	)

from .permissions import (
	IsListOrCreate,
	)

from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q
from collections import OrderedDict
from rest_framework.decorators import permission_classes, api_view
from rest_framework.exceptions import ParseError
from usuario.permissions import isDocenteOrAdmin, isEstudianteOrAdmin, isAdministrativoOrAdmin
from rest_framework import status
from rest_framework.response import Response
#endregion


"""
EstadoPeriodo
	Esto solo debe ser tratado por el administrador
"""

@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def get_estado_periodo(request, periodo_id):
    response_data = {}
    estado_periodo = EstadoPeriodo.objects.get(periodo__id=periodo_id)

    response_data['estado'] = estado_periodo.estado

    return Response(response_data, status=status.HTTP_200_OK)

#region EstadoPeriodo

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
#endregion

"""
Periodo
Esto solo debe ser tratado por el administrador
"""

@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def get_periodos_by_filter(request, filtro):
    
    filtro = filtro.replace("%20", " ")
    if (filtro == 'todos'):
        member = Periodo.objects.all()
    elif (filtro == 'actuales'):
        member = Periodo.objects.filter(Q(estado_periodo_id__estado='activo') | Q(estado_periodo_id__estado='en inscripcion'))
    else:
        member = Periodo.objects.filter(estado_periodo_id__estado=filtro)

    list_result = [entry for entry in member.values()]

    for periodo in list_result:
        estado_periodo = EstadoPeriodo.objects.filter(id=periodo['estado_periodo_id']).values()[0]
        tipo_postgrado = TipoPostgrado.objects.filter(id=periodo['tipo_postgrado_id']).values()[0]

        periodo['estado_periodo'] = estado_periodo['estado']
        periodo['tipo_postgrado'] = tipo_postgrado['tipo']

    list_result = sorted(list_result, key=lambda k: k['tipo_postgrado'])

    # return HttpResponse(json.dumps(list_result, default=date_handler), content_type="application/json")
    return Response(list_result, status=status.HTTP_200_OK)



@api_view(['GET'])
@permission_classes((IsAuthenticated, isEstudianteOrAdmin,))
def get_periodos_by_tipo_postgrado(request, filtro, tipo_postgrado):

    filtro = filtro.replace("%20", " ")
    member = Periodo.objects.filter(estado_periodo_id__estado=filtro, tipo_postgrado_id=tipo_postgrado)
    list_result = [entry for entry in member.values()]

    return Response(list_result, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes((IsAuthenticated, IsAdminUser,))
@csrf_exempt
def activar_periodo(request, periodo_id):
    response_data = {}
    periodo = Periodo.objects.get(id=periodo_id)
    estado_periodo = EstadoPeriodo.objects.get(id=periodo.estado_periodo_id)

    # Validamos si el periodo seleccionado ya esta activo
    if(estado_periodo.estado == "en inscripcion" or estado_periodo.estado == "activo"):
        response_data['error'] = 'El periodo seleccionado ya se encuentra en inscripción o activo.'
        return Response(response_data, status=status.HTTP_409_CONFLICT)

    # Validamos que no exista otro "tipo de postgrado" en inscripcion
    periodo_postgrado = Periodo.objects.filter(tipo_postgrado_id=periodo.tipo_postgrado_id, estado_periodo_id__estado="en inscripcion")
    if periodo_postgrado:
        response_data['error'] = 'Ya existe un periodo en inscripción para este tipo de postgrado.'
        return Response(response_data, status=status.HTTP_409_CONFLICT)
    
    # Validamos que no exista otro "tipo de postgrado" activo
    periodo_postgrado = Periodo.objects.filter(tipo_postgrado_id=periodo.tipo_postgrado_id, estado_periodo_id__estado="activo")
    if periodo_postgrado:
        response_data['error'] = 'Ya existe un periodo activo para este tipo de postgrado.'
        return Response(response_data, status=status.HTTP_409_CONFLICT)
    
    # Actualizo el periodo a "en inscripcion"
    else:
        estado_periodo = EstadoPeriodo.objects.get(estado="en inscripcion")
        Periodo.objects.filter(id=periodo_id).update(estado_periodo=estado_periodo.id)
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['PUT'])
@permission_classes((IsAuthenticated, IsAdminUser,))
@csrf_exempt
def cambiar_estado_periodo(request, periodo, filtro):
    if filtro == "activo":
        # Borro todos los alumnos con estado "no pagado" del periodo actual
        PeriodoEstudiante.objects.filter(periodo_id=periodo, pagado=False).delete()

    # Actualizar el estado periodo del periodo indicado
    estado_periodo = EstadoPeriodo.objects.get(estado=filtro)
    Periodo.objects.filter(id=periodo).update(estado_periodo=estado_periodo.id)

    return Response(status=status.HTTP_204_NO_CONTENT)


#region Periodo
class PeriodoListCreateAPIView(ListCreateAPIView):
	queryset = Periodo.objects.all()
	serializer_class = PeriodoListSerializer
	permission_classes = [IsAuthenticated, IsListOrCreate]

	def perform_create(self, serializer):

		periodo = Periodo.objects.filter(estado_periodo__id=serializer.data['estado_periodo'], tipo_postgrado__id=serializer.data['tipo_postgrado'])
		if (len(periodo) != 0):
			raise ParseError('Ya existe un periodo con el estatus "No Iniciado" para el tipo de postgrado seleccionado')

		nuevo_periodo = PeriodoListSerializer(data=serializer.data)
		nuevo_periodo.is_valid()
		nuevo_periodo.save()


class PeriodoCreateAPIView(CreateAPIView):
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
	# permission_classes = [IsAdminUser]


class PeriodoDeleteAPIView(DestroyAPIView):
	queryset = Periodo.objects.all()
	serializer_class = PeriodoDetailSerializer
	permission_classes = [IsAdminUser]
#endregion