from django.db import models

# Create your models here.
class Usuario(models.Model):
	cedula = models.IntegerField(unique=True, editable=False)
	contrasena = models.CharField(max_length=20)
	primer_nombre = models.CharField(max_length=50)
	segundo_nombre = models.CharField(max_length=50)
	primer_apellido = models.CharField(max_length=50)
	segundo_apellido = models.CharField(max_length=50)
	correo = models.EmailField(max_length=60)
	correo_alternativo = models.EmailField(max_length=60)
	celular = models.CharField(max_length=14)
	telefono_casa = models.CharField(max_length=14)
	telefono_trabajo = models.CharField(max_length=14)
	fecha_nacimiento = models.DateField()
	sexo = models.CharField(max_length=1)
	nacionalidad = models.CharField(max_length=20)
	estado_civil = models.CharField(max_length=20)
	foto = models.FileField()

	class Meta:
		abstract = True

    # def __str__(self):
  		# return self.username


class Estudiante(Usuario):
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
	tipo = models.CharField(max_length=20)


class EstadoEstudiante(models.Model):
	estado = models.CharField(max_length=20)


class PersonalDocente(Usuario):
	direcccion = models.TextField()
	rif = models.FileField()
	curriculum = models.FileField()
	permiso_ingresos = models.FileField()
	coordinador = models.BooleanField()


class PersonalAdministrativo(Usuario):
	pass


class Administrador(Usuario):
	pass
