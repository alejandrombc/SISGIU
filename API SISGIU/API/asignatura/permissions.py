from rest_framework.permissions import BasePermission
from usuario.models import Usuario


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
