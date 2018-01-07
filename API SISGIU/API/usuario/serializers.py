from rest_framework import serializers
from usuario.models import (
    Usuario,
    Estudiante,
    TipoPostgrado,
    EstadoEstudiante,
    PersonalDocente,
    )
    
from django.forms.fields import ImageField, FileField

"""
Serializer de Usuario
"""
class UsuarioListSerializer(serializers.ModelSerializer):
    foto = serializers.ImageField(required=False, max_length=None, allow_empty_file=True, use_url=True)
    class Meta:
        model = Usuario
        fields = ('id','cedula', 'first_name', 'segundo_nombre', 
            'last_name', 'segundo_apellido', 'last_name', 'email', 
            'correo_alternativo', 'celular', 'telefono_casa', 'telefono_trabajo', 
            'fecha_nacimiento', 'sexo', 'nacionalidad', 'estado_civil', 'foto', 'username')
        

# Todo menos el username (no se debe "re-poner")
class UsuarioDetailSerializer(serializers.ModelSerializer):
    foto = serializers.ImageField(required=False, max_length=None, allow_empty_file=True, use_url=True)
    class Meta:
        model = Usuario
        fields = ('cedula', 'first_name', 'segundo_nombre', 
            'last_name', 'segundo_apellido', 'last_name', 'email', 
            'correo_alternativo', 'celular', 'telefono_casa', 'telefono_trabajo', 
            'fecha_nacimiento', 'sexo', 'nacionalidad', 'estado_civil', 'foto')

"""
Serializer de TipoPostgrado
"""
class TipoPostgradoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoPostgrado
        fields = ('__all__')

"""
Serializer de EstadoEstudiante
"""
class EstadoEstudianteSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoEstudiante
        fields = ('__all__')

"""
Serializer de Estudiante
"""
class EstudianteSerializer(serializers.ModelSerializer):
    usuario = UsuarioListSerializer()
    class Meta:
        model = Estudiante
        fields = ('usuario',  'id_tipo_postgrado', 'id_estado_estudiante', 'direccion',)

    def create(self, validated_data):
        user_data = validated_data.pop('usuario')
        user = Usuario.objects.get(cedula=user_data['cedula'])
        if(user == None):
            user = UsuarioListSerializer.create(UsuarioListSerializer(), validated_data=user_data)
        estudiante, created = Estudiante.objects.update_or_create(usuario=user,
                                id_tipo_postgrado=validated_data.pop('id_tipo_postgrado'),id_estado_estudiante=validated_data.pop('id_estado_estudiante'),
                                direccion=validated_data.pop('direccion') )
        return estudiante

    


class EstudianteDetailSerializer(serializers.ModelSerializer):
    usuario = UsuarioDetailSerializer()
    class Meta:

        model = Estudiante
        fields = ('usuario',  'id_tipo_postgrado', 'id_estado_estudiante', 'direccion',)

    def update(self, instance, validated_data):
        instance.id_tipo_postgrado = validated_data.get('id_tipo_postgrado', instance.id_tipo_postgrado)
        instance.id_estado_estudiante = validated_data.get('id_estado_estudiante', instance.id_estado_estudiante)
        instance.direccion = validated_data.get('direccion', instance.direccion)
        instance.save()

        usuario = validated_data.get('usuario')

        estudiante_usuario = Usuario.objects.get(cedula=usuario['cedula'])
        estudiante_usuario.first_name = usuario['first_name']
        estudiante_usuario.segundo_nombre = usuario['segundo_nombre']
        estudiante_usuario.last_name = usuario['last_name']
        estudiante_usuario.segundo_apellido = usuario['segundo_apellido']
        estudiante_usuario.email = usuario['email']
        estudiante_usuario.correo_alternativo = usuario['correo_alternativo']
        estudiante_usuario.celular = usuario['celular']
        estudiante_usuario.telefono_casa = usuario['telefono_casa']
        estudiante_usuario.telefono_trabajo = usuario['telefono_trabajo']
        estudiante_usuario.fecha_nacimiento = usuario['fecha_nacimiento']
        estudiante_usuario.sexo = usuario['sexo']
        estudiante_usuario.nacionalidad = usuario['nacionalidad']
        estudiante_usuario.estado_civil = usuario['estado_civil']
        if(usuario.get('foto')):
            estudiante_usuario.foto = usuario['foto']
        estudiante_usuario.save()

        return instance

