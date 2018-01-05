from django.shortcuts import render

from usuario.models import Usuario
from usuario.serializers import (
    UsuarioListSerializer,
    UsuarioDetailSerializer,
    )
from rest_framework.generics import (
	ListCreateAPIView,
	RetrieveAPIView,
    RetrieveUpdateAPIView,
    DestroyAPIView,
	)


class UsuarioListCreateAPIView(ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioListSerializer

class UsuarioDetailAPIView(RetrieveAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioDetailSerializer

class UsuarioUpdateAPIView(RetrieveUpdateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioDetailSerializer

class UsuarioDeleteAPIView(DestroyAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioDetailSerializer



"""

class UsuarioList(ListAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


class UsuarioDetail(RetrieveAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer



@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'usuario': reverse('usuario-list', request=request, format=format),
    })
"""