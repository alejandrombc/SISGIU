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
    get_periodos_by_filter,
    get_estado_periodo,
    get_periodos_by_tipo_postgrado,
    activar_periodo,
    cambiar_estado_periodo,
    )

urlpatterns = format_suffix_patterns([

    # EstadoPeriodo
    url(r'^api/estadoPeriodo/$',
        EstadoPeriodoListCreateAPIView.as_view(), name='EstadoPeriodo-list-create'),
    url(r'^api/estadoPeriodo/(?P<pk>\d+)/$',
        EstadoPeriodoDetailAPIView.as_view(), name='EstadoPeriodo-detail'),
    url(r'^api/estadoPeriodo/(?P<pk>\d+)/edit/$',
        EstadoPeriodoUpdateAPIView.as_view(), name='EstadoPeriodo-update'),
    url(r'^api/estadoPeriodo/(?P<pk>\d+)/delete/$',
        EstadoPeriodoDeleteAPIView.as_view(), name='EstadoPeriodo-delete'),

    # Periodos
    url(r'^api/periodo/$',
        PeriodoListCreateAPIView.as_view(), name='Periodo-list-create'),

    # Periodos en base a una busqueda
    url(r'^api/periodo/(?P<filtro>[\w\s]+)/$', get_periodos_by_filter, name='Periodo-list-filter'),

    # Periodos en base a una busqueda de un tipo de postgrado especifico
    url(r'^api/periodo/(?P<filtro>[\w\s]+)/tipo_postgrado/(?P<tipo_postgrado>\d+)/$',
        get_periodos_by_tipo_postgrado, name='Periodo-list-filter-tipo_postgrado'),

    # Activar un periodo (cambia el estado de no iniciado a en inscripcion)
    url(r'^api/periodo/activar/(?P<periodo_id>\d+)/$', activar_periodo, name='Periodo-activar'),

    url(r'^api/periodo/(?P<pk>\d+)/$',
        PeriodoDetailAPIView.as_view(), name='Periodo-detail'),

    #Obtiene el estado de un periodo en base a su ID
    url(r'^api/periodo/(?P<periodo_id>\d+)/estado/$', get_estado_periodo, name='estado-periodo'),

    # Cambia el estado de un periodo a alguno que se indique
    url(r'^api/periodo/(?P<periodo>\d+)/edit/filtro/(?P<filtro>[\w\s]+)/$',
        cambiar_estado_periodo, name='cambiar-estado-periodo'),

    url(r'^api/periodo/(?P<pk>\d+)/edit/$',
        PeriodoUpdateAPIView.as_view(), name='Periodo-update'),
    url(r'^api/periodo/(?P<pk>\d+)/delete/$',
        PeriodoDeleteAPIView.as_view(), name='Periodo-delete'),

])
