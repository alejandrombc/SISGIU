from django.shortcuts import render
from django.http import HttpResponse
from usuario.utils import render_to_pdf, date_handler
from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_exempt
from django import forms
import json, os

from bson import json_util

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

from usuario.models import (
    Usuario,
    Estudiante,
    TipoPostgrado,
    EstadoEstudiante,
    PersonalDocente,
    PersonalAdministrativo,
    )
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
    AdministrativoDetailSerializer
    )
from relacion.models import (
    EstudianteAsignatura,
    PeriodoEstudiante,
    )
from rest_framework.generics import (
	ListCreateAPIView,
	RetrieveAPIView,
    RetrieveUpdateAPIView,
    DestroyAPIView,
	)


host_react = 'http://localhost:3000/'

"""
Usuario
"""
class AdministradorListCreateAPIView(ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = AdministradorListSerializer
    permission_classes = [IsAdminUser]

    def get_usuarios(request, modulo):

        try:
            response_data = []
            if ( modulo == 'estudiantes' ):
                member = Estudiante.objects.all().values()
                lista_estudiantes = [entry for entry in member]

                for estudiante in lista_estudiantes:
                    usuario = Usuario.objects.filter(id=estudiante['usuario_id']).values()[0]
                    tipo_postgrado = TipoPostgrado.objects.filter(id=estudiante['id_tipo_postgrado_id']).values()[0]
                    estado_estudiante = EstadoEstudiante.objects.filter(id=estudiante['id_estado_estudiante_id']).values()[0]

                    usuario['tipo_postgrado'] = tipo_postgrado['tipo']
                    usuario['estado_estudiante'] = estado_estudiante['estado']
                    usuario['id_tipo_postgrado'] = tipo_postgrado['id']
                    usuario['id_estado_estudiante'] = estado_estudiante['id']
                    usuario['direccion'] = estudiante['direccion']
                    usuario['foto'] = request.build_absolute_uri('/')+"media/"+usuario['foto']


                    response_data.append(usuario)

            elif ( modulo == 'docentes' ):
                member = PersonalDocente.objects.all().values()
                lista_docentes = [entry for entry in member]

                for docente in lista_docentes:
                    usuario = Usuario.objects.filter(id=docente['usuario_id']).values()[0]

                    usuario['direccion'] = docente['direccion']
                    usuario['rif'] = request.build_absolute_uri('/')+"media/"+docente['rif']
                    usuario['curriculum'] = request.build_absolute_uri('/')+"media/"+docente['curriculum']
                    usuario['permiso_ingresos'] = request.build_absolute_uri('/')+"media/"+docente['permiso_ingresos']
                    usuario['coordinador'] = docente['coordinador']
                    usuario['foto'] = request.build_absolute_uri('/')+"media/"+usuario['foto']

                    response_data.append(usuario)

            elif (modulo == 'administradores' ):
                member = Usuario.objects.filter(is_superuser=True).values()
                lista_usuarios = [entry for entry in member]

                for usuario in lista_usuarios:
                    usuario['foto'] = request.build_absolute_uri('/')+"media/"+usuario['foto']
                    response_data.append(usuario)

            elif (modulo == 'administrativo' ):
                member = PersonalAdministrativo.objects.all().values()
                lista_estudiantes = [entry for entry in member]

                for administrativo in lista_estudiantes:
                    usuario = Usuario.objects.filter(id=administrativo['usuario_id']).values()[0]
                    usuario['foto'] = request.build_absolute_uri('/')+"media/"+usuario['foto']


                    response_data.append(usuario)

            else:
                response_data = {}
                response_data['error'] = "No existe el modulo especificado."
                return HttpResponse(json.dumps(response_data, default=date_handler), content_type="application/json", status=400)



            for usuario in response_data:
                del usuario['is_staff']
                del usuario['is_superuser']
                del usuario['date_joined']
                del usuario['id']
                del usuario['is_active']

            return HttpResponse(json.dumps(response_data, default=date_handler), content_type="application/json", status=200)
        
        except:
            response_data = {}
            response_data['error'] = "Ha ocurrido un error obteniendo la lista de usuarios."
            return HttpResponse(json.dumps(response_data, default=date_handler), content_type="application/json", status=500)

class AdministradorDetailAPIView(RetrieveAPIView):
    queryset = Usuario.objects.all()
    serializer_class = AdministradorDetailSerializer
    lookup_field = 'cedula'
    permission_classes = [IsAdminUser]

    def get_usr_id(request, id_usr):
        if(request.user.is_anonymous == False):
            member = Usuario.objects.filter(id=id_usr)
            list_result = [entry for entry in member.values()]

            # Codigo para cambiar el username de un administrador.
            """
            user = Usuario.objects.get(id=id_usr)
            user.username = 24635907
            user.cedula = 24635907
            user.save()
            """

            return HttpResponse(json.dumps(list_result, default=date_handler), content_type="application/json")
        response_data = {}
        response_data['error'] = 'No tiene privilegios para realizar esta accion'      
        return HttpResponse(json.dumps(response_data), content_type="application/json", status=401)


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
                    status = 200
                else:
                    status = 404
            else:
                status = 404
           
            return HttpResponse(json.dumps({"Recuperacion":"OK"}, default=date_handler), content_type="application/json", status=status)

        member = Usuario.objects.filter(username=cedula)
        list_result = {"password": member.values()[0]['password']}

        return HttpResponse(json.dumps(list_result, default=date_handler), content_type="application/json")


    def get_admin(request, cedula):
        member = Usuario.objects.filter(username=cedula, is_superuser=True)
        if(member):
            user = member.values()[0]
            user['foto'] = request.build_absolute_uri('/')+"media/"+user['foto']
            list_result = {"usuario": user}
            return HttpResponse(json.dumps(list_result, default=date_handler), content_type="application/json", status=200)

        return HttpResponse(json.dumps({"ERROR":"Usuario no es administrador"}, default=date_handler), content_type="application/json", status=404)


    @csrf_exempt
    def edit_admin(request, cedula):
        if(request.method == "PUT"):
            body_unicode = request.body.decode('utf-8')
            body = json.loads(body_unicode)

            user = Usuario.objects.get(username=cedula)
            print (user)
            if(user):
                user.first_name = body['usuario']['first_name']
                user.last_name = body['usuario']['last_name']
                user.estado_civil = body['usuario']['estado_civil']
                user.email = body['usuario']['email']
                user.celular = body['usuario']['celular']
                user.telefono_trabajo = body['usuario']['telefono_trabajo']
                user.telefono_casa = body['usuario']['telefono_casa']
                user.save()
                return HttpResponse(json.dumps({"status":"OK"}, default=date_handler), content_type="application/json", status=200)

        return HttpResponse(json.dumps({"error":"Ese usuario no es un administrador"}, default=date_handler), content_type="application/json", status=404)

    @csrf_exempt
    def update_photo(request, cedula):
        if(request.method == "POST"):
            username = request.POST.get("username")
            user = Usuario.objects.get(username=username)
            if(username == cedula or user['is_superuser']):
                foto = request.FILES['foto']
                if(user):
                    # Replace old video with new one,
                    # and remove original unconverted video and original copy of new video.
                    if "sisgiu" not in user.foto.path and "no_avatar" not in user.foto.path: 
                        os.remove(user.foto.path)
                    user.foto = foto
                    user.save()
                    return HttpResponse(json.dumps({"status":"OK"}, default=date_handler), content_type="application/json", status=200)

            return HttpResponse(json.dumps({"error":"No tiene privilegios para realizar esta accion"}, default=date_handler), content_type="application/json", status=403)

        return HttpResponse(json.dumps({"error":"Metodo no permitido"}, default=date_handler), content_type="application/json", status=405)


    def get_all_admin(request):
        member = Usuario.objects.filter(is_superuser=True)
        list_result = member.values()[0]
        return HttpResponse(json.dumps(list_result, default=date_handler), content_type="application/json")




    def send_mail(request, cedula):

        member = Usuario.objects.filter(username=cedula)
        if member:
            member = member.values()[0]
            correo = member['email']
            password = member['password']
            

            url = host_react + "recuperarContrasena/"+cedula+"/"+password;
            body = "Haga click en el siguiente enlace " + url +" para restablecer su contraseña"

            send_mail('Recuperación de contraseña', body, 'sisgiu.fau@gmail.com', [correo])


            # Codigo para cambiar el username de un administrador.
            """
            user = Usuario.objects.get(id=id_usr)
            user.username = 24635907
            user.cedula = 24635907
            user.save()
            """
            response_data = {}
            response_data['status'] = 'Correo enviado'  

            return HttpResponse(json.dumps(response_data), content_type="application/json", status=200)
        
        response_data = {}
        response_data['error'] = 'Cedula no encontrada'  

        return HttpResponse(json.dumps(response_data), content_type="application/json", status=404)


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


"""
Estudiante
"""
class EstudianteListCreateAPIView(ListCreateAPIView):
    queryset = Estudiante.objects.all()
    serializer_class = EstudianteSerializer
    permission_classes = [IsAuthenticated, IsListOrCreate]

class EstudianteDetailAPIView(RetrieveAPIView):
    queryset = Estudiante.objects.all()
    serializer_class = EstudianteDetailSerializer
    lookup_field = 'usuario__cedula'
    permission_classes = [IsAuthenticated]

    # def get_estudiante_asignatura(request, codigo_asignatura):


    def get_estudiantes_asignatura(request, codigo_asignatura):
        if (request.user.is_anonymous == False):
            member = EstudianteAsignatura.objects.filter(asignatura__codigo=codigo_asignatura, periodo_estudiante__periodo__estado_periodo__estado="activo").values()
            
            lista_estudiante_asignatura = [entry for entry in member]
            lista_periodo_estudiante = []
            lista_estudiantes = []

            for estudiante_asignatura in lista_estudiante_asignatura:
                periodo_estudiante = PeriodoEstudiante.objects.filter(id=estudiante_asignatura['periodo_estudiante_id']).values()[0]
                estudiante = Usuario.objects.filter(id=periodo_estudiante['estudiante_id']).values()[0]
                
                estudiante_asignatura['periodo_estudiante'] = periodo_estudiante
                estudiante_asignatura['estudiante'] = estudiante
                
                # periodo_estudiante['estudiante'] = estudiante

                # lista_periodo_estudiante.append(periodo_estudiante)

            for element in lista_estudiante_asignatura: 
                del element['estudiante']['sexo'] 
                del element['estudiante']['username'] 
                del element['estudiante']['date_joined'] 
                del element['estudiante']['last_login'] 
                del element['estudiante']['correo_alternativo'] 
                del element['estudiante']['is_active'] 
                del element['estudiante']['is_staff'] 
                del element['estudiante']['nacionalidad'] 
                del element['estudiante']['foto'] 
                del element['estudiante']['telefono_trabajo'] 
                del element['estudiante']['password'] 
                del element['estudiante']['estado_civil'] 
                del element['estudiante']['celular'] 
                del element['estudiante']['is_superuser'] 
                del element['estudiante']['email'] 
                del element['estudiante']['telefono_casa'] 
                del element['estudiante']['fecha_nacimiento'] 

            # print('--->' + str(lista_estudiante_asignatura))
            # print('###############\n\n')

            return HttpResponse(json.dumps(lista_estudiante_asignatura, default=date_handler), content_type="application/json")

        response_data = {}
        response_data['error'] = 'No tiene privilegios para realizar esta accion'      
        return HttpResponse(json.dumps(response_data), content_type="application/json", status=401)



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



"""
TipoPostgrado
"""
class TipoPostgradoListCreateAPIView(ListCreateAPIView):
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


"""
EstadoEstudiante
"""
class EstadoEstudianteListCreateAPIView(ListCreateAPIView):
    queryset = EstadoEstudiante.objects.all()
    serializer_class = EstadoEstudianteSerializer
    permission_classes = [IsListOrCreate, IsAuthenticated]


class EstadoEstudianteDeleteAPIView(DestroyAPIView):
    queryset = EstadoEstudiante.objects.all()
    serializer_class = EstadoEstudianteSerializer
    permission_classes = [IsAdminUser]





"""
Docente
"""
class DocenteListCreateAPIView(ListCreateAPIView):
    queryset = PersonalDocente.objects.all()
    serializer_class = DocenteSerializer
    permission_classes = [IsAuthenticated, IsListOrCreate]

class DocenteDetailAPIView(RetrieveAPIView):
    queryset = PersonalDocente.objects.all()
    serializer_class = DocenteDetailSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'usuario__cedula'

    @csrf_exempt
    def update_file(request, cedula, tipo_documento):

        if(request.method == "POST"):
            
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
                    return HttpResponse(json.dumps({"status":"OK"}, default=date_handler), content_type="application/json", status=200)

            return HttpResponse(json.dumps({"error":"No tiene privilegios para realizar esta acción"}, default=date_handler), content_type="application/json", status=403)

        return HttpResponse(json.dumps({"error":"Método no permitido"}, default=date_handler), content_type="application/json", status=405)

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



"""
Personal Administrativo
"""
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



class Reportes():
    def report_test(request, cedula):
        if(request.user.is_anonymous != False):
            member = Usuario.objects.get(username=request.user)
            if(member.is_superuser == True or cedula == str(request.user.cedula)):
                content = 'attachment; filename="constancia_'+str(cedula)+'.pdf"'
                member = Usuario.objects.get(cedula=cedula)
                pdf = render_to_pdf('constancia.html', member.__dict__)
                pdf['Content-Disposition'] = content
                return HttpResponse(pdf, content_type='application/pdf')

        response_data = {}
        response_data['error'] = 'No tiene privilegios para realizar esta accion'      
        return HttpResponse(json.dumps(response_data), content_type="application/json", status=401)