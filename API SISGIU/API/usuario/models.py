from django.db import models
from django.contrib.auth.models import AbstractUser
import datetime


def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return 'user_{0}/{1}'.format(instance.cedula, filename)


# Create your models here.
class Usuario(AbstractUser):
	cedula = models.IntegerField(unique=True, null=True)
	# contrasena = models.CharField(max_length=64)
	# primer_nombre = models.CharField(max_length=50)
	# primer_apellido = models.CharField(max_length=50)
	# correo = models.EmailField(max_length=60)
	segundo_nombre = models.CharField(max_length=50, null=True)
	segundo_apellido = models.CharField(max_length=50, null=True)
	correo_alternativo = models.EmailField(max_length=60, blank=True)
	celular = models.CharField(max_length=14)
	telefono_casa = models.CharField(max_length=14)
	telefono_trabajo = models.CharField(max_length=14)
	date = datetime.date.today()
	fecha_nacimiento = models.DateField(default=date)
	sexo = models.CharField(max_length=1)
	nacionalidad = models.CharField(max_length=20)
	estado_civil = models.CharField(max_length=20)
	foto = models.ImageField(upload_to=user_directory_path)

	# class Meta:
	# 	abstract = True

    # def __str__(self):
  		# return self.username


class Estudiante(models.Model):
	usuario = models.OneToOneField(
				Usuario,
				on_delete=models.CASCADE,
				primary_key=True)

	id_tipo_postgrado = models.ForeignKey(
		'TipoPostgrado',
		on_delete=models.SET_NULL,
		null=True
	)

	id_estado_estudiante = models.ForeignKey(
		'EstadoEstudiante',
		on_delete=models.SET_NULL,
		null=True
	)

	direcccion = models.TextField()



class TipoPostgrado(models.Model):
	usuario = models.OneToOneField(
			Usuario,
			on_delete=models.CASCADE,
			primary_key=True)
	tipo = models.CharField(max_length=20)


class EstadoEstudiante(models.Model):
	usuario = models.OneToOneField(
			Usuario,
			on_delete=models.CASCADE,
			primary_key=True)
	estado = models.CharField(max_length=20)


class PersonalDocente(models.Model):
	usuario = models.OneToOneField(
			Usuario,
			on_delete=models.CASCADE,
			primary_key=True)
	direcccion = models.TextField()
	rif = models.FileField()
	curriculum = models.FileField()
	permiso_ingresos = models.FileField()
	coordinador = models.BooleanField()


class PersonalAdministrativo(models.Model):
	usuario = models.OneToOneField(
			Usuario,
			on_delete=models.CASCADE,
			primary_key=True)


class Administrador(models.Model):
	usuario = models.OneToOneField(
			Usuario,
			on_delete=models.CASCADE,
			primary_key=True)

