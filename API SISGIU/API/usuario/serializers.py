from rest_framework import serializers
from usuario.models import (
    Usuario,
    Estudiante,
    TipoPostgrado,
    EstadoEstudiante,

    )
    

"""
Serializer de Usuario
"""
class UsuarioListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Usuario
        fields = ('id', 'cedula', 'first_name', 'segundo_nombre', 
            'last_name', 'segundo_apellido', 'last_name', 'email', 
            'correo_alternativo', 'celular', 'telefono_casa', 'telefono_trabajo', 
            'fecha_nacimiento', 'sexo', 'nacionalidad', 'estado_civil', 'foto', 'username')
        

# Igual, menos el ID
class UsuarioDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        cedula = serializers.ReadOnlyField(source='cedula')
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

        print('#############################################################')
        print (usuario['cedula'])
        print('#############################################################')

        estudiante_usuario = Usuario.objects.get(cedula=usuario['cedula'])
        estudiante_usuario.first_name = usuario['first_name']
        estudiante_usuario.last_name = usuario['last_name']
        estudiante_usuario.save()

        return instance

