from django.db import models
from usuario.models import TipoPostgrado


class EstadoPeriodo(models.Model):
	estado = models.CharField(max_length=25)

	class Meta:
		db_table = 'estado_periodo'

	def __str__(self):
		return self.estado


#Tabla de periodo
class Periodo(models.Model):
	estado_periodo = models.ForeignKey(EstadoPeriodo, on_delete=models.SET_NULL, null=True)
	tipo_postgrado = models.ForeignKey(TipoPostgrado, on_delete=models.SET_NULL, null=True)
	descripcion = models.CharField(max_length=50, default='')
	anio_inicio = models.CharField(max_length=4, default='')
	anio_fin = models.CharField(max_length=4, default='')
	mes_inicio = models.CharField(max_length=10, default='')
	mes_fin = models.CharField(max_length=10, default='')
	numero_periodo = models.IntegerField()

	class Meta:
		db_table = 'periodo'
		ordering = ['id']

	def __str__(self):
		return self.descripcion + ' ' + str(self.tipo_postgrado)
