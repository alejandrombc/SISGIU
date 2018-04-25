from rest_framework.permissions import BasePermission
from usuario.models import Usuario


class IsListOrCreate(BasePermission):
	message = "No posee permiso para realizar esta accion."
	def has_permission(self, request, view):
		if (request.method == 'POST'):
			member = Usuario.objects.get(username=request.user)
			if(member.is_superuser == True):
				return True
			else:
				return False
		return True
