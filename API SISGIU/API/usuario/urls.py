from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from usuario.views import (
	UsuarioListCreateAPIView,
	UsuarioDetailAPIView,
	UsuarioUpdateAPIView,
	UsuarioDeleteAPIView,
	EstudianteListCreateAPIView,
	TipoPostgradoListCreateAPIView,
	EstadoEstudianteListCreateAPIView,
	EstudianteDetailAPIView,
	EstudianteUpdateAPIView,

	)


urlpatterns = format_suffix_patterns([

    # en vez de pk debe ser la cedula
    url(r'^api/usuarios/$', UsuarioListCreateAPIView.as_view(), name='usuario-list-create'),
    url(r'^api/usuarios/(?P<pk>\d+)/$', UsuarioDetailAPIView.as_view(), name='usuario-detail'),
    url(r'^api/usuarios/(?P<pk>\d+)/edit/$', UsuarioUpdateAPIView.as_view(), name='usuario-update'),
    url(r'^api/usuarios/(?P<pk>\d+)/delete/$', UsuarioDeleteAPIView.as_view(), name='usuario-delete'),

    url(r'^api/estudiantes/$', EstudianteListCreateAPIView.as_view(), name='estudiante-list-create'),
    url(r'^api/estudiantes/(?P<pk>\d+)/$', EstudianteDetailAPIView.as_view(), name='estudiante-detail'),
    url(r'^api/estudiantes/(?P<pk>\d+)/edit/$', EstudianteUpdateAPIView.as_view(), name='estudiante-update'),
    
    url(r'^api/tipoPostgrado/$', TipoPostgradoListCreateAPIView.as_view(), name='tipoPostgrado-list-create'),
    
    url(r'^api/estadoEstudiante/$', EstadoEstudianteListCreateAPIView.as_view(), name='estadoEstudiante-list-create'),


])