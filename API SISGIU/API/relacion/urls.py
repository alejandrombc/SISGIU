from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from relacion.views import (
    PeriodoEstudianteListCreateAPIView,
    PeriodoEstudianteUpdateAPIView,
    PeriodoEstudianteDeleteAPIView,
    DocenteAsignaturaListCreateAPIView,
    DocenteAsignaturaUpdateAPIView,
    DocenteAsignaturaDeleteAPIView,
    EstudianteAsignaturaListCreateAPIView,
    EstudianteAsignaturaDetailAPIView,
    EstudianteAsignaturaUpdateAPIView,
    EstudianteAsignaturaDeleteAPIView,
    AsignaturaTipoPostgradoListCreateAPIView,
    AsignaturaTipoPostgradoDetailAPIView,
    AsignaturaTipoPostgradoUpdateAPIView,
    AsignaturaTipoPostgradoDeleteAPIView,
    get_estudiantes_por_periodo,
    get_periodo,
    programacion_academica,
    get_all_docentes,
    crearDocenteAsignatura,
    crear_estudiante_asignatura,
    modificar_estudiante_asignatura,
    obtener_informacion_historial,
    informacion_usuarios_administrativo,
    cargar_notas,
    )


urlpatterns = format_suffix_patterns([

    # PeriodoEstudiante
    url(r'^api/periodoEstudiante/all/$', PeriodoEstudianteListCreateAPIView.as_view(), name='PeriodoEstudiante-list-create'),
    # Obtiene los estudiantes que cursan cierto periodo para el Personal Administrativo
    url(r'^api/periodoEstudiante/periodo/(?P<periodo_id>\d+)/$', get_estudiantes_por_periodo, name='estudiante-list-periodo'),
    # Obtiene la informacion de un estudiante en un periodo determinado
    url(r'^api/periodoEstudiante/(?P<cedula>[\w\-]+)/periodo/(?P<periodo>[\w\s]+)/$', get_periodo, name='PeriodoEstudiante-detail'),
    url(r'^api/periodoEstudiante/(?P<pk>\d+)/edit/$', PeriodoEstudianteUpdateAPIView.as_view(), name='PeriodoEstudiante-update'),
    url(r'^api/periodoEstudiante/(?P<pk>\d+)/delete/$', PeriodoEstudianteDeleteAPIView.as_view(), name='PeriodoEstudiante-delete'),


    # DocenteAsignatura
    url(r'^api/docenteAsignatura/$', DocenteAsignaturaListCreateAPIView.as_view(), name='DocenteAsignatura-list-create'),
    # Obtiene toda la informacion de docenteAsignatura de un periodo y tipo de postgrado especificado
    url(r'^api/docenteAsignatura/periodo/(?P<periodo>[\w\s]+)/tipo/(?P<tipo_postgrado>[\w\-]+)/$', get_all_docentes, name='DocenteAsignatura-detail'),
    url(r'^api/docenteAsignatura/periodo/(?P<periodo_id>\d+)/$', crearDocenteAsignatura, name='DocenteAsignatura-crear'),
    url(r'^api/docenteAsignatura/(?P<pk>\d+)/edit/$', DocenteAsignaturaUpdateAPIView.as_view(), name='DocenteAsignatura-update'),
    url(r'^api/docenteAsignatura/(?P<pk>\d+)/delete/$', DocenteAsignaturaDeleteAPIView.as_view(), name='DocenteAsignatura-delete'),


    # EstudianteAsignatura
    url(r'^api/estudianteAsignatura/$', EstudianteAsignaturaListCreateAPIView.as_view(), name='EstudianteAsignatura-list-create'),
    url(r'^api/estudianteAsignatura/(?P<estudiante__usuario__cedula>[\w\-]+)/$', EstudianteAsignaturaDetailAPIView.as_view(), name='EstudianteAsignatura-detail'),
    url(r'^api/estudianteAsignatura/(?P<pk>\d+)/edit/$', EstudianteAsignaturaUpdateAPIView.as_view(), name='EstudianteAsignatura-update'),
    url(r'^api/estudianteAsignatura/(?P<pk>\d+)/delete/$', EstudianteAsignaturaDeleteAPIView.as_view(), name='EstudianteAsignatura-delete'),


    #Inscribe un estudiante en el periodo "en inscripcion" de su tipo de postgrado
    url(r'^api/estudianteAsignatura/inscribir/(?P<cedula>[\w\-]+)/$', crear_estudiante_asignatura, name='inscribir'),

    #Permite al personal administrativo editar las asignaturas inscritas por un docente
    url(r'^api/estudianteAsignatura/modificarInscripcion/(?P<cedula>[\w\-]+)/$', modificar_estudiante_asignatura, name='modificar-asignaturas'),

    #Obtiene el historial academico de un estudiante tomando en cuenta retirados y materias SC
    url(r'^api/estudianteAsignatura/(?P<cedula>[\w\-]+)/historial/$', obtener_informacion_historial, name='historial-academico-info'),

    # Muestra toda la informacion disponible de un usuario (docente o estudiante), incluido el historial.
    url(r'^api/informacionUsuariosAdministrativo/(?P<cedula>[\w\-]+)/$', informacion_usuarios_administrativo, name='usuarios-administrativo-info'),

    #Actualiza la calificacion de todos los estudiantes de un docente para una asignatura
    url(r'^api/estudianteAsignatura/cargarNotas/$', cargar_notas, name='EstudianteAsignatura-cargar-notas'),


    # AsignaturaTipoPostgrado
    url(r'^api/asignaturaTipoPostgrado/$', AsignaturaTipoPostgradoListCreateAPIView.as_view(), name='AsignaturaTipoPostgrado-list-create'),
    url(r'^api/asignaturaTipoPostgrado/(?P<estudiante__usuario__cedula>[\w\-]+)/$', AsignaturaTipoPostgradoDetailAPIView.as_view(), name='AsignaturaTipoPostgrado-detail'),
    url(r'^api/asignaturaTipoPostgrado/(?P<pk>\d+)/edit/$', AsignaturaTipoPostgradoUpdateAPIView.as_view(), name='AsignaturaTipoPostgrado-update'),
    url(r'^api/asignaturaTipoPostgrado/(?P<pk>\d+)/delete/$', AsignaturaTipoPostgradoDeleteAPIView.as_view(), name='AsignaturaTipoPostgrado-delete'),


    # Programacion Academica
    url(r'^api/programacionAcademica/$', programacion_academica, name='programacion-academica'),

])
