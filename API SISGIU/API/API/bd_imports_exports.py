import json
from rest_framework import status
from django.http import HttpResponse
import csv, sys, os
from API.settings import IMPORTS_DB
from asignatura.models import Asignatura, TipoAsignatura
from usuario.models import Estudiante, TipoPostgrado, EstadoEstudiante, Usuario, PersonalDocente, PersonalAdministrativo
from django.views.decorators.csrf import csrf_exempt
from usuario.serializers import UsuarioListSerializer


def import_asignaturas(datos):

    for row in datos:
        if row[0] != 'codigo':
            obj, created = Asignatura.objects.get_or_create(
                codigo=row[0],
                nombre=row[1],
                tipo_asignatura=TipoAsignatura.objects.get(id=row[2]),
                unidad_credito=row[3],
            )
    response = {}
    response['detail'] = 'OK'
    return HttpResponse(json.dumps(response), content_type="application/json", status=status.HTTP_200_OK)


def import_estudiantes(datos):
    response = {}
    try:
        for row in datos:
            if row[0] != 'username':
                objUser, created = Usuario.objects.get_or_create(
                                username=row[0],
                                cedula=row[1],
                                first_name=row[2],
                                segundo_nombre=row[3],
                                last_name=row[4],
                                segundo_apellido=row[5],
                                fecha_nacimiento=row[6],
                                email=row[7],
                                celular=row[8],
                                telefono_casa=row[9],
                                telefono_trabajo=row[10],
                                nacionalidad=row[11],
                                sexo=row[12],
                                estado_civil=row[13],
                                )

                objUser.set_password(row[1])
                objUser.save()

                obj, created = Estudiante.objects.get_or_create(
                    usuario=objUser,
                    id_tipo_postgrado=TipoPostgrado.objects.get(id=row[15]),
                    id_estado_estudiante=EstadoEstudiante.objects.get(id=row[16]),
                    direccion=row[14],
                )
    except Exception as ex:
        response['detail'] = 'Ha ocurrido un error importando estudiantes en la base de datos.'
        return HttpResponse(json.dumps(response), content_type="application/json", status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    response['detail'] = 'OK'
    return HttpResponse(json.dumps(response), content_type="application/json", status=status.HTTP_200_OK)


def import_docentes(datos):
    response = {}
    try:
        for row in datos:
            if row[0] != 'username':
                objUser, created = Usuario.objects.get_or_create(
                                username=row[0],
                                cedula=row[1],
                                first_name=row[2],
                                segundo_nombre=row[3],
                                last_name=row[4],
                                segundo_apellido=row[5],
                                fecha_nacimiento=row[6],
                                email=row[7],
                                celular=row[8],
                                telefono_casa=row[9],
                                telefono_trabajo=row[10],
                                nacionalidad=row[11],
                                sexo=row[12],
                                estado_civil=row[13],
                                )

                obj, created = PersonalDocente.objects.get_or_create(
                    usuario=objUser,
                    direccion=row[14],
                    coordinador=row[15],
                )
    except Exception as ex:
        response['detail'] = 'Ha ocurrido un error importando personal docente en la base de datos.'
        return HttpResponse(json.dumps(response), content_type="application/json", status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    response['detail'] = 'OK'
    return HttpResponse(json.dumps(response), content_type="application/json", status=status.HTTP_200_OK)


def import_administrativo(datos):
    response = {}
    try:
        for row in datos:
            if row[0] != 'username':
                objUser, created = Usuario.objects.get_or_create(
                                username=row[0],
                                cedula=row[1],
                                first_name=row[2],
                                segundo_nombre=row[3],
                                last_name=row[4],
                                segundo_apellido=row[5],
                                fecha_nacimiento=row[6],
                                email=row[7],
                                celular=row[8],
                                telefono_casa=row[9],
                                telefono_trabajo=row[10],
                                nacionalidad=row[11],
                                sexo=row[12],
                                estado_civil=row[13],
                                )
                obj, created = PersonalAdministrativo.objects.get_or_create(usuario=objUser)
    except Exception as ex:
        response['detail'] = 'Ha ocurrido un error importando personal administrativo en la base de datos.'
        return HttpResponse(json.dumps(response), content_type="application/json", status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    response['detail'] = 'OK'
    return HttpResponse(json.dumps(response), content_type="application/json", status=status.HTTP_200_OK)


@csrf_exempt
def import_bd(request, tipo):

    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)

    try:
        datos = csv.reader(open(IMPORTS_DB+'/'+body['nombre_archivo']), delimiter=',')
    except Exception as ex:
        response = {}
        response['detail'] = 'El nombre de archivo especificado no existe.'
        return HttpResponse(json.dumps(response), content_type="application/json", status=status.HTTP_200_OK)

    if tipo == 'estudiantes':
        return import_estudiantes(datos)
    elif tipo == 'docentes':
        return import_docentes(datos)
    elif tipo == 'administrativo':
        return import_administrativo(datos)
    elif tipo == 'asignaturas':
        return import_asignaturas(datos)

    response = {}
    response['detail'] = 'hola'
    return HttpResponse(json.dumps(response), content_type="application/json", status=status.HTTP_200_OK)
