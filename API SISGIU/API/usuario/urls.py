from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from usuario.views import (
	AdministradorListCreateAPIView,
	AdministradorDetailAPIView,
	AdministradorUpdateAPIView,
	AdministradorDeleteAPIView,
	TipoPostgradoListCreateAPIView,
    TipoPostgradoDeleteAPIView,
	EstadoEstudianteListCreateAPIView,
    EstudianteListCreateAPIView,
    EstadoEstudianteDeleteAPIView,
	EstudianteDetailAPIView,
	EstudianteUpdateAPIView,
    EstudianteDeleteAPIView,
	DocenteListCreateAPIView,
	DocenteDetailAPIView,
	DocenteUpdateAPIView,
    DocenteDeleteAPIView,
    AdministrativoListCreateAPIView,
    AdministrativoDetailAPIView,
    AdministrativoUpdateAPIView,
    AdministrativoDeleteAPIView,
    Reportes
	)


urlpatterns = format_suffix_patterns([

    # Usuarios
    url(r'^api/usuarios/$', AdministradorListCreateAPIView.as_view(), name='usuario-list-create'),
    url(r'^api/usuarios/(?P<cedula>\d+)/$', AdministradorDetailAPIView.as_view(), name='usuario-detail'),
    url(r'^api/usuarios/id/(?P<id_usr>[0-9]\d{1,})/$', AdministradorDetailAPIView.get_usr_id, name='usuario-detail'),
    url(r'^api/usuarios/(?P<cedula>\d+)/edit/$', AdministradorUpdateAPIView.as_view(), name='usuario-update'),
    url(r'^api/usuarios/(?P<cedula>\d+)/delete/$', AdministradorDeleteAPIView.as_view(), name='usuario-delete'),

    #Estudiantes
    url(r'^api/estudiantes/$', EstudianteListCreateAPIView.as_view(), name='estudiante-list-create'),
    url(r'^api/estudiantes/(?P<usuario__cedula>\d+)/$', EstudianteDetailAPIView.as_view(), name='estudiante-detail'),
    url(r'^api/estudiantes/(?P<usuario__cedula>\d+)/edit/$', EstudianteUpdateAPIView.as_view(), name='estudiante-update'),
    url(r'^api/estudiantes/(?P<usuario__cedula>\d+)/delete/$', EstudianteDeleteAPIView.as_view(), name='estudiante-delete'),

    #Docentes
    url(r'^api/docentes/$', DocenteListCreateAPIView.as_view(), name='docente-list-create'),
    url(r'^api/docentes/(?P<usuario__cedula>\d+)/$', DocenteDetailAPIView.as_view(), name='docente-detail'),
    url(r'^api/docentes/(?P<usuario__cedula>\d+)/edit/$', DocenteUpdateAPIView.as_view(), name='docente-update'),
	url(r'^api/docentes/(?P<usuario__cedula>\d+)/delete/$', DocenteDeleteAPIView.as_view(), name='docente-delete'),

    #Administrativo
    url(r'^api/administrativo/$', AdministrativoListCreateAPIView.as_view(), name='administrativo-list-create'),
    url(r'^api/administrativo/(?P<usuario__cedula>\d+)/$', AdministrativoDetailAPIView.as_view(), name='administrativo-detail'),
    url(r'^api/administrativo/(?P<usuario__cedula>\d+)/edit/$', AdministrativoUpdateAPIView.as_view(), name='administrativo-update'),
    url(r'^api/administrativo/(?P<usuario__cedula>\d+)/delete/$', AdministrativoDeleteAPIView.as_view(), name='administrativo-delete'),

    #Tipo Postgrado
    url(r'^api/tipoPostgrado/$', TipoPostgradoListCreateAPIView.as_view(), name='tipoPostgrado-list-create'),
    url(r'^api/tipoPostgrado/(?P<pk>\d+)/delete/$', TipoPostgradoDeleteAPIView.as_view(), name='tipoPostgrado-delete'),


    #Estado Estudiante
    url(r'^api/estadoEstudiante/$', EstadoEstudianteListCreateAPIView.as_view(), name='estadoEstudiante-list-create'),
    url(r'^api/estadoEstudiante/(?P<pk>\d+)/delete/$', EstadoEstudianteDeleteAPIView.as_view(), name='estadoEstudiante-delete'),


    #Constancias
    url(r'^api/reporte/(?P<cedula>[0-9]{8})/$', Reportes.report_test, name='reportes'),



])