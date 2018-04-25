from rest_framework.permissions import BasePermission
from .models import Usuario, PersonalDocente, Estudiante, PersonalAdministrativo


class IsListOrCreate(BasePermission):
	message = "No posee permiso para realizar esta accion."

	def has_permission(self, request, view):
		if (request.method == 'POST'):
			member = Usuario.objects.get(username=request.user)
			if member.is_superuser:
				return True
			else:
				return False
		return True


class isOwnerOrReadOnly(BasePermission):
	message = "Debe ser el usuario iniciado para editar este objeto."

	def has_object_permission(self, request, view, obj):
		member = Usuario.objects.get(username=request.user)
		if member.is_superuser:
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
