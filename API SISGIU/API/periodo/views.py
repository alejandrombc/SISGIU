from django.shortcuts import render
from usuario.utils import date_handler
from django.http import HttpResponse
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
    isOwnerOrReadOnly, 
    IsListOrCreate,
    )

from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q
from collections import OrderedDict

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

    def get_periodos_by_filter(request, filtro):
        if (request.method == "GET"):
            filtro = filtro.replace("%20"," ")
            if (filtro == 'todos'):
                member = Periodo.objects.all()
            elif (filtro == 'actuales'):
                member = Periodo.objects.filter(Q(estado_periodo_id__estado='activo') | Q(estado_periodo_id__estado='en inscripcion'))
            else:
                member = Periodo.objects.filter(estado_periodo_id__estado = filtro )

            list_result = [entry for entry in member.values()]

            for periodo in list_result:
                estado_periodo = EstadoPeriodo.objects.filter(id=periodo['estado_periodo_id']).values()[0]
                tipo_postgrado = TipoPostgrado.objects.filter(id=periodo['tipo_postgrado_id']).values()[0]

                periodo['estado_periodo'] = estado_periodo['estado']
                periodo['tipo_postgrado'] = tipo_postgrado['tipo']

            list_result = sorted(list_result, key=lambda k: k['tipo_postgrado']) 

            return HttpResponse(json.dumps(list_result, default=date_handler), content_type="application/json")



        response_data = {}
        response_data['error'] = 'No tiene privilegios para realizar esta accion'      
        return HttpResponse(json.dumps(response_data), content_type="application/json", status=401)


    def get_periodos_by_tipo_postgrado(request, filtro, tipo_postgrado):
        if (request.method == "GET"):
            filtro = filtro.replace("%20"," ")
            member = Periodo.objects.filter(estado_periodo_id__estado = filtro, tipo_postgrado_id = tipo_postgrado)

            list_result = [entry for entry in member.values()]

            return HttpResponse(json.dumps(list_result, default=date_handler), content_type="application/json")

        response_data = {}
        response_data['error'] = 'No tiene privilegios para realizar esta accion'      
        return HttpResponse(json.dumps(response_data), content_type="application/json", status=401)


    @csrf_exempt
    def activar_periodo(request, periodo_id):
        response_data = {}
        if(request.method == "POST"):
            periodo = Periodo.objects.get(id=periodo_id)
            estado_periodo = EstadoPeriodo.objects.get(id=periodo.estado_periodo_id)
            
            # Validamos si el periodo seleccionado ya esta activo
            if(estado_periodo.estado == "en inscripcion" or estado_periodo.estado == "activo"):
                response_data['error'] = 'El periodo seleccionado ya se encuentra en inscripción o activo.'      
                return HttpResponse(json.dumps(response_data), content_type="application/json", status=409)

            # Validamos que no exista otro "tipo de postgrado" en inscripcion
            periodo_postgrado = Periodo.objects.filter(tipo_postgrado_id=periodo.tipo_postgrado_id, estado_periodo_id__estado="en inscripcion")
            if periodo_postgrado:
                response_data['error'] = 'Ya existe un periodo en inscripción para este tipo de postgrado.'      
                return HttpResponse(json.dumps(response_data), content_type="application/json", status=409)

            # Validamos que no exista otro "tipo de postgrado" activo
            periodo_postgrado = Periodo.objects.filter(tipo_postgrado_id=periodo.tipo_postgrado_id, estado_periodo_id__estado="activo")
            if periodo_postgrado:
                response_data['error'] = 'Ya existe un periodo activo para este tipo de postgrado.'      
                return HttpResponse(json.dumps(response_data), content_type="application/json", status=409)


            #Actualizo el periodo a "en inscripcion"
            else:
                estado_periodo = EstadoPeriodo.objects.get(estado="en inscripcion")
                Periodo.objects.filter(id=periodo_id).update(estado_periodo=estado_periodo.id)
                response_data['message'] = 'Periodo iniciado correctamente.'      
                return HttpResponse(json.dumps(response_data), content_type="application/json")



        response_data['error'] = 'No tiene privilegios para realizar esta acción'      
        return HttpResponse(json.dumps(response_data), content_type="application/json", status=405)



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

    @csrf_exempt
    def cambiar_estado_periodo(request, periodo, filtro):
        if (request.method == "PUT"):

            if filtro == "activo":
                #Borro todos los alumnos con estado "no pagado" del periodo actual
                print("Activo")
                PeriodoEstudiante.objects.filter(periodo_id=periodo, pagado=False).delete()

            elif filtro == "finalizado":
                #Actualizo la tabla de Estudiante Asignatura con las notas cargadas 
                print("Finalizado")

            #Actualizar el estado periodo del periodo indicado
            estado_periodo = EstadoPeriodo.objects.get(estado=filtro) 
            Periodo.objects.filter(id=periodo).update(estado_periodo=estado_periodo.id)

            response_data = {}
            response_data['status'] = 'OK'  
            return HttpResponse(json.dumps(response_data, default=date_handler), content_type="application/json")



        response_data = {}
        response_data['error'] = 'No tiene privilegios para realizar esta accion'      
        return HttpResponse(json.dumps(response_data), content_type="application/json", status=401)


class PeriodoDeleteAPIView(DestroyAPIView):
    queryset = Periodo.objects.all()
    serializer_class = PeriodoDetailSerializer
    permission_classes = [IsAdminUser]


