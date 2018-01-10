from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from periodo.views import (
	EstadoPeriodoListCreateAPIView,
	EstadoPeriodoDetailAPIView,
	EstadoPeriodoUpdateAPIView,
	EstadoPeriodoDeleteAPIView,
	PeriodoListCreateAPIView,
	PeriodoDetailAPIView,
	PeriodoUpdateAPIView,
	PeriodoDeleteAPIView,
	)

urlpatterns = format_suffix_patterns([

	# EstadoPeriodo
    url(r'^api/estadoPeriodo/$', EstadoPeriodoListCreateAPIView.as_view(), name='EstadoPeriodo-list-create'),
    url(r'^api/estadoPeriodo/(?P<pk>\d+)/$', EstadoPeriodoDetailAPIView.as_view(), name='EstadoPeriodo-detail'),
    url(r'^api/estadoPeriodo/(?P<pk>\d+)/edit/$', EstadoPeriodoUpdateAPIView.as_view(), name='EstadoPeriodo-update'),
    url(r'^api/estadoPeriodo/(?P<pk>\d+)/delete/$', EstadoPeriodoDeleteAPIView.as_view(), name='EstadoPeriodo-delete'),

    # Periodo
    url(r'^api/periodo/$', PeriodoListCreateAPIView.as_view(), name='Periodo-list-create'),
    url(r'^api/periodo/(?P<pk>\d+)/$', PeriodoDetailAPIView.as_view(), name='Periodo-detail'),
    url(r'^api/periodo/(?P<pk>\d+)/edit/$', PeriodoUpdateAPIView.as_view(), name='Periodo-update'),
    url(r'^api/periodo/(?P<pk>\d+)/delete/$', PeriodoDeleteAPIView.as_view(), name='Periodo-delete'),


])