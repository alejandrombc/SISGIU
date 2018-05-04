from rest_framework.permissions import BasePermission
from usuario.models import Estudiante, PersonalDocente, PersonalAdministrativo, Usuario


class IsListOrCreate(BasePermission):
	message = "No posee permiso para realizar esta accion."

	def has_permission(self, request, view):
		return (request.method == 'POST' and request.user.is_superuser) or request.method == 'GET'


class EsEstudianteOAdministrador(BasePermission):
	message = "No posee permiso para realizar esta accion."

	def has_permission(self, request, view):
		if (request.method == 'GET'):
			return True
		else:
			if(not Estudiante.objects.filter(usuario_id=request.user.id).exists() and not request.user.is_superuser):
				return False
			else:
				return True
			return False


class EsAdministrativoOAdministrador(BasePermission):
	message = "No posee permiso para realizar esta accion."

	def has_permission(self, request, view):
		if (request.method == 'GET'):
			return True
		else:
			if(not PersonalAdministrativo.objects.filter(usuario_id=request.user.id).exists() and not request.user.is_superuser):
				return False
			else:
				return True
			return False


class EsDocenteOAdministrador(BasePermission):
	message = "No posee permiso para realizar esta accion."

	def has_permission(self, request, view):
		if (request.method == 'GET'):
			return True
		else:
			if(not PersonalDocente.objects.filter(usuario_id=request.user.id).exists() and not request.user.is_superuser):
				return False
			else:
				return True
			return False


class isOwnerOrReadOnly(BasePermission):
	message = "Debe ser el usuario iniciado para editar este objeto."

	def has_object_permission(self, request, view, obj):
		if(request.user.is_superuser):
			return True
		return obj.usuario == request.user