"""
Serializer de Docente
"""
class DocenteSerializer(serializers.ModelSerializer):
    usuario = UsuarioListSerializer()
    curriculum = serializers.FileField(required=False, max_length=None, allow_empty_file=True, use_url=True)
    rif = serializers.FileField(required=False, max_length=None, allow_empty_file=True, use_url=True)
    permiso_ingresos = serializers.FileField(required=False, max_length=None, allow_empty_file=True, use_url=True)

    class Meta:
        model = PersonalDocente
        fields = ('usuario',  'curriculum', 'rif', 'direccion', 'permiso_ingresos','coordinador')

    def create(self, validated_data):
        user_data = validated_data.pop('usuario')
        user = Usuario.objects.get(cedula=user_data['cedula'])
        if(user == None):
            user = UsuarioListSerializer.create(UsuarioListSerializer(), validated_data=user_data)
        
        docente, created = PersonalDocente.objects.update_or_create(usuario=user,
                                curriculum=validated_data.get('curriculum'),rif=validated_data.get('rif'),
                                direccion=validated_data.pop('direccion'), permiso_ingresos=validated_data.get('permiso_ingresos'),
                                coordinador=validated_data.pop('coordinador') )
        return docente

    


class DocenteDetailSerializer(serializers.ModelSerializer):
    usuario = UsuarioDetailSerializer()
    curriculum = serializers.FileField(required=False, max_length=None, allow_empty_file=True, use_url=True)
    rif = serializers.FileField(required=False, max_length=None, allow_empty_file=True, use_url=True)
    permiso_ingresos = serializers.FileField(required=False, max_length=None, allow_empty_file=True, use_url=True)

    class Meta:

        model = PersonalDocente
        fields = ('usuario',  'curriculum', 'rif', 'direccion', 'permiso_ingresos','coordinador')

    def update(self, instance, validated_data):

        if(instance.curriculum != None):
            instance.curriculum = validated_data.get('curriculum', instance.curriculum)
        
        if(instance.rif != None):
            instance.rif = validated_data.get('rif', instance.rif)
       
        if(instance.permiso_ingresos != None): 
            instance.permiso_ingresos = validated_data.get('permiso_ingresos', instance.permiso_ingresos)
        
        instance.coordinador = validated_data.get('coordinador', instance.coordinador)
        instance.save()

        usuario = validated_data.get('usuario')

        docente_usuario = Usuario.objects.get(cedula=usuario['cedula'])
        docente_usuario.first_name = usuario['first_name']
        docente_usuario.segundo_nombre = usuario['segundo_nombre']
        docente_usuario.last_name = usuario['last_name']
        docente_usuario.segundo_apellido = usuario['segundo_apellido']
        docente_usuario.email = usuario['email']
        docente_usuario.correo_alternativo = usuario['correo_alternativo']
        docente_usuario.celular = usuario['celular']
        docente_usuario.telefono_casa = usuario['telefono_casa']
        docente_usuario.telefono_trabajo = usuario['telefono_trabajo']
        docente_usuario.fecha_nacimiento = usuario['fecha_nacimiento']
        docente_usuario.sexo = usuario['sexo']
        docente_usuario.nacionalidad = usuario['nacionalidad']
        docente_usuario.estado_civil = usuario['estado_civil']
        if(usuario.get('foto')):
            docente_usuario.foto = usuario['foto']

        docente_usuario.save()

        return instance



