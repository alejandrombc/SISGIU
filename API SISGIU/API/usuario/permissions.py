from rest_framework.permissions import BasePermission
from .models import Usuario, PersonalDocente, Estudiante, PersonalAdministrativo


class IsListOrCreate(BasePermission):
	message = "No posee permiso para realizar esta accion."

	def has_permission(self, request, view):
		return (request.method == 'POST' and request.user.is_superuser) or request.method == 'GET'


class isOwnerOrReadOnly(BasePermission):
	message = "Debe ser el usuario iniciado para editar este objeto."

	def has_object_permission(self, request, view, obj):
		if request.user.is_superuser:
			return True
		return obj.usuario == request.user


class isDocenteOrAdmin(BasePermission):
	message = "El usuario debe pertenecer al personal docente."

	def has_permission(self, request, view):
		return request.user.is_superuser or PersonalDocente.objects.filter(usuario=request.user).exists()


class isEstudianteOrAdmin(BasePermission):
	message = "El usuario debe ser un estudiante."

	def has_permission(self, request, view):
		return request.user.is_superuser or Estudiante.objects.filter(usuario=request.user).exists()


class isAdministrativoOrAdmin(BasePermission):
	message = "El usuario debe pertenecer al personal administrativo."

	def has_permission(self, request, view):
		return request.user.is_superuser or PersonalAdministrativo.objects.filter(usuario=request.user).exists()


class isAdministrativoOrEstudianteOrAdmin(BasePermission):
	message = "El usuario debe pertenecer al personal administrativo o ser un estudiante."

	def has_permission(self, request, view):
		return request.user.is_superuser or PersonalAdministrativo.objects.filter(usuario=request.user).exists() or Estudiante.objects.filter(usuario=request.user).exists()


class isAdministrativoOrDocenteOrAdmin(BasePermission):
	message = "El usuario debe pertenecer al personal administrativo o ser un docente."

	def has_permission(self, request, view):
		return request.user.is_superuser or PersonalAdministrativo.objects.filter(usuario=request.user).exists() or PersonalDocente.objects.filter(usuario=request.user).exists()
