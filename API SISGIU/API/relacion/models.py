from django.db import models
from usuario.models import *
from asignatura.models import *
from periodo.models import *
from tramite.models import *


# Todas las relaciones entre tablas principales

# Tabla intermedia entre Periodo y Estudiante
class PeriodoEstudiante(models.Model):
	periodo = models.ForeignKey(Periodo, on_delete=models.CASCADE)
	estudiante = models.ForeignKey(Estudiante, on_delete=models.CASCADE)
	pagado = models.BooleanField()
	class Meta:
		db_table = 'periodo_estudiante'


DIAS_DE_LA_SEMANA = (
    ('0', 'lunes'),
    ('1', 'martes'),
    ('2', 'miercoles'),
    ('3', 'jueves'),
    ('4', 'viernes'),
    ('5', 'sabado'),
    ('6', 'domingo'),
)

# Tabla intermedia entre Docente y Asignatura
class DocenteAsignatura(models.Model):
	docente = models.ForeignKey(PersonalDocente, on_delete=models.CASCADE)
	asignatura = models.ForeignKey(Asignatura, on_delete=models.CASCADE)
	periodo = models.ForeignKey(Periodo, on_delete=models.CASCADE)
	aula = models.IntegerField()
	horario_dia = models.CharField(max_length=1, choices=DIAS_DE_LA_SEMANA)
	horario_hora = models.CharField(max_length=15)
	class Meta:
		db_table = 'docente_asignatura'

	def __str__(self):
		return str(self.asignatura) + ', ' + str(self.docente) + ', ' + str(self.periodo) + ', ' + str(self.horario_dia) + ', ' + str(self.horario_hora)


# Tabla intermedia entre Estudiante y Asignatura
class EstudianteAsignatura(models.Model):
	periodo_estudiante = models.ForeignKey(PeriodoEstudiante, on_delete=models.CASCADE)
	asignatura = models.ForeignKey(Asignatura, on_delete=models.CASCADE)
	nota_definitiva = models.IntegerField()
	class Meta:
		db_table = 'estudiante_asignatura'


# Tabla intermedia entre Estudiante y Tramite
class EstudianteTramite(models.Model):
	estudiante = models.ForeignKey(Estudiante, on_delete=models.CASCADE)
	tramite = models.ForeignKey(Tramite, on_delete=models.CASCADE)
	fecha_creacion = models.DateField(auto_now_add=True)
	fecha_tope = models.DateField()
	estado_tramite = models.ForeignKey(EstadoTramite, on_delete=models.CASCADE)
	mensaje = models.TextField()
	class Meta:
		db_table = 'estudiante_tramite'

# Tabla intermedia entre Asignatura y TipoPostgrado
class AsignaturaTipoPostgrado(models.Model):
	asignatura = models.ForeignKey(Asignatura, on_delete=models.CASCADE)
	tipo_postgrado = models.ForeignKey(TipoPostgrado, on_delete=models.CASCADE)
	class Meta:
		db_table = 'asignatura_tipoPostgrado'
