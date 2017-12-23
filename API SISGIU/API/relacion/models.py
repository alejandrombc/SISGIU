from django.db import models
from usuario.models import *
from asignatura.models import *
from periodo.models import *
from tramite.models import *


# Todas las relaciones entre tablas principales

class PeriodoEstudiante(models.Model):
	periodo = models.ForeignKey(Periodo, on_delete=models.CASCADE)
	estudiante = models.ForeignKey(Estudiante, on_delete=models.CASCADE)
	pagado = models.BooleanField()


class DocenteAsignatura(models.Model):
	docente = models.ForeignKey(PersonalDocente, on_delete=models.CASCADE)
	asignatura = models.ForeignKey(Asignatura, on_delete=models.CASCADE)
	periodo = models.ForeignKey(Periodo, on_delete=models.CASCADE)
	aula = models.IntegerField()
	horario_dia = models.CharField(max_length=10)
	horario_hora = models.TimeField()


class EstudianteAsignatura(models.Model):
	periodo_estudiante = models.ForeignKey(PeriodoEstudiante, on_delete=models.CASCADE)
	asignatura = models.ForeignKey(Asignatura, on_delete=models.CASCADE)
	nota_definitiva = models.IntegerField()


class EstudianteTramite(models.Model):
	estudiante = models.ForeignKey(Estudiante, on_delete=models.CASCADE)
	tramite = models.ForeignKey(Tramite, on_delete=models.CASCADE)
	fecha_creacion = models.DateField(auto_now_add=True)
	fecha_tope = models.DateField()
	estado_tramite = models.ForeignKey(EstadoTramite, on_delete=models.CASCADE)
	mensaje = models.TextField()