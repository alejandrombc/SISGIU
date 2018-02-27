from django.db import models
from usuario.models import TipoPostgrado


#Tabla estatica tipo de asignatura
class TipoAsignatura(models.Model):
	nombre = models.CharField(max_length=20)

	def __str__(self):
		return self.nombre

#Tabla de asignatura
class Asignatura(models.Model):
	codigo = models.CharField(max_length=6, unique=True)
	nombre = models.CharField(max_length=80)
	tipo_asignatura = models.ForeignKey(TipoAsignatura, on_delete=models.SET_NULL, null=True)
	tipo_postgrado = models.ForeignKey(TipoPostgrado, on_delete=models.SET_NULL, null=True)
	unidad_credito = models.IntegerField()