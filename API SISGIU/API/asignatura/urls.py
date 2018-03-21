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
    PrelacionAsignaturaListCreateAPIView,
	)

urlpatterns = format_suffix_patterns([

	# TipoAsignatura
    url(r'^api/tipoAsignatura/$', TipoAsignaturaListCreateAPIView.as_view(), name='TipoAsignatura-list-create'),
    url(r'^api/tipoAsignatura/(?P<pk>\d+)/$', TipoAsignaturaDetailAPIView.as_view(), name='TipoAsignatura-detail'),
    url(r'^api/tipoAsignatura/(?P<pk>\d+)/edit/$', TipoAsignaturaUpdateAPIView.as_view(), name='TipoAsignatura-update'),
    url(r'^api/tipoAsignatura/(?P<pk>\d+)/delete/$', TipoAsignaturaDeleteAPIView.as_view(), name='TipoAsignatura-delete'),

    # Asignatura
    url(r'^api/asignaturas/$', AsignaturaListCreateAPIView.as_view(), name='Asignatura-list-create'),
    url(r'^api/asignaturas/all/$', AsignaturaListCreateAPIView.get_asignaturas, name='Asignatura-list'),
    url(r'^api/asignaturas/(?P<codigo>[\w\-]+)/$', AsignaturaDetailAPIView.as_view(), name='Asignatura-detail'),
    url(r'^api/asignaturas/(?P<codigo>[\w\-]+)/edit/$', AsignaturaUpdateAPIView.as_view(), name='Asignatura-update'),
    url(r'^api/asignaturas/(?P<codigo>[\w\-]+)/delete/$', AsignaturaDeleteAPIView.as_view(), name='Asignatura-delete'),

    # Asignaturas dictadas por un docente
    url(r'^api/asignaturas/docente/(?P<cedula>[0-9]{8})/$', AsignaturaListCreateAPIView.get_asignaturas_por_docente, name='asignaturas-por-docente'),

    # Asignaturas cursadas por un estudiante
    url(r'^api/asignaturas/estudiante/(?P<cedula>[0-9]{8})/$', AsignaturaListCreateAPIView.get_asignaturas_por_estudiante, name='asignaturas-por-estudiante'),

    # Asignaturas cursadas por un estudiante
    url(r'^api/asignaturas/estudiante/(?P<cedula>[0-9]{8})/$', AsignaturaListCreateAPIView.get_asignaturas_por_estudiante, name='asignaturas-por-estudiante'),


    url(r'^api/asignaturas_necesarias/all/$', PrelacionAsignaturaListCreateAPIView.get_all_asignaturas_necesarias, name='PrelacionAsignatura-all'),

    #Asignaturas preladas
    url(r'^api/asignaturas_necesarias/codigo/(?P<codigo>[\w\-]+)/$', PrelacionAsignaturaListCreateAPIView.get_asignaturas_necesarias, name='PrelacionAsignatura-detail'),

    url(r'^api/asignaturas_necesarias/$', PrelacionAsignaturaListCreateAPIView.post_prelacion, name='PrelacionAsignatura-create'),

    url(r'^api/asignaturas_necesarias/delete/codigo/(?P<codigo>[\w\-]+)/$', PrelacionAsignaturaListCreateAPIView.delete_asignaturas_necesarias, name='PrelacionAsignatura-delete-detail'),

    url(r'^api/asignaturas_necesarias/delete/all/$', PrelacionAsignaturaListCreateAPIView.delete_all_asignaturas_necesarias, name='PrelacionAsignatura-delete-all'),


])