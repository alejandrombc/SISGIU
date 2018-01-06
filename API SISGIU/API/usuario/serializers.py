from rest_framework import serializers
from usuario.models import Usuario
    


class UsuarioListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Usuario
        fields = ('id', 'cedula', 'first_name', 'segundo_nombre', 
            'last_name', 'segundo_apellido', 'last_name', 'email', 
            'correo_alternativo', 'celular', 'telefono_casa', 'telefono_trabajo', 
            'fecha_nacimiento', 'sexo', 'nacionalidad', 'estado_civil', 'foto')
    

# Igual, menos el ID
class UsuarioDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ('cedula', 'first_name', 'segundo_nombre', 
            'last_name', 'segundo_apellido', 'last_name', 'email', 
            'correo_alternativo', 'celular', 'telefono_casa', 'telefono_trabajo', 
            'fecha_nacimiento', 'sexo', 'nacionalidad', 'estado_civil', 'foto')