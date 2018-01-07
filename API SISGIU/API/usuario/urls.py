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
	DocenteListCreateAPIView,
	DocenteDetailAPIView,
	DocenteUpdateAPIView,
	)


urlpatterns = format_suffix_patterns([

    # Usuarios
    url(r'^api/usuarios/$', UsuarioListCreateAPIView.as_view(), name='usuario-list-create'),
    url(r'^api/usuarios/(?P<cedula>\d+)/$', UsuarioDetailAPIView.as_view(), name='usuario-detail'),
    url(r'^api/usuarios/(?P<cedula>\d+)/edit/$', UsuarioUpdateAPIView.as_view(), name='usuario-update'),
    url(r'^api/usuarios/(?P<cedula>\d+)/delete/$', UsuarioDeleteAPIView.as_view(), name='usuario-delete'),

    #Estudiantes
    url(r'^api/estudiantes/$', EstudianteListCreateAPIView.as_view(), name='estudiante-list-create'),
    url(r'^api/estudiantes/(?P<usuario__cedula>\d+)/$', EstudianteDetailAPIView.as_view(), name='estudiante-detail'),
    url(r'^api/estudiantes/(?P<usuario__cedula>\d+)/edit/$', EstudianteUpdateAPIView.as_view(), name='estudiante-update'),
    url(r'^api/estudiantes/(?P<usuario__cedula>\d+)/delete/$', UsuarioDeleteAPIView.as_view(), name='usuario-delete'),

    #Docentes
    url(r'^api/docentes/$', DocenteListCreateAPIView.as_view(), name='docente-list-create'),
    url(r'^api/docentes/(?P<usuario__cedula>\d+)/$', DocenteDetailAPIView.as_view(), name='docente-detail'),
    url(r'^api/docentes/(?P<usuario__cedula>\d+)/edit/$', DocenteUpdateAPIView.as_view(), name='docente-update'),
	url(r'^api/docentes/(?P<usuario__cedula>\d+)/delete/$', UsuarioDeleteAPIView.as_view(), name='usuario-delete'),


    url(r'^api/tipoPostgrado/$', TipoPostgradoListCreateAPIView.as_view(), name='tipoPostgrado-list-create'),
    
    url(r'^api/estadoEstudiante/$', EstadoEstudianteListCreateAPIView.as_view(), name='estadoEstudiante-list-create'),


])