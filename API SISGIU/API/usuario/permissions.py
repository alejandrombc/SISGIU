from rest_framework.permissions import BasePermission
from .models import Usuario

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



class isOwnerOrReadOnly(BasePermission):
	message = "Debe ser el usuario iniciado para editar este objeto."
	def has_object_permission(self, request, view, obj):
		member = Usuario.objects.get(username=request.user)
		if(member.is_superuser == True):
			return True
		return obj.usuario == request.user