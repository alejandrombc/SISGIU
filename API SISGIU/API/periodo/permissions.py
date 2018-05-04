from rest_framework.permissions import BasePermission
from usuario.models import Usuario


class IsListOrCreate(BasePermission):
	message = "No posee permiso para realizar esta accion."

	def has_permission(self, request, view):
		return (request.method == 'POST' and request.user.is_superuser) or request.method == 'GET'
