from django.db import models

#Tabla estatica de estado del tramite
class EstadoTramite(models.Model):
	estado = models.CharField(max_length=20)
	class Meta:
		db_table = 'estado_tramite'


#Tabla de tramite
class Tramite(models.Model):
	nombre = models.CharField(max_length=100)
	descripcion = models.CharField(max_length=100)
	max_numero_dias = models.IntegerField(default=7)
	class Meta:
		db_table = 'tramite'
