from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone


def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return 'user_{0}/{1}'.format(instance.cedula, filename)


def user_directory_path_subuser(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return 'user_{0}/{1}'.format(instance.usuario.cedula, filename)


class Usuario(AbstractUser):
	cedula = models.IntegerField(null=True)
	segundo_nombre = models.CharField(max_length=50, null=True)
	segundo_apellido = models.CharField(max_length=50, null=True)
	correo_alternativo = models.EmailField(max_length=60, blank=True)
	celular = models.CharField(max_length=14, blank=True)
	telefono_casa = models.CharField(max_length=14, blank=True)
	telefono_trabajo = models.CharField(max_length=14, blank=True)
	fecha_nacimiento = models.DateField(default=timezone.now)
	sexo = models.CharField(max_length=1, blank=True)
	nacionalidad = models.CharField(max_length=20, blank=True)
	estado_civil = models.CharField(max_length=20, blank=True)
	foto = models.ImageField(upload_to=user_directory_path, default='sisgiu/no_avatar.jpg')


class Estudiante(models.Model):
	usuario = models.OneToOneField(
				Usuario,
				on_delete=models.CASCADE,
				primary_key=True)

	id_tipo_postgrado = models.ForeignKey(
		'TipoPostgrado',
		on_delete=models.SET_NULL,
		null=True,
		
	)

	id_estado_estudiante = models.ForeignKey(
		'EstadoEstudiante',
		on_delete=models.SET_NULL,
		null=True,
	)

	direccion = models.TextField(blank=True)



class TipoPostgrado(models.Model):
	tipo = models.CharField(max_length=20)

	def __str__(self):
		return self.tipo

class EstadoEstudiante(models.Model):
	estado = models.CharField(max_length=20)


class PersonalDocente(models.Model):
	usuario = models.OneToOneField(
			Usuario,
			on_delete=models.CASCADE,
			primary_key=True)
	direccion = models.TextField()
	rif = models.FileField(upload_to=user_directory_path_subuser)
	curriculum = models.FileField(upload_to=user_directory_path_subuser)
	permiso_ingresos = models.FileField(upload_to=user_directory_path_subuser)
	coordinador = models.BooleanField()


class PersonalAdministrativo(models.Model):
	usuario = models.OneToOneField(
			Usuario,
			on_delete=models.CASCADE,
			primary_key=True)

