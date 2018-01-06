from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from usuario.views import (
	UsuarioListCreateAPIView,
	UsuarioDetailAPIView,
	UsuarioUpdateAPIView,
	UsuarioDeleteAPIView,
	)


urlpatterns = format_suffix_patterns([

    # en vez de pk debe ser la cedula
    url(r'^api/usuarios/$', UsuarioListCreateAPIView.as_view(), name='usuario-list-create'),
    url(r'^api/usuarios/(?P<pk>\d+)/$', UsuarioDetailAPIView.as_view(), name='usuario-detail'),
    url(r'^api/usuarios/(?P<pk>\d+)/edit/$', UsuarioUpdateAPIView.as_view(), name='usuario-update'),
    url(r'^api/usuarios/(?P<pk>\d+)/delete/$', UsuarioDeleteAPIView.as_view(), name='usuario-delete'),


])