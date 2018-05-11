#region imports
from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from usuario.views import (
	AdministradorListCreateAPIView,
	AdministradorDetailAPIView,
	AdministradorUpdateAPIView,
	AdministradorDeleteAPIView,
	TipoPostgradoListCreateAPIView,
	TipoPostgradoDetailAPIView,
	TipoPostgradoDeleteAPIView,
	TipoPostgradoUpdateAPIView,
	EstadoEstudianteListCreateAPIView,
	EstudianteListCreateAPIView,
	EstadoEstudianteDeleteAPIView,
	EstadoEstudianteDetailAPIView,
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
	get_usuarios,
	send_mail_forgot,
	get_usr_cedula,
	update_photo,
	estudiante_pago_inscripcion,
	update_file,
	constancia_estudio,
	planilla_docente,
	planilla_periodo,
	get_admin,
	edit_admin,
	)
#endregion

urlpatterns = format_suffix_patterns([

	# Usuarios
	url(r'^api/usuarios/$', AdministradorListCreateAPIView.as_view(), name='usuario-list-create'),
	url(r'^api/usuarios/cedula/(?P<cedula>[\w\-]+)/$', AdministradorDetailAPIView.as_view(), name='usuario-detail'),
	url(r'^api/usuarios/(?P<cedula>[\w\-]+)/edit/$', AdministradorUpdateAPIView.as_view(), name='usuario-update'),
	url(r'^api/usuarios/(?P<username>[\w\-]+)/delete/$', AdministradorDeleteAPIView.as_view(), name='usuario-delete'),

	#Obtiene una lista de usuarios dependiendo su modulo
	url(r'^api/usuarios/(?P<modulo>[\w\-]+)/$', get_usuarios, name='usuario-list'),

	#Envia un correo para restablecer contrasena
	url(r'^api/usuarios/(?P<cedula>[\w\-]+)/recuperarContrasena/$', send_mail_forgot, name='usuario-olvido'),

	#Permite cambiar la contrasena usando el link de restablecimiento
	url(r'^api/usuarios/(?P<cedula>[\w\-]+)/cambiarContrasena/$', get_usr_cedula, name='usuario-detail'),

	#Actualiza la foto de un usuario autenticado
	url(r'^api/usuarios/(?P<cedula>[\w\-]+)/cambiarFoto/$', update_photo, name='usuario-detail'),

	# Admin
	url(r'^api/administradores/(?P<cedula>[\w\-]+)/edit/$', edit_admin, name='admin-edit'),
	url(r'^api/administradores/(?P<cedula>[\w\-]+)/$', get_admin, name='admin-detail'),


	# Estudiantes

	url(r'^api/estudiantes/$', EstudianteListCreateAPIView.as_view(), name='estudiante-list-create'),
	url(r'^api/estudiantes/pagoInscripcion/periodo/(?P<periodo_id>\d+)/$', estudiante_pago_inscripcion, name='estudiante-pago-inscripcion'),
	url(r'^api/estudiantes/(?P<usuario__cedula>[\w\-]+)/$', EstudianteDetailAPIView.as_view(), name='estudiante-detail'),
	url(r'^api/estudiantes/(?P<usuario__cedula>[\w\-]+)/edit/$', EstudianteUpdateAPIView.as_view(), name='estudiante-update'),
	url(r'^api/estudiantes/(?P<usuario__cedula>[\w\-]+)/delete/$', EstudianteDeleteAPIView.as_view(), name='estudiante-delete'),

	# Docentes
	url(r'^api/docentes/$', DocenteListCreateAPIView.as_view(), name='docente-list-create'),
	url(r'^api/docentes/(?P<usuario__cedula>[\w\-]+)/$', DocenteDetailAPIView.as_view(), name='docente-detail'),
	url(r'^api/docentes/(?P<usuario__cedula>[\w\-]+)/edit/$', DocenteUpdateAPIView.as_view(), name='docente-update'),
	url(r'^api/docentes/(?P<usuario__cedula>[\w\-]+)/delete/$', DocenteDeleteAPIView.as_view(), name='docente-delete'),
	url(r'^api/docentes/(?P<username>[\w\-]+)/cambiarDocumento/(?P<tipo_documento>[\w\-]+)/$', update_file, name='docente-archivo'),
	# Administrativo
	url(r'^api/administrativo/$', AdministrativoListCreateAPIView.as_view(), name='administrativo-list-create'),
	url(r'^api/administrativo/(?P<usuario__cedula>[\w\-]+)/$', AdministrativoDetailAPIView.as_view(), name='administrativo-detail'),
	url(r'^api/administrativo/(?P<usuario__cedula>[\w\-]+)/edit/$', AdministrativoUpdateAPIView.as_view(), name='administrativo-update'),
	url(r'^api/administrativo/(?P<usuario__cedula>[\w\-]+)/delete/$', AdministrativoDeleteAPIView.as_view(), name='administrativo-delete'),

	# Tipo Postgrado
	url(r'^api/tipoPostgrado/$', TipoPostgradoListCreateAPIView.as_view(), name='tipoPostgrado-list-create'),
	url(r'^api/tipoPostgrado/(?P<pk>\d+)/$', TipoPostgradoDetailAPIView.as_view(), name='tipoPostgrado-detail'),
	url(r'^api/tipoPostgrado/(?P<pk>\d+)/edit/$', TipoPostgradoUpdateAPIView.as_view(), name='tipoPostgrado-update'),
	url(r'^api/tipoPostgrado/(?P<pk>\d+)/delete/$', TipoPostgradoDeleteAPIView.as_view(), name='tipoPostgrado-delete'),


	# Estado Estudiante
	url(r'^api/estadoEstudiante/$', EstadoEstudianteListCreateAPIView.as_view(), name='estadoEstudiante-list-create'),
	url(r'^api/estadoEstudiante/(?P<pk>\d+)/$', EstadoEstudianteDetailAPIView.as_view(), name='estadoEstudiante-detail'),
	url(r'^api/estadoEstudiante/(?P<pk>\d+)/delete/$', EstadoEstudianteDeleteAPIView.as_view(), name='estadoEstudiante-delete'),


	# Constancias y Planillas
	url(r'^api/constancias/estudio/(?P<cedula>[\w\-]+)/$', constancia_estudio, name='reportes'),


	url(r'^api/planillas/docente/(?P<cedula>[\w\-]+)/(?P<codigo>[\w\-]+)/$', planilla_docente, name='reportes'),

	url(r'^api/planillas/administrativo/(?P<periodo>\d+)/$', planilla_periodo, name='reportes'),


])
