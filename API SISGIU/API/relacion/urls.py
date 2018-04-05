from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from relacion.views import (

    PeriodoEstudianteListCreateAPIView,
    PeriodoEstudianteDetailAPIView,
    PeriodoEstudianteUpdateAPIView,
    PeriodoEstudianteDeleteAPIView,
    DocenteAsignaturaListCreateAPIView,
    DocenteAsignaturaDetailAPIView,
    DocenteAsignaturaUpdateAPIView,
    DocenteAsignaturaDeleteAPIView,
    EstudianteAsignaturaListCreateAPIView,
    EstudianteAsignaturaDetailAPIView,
    EstudianteAsignaturaUpdateAPIView,
    EstudianteAsignaturaDeleteAPIView,
    EstudianteTramiteListCreateAPIView,
    EstudianteTramiteDetailAPIView,
    EstudianteTramiteUpdateAPIView,
    EstudianteTramiteDeleteAPIView,
    AsignaturaTipoPostgradoListCreateAPIView,
    AsignaturaTipoPostgradoDetailAPIView,
    AsignaturaTipoPostgradoUpdateAPIView,
    AsignaturaTipoPostgradoDeleteAPIView,
    )


urlpatterns = format_suffix_patterns([

    # PeriodoEstudiante
    url(r'^api/periodoEstudiante/all/$',
        PeriodoEstudianteListCreateAPIView.as_view(), name='PeriodoEstudiante-list-create'),
    url(r'^api/periodoEstudiante/$',
        PeriodoEstudianteListCreateAPIView.get_all_estudiantes, name='PeriodoEstudiante-list-all'),
    url(r'^api/periodoEstudiante/(?P<cedula>[0-9]{6,8})/periodo/(?P<periodo>[\w\s]+)/$',
        PeriodoEstudianteDetailAPIView.get_periodo, name='PeriodoEstudiante-detail'),
    url(r'^api/periodoEstudiante/(?P<pk>\d+)/edit/$',
        PeriodoEstudianteUpdateAPIView.as_view(), name='PeriodoEstudiante-update'),
    url(r'^api/periodoEstudiante/(?P<pk>\d+)/delete/$',
        PeriodoEstudianteDeleteAPIView.as_view(), name='PeriodoEstudiante-delete'),


    # DocenteAsignatura
    url(r'^api/docenteAsignatura/$',
        DocenteAsignaturaListCreateAPIView.as_view(), name='DocenteAsignatura-list-create'),
    url(r'^api/docenteAsignatura/periodo/(?P<periodo>[\w\s]+)/tipo/(?P<tipo_postgrado>[\w\-]+)/$',
        DocenteAsignaturaDetailAPIView.get_all_docentes, name='DocenteAsignatura-detail'),
    url(r'^api/docenteAsignatura/(?P<cedula>[0-9]{6,8})/periodo/(?P<periodo>[\w\s]+)/$',
        DocenteAsignaturaDetailAPIView.get_periodo, name='DocenteAsignatura-detail'),
    url(r'^api/docenteAsignatura/(?P<asignatura>[\w\-]+)/periodo/(?P<periodo>[\w\s]+)/$',
        DocenteAsignaturaDetailAPIView.get_docente, name='DocenteAsignatura-detail'),
    url(r'^api/docenteAsignatura/periodo/(?P<periodo_id>\d+)/$',
        DocenteAsignaturaDetailAPIView.crearDocenteAsignatura, name='DocenteAsignatura-crear'),
    url(r'^api/docenteAsignatura/(?P<pk>\d+)/edit/$',
        DocenteAsignaturaUpdateAPIView.as_view(), name='DocenteAsignatura-update'),
    url(r'^api/docenteAsignatura/(?P<pk>\d+)/delete/$',
        DocenteAsignaturaDeleteAPIView.as_view(), name='DocenteAsignatura-delete'),


    # EstudianteAsignatura
    url(r'^api/estudianteAsignatura/$',
        EstudianteAsignaturaListCreateAPIView.as_view(), name='EstudianteAsignatura-list-create'),
    url(r'^api/estudianteAsignatura/inscribir/(?P<cedula>[0-9]{6,8})/$',
        EstudianteAsignaturaListCreateAPIView.crear_estudiante_asignatura,
        name='EstudianteAsignatura-create'),
    url(r'^api/estudianteAsignatura/(?P<estudiante__usuario__cedula>\d+)/$',
        EstudianteAsignaturaDetailAPIView.as_view(), name='EstudianteAsignatura-detail'),
    url(r'^api/estudianteAsignatura/(?P<cedula>[0-9]{6,8})/historial/$',
        EstudianteAsignaturaDetailAPIView.obtener_informacion_historial, name='historial-academico-info'),
    url(r'^api/estudianteAsignatura/(?P<pk>\d+)/edit/$',
        EstudianteAsignaturaUpdateAPIView.as_view(), name='EstudianteAsignatura-update'),
    url(r'^api/estudianteAsignatura/cargarNotas/$',
        EstudianteAsignaturaUpdateAPIView.cargar_notas, name='EstudianteAsignatura-cargar-notas'),
    url(r'^api/estudianteAsignatura/(?P<pk>\d+)/delete/$',
        EstudianteAsignaturaDeleteAPIView.as_view(), name='EstudianteAsignatura-delete'),


    # EstudianteTramite
    url(r'^api/estudianteTramite/all$',
        EstudianteTramiteListCreateAPIView.as_view(), name='EstudianteTramite-list-create'),
    url(r'^api/estudianteTramite/$',
        EstudianteTramiteListCreateAPIView.get_tramites, name='EstudianteTramite-list-total'),
    url(r'^api/estudianteTramite/(?P<estudiante__usuario__cedula>\d+)/$',
        EstudianteTramiteDetailAPIView.as_view(), name='EstudianteTramite-detail'),
    url(r'^api/estudianteTramite/(?P<pk>\d+)/edit/$',
        EstudianteTramiteUpdateAPIView.as_view(), name='EstudianteTramite-update'),
    url(r'^api/estudianteTramite/(?P<pk>\d+)/delete/$',
        EstudianteTramiteDeleteAPIView.as_view(), name='EstudianteTramite-delete'),


    # AsignaturaTipoPostgrado
    url(r'^api/asignaturaTipoPostgrado/$',
        AsignaturaTipoPostgradoListCreateAPIView.as_view(), name='AsignaturaTipoPostgrado-list-create'),
    url(r'^api/asignaturaTipoPostgrado/(?P<estudiante__usuario__cedula>\d+)/$',
        AsignaturaTipoPostgradoDetailAPIView.as_view(), name='AsignaturaTipoPostgrado-detail'),
    url(r'^api/asignaturaTipoPostgrado/(?P<pk>\d+)/edit/$',
        AsignaturaTipoPostgradoUpdateAPIView.as_view(), name='AsignaturaTipoPostgrado-update'),
    url(r'^api/asignaturaTipoPostgrado/(?P<pk>\d+)/delete/$',
        AsignaturaTipoPostgradoDeleteAPIView.as_view(), name='AsignaturaTipoPostgrado-delete'),

])
