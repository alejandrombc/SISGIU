from rest_framework.permissions import BasePermission
from usuario.models import Estudiante, PersonalDocente, PersonalAdministrativo, Usuario

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


class EsEstudianteOAdministrador(BasePermission):
	message = "No posee permiso para realizar esta accion."
	def has_permission(self, request, view):
		if (request.method == 'GET'):
			return True
		else:
			admin = Usuario.objects.get(username=request.user)
			member = Estudiante.objects.filter(usuario_id=request.user.id)
			if(not member and admin.is_superuser == False):
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
			admin = Usuario.objects.get(username=request.user)
			member = PersonalAdministrativo.objects.filter(usuario_id=request.user.id)
			if(not member and admin.is_superuser == False):
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
			admin = Usuario.objects.get(username=request.user)
			member = PersonalDocente.objects.filter(usuario_id=request.user.id)
			if(not member and admin.is_superuser == False):
				return False
			else:
				return True
			return False



class isOwnerOrReadOnly(BasePermission):
	message = "Debe ser el usuario iniciado para editar este objeto."
	def has_object_permission(self, request, view, obj):
		member = Usuario.objects.get(username=request.user)
		if(member.is_superuser == True):
			return True
		return obj.usuario == request.user