from rest_framework import serializers
from usuario.models import Usuario
    


class Usuario(serializers.ModelSerializer):

    class Meta:
        model = Usuario
        fields = ('cedula', 'first_name', 'segundo_nombre', 
            'last_name', 'segundo_apellido', 'last_name', 'email', 
            'corre_alternativo', 'celular', 'telefono_casa', 'telefono_trabajo', 
            'fecha_nacimiento', 'sexo', 'nacionalidad', 'estadp_civil', 'foto')

"""
class SnippetSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Snippet
        fields = ('id', 'owner', 'title', 'code', 'linenos', 'language', 'style')


class UserSerializer(serializers.ModelSerializer):
    snippets = serializers.PrimaryKeyRelatedField(many=True, queryset=Snippet.objects.all())

    class Meta:
        model = User
        fields = ('id', 'username', 'snippets')
"""
