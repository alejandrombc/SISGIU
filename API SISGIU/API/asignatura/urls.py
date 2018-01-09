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


	)

urlpatterns = format_suffix_patterns([

	# TipoAsignatura
    url(r'^api/tipoAsignatura/$', TipoAsignaturaListCreateAPIView.as_view(), name='TipoAsignatura-list-create'),
    url(r'^api/tipoAsignatura/(?P<pk>\d+)/$', TipoAsignaturaDetailAPIView.as_view(), name='TipoAsignatura-detail'),
    url(r'^api/tipoAsignatura/(?P<pk>\d+)/edit/$', TipoAsignaturaUpdateAPIView.as_view(), name='TipoAsignatura-update'),
    url(r'^api/tipoAsignatura/(?P<pk>\d+)/delete/$', TipoAsignaturaDeleteAPIView.as_view(), name='TipoAsignatura-delete'),

    # Asignatura
    url(r'^api/asignatura/$', AsignaturaListCreateAPIView.as_view(), name='Asignatura-list-create'),
    url(r'^api/asignatura/(?P<pk>\d+)/$', AsignaturaDetailAPIView.as_view(), name='Asignatura-detail'),
    url(r'^api/asignatura/(?P<pk>\d+)/edit/$', AsignaturaUpdateAPIView.as_view(), name='Asignatura-update'),
    url(r'^api/asignatura/(?P<pk>\d+)/delete/$', AsignaturaDeleteAPIView.as_view(), name='Asignatura-delete'),


])