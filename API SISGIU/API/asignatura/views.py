from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
from asignatura.models import (
	TipoAsignatura,
	Asignatura,
    PrelacionAsignatura,
	)

from usuario.models import(
    TipoPostgrado,
    Usuario
    )

from relacion.models import (
    DocenteAsignatura,
    EstudianteAsignatura,
    AsignaturaTipoPostgrado
    )
from asignatura.serializers import (
	TipoAsignaturaListSerializer,
	TipoAsignaturaDetailSerializer,
	AsignaturaListSerializer,
	AsignaturaDetailSerializer,
    PrelacionAsignaturaListSerializer
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
        if (request.user.is_anonymous != False):
            member = DocenteAsignatura.objects.filter(docente__usuario__cedula=cedula , periodo__estado_periodo__estado="activo")
            # member = DocenteAsignatura.objects.filter(docente__usuario__cedula=cedula)

            member = member.values()
            lista_docente_asignatura = [entry for entry in member]  # converts ValuesQuerySet into Python list
            
        
            # print(lista_docente_asignatura)
            # print('\n')
            lista_asignaturas = []

            for docente_asignatura in lista_docente_asignatura:
                asignatura = Asignatura.objects.filter(id=docente_asignatura['asignatura_id']).values()[0]
                tipo_asignatura = TipoAsignatura.objects.filter(id=asignatura['tipo_asignatura_id']).values()[0]
                asig_tipo = AsignaturaTipoPostgrado.objects.filter(asignatura_id=asignatura['id']).values()[0]
                tipo_postgrado = TipoPostgrado.objects.filter(id=asig_tipo['tipo_postgrado_id']).values()[0]


                asignatura['tipo_asignatura'] = tipo_asignatura['nombre']
                asignatura['tipo_postgrado'] = tipo_postgrado['tipo']
                asignatura['horario_dia'] = docente_asignatura['horario_dia']
                asignatura['horario_hora'] = docente_asignatura['horario_hora']

                del asignatura['tipo_asignatura_id']
                del asignatura['tipo_postgrado_id']
                lista_asignaturas.append(asignatura)

            return HttpResponse(json.dumps(lista_asignaturas), content_type="application/json")
        response_data = {}
        response_data['error'] = 'No tiene privilegios para realizar esta accion'      
        return HttpResponse(json.dumps(response_data), content_type="application/json", status=401)

    def get_asignaturas_por_estudiante(request, cedula):
        if (request.user.is_anonymous != False):
            member = EstudianteAsignatura.objects.filter(periodo_estudiante__estudiante__usuario__cedula=cedula , periodo_estudiante__periodo__estado_periodo__estado="activo").values()

            lista_estudiante_asignatura = [entry for entry in member]

            lista_asignaturas = []

            for estudiante_asignatura in lista_estudiante_asignatura:

                asignatura = Asignatura.objects.filter(id=estudiante_asignatura['asignatura_id']).values()[0]
                tipo_asignatura = TipoAsignatura.objects.filter(id=asignatura['tipo_asignatura_id']).values()[0]
                asig_tipo = AsignaturaTipoPostgrado.objects.filter(asignatura_id=asignatura['id']).values()[0]
                tipo_postgrado = TipoPostgrado.objects.filter(id=asig_tipo['tipo_postgrado_id']).values()[0]

                docente_asignatura = DocenteAsignatura.objects.filter(asignatura_id=asignatura['id']).values()
                horarios_dia = []
                horarios_hora = []

                lista_docente_asignatura = [entry for entry in docente_asignatura]
                asignatura['docente'] = {}

                docente_informacion = Usuario.objects.filter(id=lista_docente_asignatura[0]['docente_id']).values()[0]
                asignatura['docente']['first_name'] = docente_informacion['first_name']
                asignatura['docente']['last_name'] = docente_informacion['last_name']
                

                for docente in lista_docente_asignatura:
                    horarios_dia.append(docente['horario_dia'])
                    horarios_hora.append(docente['horario_hora'])
                    

                asignatura['docente']['horario_dia'] = horarios_dia
                asignatura['docente']['horario_hora'] = horarios_hora

                asignatura['tipo_asignatura'] = tipo_asignatura['nombre']
                asignatura['tipo_postgrado'] = tipo_postgrado['tipo']

                del asignatura['tipo_asignatura_id']
                del asignatura['tipo_postgrado_id']

                lista_asignaturas.append(asignatura)

            return HttpResponse(json.dumps(lista_asignaturas), content_type="application/json")
        response_data = {}
        response_data['error'] = 'No tiene privilegios para realizar esta accion'      
        return HttpResponse(json.dumps(response_data), content_type="application/json", status=401)

    def get_asignaturas(request):
        if (request.user.is_authenticated == True):
            member = Asignatura.objects.all().values()

            lista_asignaturas = [entry for entry in member]

            response_asignaturas = []

            for asignatura in lista_asignaturas:

                tipo_asignatura = TipoAsignatura.objects.filter(id=asignatura['tipo_asignatura_id']).values()[0]
                tipo_postgrado = TipoPostgrado.objects.filter(id=asignatura['tipo_postgrado_id']).values()[0]
                asignatura['tipo_asignatura'] = tipo_asignatura['nombre']
                asignatura['tipo_postgrado'] = tipo_postgrado['tipo']

                response_asignaturas.append(asignatura)

            return HttpResponse(json.dumps(response_asignaturas), content_type="application/json")
        response_data = {}
        response_data['error'] = 'No tiene privilegios para realizar esta acción'      
        return HttpResponse(json.dumps(response_data), content_type="application/json", status=401)




class AsignaturaDetailAPIView(RetrieveAPIView):
    queryset = Asignatura.objects.all()
    serializer_class = AsignaturaDetailSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'codigo'

class AsignaturaUpdateAPIView(RetrieveUpdateAPIView):
    queryset = Asignatura.objects.all()
    serializer_class = AsignaturaDetailSerializer
    permission_classes = [IsAdminUser]
    lookup_field = 'codigo'

class AsignaturaDeleteAPIView(DestroyAPIView):
    queryset = Asignatura.objects.all()
    serializer_class = AsignaturaDetailSerializer
    permission_classes = [IsAdminUser]
    lookup_field = 'codigo'



"""
PrelacionAsignatura
                Esto solo debe ser tratado por el administrador
"""
class PrelacionAsignaturaListCreateAPIView(ListCreateAPIView):
    queryset = PrelacionAsignatura.objects.all()
    serializer_class = PrelacionAsignaturaListSerializer

    @csrf_exempt
    def post_prelacion(request):
        if (request.method == 'POST'):
            codigos=json.loads(request.body.decode("utf-8"))
            PrelacionAsignatura.objects.filter(asignatura_objetivo=codigos['codigo']).delete()
            prelacion = []
            print('\n#########################.\n')
            print(codigos)
            for code in codigos['prelaciones']:
                print(code)
                print('\n#########################.\n')
                prelacion = PrelacionAsignatura.objects.create(
                    asignatura_objetivo=Asignatura.objects.get(codigo = codigos['codigo']), 
                    asignatura_prela=Asignatura.objects.get(codigo = code))

            response_data = {}
            response_data['status'] = 'Creacion exitosa'      
            return HttpResponse(json.dumps(response_data), content_type="application/json")
        response_data = {}
        response_data['error'] = 'No tiene privilegios para realizar esta acción'      
        return HttpResponse(json.dumps(response_data), content_type="application/json", status=401)


    def get_asignaturas_necesarias(request, codigo):
        if (request.method == 'GET'):
            
            asignaturas = PrelacionAsignatura.objects.filter(asignatura_objetivo=codigo).values()

            lista_prelaciones = [entry for entry in asignaturas]

            lista_asignaturas = []

            for prelacion in lista_prelaciones:
                asignatura = Asignatura.objects.filter(codigo=prelacion['asignatura_objetivo_id']).values()[0]
                prelacion['nombre_asignatura_objetivo'] = asignatura['nombre']
                
                asignatura = Asignatura.objects.filter(codigo=prelacion['asignatura_prela_id']).values()[0]
                prelacion['nombre_asignatura_prela'] = asignatura['nombre']

                lista_asignaturas.append(prelacion)

            return HttpResponse(json.dumps(lista_asignaturas), content_type="application/json")

        response_data = {}
        response_data['error'] = 'No tiene privilegios para realizar esta acción'      
        return HttpResponse(json.dumps(response_data), content_type="application/json", status=401)

    def get_all_asignaturas_necesarias(request):
        if (request.method == 'GET'):
            
            asignaturas = PrelacionAsignatura.objects.all().values()

            lista_prelaciones = [entry for entry in asignaturas]

            
            lista_asignaturas = []

            for prelacion in lista_prelaciones:
                asignatura = Asignatura.objects.filter(codigo=prelacion['asignatura_objetivo_id']).values()[0]
                prelacion['nombre_asignatura_objetivo'] = asignatura['nombre']
                
                asignatura = Asignatura.objects.filter(codigo=prelacion['asignatura_prela_id']).values()[0]
                prelacion['nombre_asignatura_prela'] = asignatura['nombre']

                lista_asignaturas.append(prelacion)
     
            return HttpResponse(json.dumps(lista_asignaturas), content_type="application/json")

        response_data = {}
        response_data['error'] = 'No tiene privilegios para realizar esta acción'      
        return HttpResponse(json.dumps(response_data), content_type="application/json", status=401)

    @csrf_exempt
    def delete_asignaturas_necesarias(request, codigo):
        if (request.method == "DELETE"):
            
            asignaturas = PrelacionAsignatura.objects.filter(asignatura_objetivo=codigo).delete()

            response_data = {}
            response_data['status'] = 'Eliminacion exitosa'  
            return HttpResponse(json.dumps(response_data), content_type="application/json")

        response_data = {}
        response_data['error'] = 'No tiene privilegios para realizar esta acción'      
        return HttpResponse(json.dumps(response_data), content_type="application/json", status=401)

    @csrf_exempt
    def delete_all_asignaturas_necesarias(request):
        if (request.method == "DELETE"):
            
            asignaturas = PrelacionAsignatura.objects.all().delete()

            response_data = {}
            response_data['status'] = 'Eliminacion exitosa'  
            return HttpResponse(json.dumps(response_data), content_type="application/json")

        response_data = {}
        response_data['error'] = 'No tiene privilegios para realizar esta acción'      
        return HttpResponse(json.dumps(response_data), content_type="application/json", status=401)
