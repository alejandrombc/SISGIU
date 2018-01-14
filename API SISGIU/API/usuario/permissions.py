from rest_framework.permissions import BasePermission, SAFE_METHODS
from .models import Usuario

class isOwnerOrReadOnly(BasePermission):
	message = "Debe ser el usuario iniciado para editar este objeto."
	def has_object_permission(self, request, view, obj):
		member = Usuario.objects.get(username=request.user)
		if(member.is_superuser == True):
			return True
		return obj.usuario == request.user

class onlyListNotCreate(BasePermission):
	message = "No posee permiso para realizar esta accion."
	def has_object_permission(self, request, view, obj):
		print('#####################')
		print(request.method)
		print('#####################')
		if (request.method == "POST"):
			print('MALDITA SEA')
			member = Usuario.objects.get(username=request.user)
			if(member.is_superuser == True):
				return True
			else:
				return False
		return True
