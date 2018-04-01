from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from tramite.views import (
	EstadoTramiteListCreateAPIView,
	EstadoTramiteDetailAPIView,
	EstadoTramiteUpdateAPIView,
	EstadoTramiteDeleteAPIView,
	TramiteListCreateAPIView,
	TramiteDetailAPIView,
	TramiteUpdateAPIView,
	TramiteDeleteAPIView,


	)


urlpatterns = format_suffix_patterns([

	# EstadoTramite
    url(r'^api/estadoTramite/$', EstadoTramiteListCreateAPIView.as_view(), name='EstadoTramite-list-create'),
    url(r'^api/estadoTramite/(?P<pk>\d+)/$', EstadoTramiteDetailAPIView.as_view(), name='EstadoTramite-detail'),
    url(r'^api/estadoTramite/(?P<pk>\d+)/edit/$', EstadoTramiteUpdateAPIView.as_view(), name='EstadoTramite-update'),
    url(r'^api/estadoTramite/(?P<pk>\d+)/delete/$', EstadoTramiteDeleteAPIView.as_view(), name='EstadoTramite-delete'),

    # Tramite
    url(r'^api/tramites/$', TramiteListCreateAPIView.as_view(), name='Tramite-list-create'),
    url(r'^api/tramites/(?P<pk>\d+)/$', TramiteDetailAPIView.as_view(), name='Tramite-detail'),
    url(r'^api/tramites/(?P<pk>\d+)/edit/$', TramiteUpdateAPIView.as_view(), name='Tramite-update'),
    url(r'^api/tramites/(?P<pk>\d+)/delete/$', TramiteDeleteAPIView.as_view(), name='Tramite-delete'),

    # Tramites por un estudiante
    url(r'^api/tramites/estudiante/(?P<cedula>[0-9]{6,8})/$', TramiteListCreateAPIView.get_tramites_por_estudiante, name='tramite-por-estudiante'),


])