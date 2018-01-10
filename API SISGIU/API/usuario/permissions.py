from rest_framework.permissions import BasePermission, SAFE_METHODS
from .models import Usuario

class isOwnerOrReadOnly(BasePermission):
	message = "Debe ser el usuario iniciado para editar este objeto."
	def has_object_permission(self, request, view, obj):
		member = Usuario.objects.get(username=request.user)
		print("################")
		print(member)
		if(member.is_superuser == True):
			return True
		return obj.usuario == request.user