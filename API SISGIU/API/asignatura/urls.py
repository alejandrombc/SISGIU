#region imports
from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from asignatura.views import (
    TipoAsignaturaListCreateAPIView,
    TipoAsignaturaDetailAPIView,
    TipoAsignaturaUpdateAPIView,
    TipoAsignaturaDeleteAPIView,
    AsignaturaListCreateAPIView,
    AsignaturaDetailAPIView,
    AsignaturaUpdateAPIView,
    AsignaturaDeleteAPIView,
    get_estudiantes_docente,
    get_asignaturas_por_docente,
    get_asignaturas_por_estudiante,
    retirar_periodo_estudiante,
    post_prelacion,
    get_all_asignaturas_necesarias,
    get_asignaturas_a_inscribir,
    get_asignaturas_actuales_estudiante,
    get_asignaturas_actuales,
    )
#endregion

urlpatterns = format_suffix_patterns([
    #region tipoAsignatura
    # TipoAsignatura
    url(r'^api/tipoAsignatura/$',
        TipoAsignaturaListCreateAPIView.as_view(), name='TipoAsignatura-list-create'),
    url(r'^api/tipoAsignatura/(?P<pk>\d+)/$',
        TipoAsignaturaDetailAPIView.as_view(), name='TipoAsignatura-detail'),
    url(r'^api/tipoAsignatura/(?P<pk>\d+)/edit/$',
        TipoAsignaturaUpdateAPIView.as_view(), name='TipoAsignatura-update'),
    url(r'^api/tipoAsignatura/(?P<pk>\d+)/delete/$',
        TipoAsignaturaDeleteAPIView.as_view(), name='TipoAsignatura-delete'),
    #endregion

    # Asignatura
    url(r'^api/asignaturas/$', AsignaturaListCreateAPIView.as_view(), name='Asignatura-list-create'),
    url(r'^api/asignaturas/(?P<codigo>[\w\-]+)/$', AsignaturaDetailAPIView.as_view(), name='Asignatura-detail'),
    url(r'^api/asignaturas/(?P<codigo>[\w\-]+)/edit/$', AsignaturaUpdateAPIView.as_view(), name='Asignatura-update'),
    url(r'^api/asignaturas/(?P<codigo>[\w\-]+)/delete/$', AsignaturaDeleteAPIView.as_view(), name='Asignatura-delete'),

    # Asignaturas dictadas por un docente
    url(r'^api/asignaturas/docente/(?P<cedula>[0-9]{6,8})/$', get_asignaturas_por_docente, name='asignaturas-por-docente'),

    # Estudiantes de un docente en un tipo de postgrado
    url(r'^api/asignaturas/(?P<codigo>[\w\-]+)/tipo_postgrado/(?P<tipo_postgrado>[\w\s]+)/$', get_estudiantes_docente, name='estudiantes-por-docente'),

    # Asignaturas cursadas por un estudiante
    url(r'^api/asignaturas/estudiante/(?P<cedula>[0-9]{6,8})/$', get_asignaturas_por_estudiante, name='asignaturas-por-estudiante'),

    # Lista de todas las asignaturas que tienen prelaciones
    url(r'^api/asignaturas_necesarias/all/$', get_all_asignaturas_necesarias, name='PrelacionAsignatura-all'),

    # Asignaturas que puede inscribir un estudiante
    url(r'^api/asignaturas_a_inscribir/estudiante/(?P<cedula>[0-9]{6,8})/$', get_asignaturas_a_inscribir, name='asignaturas-a-inscribir'),

    # Crear las prelaciones de una asignatura y asigna los tipos de postgrado
    url(r'^api/asignaturas_necesarias/$', post_prelacion, name='PrelacionAsignatura-create'),

    # Retirar Periodo
    url(r'^api/retirar/estudiante/(?P<cedula>[0-9]{6,8})/periodo/(?P<periodo>\d+)/$', retirar_periodo_estudiante, name='retirar-periodo'),

    # Asignaturas que tiene un estudiante en el periodo actual
    url(r'^api/asignaturas_actuales/estudiante/(?P<cedula>[0-9]{6,8})/$', get_asignaturas_actuales_estudiante, name='asignaturas-actuales'),

    # Asignaturas de un periodo
    url(r'^api/asignaturas_actuales/periodo/(?P<periodo>\d+)/$', get_asignaturas_actuales, name='asignaturas-actuales'),

])
